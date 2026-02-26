/**
 * XDR IDL Parser
 * Converts a token stream into an XDR AST
 *
 * XDR declaration grammar (RFC 4506):
 *   "opaque" identifier "[" value "]"           → fixed opaque
 *   "opaque" identifier "<" [value] ">"         → var opaque
 *   "string" identifier "<" [value] ">"         → string
 *   type-specifier "*" identifier               → optional
 *   type-specifier identifier                   → simple
 *   type-specifier identifier "[" value "]"     → fixed array
 *   type-specifier identifier "<" [value] ">"   → var array
 *   "void"                                      → void (no identifier)
 *
 * Extensions for Stellar XDR idioms:
 *   inline anonymous struct:  "struct" "{" fields "}" identifier
 *   inline anonymous union:   "union" "switch" "(" type name ")" "{" arms "}" identifier
 * Both are hoisted to synthetic top-level definitions named after their field name.
 */

import type { Token } from './lexer.js'
import type {
  XdrFile,
  XdrDefinition,
  XdrConst,
  XdrTypedef,
  XdrEnum,
  XdrEnumMember,
  XdrStruct,
  XdrField,
  XdrUnion,
  XdrUnionArm,
  XdrTypeRef,
} from './ast.js'

export class ParseError extends Error {
  constructor(message: string, token: Token) {
    super(`${message} at line ${token.line}, col ${token.col} (got ${JSON.stringify(token.value)})`)
    this.name = 'ParseError'
  }
}

export function parse(tokens: Token[]): XdrFile {
  let pos = 0
  const definitions: XdrDefinition[] = []

  function peek(offset = 0): Token {
    return tokens[pos + offset]!
  }

  function advance(): Token {
    const t = tokens[pos]!
    pos++
    return t
  }

  function expect(value: string): Token {
    const t = advance()
    if (t.value !== value) throw new ParseError(`Expected ${JSON.stringify(value)}`, t)
    return t
  }

  function expectIdent(): string {
    const t = advance()
    if (t.type !== 'ident' && t.type !== 'number') {
      throw new ParseError('Expected identifier', t)
    }
    return t.value
  }

  function parseValue(): string | number {
    const t = advance()
    if (t.type === 'number') {
      return t.value.startsWith('0x') || t.value.startsWith('0X')
        ? parseInt(t.value, 16)
        : parseInt(t.value, 10)
    }
    if (t.type === 'ident') return t.value // const reference
    throw new ParseError('Expected numeric value or const identifier', t)
  }

  // Forward declarations (mutually recursive with parseDeclaration)
  function parseDeclaration(
    syntheticPrefix?: string,
  ):
    | { name: string; type: XdrTypeRef; doc?: string }
    | { name: undefined; type: XdrTypeRef; doc?: string }
  function parseDeclaration(syntheticPrefix?: string): {
    name: string | undefined
    type: XdrTypeRef
    doc?: string
  } {
    const t = peek()

    // void — no identifier follows
    if (t.value === 'void') {
      advance()
      return { name: undefined, type: { kind: 'primitive', primitive: 'void' } }
    }

    // opaque identifier [N]  or  opaque identifier <N>  or  opaque identifier <>
    if (t.value === 'opaque') {
      advance()
      const name = expectIdent()
      if (peek().value === '[') {
        advance()
        const len = parseValue()
        expect(']')
        return { name, type: { kind: 'opaque', len } }
      }
      if (peek().value === '<') {
        advance()
        if (peek().value === '>') {
          advance()
          return { name, type: { kind: 'varOpaque' } }
        }
        const maxLen = parseValue()
        expect('>')
        return { name, type: { kind: 'varOpaque', maxLen } }
      }
      throw new ParseError('Expected [ or < after opaque identifier', peek())
    }

    // string identifier <N>  or  string identifier <>
    if (t.value === 'string') {
      advance()
      const name = expectIdent()
      expect('<')
      if (peek().value === '>') {
        advance()
        return { name, type: { kind: 'string' } }
      }
      const maxLen = parseValue()
      expect('>')
      return { name, type: { kind: 'string', maxLen } }
    }

    // inline anonymous struct:  struct { fields } identifier
    if (t.value === 'struct' && peek(1).value === '{') {
      advance() // consume 'struct'
      advance() // consume '{'
      const fields: XdrField[] = []
      while (peek().value !== '}') {
        const decl = parseDeclaration()
        expect(';')
        if (decl.name !== undefined) {
          fields.push({ name: decl.name, type: decl.type })
        }
      }
      expect('}')
      // Read the field name — it also becomes the synthetic struct name
      const fieldName = expectIdent()
      const synName = syntheticPrefix ? `${syntheticPrefix}_${fieldName}` : fieldName
      definitions.push({ kind: 'struct', name: synName, fields })

      // Handle modifiers after the field name (rare for inline structs, but handle for completeness)
      if (peek().value === '[') {
        advance()
        const len = parseValue()
        expect(']')
        return {
          name: fieldName,
          type: { kind: 'fixedArray', elementType: { kind: 'named', name: synName }, len },
        }
      }
      if (peek().value === '<') {
        advance()
        if (peek().value === '>') {
          advance()
          return {
            name: fieldName,
            type: { kind: 'varArray', elementType: { kind: 'named', name: synName } },
          }
        }
        const maxLen = parseValue()
        expect('>')
        return {
          name: fieldName,
          type: { kind: 'varArray', elementType: { kind: 'named', name: synName }, maxLen },
        }
      }
      return { name: fieldName, type: { kind: 'named', name: synName } }
    }

    // inline anonymous union:  union switch (type name) { arms } identifier
    if (t.value === 'union' && peek(1).value === 'switch') {
      advance() // consume 'union'
      expect('switch')
      expect('(')
      const discBase = parseBaseTypeSpec()
      const discName = expectIdent()
      expect(')')
      expect('{')

      const arms: XdrUnionArm[] = []
      let defaultArm: XdrTypeRef | undefined

      while (peek().value !== '}') {
        if (peek().value === 'default') {
          advance()
          expect(':')
          const decl = parseDeclaration(syntheticPrefix)
          expect(';')
          defaultArm = decl.type
          continue
        }

        const cases: Array<string | number> = []
        while (peek().value === 'case') {
          advance()
          const caseVal = parseValue()
          expect(':')
          cases.push(caseVal)
        }

        const decl = parseDeclaration(syntheticPrefix)
        expect(';')
        arms.push({ cases, type: decl.type, name: decl.name })
      }
      expect('}')

      // The field name follows the closing brace
      const fieldName = expectIdent()
      const synName = syntheticPrefix ? `${syntheticPrefix}_${fieldName}` : fieldName
      definitions.push({
        kind: 'union',
        name: synName,
        discriminant: { name: discName, type: discBase },
        arms,
        defaultArm,
      })

      return { name: fieldName, type: { kind: 'named', name: synName } }
    }

    // type-specifier (possibly with optional * modifier, or identifier + array modifiers)
    const baseType = parseBaseTypeSpec()

    // type-specifier * identifier  — optional
    if (peek().value === '*') {
      advance()
      const name = expectIdent()
      return { name, type: { kind: 'optional', elementType: baseType } }
    }

    // For bare void (returned by parseBaseTypeSpec when it sees 'void' in ambiguous context)
    if (baseType.kind === 'primitive' && baseType.primitive === 'void') {
      return { name: undefined, type: baseType }
    }

    const name = expectIdent()

    // type-specifier identifier [N]  — fixed array
    if (peek().value === '[') {
      advance()
      const len = parseValue()
      expect(']')
      return { name, type: { kind: 'fixedArray', elementType: baseType, len } }
    }

    // type-specifier identifier <N>  or  type-specifier identifier <>  — var array
    if (peek().value === '<') {
      advance()
      if (peek().value === '>') {
        advance()
        return { name, type: { kind: 'varArray', elementType: baseType } }
      }
      const maxLen = parseValue()
      expect('>')
      return { name, type: { kind: 'varArray', elementType: baseType, maxLen } }
    }

    return { name, type: baseType }
  }

  /**
   * Parses ONLY the base type specifier — no array/optional modifiers, no identifier.
   * Handles named struct/union references (not inline anonymous ones — those are handled
   * in parseDeclaration).
   */
  function parseBaseTypeSpec(): XdrTypeRef {
    const t = peek()

    if (t.value === 'void') {
      advance()
      return { kind: 'primitive', primitive: 'void' }
    }
    if (t.value === 'bool') {
      advance()
      return { kind: 'primitive', primitive: 'bool' }
    }
    if (t.value === 'int') {
      advance()
      return { kind: 'primitive', primitive: 'int' }
    }
    if (t.value === 'float') {
      advance()
      return { kind: 'primitive', primitive: 'float' }
    }
    if (t.value === 'double') {
      advance()
      return { kind: 'primitive', primitive: 'double' }
    }
    if (t.value === 'hyper') {
      advance()
      return { kind: 'primitive', primitive: 'hyper' }
    }
    if (t.value === 'unsigned') {
      advance()
      if (peek().value === 'int') {
        advance()
        return { kind: 'primitive', primitive: 'unsigned int' }
      }
      if (peek().value === 'hyper') {
        advance()
        return { kind: 'primitive', primitive: 'unsigned hyper' }
      }
      throw new ParseError('Expected int or hyper after unsigned', peek())
    }

    // Named struct reference (only 'struct Foo', not 'struct {' which is handled in parseDeclaration)
    if (t.value === 'struct') {
      advance()
      const structName = expectIdent()
      return { kind: 'named', name: structName }
    }

    // Named union reference (only 'union Foo', not 'union switch' which is handled in parseDeclaration)
    if (t.value === 'union') {
      advance()
      const unionName = expectIdent()
      return { kind: 'named', name: unionName }
    }

    // Named type (typedef, enum reference)
    if (t.type === 'ident') {
      advance()
      return { kind: 'named', name: t.value }
    }

    throw new ParseError('Expected type specifier', t)
  }

  function parseConst(): XdrConst {
    const doc = peek().leadingComment
    expect('const')
    const name = expectIdent()
    expect('=')
    const value = parseValue()
    expect(';')
    return { kind: 'const', name, value, doc }
  }

  function parseTypedef(): XdrTypedef {
    const doc = peek().leadingComment
    expect('typedef')
    const decl = parseDeclaration()
    expect(';')
    if (decl.name === undefined) {
      throw new ParseError('typedef requires a name (void is not allowed here)', peek())
    }
    return { kind: 'typedef', name: decl.name, type: decl.type, doc: doc ?? decl.doc }
  }

  function parseEnum(): XdrEnum {
    const doc = peek().leadingComment
    expect('enum')
    const name = expectIdent()
    expect('{')
    const members: XdrEnumMember[] = []
    while (peek().value !== '}') {
      const memberName = expectIdent()
      expect('=')
      const value = parseValue()
      members.push({ name: memberName, value })
      if (peek().value === ',') advance()
    }
    expect('}')
    expect(';')
    return { kind: 'enum', name, members, doc }
  }

  function parseStruct(): XdrStruct {
    const doc = peek().leadingComment
    expect('struct')
    const name = expectIdent()
    expect('{')
    const fields: XdrField[] = []
    while (peek().value !== '}') {
      const fieldDoc = peek().leadingComment
      const decl = parseDeclaration(name)
      expect(';')
      if (decl.name !== undefined) {
        fields.push({ name: decl.name, type: decl.type, doc: fieldDoc ?? decl.doc })
      }
      // void fields are silently skipped
    }
    expect('}')
    expect(';')
    return { kind: 'struct', name, fields, doc }
  }

  function parseUnion(): XdrUnion {
    const doc = peek().leadingComment
    expect('union')
    const name = expectIdent()
    expect('switch')
    expect('(')
    // The discriminant is a simple type-specifier + identifier (no array/optional modifiers)
    const discBase = parseBaseTypeSpec()
    const discName = expectIdent()
    expect(')')
    expect('{')

    const arms: XdrUnionArm[] = []
    let defaultArm: XdrTypeRef | undefined

    while (peek().value !== '}') {
      if (peek().value === 'default') {
        advance()
        expect(':')
        const decl = parseDeclaration(name)
        expect(';')
        defaultArm = decl.type
        continue
      }

      // Collect all case labels for this arm (multiple cases can share one body)
      const cases: Array<string | number> = []
      while (peek().value === 'case') {
        advance() // consume 'case'
        const caseVal = parseValue()
        expect(':')
        cases.push(caseVal)
      }

      const decl = parseDeclaration(name)
      expect(';')
      arms.push({ cases, type: decl.type, name: decl.name })
    }

    expect('}')
    expect(';')
    return {
      kind: 'union',
      name,
      discriminant: { name: discName, type: discBase },
      arms,
      defaultArm,
      doc,
    }
  }

  function parseDefinition(): XdrDefinition | null {
    const t = peek()
    if (t.type === 'eof') return null
    if (t.value === 'const') return parseConst()
    if (t.value === 'typedef') return parseTypedef()
    if (t.value === 'enum') return parseEnum()
    if (t.value === 'struct') return parseStruct()
    if (t.value === 'union') return parseUnion()
    // Skip unknown tokens (e.g. C preprocessor leftovers in some .x files)
    advance()
    return null
  }

  while (peek().type !== 'eof') {
    const def = parseDefinition()
    if (def !== null) definitions.push(def)
  }

  return { definitions }
}

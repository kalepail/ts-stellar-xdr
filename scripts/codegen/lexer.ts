/**
 * XDR IDL Lexer
 * Tokenizes .x definition files into a token stream
 */

export type TokenType =
  | 'ident'       // identifier or keyword
  | 'number'      // numeric literal (decimal or hex)
  | 'string'      // string literal (not common in XDR)
  | 'punct'       // punctuation: { } ( ) [ ] < > ; , = * %
  | 'eof'

export interface Token {
  type: TokenType
  value: string
  line: number
  col: number
  /** Accumulated comment text preceding this token (from .x source file). */
  leadingComment?: string
}

// XDR keywords
const KEYWORDS = new Set([
  'const', 'typedef', 'enum', 'struct', 'union', 'switch', 'case', 'default',
  'int', 'unsigned', 'hyper', 'bool', 'float', 'double', 'void',
  'opaque', 'string',
])

export function tokenize(source: string, filename = '<unknown>'): Token[] {
  const tokens: Token[] = []
  let i = 0
  let line = 1
  let col = 1
  /** Accumulated comment lines pending attachment to the next token. */
  let pendingComment: string[] = []
  /** Whether the last non-whitespace thing was a comment (for blank-line detection). */
  let lastWasComment = false

  function advance(): string {
    const ch = source[i++]!
    if (ch === '\n') { line++; col = 1 } else { col++ }
    return ch
  }

  function peek(offset = 0): string {
    return source[i + offset] ?? ''
  }

  /** Attach any pending comment to a token and reset. */
  function flushComment(): string | undefined {
    if (pendingComment.length === 0) return undefined
    const text = pendingComment.join('\n')
    pendingComment = []
    lastWasComment = false
    return text
  }

  while (i < source.length) {
    const startLine = line
    const startCol = col
    const ch = peek()

    // Skip whitespace — but detect blank lines that break comment association
    if (ch === ' ' || ch === '\t' || ch === '\r' || ch === '\n') {
      if (ch === '\n' && lastWasComment) {
        // Check if the NEXT char is also a newline (blank line)
        // Look ahead past any \r\n or spaces
        let j = i + 1
        while (j < source.length && (source[j] === ' ' || source[j] === '\t' || source[j] === '\r')) j++
        if (j < source.length && source[j] === '\n') {
          // Blank line after comment — discard the pending comment
          pendingComment = []
          lastWasComment = false
        }
      }
      advance()
      continue
    }

    // Line comments: % comment... (XDR uses %) and // comment
    if (ch === '%' || (ch === '/' && peek(1) === '/')) {
      let comment = ''
      // Skip the prefix (% or //)
      if (ch === '%') { advance() }
      else { advance(); advance() }
      // Skip leading space
      if (peek() === ' ') advance()
      // Capture the rest of the line
      while (i < source.length && peek() !== '\n') {
        comment += advance()
      }
      pendingComment.push(comment)
      lastWasComment = true
      continue
    }

    // Block comments: /* ... */
    if (ch === '/' && peek(1) === '*') {
      advance(); advance() // consume /*
      let comment = ''
      while (i < source.length) {
        if (peek() === '*' && peek(1) === '/') {
          advance(); advance() // consume */
          break
        }
        comment += advance()
      }
      // Clean up block comment: remove leading/trailing whitespace,
      // remove leading * on each line (common in multi-line block comments)
      const lines = comment.split('\n').map(l => {
        let trimmed = l.replace(/^\s*\*?\s?/, '')
        return trimmed
      }).filter((l, idx, arr) => {
        // Remove empty first and last lines
        if (idx === 0 && l.trim() === '') return false
        if (idx === arr.length - 1 && l.trim() === '') return false
        return true
      })
      if (lines.length > 0) {
        pendingComment.push(...lines)
      }
      lastWasComment = true
      continue
    }

    // Numbers: decimal or hex (0x...)
    if (ch >= '0' && ch <= '9') {
      let num = ''
      if (ch === '0' && (peek(1) === 'x' || peek(1) === 'X')) {
        num += advance() + advance() // 0x
        while (i < source.length && /[0-9a-fA-F]/.test(peek())) {
          num += advance()
        }
      } else {
        while (i < source.length && peek() >= '0' && peek() <= '9') {
          num += advance()
        }
      }
      const numComment = flushComment()
      tokens.push({ type: 'number', value: num, line: startLine, col: startCol, leadingComment: numComment })
      continue
    }

    // Negative numbers
    if (ch === '-' && peek(1) >= '0' && peek(1) <= '9') {
      let num = advance() // -
      while (i < source.length && peek() >= '0' && peek() <= '9') {
        num += advance()
      }
      const negComment = flushComment()
      tokens.push({ type: 'number', value: num, line: startLine, col: startCol, leadingComment: negComment })
      continue
    }

    // Identifiers and keywords
    if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch === '_') {
      let ident = ''
      while (
        i < source.length &&
        ((peek() >= 'a' && peek() <= 'z') ||
          (peek() >= 'A' && peek() <= 'Z') ||
          (peek() >= '0' && peek() <= '9') ||
          peek() === '_')
      ) {
        ident += advance()
      }
      const identComment = flushComment()
      tokens.push({ type: 'ident', value: ident, line: startLine, col: startCol, leadingComment: identComment })
      lastWasComment = false
      continue
    }

    // Punctuation
    if ('{}()[]<>;,=*:'.includes(ch)) {
      const punctComment = flushComment()
      tokens.push({ type: 'punct', value: advance(), line: startLine, col: startCol, leadingComment: punctComment })
      lastWasComment = false
      continue
    }

    throw new Error(`${filename}:${startLine}:${startCol}: Unexpected character: ${JSON.stringify(ch)}`)
  }

  tokens.push({ type: 'eof', value: '', line, col })
  return tokens
}

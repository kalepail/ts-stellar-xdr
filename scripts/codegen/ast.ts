/**
 * AST types for XDR IDL (RFC 4506)
 * Represents the parsed structure of .x definition files
 */

// A complete XDR definition file
export interface XdrFile {
  definitions: XdrDefinition[]
}

// All possible top-level definitions
export type XdrDefinition =
  | XdrConst
  | XdrTypedef
  | XdrEnum
  | XdrStruct
  | XdrUnion

// const IDENTIFIER = value;
export interface XdrConst {
  kind: 'const'
  name: string
  value: string | number  // e.g. "MAX_OPS" or 100
  doc?: string
}

// typedef type IDENTIFIER;
export interface XdrTypedef {
  kind: 'typedef'
  name: string
  type: XdrTypeRef
  doc?: string
}

// enum IDENTIFIER { MEMBER = value, ... }
export interface XdrEnum {
  kind: 'enum'
  name: string
  members: XdrEnumMember[]
  doc?: string
}

export interface XdrEnumMember {
  name: string
  value: string | number  // can reference a const name or be a literal
}

// struct IDENTIFIER { fields... }
export interface XdrStruct {
  kind: 'struct'
  name: string
  fields: XdrField[]
  doc?: string
}

export interface XdrField {
  name: string
  type: XdrTypeRef
  doc?: string
}

// union IDENTIFIER switch (type discriminant) { cases... }
export interface XdrUnion {
  kind: 'union'
  name: string
  discriminant: {
    name: string    // variable name of the switch
    type: XdrTypeRef  // type of the switch variable
  }
  arms: XdrUnionArm[]
  defaultArm?: XdrTypeRef  // default: type; (undefined means no default)
  doc?: string
}

export interface XdrUnionArm {
  cases: Array<string | number>  // one arm can handle multiple cases
  type: XdrTypeRef
  name?: string  // arm field name (present unless type is void)
}

// All possible type references
export type XdrTypeRef =
  | XdrPrimitiveTypeRef
  | XdrNamedTypeRef
  | XdrOpaqueRef
  | XdrVarOpaqueRef
  | XdrStringRef
  | XdrFixedArrayRef
  | XdrVarArrayRef
  | XdrOptionalRef

// Primitive built-in types
export type XdrPrimitiveKind =
  | 'int'
  | 'unsigned int'
  | 'hyper'
  | 'unsigned hyper'
  | 'bool'
  | 'float'
  | 'double'
  | 'void'

export interface XdrPrimitiveTypeRef {
  kind: 'primitive'
  primitive: XdrPrimitiveKind
}

// Reference to a named type (struct, enum, union, typedef)
export interface XdrNamedTypeRef {
  kind: 'named'
  name: string
}

// opaque[N] — fixed-length byte array
export interface XdrOpaqueRef {
  kind: 'opaque'
  len: string | number  // can reference a const
}

// opaque<N> or opaque<> — variable-length byte array
export interface XdrVarOpaqueRef {
  kind: 'varOpaque'
  maxLen?: string | number  // undefined means no limit (use UINT32_MAX)
}

// string<N> or string<> — variable-length string
export interface XdrStringRef {
  kind: 'string'
  maxLen?: string | number
}

// T[N] — fixed-length typed array
export interface XdrFixedArrayRef {
  kind: 'fixedArray'
  elementType: XdrTypeRef
  len: string | number
}

// T<N> or T<> — variable-length typed array
export interface XdrVarArrayRef {
  kind: 'varArray'
  elementType: XdrTypeRef
  maxLen?: string | number
}

// T* — optional (can be present or absent)
export interface XdrOptionalRef {
  kind: 'optional'
  elementType: XdrTypeRef
}

import { describe, it, expect } from 'vitest'
import {
  padLen,
  createReader,
  createReaderFromBase64,
  assertFullyConsumed,
  remainingBytes,
  createWriter,
  toBytes,
  toBase64,
  readInt32,
  readUint32,
  readInt64,
  readUint64,
  readBool,
  readFloat,
  readDouble,
  readFixedOpaque,
  readVarOpaque,
  readString,
  writeInt32,
  writeUint32,
  writeInt64,
  writeUint64,
  writeBool,
  writeFloat,
  writeDouble,
  writeFixedOpaque,
  writeVarOpaque,
  writeString,
  readOptional,
  writeOptional,
  readFixedArray,
  writeFixedArray,
  readVarArray,
  writeVarArray,
  beginComposite,
  endComposite,
  encode,
  decode,
  validate,
  validateXDR,
  decodeStream,
  bytesToBase64,
  base64ToBytes,
  bytesToHex,
  hexToBytes,
  XdrReadError,
  XdrWriteError,
  DEFAULT_LIMITS,
  LIMITS_NONE,
  type XdrLimits,
} from '../src/codec.ts'

describe('padLen', () => {
  it('returns 0 for multiples of 4', () => {
    expect(padLen(0)).toBe(0)
    expect(padLen(4)).toBe(0)
    expect(padLen(8)).toBe(0)
    expect(padLen(32)).toBe(0)
  })
  it('returns correct padding', () => {
    expect(padLen(1)).toBe(3)
    expect(padLen(2)).toBe(2)
    expect(padLen(3)).toBe(1)
    expect(padLen(5)).toBe(3)
    expect(padLen(6)).toBe(2)
    expect(padLen(7)).toBe(1)
  })
})

describe('primitives round-trip', () => {
  function roundTrip<T>(
    writeValue: T,
    writeFn: (w: ReturnType<typeof createWriter>, v: T) => void,
    readFn: (r: ReturnType<typeof createReader>) => T,
    expectedBytes?: number,
  ): T {
    const w = createWriter()
    writeFn(w, writeValue)
    const bytes = toBytes(w)
    if (expectedBytes !== undefined) expect(bytes.length).toBe(expectedBytes)
    const r = createReader(bytes)
    const result = readFn(r)
    assertFullyConsumed(r)
    return result
  }

  describe('int32', () => {
    it('encodes/decodes positive', () => {
      expect(roundTrip(42, writeInt32, readInt32, 4)).toBe(42)
    })
    it('encodes/decodes negative', () => {
      expect(roundTrip(-1, writeInt32, readInt32, 4)).toBe(-1)
    })
    it('encodes/decodes max i32', () => {
      expect(roundTrip(2147483647, writeInt32, readInt32, 4)).toBe(2147483647)
    })
    it('encodes/decodes min i32', () => {
      expect(roundTrip(-2147483648, writeInt32, readInt32, 4)).toBe(-2147483648)
    })
    it('encodes/decodes zero', () => {
      expect(roundTrip(0, writeInt32, readInt32, 4)).toBe(0)
    })
    it('is big-endian', () => {
      const w = createWriter()
      writeInt32(w, 1)
      const bytes = toBytes(w)
      expect(Array.from(bytes)).toEqual([0, 0, 0, 1])
    })
    it('rejects non-integer values', () => {
      const w = createWriter()
      expect(() => writeInt32(w, 1.5)).toThrow(XdrWriteError)
      expect(() => writeInt32(w, NaN)).toThrow(XdrWriteError)
      expect(() => writeInt32(w, Infinity)).toThrow(XdrWriteError)
    })
    it('rejects out-of-range values', () => {
      const w = createWriter()
      expect(() => writeInt32(w, 2147483648)).toThrow(XdrWriteError)
      expect(() => writeInt32(w, -2147483649)).toThrow(XdrWriteError)
    })
  })

  describe('uint32', () => {
    it('encodes/decodes zero', () => {
      expect(roundTrip(0, writeUint32, readUint32, 4)).toBe(0)
    })
    it('encodes/decodes max u32', () => {
      expect(roundTrip(4294967295, writeUint32, readUint32, 4)).toBe(4294967295)
    })
    it('encodes 256', () => {
      const w = createWriter()
      writeUint32(w, 256)
      expect(Array.from(toBytes(w))).toEqual([0, 0, 1, 0])
    })
    it('rejects negative values', () => {
      const w = createWriter()
      expect(() => writeUint32(w, -1)).toThrow(XdrWriteError)
    })
    it('rejects values above max', () => {
      const w = createWriter()
      expect(() => writeUint32(w, 4294967296)).toThrow(XdrWriteError)
    })
    it('rejects non-integer values', () => {
      const w = createWriter()
      expect(() => writeUint32(w, 1.5)).toThrow(XdrWriteError)
    })
  })

  describe('int64 (hyper)', () => {
    it('encodes/decodes positive bigint', () => {
      expect(roundTrip(4294967297n, writeInt64, readInt64, 8)).toBe(4294967297n)
    })
    it('encodes/decodes negative bigint', () => {
      expect(roundTrip(-1n, writeInt64, readInt64, 8)).toBe(-1n)
    })
    it('encodes/decodes zero', () => {
      expect(roundTrip(0n, writeInt64, readInt64, 8)).toBe(0n)
    })
    it('encodes/decodes max i64', () => {
      const MAX_I64 = 9223372036854775807n
      expect(roundTrip(MAX_I64, writeInt64, readInt64, 8)).toBe(MAX_I64)
    })
    it('encodes/decodes min i64', () => {
      const MIN_I64 = -9223372036854775808n
      expect(roundTrip(MIN_I64, writeInt64, readInt64, 8)).toBe(MIN_I64)
    })
    it('rejects out-of-range values', () => {
      const w = createWriter()
      expect(() => writeInt64(w, 9223372036854775808n)).toThrow(XdrWriteError)
      expect(() => writeInt64(w, -9223372036854775809n)).toThrow(XdrWriteError)
    })
  })

  describe('uint64 (unsigned hyper)', () => {
    it('encodes/decodes max u64', () => {
      const MAX_U64 = 18446744073709551615n
      expect(roundTrip(MAX_U64, writeUint64, readUint64, 8)).toBe(MAX_U64)
    })
    it('encodes/decodes a large Stellar balance', () => {
      // 1000 XLM in stroops = 1_000_000_0000 = 10_000_000_000
      expect(roundTrip(10_000_000_000n, writeUint64, readUint64, 8)).toBe(10_000_000_000n)
    })
    it('rejects negative values', () => {
      const w = createWriter()
      expect(() => writeUint64(w, -1n)).toThrow(XdrWriteError)
    })
    it('rejects values above max', () => {
      const w = createWriter()
      expect(() => writeUint64(w, 18446744073709551616n)).toThrow(XdrWriteError)
    })
  })

  describe('bool', () => {
    it('encodes/decodes true', () => {
      expect(roundTrip(true, writeBool, readBool, 4)).toBe(true)
    })
    it('encodes/decodes false', () => {
      expect(roundTrip(false, writeBool, readBool, 4)).toBe(false)
    })
    it('true encodes as 1', () => {
      const w = createWriter()
      writeBool(w, true)
      expect(Array.from(toBytes(w))).toEqual([0, 0, 0, 1])
    })
    it('throws on invalid bool value (2)', () => {
      const r = createReader(new Uint8Array([0, 0, 0, 2]))
      expect(() => readBool(r)).toThrow(XdrReadError)
    })
    it('throws on invalid bool value (0xff)', () => {
      const r = createReader(new Uint8Array([0, 0, 0, 0xff]))
      expect(() => readBool(r)).toThrow(XdrReadError)
    })
    it('rejects any nonzero value other than 1', () => {
      // Ensure we don't treat any nonzero as true
      for (const v of [2, 3, 128, 255]) {
        const buf = new Uint8Array(4)
        new DataView(buf.buffer).setUint32(0, v, false)
        const r = createReader(buf)
        expect(() => readBool(r)).toThrow(XdrReadError)
      }
    })
  })

  describe('float', () => {
    it('encodes/decodes 1.0', () => {
      const result = roundTrip(1.0, writeFloat, readFloat, 4)
      expect(result).toBeCloseTo(1.0)
    })
  })

  describe('double', () => {
    it('encodes/decodes Math.PI', () => {
      const result = roundTrip(Math.PI, writeDouble, readDouble, 8)
      expect(result).toBeCloseTo(Math.PI, 10)
    })
  })
})

describe('opaque', () => {
  describe('fixed opaque', () => {
    it('round-trips 32 bytes (Hash)', () => {
      const data = new Uint8Array(32).fill(0xab)
      const w = createWriter()
      writeFixedOpaque(w, data, 32)
      expect(toBytes(w).length).toBe(32) // 32 is already 4-byte aligned
      const r = createReader(toBytes(w))
      const result = readFixedOpaque(r, 32)
      assertFullyConsumed(r)
      expect(result).toEqual(data)
    })

    it('pads 3-byte opaque to 4 bytes', () => {
      const data = new Uint8Array([1, 2, 3])
      const w = createWriter()
      writeFixedOpaque(w, data, 3)
      const bytes = toBytes(w)
      expect(bytes.length).toBe(4) // 3 bytes + 1 pad
      expect(bytes[3]).toBe(0) // padding is zero
    })

    it('pads 1-byte opaque to 4 bytes', () => {
      const data = new Uint8Array([0xff])
      const w = createWriter()
      writeFixedOpaque(w, data, 1)
      expect(toBytes(w).length).toBe(4)
    })

    it('validates padding bytes are zero on read', () => {
      // 3 bytes of data, padding byte should be 0
      const bad = new Uint8Array([1, 2, 3, 0xff]) // non-zero padding
      const r = createReader(bad)
      expect(() => readFixedOpaque(r, 3)).toThrow(XdrReadError)
    })
  })

  describe('var opaque', () => {
    it('round-trips variable opaque', () => {
      const data = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05])
      const w = createWriter()
      writeVarOpaque(w, data, 64)
      // wire: 4-byte length (5) + 5 bytes + 3 padding = 12 bytes
      expect(toBytes(w).length).toBe(12)
      const r = createReader(toBytes(w))
      const result = readVarOpaque(r, 64)
      assertFullyConsumed(r)
      expect(result).toEqual(data)
    })

    it('round-trips empty var opaque', () => {
      const data = new Uint8Array(0)
      const w = createWriter()
      writeVarOpaque(w, data, 64)
      expect(toBytes(w).length).toBe(4) // just the length field
      const r = createReader(toBytes(w))
      const result = readVarOpaque(r, 64)
      assertFullyConsumed(r)
      expect(result).toEqual(data)
    })

    it('throws if data exceeds maxLen on write', () => {
      const data = new Uint8Array(10)
      const w = createWriter()
      expect(() => writeVarOpaque(w, data, 5)).toThrow(XdrWriteError)
    })

    it('throws if wire length exceeds maxLen on read', () => {
      const w = createWriter()
      writeVarOpaque(w, new Uint8Array(10), 100)
      const r = createReader(toBytes(w))
      expect(() => readVarOpaque(r, 5)).toThrow(XdrReadError)
    })
  })
})

describe('string', () => {
  it('round-trips ASCII string', () => {
    const w = createWriter()
    writeString(w, 'Hello', 28)
    // wire: 4 bytes length + 5 bytes + 3 padding = 12 bytes
    expect(toBytes(w).length).toBe(12)
    const r = createReader(toBytes(w))
    expect(readString(r, 28)).toBe('Hello')
    assertFullyConsumed(r)
  })

  it('round-trips empty string', () => {
    const w = createWriter()
    writeString(w, '', 28)
    expect(toBytes(w).length).toBe(4) // just length field
    const r = createReader(toBytes(w))
    expect(readString(r, 28)).toBe('')
    assertFullyConsumed(r)
  })

  it('round-trips 4-char string (no padding needed)', () => {
    const w = createWriter()
    writeString(w, 'Test', 100)
    // 4 bytes length + 4 bytes string = 8 bytes (padLen(4) = 0)
    expect(toBytes(w).length).toBe(8)
    const r = createReader(toBytes(w))
    expect(readString(r, 100)).toBe('Test')
    assertFullyConsumed(r)
  })

  it('round-trips UTF-8 string with multi-byte chars', () => {
    const w = createWriter()
    writeString(w, 'Hello 🌍', 100)
    const r = createReader(toBytes(w))
    expect(readString(r, 100)).toBe('Hello 🌍')
    assertFullyConsumed(r)
  })

  it('rejects invalid UTF-8 byte sequences (fatal mode)', () => {
    // Construct a var-opaque with an invalid UTF-8 byte (0xD1 is an incomplete multi-byte sequence)
    const w = createWriter()
    writeVarOpaque(w, new Uint8Array([0xd1]), 100)
    const r = createReader(toBytes(w))
    expect(() => readString(r, 100)).toThrow()
  })
})

describe('optional', () => {
  it('round-trips present value', () => {
    const w = createWriter()
    writeOptional(w, 42, writeInt32)
    const bytes = toBytes(w)
    expect(bytes.length).toBe(8) // 4 flag + 4 value
    const r = createReader(bytes)
    expect(readOptional(r, readInt32)).toBe(42)
    assertFullyConsumed(r)
  })

  it('round-trips absent value (undefined)', () => {
    const w = createWriter()
    writeOptional(w, undefined, writeInt32)
    const bytes = toBytes(w)
    expect(bytes.length).toBe(4) // just the flag
    const r = createReader(bytes)
    expect(readOptional(r, readInt32)).toBeUndefined()
    assertFullyConsumed(r)
  })
})

describe('arrays', () => {
  describe('fixed array', () => {
    it('round-trips fixed array of uint32', () => {
      const arr = [1, 2, 3, 4, 5]
      const w = createWriter()
      writeFixedArray(w, arr, 5, writeUint32)
      const bytes = toBytes(w)
      expect(bytes.length).toBe(20) // 5 × 4 bytes
      const r = createReader(bytes)
      expect(readFixedArray(r, 5, readUint32)).toEqual(arr)
      assertFullyConsumed(r)
    })

    it('throws if array length does not match fixed size', () => {
      const w = createWriter()
      expect(() => writeFixedArray(w, [1, 2], 5, writeUint32)).toThrow(XdrWriteError)
    })
  })

  describe('var array', () => {
    it('round-trips var array of uint32', () => {
      const arr = [10, 20, 30]
      const w = createWriter()
      writeVarArray(w, arr, 100, writeUint32)
      const bytes = toBytes(w)
      expect(bytes.length).toBe(16) // 4 length + 3 × 4 = 16
      const r = createReader(bytes)
      expect(readVarArray(r, 100, readUint32)).toEqual(arr)
      assertFullyConsumed(r)
    })

    it('round-trips empty var array', () => {
      const w = createWriter()
      writeVarArray(w, [], 100, writeUint32)
      const bytes = toBytes(w)
      expect(bytes.length).toBe(4)
      const r = createReader(bytes)
      expect(readVarArray(r, 100, readUint32)).toEqual([])
      assertFullyConsumed(r)
    })

    it('throws if array exceeds maxLen on write', () => {
      const w = createWriter()
      expect(() => writeVarArray(w, [1, 2, 3], 2, writeUint32)).toThrow(XdrWriteError)
    })
  })
})

describe('encode/decode helpers', () => {
  it('encode + decode round-trips', () => {
    const value = 12345
    const bytes = encode(value, writeInt32)
    expect(bytes.length).toBe(4)
    expect(decode(bytes, readInt32)).toBe(value)
  })

  it('decode from base64 string', () => {
    const value = 99n
    const bytes = encode(value, writeUint64)
    const b64 = bytesToBase64(bytes)
    expect(decode(b64, readUint64)).toBe(value)
  })

  it('throws if buffer not fully consumed', () => {
    // 8 bytes but we only read 4
    const bytes = encode(42n, writeUint64)
    expect(() => decode(bytes, readInt32)).toThrow(XdrReadError)
  })

  it('accepts custom limits', () => {
    const value = 42
    const bytes = encode(value, writeInt32)
    const customLimits: XdrLimits = { maxDepth: 10, maxBytes: 100 }
    expect(decode(bytes, readInt32, customLimits)).toBe(value)
  })

  it('validate() returns true for valid payloads and false for invalid payloads', () => {
    const good = encode(123, writeInt32)
    const bad = encode(123n, writeUint64) // wrong type/size for readInt32
    expect(validate(good, readInt32)).toBe(true)
    expect(validate(bad, readInt32)).toBe(false)
  })

  it('validateXDR alias matches validate()', () => {
    const bytes = encode(7, writeInt32)
    expect(validateXDR(bytes, readInt32)).toBe(validate(bytes, readInt32))
  })
})

describe('base64/hex utilities', () => {
  it('bytesToBase64 and base64ToBytes round-trip', () => {
    const original = new Uint8Array([1, 2, 3, 4, 255, 0, 128])
    const b64 = bytesToBase64(original)
    expect(typeof b64).toBe('string')
    expect(base64ToBytes(b64)).toEqual(original)
  })

  it('base64ToBytes strips whitespace', () => {
    const original = new Uint8Array([1, 2, 3, 4])
    const b64 = bytesToBase64(original)
    // Add whitespace in various places
    const withWhitespace = ` ${b64.slice(0, 2)}\n${b64.slice(2)} `
    expect(base64ToBytes(withWhitespace)).toEqual(original)
  })

  it('bytesToHex and hexToBytes round-trip', () => {
    const original = new Uint8Array([0x00, 0xff, 0xab, 0x12])
    const hex = bytesToHex(original)
    expect(hex).toBe('00ffab12')
    expect(hexToBytes(hex)).toEqual(original)
  })

  it('hexToBytes throws on odd-length hex', () => {
    expect(() => hexToBytes('abc')).toThrow()
  })
})

describe('XDR reader/writer internals', () => {
  it('writer grows dynamically', () => {
    const w = createWriter(4) // very small initial buffer
    // Write many values to force growth
    for (let i = 0; i < 100; i++) {
      writeUint32(w, i)
    }
    expect(toBytes(w).length).toBe(400)
    // Verify all values are correct
    const r = createReader(toBytes(w))
    for (let i = 0; i < 100; i++) {
      expect(readUint32(r)).toBe(i)
    }
    assertFullyConsumed(r)
  })

  it('remainingBytes tracks correctly', () => {
    const w = createWriter()
    writeUint32(w, 1)
    writeUint32(w, 2)
    const r = createReader(toBytes(w))
    expect(remainingBytes(r)).toBe(8)
    readUint32(r)
    expect(remainingBytes(r)).toBe(4)
    readUint32(r)
    expect(remainingBytes(r)).toBe(0)
    assertFullyConsumed(r)
  })

  it('assertFullyConsumed throws if bytes remain', () => {
    const w = createWriter()
    writeUint32(w, 1)
    writeUint32(w, 2)
    const r = createReader(toBytes(w))
    readUint32(r)
    expect(() => assertFullyConsumed(r)).toThrow(XdrReadError)
  })

  it('throws on buffer underflow', () => {
    const r = createReader(new Uint8Array(3)) // only 3 bytes
    expect(() => readUint32(r)).toThrow(XdrReadError) // needs 4
  })
})

describe('createReaderFromBase64', () => {
  it('creates a reader from a base64 string', () => {
    const w = createWriter()
    writeUint32(w, 42)
    const b64 = toBase64(w)
    const r = createReaderFromBase64(b64)
    expect(readUint32(r)).toBe(42)
    assertFullyConsumed(r)
  })
})

describe('toBase64', () => {
  it('returns base64 string of the written bytes', () => {
    const w = createWriter()
    writeUint32(w, 0)
    const b64 = toBase64(w)
    expect(typeof b64).toBe('string')
    expect(base64ToBytes(b64)).toEqual(new Uint8Array([0, 0, 0, 0]))
  })
})

describe('XDR wire format compliance', () => {
  it('0x00000001 decodes as int32=1', () => {
    const bytes = new Uint8Array([0x00, 0x00, 0x00, 0x01])
    expect(readInt32(createReader(bytes))).toBe(1)
  })

  it('0xffffffff decodes as int32=-1', () => {
    const bytes = new Uint8Array([0xff, 0xff, 0xff, 0xff])
    expect(readInt32(createReader(bytes))).toBe(-1)
  })

  it('0x00000005 + "Hello" + padding decodes as string "Hello"', () => {
    // XDR encoding of string "Hello":
    // length=5: 00 00 00 05
    // "Hello":  48 65 6c 6c 6f
    // padding:  00 00 00
    const bytes = new Uint8Array([
      0x00, 0x00, 0x00, 0x05, 0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x00, 0x00, 0x00,
    ])
    const r = createReader(bytes)
    expect(readString(r, 100)).toBe('Hello')
    assertFullyConsumed(r)
  })

  it('XDR bool false is 4 zero bytes', () => {
    const w = createWriter()
    writeBool(w, false)
    expect(Array.from(toBytes(w))).toEqual([0, 0, 0, 0])
  })
})

describe('depth and byte limits', () => {
  it('default limits are reasonable', () => {
    expect(DEFAULT_LIMITS.maxDepth).toBe(500)
    expect(DEFAULT_LIMITS.maxBytes).toBe(0x2000000)
  })

  it('beginComposite/endComposite track depth', () => {
    const r = createReader(new Uint8Array(0))
    expect(r.depth).toBe(0)
    beginComposite(r)
    expect(r.depth).toBe(1)
    beginComposite(r)
    expect(r.depth).toBe(2)
    endComposite(r)
    expect(r.depth).toBe(1)
    endComposite(r)
    expect(r.depth).toBe(0)
  })

  it('throws when depth limit exceeded with correct error code', () => {
    const limits: XdrLimits = { maxDepth: 2, maxBytes: 0x2000000 }
    const r = createReader(new Uint8Array(0), limits)
    beginComposite(r)
    beginComposite(r)
    try {
      beginComposite(r)
      expect.unreachable()
    } catch (e: any) {
      expect(e).toBeInstanceOf(XdrReadError)
      expect(e.code).toBe('DEPTH_LIMIT_EXCEEDED')
    }
  })

  it('throws when byte limit exceeded', () => {
    // Create a reader with a very low byte limit
    const buf = new Uint8Array(16)
    new DataView(buf.buffer).setUint32(0, 42, false)
    new DataView(buf.buffer).setUint32(4, 43, false)
    new DataView(buf.buffer).setUint32(8, 44, false)
    new DataView(buf.buffer).setUint32(12, 45, false)

    const limits: XdrLimits = { maxDepth: 500, maxBytes: 10 }
    const r = createReader(buf, limits)
    readUint32(r) // 4 bytes consumed
    readUint32(r) // 8 bytes consumed
    // Next read would push to 12 bytes, exceeding the 10-byte limit
    expect(() => readUint32(r)).toThrow(XdrReadError)
    expect(() => readUint32(r)).toThrow(/byte limit/)
  })

  it('byte tracking counts all read operations', () => {
    const w = createWriter()
    writeUint32(w, 1)
    writeInt64(w, 100n)
    writeFixedOpaque(w, new Uint8Array([1, 2, 3]), 3) // 3 bytes + 1 pad = 4 on wire
    const bytes = toBytes(w)

    const r = createReader(bytes)
    expect(r.bytesRead).toBe(0)
    readUint32(r) // 4 bytes
    expect(r.bytesRead).toBe(4)
    readInt64(r) // 8 bytes
    expect(r.bytesRead).toBe(12)
    readFixedOpaque(r, 3) // 4 bytes (3 data + 1 pad)
    expect(r.bytesRead).toBe(16)
    assertFullyConsumed(r)
  })

  it('custom limits passed through decode()', () => {
    const w = createWriter()
    writeUint32(w, 42)
    const bytes = toBytes(w)

    // Should succeed with generous limits
    expect(decode(bytes, readUint32, { maxDepth: 10, maxBytes: 100 })).toBe(42)

    // Should fail with tiny byte limit
    expect(() => decode(bytes, readUint32, { maxDepth: 10, maxBytes: 2 })).toThrow(XdrReadError)
  })

  it('depth is restored after exception (exception-safe)', () => {
    // Simulate what generated readers do: beginComposite, try { read... } finally { endComposite }
    const buf = new Uint8Array(4)
    new DataView(buf.buffer).setUint32(0, 42, false)
    const r = createReader(buf)

    expect(r.depth).toBe(0)
    beginComposite(r)
    expect(r.depth).toBe(1)

    // Simulate an error during reading inside the composite
    try {
      beginComposite(r)
      expect(r.depth).toBe(2)
      // Simulate a read that throws (e.g., buffer underflow after consuming the only 4 bytes)
      readUint32(r) // consumes the data
      try {
        readUint32(r) // should throw — no more data
      } finally {
        endComposite(r) // inner composite cleaned up even on error
      }
    } catch {
      // Expected: buffer underflow
    } finally {
      endComposite(r) // outer composite cleaned up
    }

    // Depth should be back to 0 despite the error
    expect(r.depth).toBe(0)
  })

  it('LIMITS_NONE disables all checking', () => {
    expect(LIMITS_NONE.maxDepth).toBe(Infinity)
    expect(LIMITS_NONE.maxBytes).toBe(Infinity)

    // Should never throw for depth
    const r = createReader(new Uint8Array(0), LIMITS_NONE)
    for (let i = 0; i < 1000; i++) {
      beginComposite(r)
    }
    expect(r.depth).toBe(1000) // no error

    // Should never throw for bytes — decode with unlimited limits
    const w = createWriter()
    writeUint32(w, 99)
    const bytes = toBytes(w)
    expect(decode(bytes, readUint32, LIMITS_NONE)).toBe(99)
  })
})

describe('decodeStream', () => {
  it('decodes multiple values from a concatenated stream', () => {
    const w = createWriter()
    writeUint32(w, 10)
    writeUint32(w, 20)
    writeUint32(w, 30)
    const bytes = toBytes(w)

    const values = [...decodeStream(bytes, readUint32)]
    expect(values).toEqual([10, 20, 30])
  })

  it('returns empty for empty input', () => {
    const values = [...decodeStream(new Uint8Array(0), readUint32)]
    expect(values).toEqual([])
  })

  it('works with base64 string input', () => {
    const w = createWriter()
    writeInt32(w, -1)
    writeInt32(w, 42)
    const b64 = bytesToBase64(toBytes(w))

    const values = [...decodeStream(b64, readInt32)]
    expect(values).toEqual([-1, 42])
  })

  it('yields lazily (generator)', () => {
    const w = createWriter()
    writeUint32(w, 1)
    writeUint32(w, 2)
    writeUint32(w, 3)
    const bytes = toBytes(w)

    const gen = decodeStream(bytes, readUint32)
    expect(gen.next()).toEqual({ value: 1, done: false })
    expect(gen.next()).toEqual({ value: 2, done: false })
    expect(gen.next()).toEqual({ value: 3, done: false })
    expect(gen.next()).toEqual({ value: undefined, done: true })
  })

  it('accepts custom limits', () => {
    const w = createWriter()
    writeUint32(w, 1)
    writeUint32(w, 2)
    writeUint32(w, 3)
    const bytes = toBytes(w)

    // Should fail at the 3rd value (byte limit of 10 < 12 bytes needed)
    const gen = decodeStream(bytes, readUint32, { maxDepth: 500, maxBytes: 10 })
    expect(gen.next().value).toBe(1) // 4 bytes
    expect(gen.next().value).toBe(2) // 8 bytes
    expect(() => gen.next()).toThrow(XdrReadError) // 12 bytes > 10 limit
  })
})

describe('typed error codes', () => {
  it('BUFFER_UNDERFLOW on read past end', () => {
    const r = createReader(new Uint8Array(0))
    try {
      readInt32(r)
      expect.unreachable()
    } catch (e: any) {
      expect(e.code).toBe('BUFFER_UNDERFLOW')
    }
  })

  it('INVALID_VALUE on bad bool', () => {
    const w = createWriter()
    writeUint32(w, 5) // not 0 or 1
    const r = createReader(toBytes(w))
    try {
      readBool(r)
      expect.unreachable()
    } catch (e: any) {
      expect(e.code).toBe('INVALID_VALUE')
    }
  })

  it('INVALID_VALUE on write-side range error', () => {
    const w = createWriter()
    try {
      writeInt32(w, 3e9) // exceeds int32 range
      expect.unreachable()
    } catch (e: any) {
      expect(e).toBeInstanceOf(XdrWriteError)
      expect(e.code).toBe('INVALID_VALUE')
    }
  })

  it('NON_ZERO_PADDING on bad padding bytes', () => {
    // 1-byte opaque [0xFF] followed by 3 pad bytes [0x01, 0x00, 0x00] (first pad is non-zero)
    const buf = new Uint8Array([0xff, 0x01, 0x00, 0x00])
    const r = createReader(buf)
    try {
      readFixedOpaque(r, 1)
      expect.unreachable()
    } catch (e: any) {
      expect(e.code).toBe('NON_ZERO_PADDING')
    }
  })

  it('LENGTH_EXCEEDS_MAX on var-opaque exceeding max', () => {
    const w = createWriter()
    writeUint32(w, 100) // declares 100 bytes
    const r = createReader(toBytes(w))
    try {
      readVarOpaque(r, 10) // max is 10
      expect.unreachable()
    } catch (e: any) {
      expect(e.code).toBe('LENGTH_EXCEEDS_MAX')
    }
  })

  it('LENGTH_MISMATCH on fixed array length mismatch', () => {
    const w = createWriter()
    try {
      writeFixedArray(w, [1, 2], 3, writeInt32) // 2 elements, expected 3
      expect.unreachable()
    } catch (e: any) {
      expect(e.code).toBe('LENGTH_MISMATCH')
    }
  })

  it('BUFFER_NOT_FULLY_CONSUMED on trailing bytes', () => {
    const w = createWriter()
    writeUint32(w, 42)
    writeUint32(w, 99) // extra
    const bytes = toBytes(w)
    try {
      decode(bytes, readUint32) // only reads 4 of 8 bytes
      expect.unreachable()
    } catch (e: any) {
      expect(e.code).toBe('BUFFER_NOT_FULLY_CONSUMED')
    }
  })

  it('BYTE_LIMIT_EXCEEDED on exceeding byte budget', () => {
    const w = createWriter()
    writeUint32(w, 1)
    writeUint32(w, 2)
    const r = createReader(toBytes(w), { maxDepth: 500, maxBytes: 5 })
    readUint32(r) // 4 bytes
    try {
      readUint32(r) // 8 bytes > 5
      expect.unreachable()
    } catch (e: any) {
      expect(e.code).toBe('BYTE_LIMIT_EXCEEDED')
    }
  })

  it('UTF8_ERROR on invalid UTF-8 in string', () => {
    const w = createWriter()
    writeVarOpaque(w, new Uint8Array([0xd1]), 100)
    const r = createReader(toBytes(w))
    try {
      readString(r, 100)
      expect.unreachable()
    } catch (e: any) {
      expect(e.code).toBe('UTF8_ERROR')
    }
  })
})

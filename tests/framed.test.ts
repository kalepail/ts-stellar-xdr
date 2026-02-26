import { describe, expect, it } from 'vitest'
import { bytesToBase64, decode, encode, readUint32, writeUint32 } from '../src/codec.ts'
import { decodeFramed, decodeFramedStream, encodeFramed } from '../src/framed.ts'

const LAST = 0x80000000

function fragmentHeader(length: number, isLast: boolean): Uint8Array {
  const out = new Uint8Array(4)
  const view = new DataView(out.buffer, out.byteOffset, out.byteLength)
  view.setUint32(0, (isLast ? LAST : 0) | length, false)
  return out
}

describe('framed XDR', () => {
  it('encodes and decodes a single-fragment framed value', () => {
    const framed = encodeFramed(42, writeUint32)
    const decoded = decodeFramed(framed, readUint32)
    expect(decoded).toBe(42)
  })

  it('reassembles and decodes multi-fragment framed records', () => {
    const payload = encode(0x11223344, writeUint32)
    const first = payload.subarray(0, 2)
    const second = payload.subarray(2)

    const framed = new Uint8Array(4 + first.length + 4 + second.length)
    framed.set(fragmentHeader(first.length, false), 0)
    framed.set(first, 4)
    framed.set(fragmentHeader(second.length, true), 4 + first.length)
    framed.set(second, 8 + first.length)

    expect(decodeFramed(framed, readUint32)).toBe(0x11223344)
  })

  it('decodes multiple framed records from a stream', () => {
    const a = encodeFramed(1, writeUint32)
    const b = encodeFramed(2, writeUint32)
    const c = encodeFramed(3, writeUint32)
    const stream = new Uint8Array(a.length + b.length + c.length)
    stream.set(a, 0)
    stream.set(b, a.length)
    stream.set(c, a.length + b.length)

    expect(Array.from(decodeFramedStream(stream, readUint32))).toEqual([1, 2, 3])

    const base64 = bytesToBase64(stream)
    expect(Array.from(decodeFramedStream(base64, readUint32))).toEqual([1, 2, 3])
  })

  it('rejects trailing bytes in single-record decode', () => {
    const framed = encodeFramed(7, writeUint32)
    const withTrailing = new Uint8Array(framed.length + 1)
    withTrailing.set(framed)
    withTrailing[withTrailing.length - 1] = 0xFF

    expect(() => decodeFramed(withTrailing, readUint32)).toThrow(/trailing bytes/)
  })

  it('rejects truncated framed data', () => {
    expect(() => decodeFramed(new Uint8Array([0, 0, 0]), readUint32)).toThrow(/Unexpected end/)

    const payload = encode(55, writeUint32)
    const bad = new Uint8Array(4 + payload.length - 1)
    bad.set(fragmentHeader(payload.length, true), 0)
    bad.set(payload.subarray(0, payload.length - 1), 4)
    expect(() => decodeFramed(bad, readUint32)).toThrow(/Unexpected end/)
  })

  it('works with decode() parity for payload bytes', () => {
    const payload = encode(999, writeUint32)
    const framed = encodeFramed(999, writeUint32)
    const manual = decode(payload, readUint32)
    expect(decodeFramed(framed, readUint32)).toBe(manual)
  })
})

import { describe, it, expect } from 'vitest'
import {
  sha256,
  networkId,
  Networks,
  hashTransaction,
  hashFeeBumpTransaction,
  transactionSignatureBase,
  feeBumpSignatureBase,
} from '../src/hashing.ts'
import { bytesToHex } from '../src/codec.ts'

describe('sha256', () => {
  // NIST test vectors (FIPS 180-4)
  it('hashes empty string', () => {
    const hash = sha256('')
    expect(bytesToHex(hash)).toBe(
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    )
  })

  it('hashes "abc"', () => {
    const hash = sha256('abc')
    expect(bytesToHex(hash)).toBe(
      'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    )
  })

  it('hashes "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq"', () => {
    const hash = sha256('abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq')
    expect(bytesToHex(hash)).toBe(
      '248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1',
    )
  })

  it('hashes Uint8Array input', () => {
    const data = new Uint8Array([0x61, 0x62, 0x63]) // "abc"
    const hash = sha256(data)
    expect(bytesToHex(hash)).toBe(
      'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    )
  })

  it('hashes single zero byte', () => {
    const hash = sha256(new Uint8Array([0]))
    expect(bytesToHex(hash)).toBe(
      '6e340b9cffb37a989ca544e6bb780a2c78901d3fb33738768511a30617afa01d',
    )
  })

  it('hashes 55 bytes (one block minus padding)', () => {
    // 55 bytes of 'a' — fits in one 64-byte block with padding
    const hash = sha256('a'.repeat(55))
    expect(hash.length).toBe(32)
  })

  it('hashes 56 bytes (needs two blocks)', () => {
    // 56 bytes requires a second block for the length field
    const hash = sha256('a'.repeat(56))
    expect(hash.length).toBe(32)
  })

  it('hashes 64 bytes (exactly one block of data)', () => {
    const hash = sha256('a'.repeat(64))
    expect(hash.length).toBe(32)
  })

  it('hashes longer input (1000 bytes)', () => {
    const hash = sha256('a'.repeat(1000))
    expect(bytesToHex(hash)).toBe(
      '41edece42d63e8d9bf515a9ba6932e1c20cbc9f5a5d134645adb5db1b9737ea3',
    )
  })

  it('produces deterministic output', () => {
    const a = sha256('test')
    const b = sha256('test')
    expect(bytesToHex(a)).toBe(bytesToHex(b))
  })
})

describe('networkId', () => {
  it('computes testnet network ID', () => {
    const id = networkId(Networks.TESTNET)
    expect(id.length).toBe(32)
    expect(bytesToHex(id)).toBe(
      'cee0302d59844d32bdca915c8203dd44b33fbb7edc19051ea37abedf28ecd472',
    )
  })

  it('computes public network ID', () => {
    const id = networkId(Networks.PUBLIC)
    expect(id.length).toBe(32)
    expect(bytesToHex(id)).toBe(
      '7ac33997544e3175d266bd022439b22cdb16508c01163f26e5cb2a3e1045a979',
    )
  })
})

describe('transaction hashing', () => {
  it('transactionSignatureBase produces correct structure', () => {
    // The signature base is: networkId (32 bytes) + envelopeType (4 bytes) + txXdr (N bytes)
    const txXdr = new Uint8Array([1, 2, 3, 4])
    const sigBase = transactionSignatureBase(Networks.TESTNET, txXdr)

    // Total: 32 + 4 + 4 = 40 bytes
    expect(sigBase.length).toBe(40)

    // First 32 bytes should be the testnet network ID
    const expectedNetId = networkId(Networks.TESTNET)
    expect(bytesToHex(sigBase.subarray(0, 32))).toBe(bytesToHex(expectedNetId))

    // Next 4 bytes should be ENVELOPE_TYPE_TX = 2 (big-endian)
    expect(Array.from(sigBase.subarray(32, 36))).toEqual([0, 0, 0, 2])

    // Last 4 bytes should be the tx XDR
    expect(Array.from(sigBase.subarray(36))).toEqual([1, 2, 3, 4])
  })

  it('feeBumpSignatureBase produces correct structure', () => {
    const fbXdr = new Uint8Array([5, 6, 7, 8])
    const sigBase = feeBumpSignatureBase(Networks.TESTNET, fbXdr)

    expect(sigBase.length).toBe(40)

    // Envelope type should be ENVELOPE_TYPE_TX_FEE_BUMP = 5
    expect(Array.from(sigBase.subarray(32, 36))).toEqual([0, 0, 0, 5])
  })

  it('hashTransaction returns 32-byte hash', () => {
    const txXdr = new Uint8Array(100).fill(0xaa)
    const hash = hashTransaction(Networks.TESTNET, txXdr)
    expect(hash.length).toBe(32)
  })

  it('hashFeeBumpTransaction returns 32-byte hash', () => {
    const fbXdr = new Uint8Array(100).fill(0xbb)
    const hash = hashFeeBumpTransaction(Networks.TESTNET, fbXdr)
    expect(hash.length).toBe(32)
  })

  it('different networks produce different hashes', () => {
    const txXdr = new Uint8Array(10).fill(0x42)
    const hashTestnet = hashTransaction(Networks.TESTNET, txXdr)
    const hashPublic = hashTransaction(Networks.PUBLIC, txXdr)
    expect(bytesToHex(hashTestnet)).not.toBe(bytesToHex(hashPublic))
  })

  it('different tx bodies produce different hashes', () => {
    const tx1 = new Uint8Array(10).fill(0x01)
    const tx2 = new Uint8Array(10).fill(0x02)
    const hash1 = hashTransaction(Networks.TESTNET, tx1)
    const hash2 = hashTransaction(Networks.TESTNET, tx2)
    expect(bytesToHex(hash1)).not.toBe(bytesToHex(hash2))
  })
})

describe('Networks constants', () => {
  it('has all expected networks', () => {
    expect(Networks.PUBLIC).toBe('Public Global Stellar Network ; September 2015')
    expect(Networks.TESTNET).toBe('Test SDF Network ; September 2015')
    expect(Networks.FUTURENET).toBe('Test SDF Future Network ; October 2022')
    expect(Networks.SANDBOX).toBe('Local Sandbox Stellar Network ; September 2022')
    expect(Networks.STANDALONE).toBe('Standalone Network ; February 2017')
  })
})

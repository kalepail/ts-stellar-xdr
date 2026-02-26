import { describe, it, expect } from 'vitest'
import {
  decodeTransactionEnvelope,
  encodeTransactionEnvelope,
} from '../src/generated/index.ts'
import { base64ToBytes, bytesToHex } from '../src/codec.ts'

// ---------------------------------------------------------------------------
// Test vectors: TransactionV0 envelopes (ENVELOPE_TYPE_TX_V0, discriminant 0)
// ---------------------------------------------------------------------------

const VECTOR_1 = 'AAAAAAW8Dk9idFR5Le+xi0/h/tU47bgC1YWjtPH1vIVO3BklAAAAZACoKlYAAAABAAAAAAAAAAEAAAALdmlhIGtleWJhc2UAAAAAAQAAAAAAAAAIAAAAAN7aGcXNPO36J1I8MR8S4QFhO79T5JGG2ZeS5Ka1m4mJAAAAAAAAAAFO3BklAAAAQP0ccCoeHdm3S7bOhMjXRMn3EbmETJ9glxpKUZjPSPIxpqZ7EkyTgl3FruieqpZd9LYOzdJrNik1GNBLhgTh/AU='

const VECTOR_3 = 'AAAAAMvXcdYjKhx0qxnsDsczxKuqa/65lZz6sjjHHczyh50JAAAAyAAAAAAAAAABAAAAAQAAAAAAADA5AAAAAAAA3dUAAAACAAAAAAAAAGQAAAACAAAAAAAAAAEAAAAA0pjFgVcRZZHpMgnpXHpb/xIbLh0/YYto0PzI7+Xl5HAAAAAAAAAAAlQL5AAAAAAAAAAACgAAAAVoZWxsbwAAAAAAAAEAAAAFd29ybGQAAAAAAAAAAAAAAvKHnQkAAABAM4dg0J1LEFBmbDESJ5d+60WCuZC8lnA80g45qyEgz2oRBSNw1mOfZETnL/BgrebkG/K03oI2Wqcs9lvDKrDGDE0sOBsAAAAglOgiOlGKwWqMsRCrGVLvFNosELJkZFw4yLPYK9KyAAA='

const VECTOR_5 = 'AAAAAAtjwtJadppTmm0NtAU99BFxXXfzPO1N/SqR43Z8aXqXAAAAZAAIj6YAAAACAAAAAAAAAAEAAAAB0QAAAAAAAAEAAAAAAAAAAQAAAADLa6390PDAqg3qDLpshQxS+uVw3ytSgKRirQcInPWt1QAAAAAAAAAAA1Z+AAAAAAAAAAABfGl6lwAAAEBC655+8Izq54MIZrXTVF/E1ycHgQWpVcBD+LFkuOjjJd995u/7wM8sFqQqambL0/ME2FTOtxMO65B9i3eAIu4P'

const VECTOR_7 = 'AAAAAM9F7Tfw6sERTpL2CzwVNyKBeJBnQcPOTI/MW0CElHynAAAAyAAIteYAAAAHAAAAAAAAAAAAAAABAAAAAAAAAAMAAAAAAAAAAUVVUgAAAAAAUtYuFczBLlsXyEp3q8BbTBpEGINWahqkFbnTPd93YUUAAAAXSHboAAAAABEAACcQAAAAAAAAAKIAAAAAAAAAAcLYgCAAAABAo2tU6n0Bb7bbbpaXacVeaTVbxNMBtnrrXVk2QAOje2Flllk/ORlmQdFU/9c8z43eWh1RNMpI3PscY+yDCnJPBQ=='

// ---------------------------------------------------------------------------
// Helper to narrow the decoded envelope to the V0 variant
// ---------------------------------------------------------------------------
function decodeV0(xdrBase64: string) {
  const envelope = decodeTransactionEnvelope(xdrBase64)
  if (envelope.type !== 'ENVELOPE_TYPE_TX_V0') {
    throw new Error(`Expected ENVELOPE_TYPE_TX_V0 but got ${envelope.type}`)
  }
  return envelope
}

// ===========================================================================
// Vector 1: Payment + Account Merge + Text Memo
// ===========================================================================
describe('Vector 1 — Account Merge with Text Memo', () => {
  it('decodes and verifies fields', () => {
    const envelope = decodeV0(VECTOR_1)
    const tx = envelope.v0.tx

    // Envelope type
    expect(envelope.type).toBe('ENVELOPE_TYPE_TX_V0')

    // Fee: 100 stroops
    expect(tx.fee).toBe(100)

    // Sequence number
    expect(tx.seqNum).toBe(47334344942944257n)

    // Memo: Text "via keybase"
    expect(tx.memo.type).toBe('MEMO_TEXT')
    if (tx.memo.type === 'MEMO_TEXT') {
      expect(tx.memo.text).toBe('via keybase')
    }

    // No time bounds
    expect(tx.timeBounds).toBeUndefined()

    // 1 operation: ACCOUNT_MERGE
    expect(tx.operations).toHaveLength(1)
    const op = tx.operations[0]!
    expect(op.body.type).toBe('ACCOUNT_MERGE')

    // 1 signature
    expect(envelope.v0.signatures).toHaveLength(1)
  })

  it('round-trips byte-for-byte', () => {
    const input = base64ToBytes(VECTOR_1)
    const decoded = decodeTransactionEnvelope(input)
    const reencoded = encodeTransactionEnvelope(decoded)
    expect(bytesToHex(reencoded)).toBe(bytesToHex(input))
  })
})

// ===========================================================================
// Vector 3: Payment + ManageData (2 operations, ID Memo)
// ===========================================================================
describe('Vector 3 — Payment + ManageData with ID Memo', () => {
  it('decodes and verifies fields', () => {
    const envelope = decodeV0(VECTOR_3)
    const tx = envelope.v0.tx

    // Envelope type
    expect(envelope.type).toBe('ENVELOPE_TYPE_TX_V0')

    // Fee: 200 stroops
    expect(tx.fee).toBe(200)

    // Sequence number: 1
    expect(tx.seqNum).toBe(1n)

    // Memo: MEMO_ID with id = 100
    expect(tx.memo.type).toBe('MEMO_ID')
    if (tx.memo.type === 'MEMO_ID') {
      expect(tx.memo.id).toBe(100n)
    }

    // Time bounds present
    expect(tx.timeBounds).toBeDefined()
    if (tx.timeBounds) {
      expect(tx.timeBounds.minTime).toBe(12345n)
      expect(tx.timeBounds.maxTime).toBe(56789n)
    }

    // 2 operations
    expect(tx.operations).toHaveLength(2)

    // First operation: PAYMENT
    const op1 = tx.operations[0]!
    expect(op1.body.type).toBe('PAYMENT')
    if (op1.body.type === 'PAYMENT') {
      // Verify the payment amount (raw int64 value)
      expect(op1.body.paymentOp.amount).toBe(10000000000n)
    }

    // Second operation: MANAGE_DATA
    const op2 = tx.operations[1]!
    expect(op2.body.type).toBe('MANAGE_DATA')
    if (op2.body.type === 'MANAGE_DATA') {
      expect(op2.body.manageDataOp.dataName).toBe('hello')
      // dataValue is optional; when present it's a Uint8Array
      expect(op2.body.manageDataOp.dataValue).toBeDefined()
      if (op2.body.manageDataOp.dataValue) {
        const valueStr = new TextDecoder().decode(op2.body.manageDataOp.dataValue)
        expect(valueStr).toBe('world')
      }
    }

    // 2 signatures
    expect(envelope.v0.signatures).toHaveLength(2)
  })

  it('round-trips byte-for-byte', () => {
    const input = base64ToBytes(VECTOR_3)
    const decoded = decodeTransactionEnvelope(input)
    const reencoded = encodeTransactionEnvelope(decoded)
    expect(bytesToHex(reencoded)).toBe(bytesToHex(input))
  })
})

// ===========================================================================
// Vector 5: Payment (PUBLIC network, non-UTF8 memo)
// ===========================================================================
describe('Vector 5 — Payment with non-UTF8 memo byte', () => {
  it('rejects invalid UTF-8 in memo text', () => {
    // 0xD1 is an incomplete UTF-8 multi-byte sequence.
    // TextDecoder with { fatal: true } correctly throws instead of
    // silently replacing with U+FFFD.
    expect(() => decodeV0(VECTOR_5)).toThrow()
  })
})

// ===========================================================================
// Vector 7: ManageSellOffer (EUR asset)
// ===========================================================================
describe('Vector 7 — ManageSellOffer with EUR asset', () => {
  it('decodes and verifies fields', () => {
    const envelope = decodeV0(VECTOR_7)
    const tx = envelope.v0.tx

    // Envelope type
    expect(envelope.type).toBe('ENVELOPE_TYPE_TX_V0')

    // Fee: 200 stroops
    expect(tx.fee).toBe(200)

    // No memo (MEMO_NONE)
    expect(tx.memo.type).toBe('MEMO_NONE')

    // No time bounds
    expect(tx.timeBounds).toBeUndefined()

    // 1 operation: MANAGE_SELL_OFFER
    expect(tx.operations).toHaveLength(1)
    const op = tx.operations[0]!
    expect(op.body.type).toBe('MANAGE_SELL_OFFER')

    if (op.body.type === 'MANAGE_SELL_OFFER') {
      const offer = op.body.manageSellOfferOp

      // Selling: Native asset
      expect(offer.selling.type).toBe('ASSET_TYPE_NATIVE')

      // Buying: EUR (ASSET_TYPE_CREDIT_ALPHANUM4)
      expect(offer.buying.type).toBe('ASSET_TYPE_CREDIT_ALPHANUM4')
      if (offer.buying.type === 'ASSET_TYPE_CREDIT_ALPHANUM4') {
        // AssetCode4 is a 4-byte Uint8Array; "EUR" is 3 chars + 1 null byte
        const assetCode = offer.buying.alphaNum4.assetCode
        expect(assetCode).toBeInstanceOf(Uint8Array)
        expect(assetCode.length).toBe(4)
        // First 3 bytes are 'E', 'U', 'R'; last byte is 0x00
        const assetCodeStr = new TextDecoder().decode(assetCode).replace(/\0+$/, '')
        expect(assetCodeStr).toBe('EUR')
      }
    }

    // 1 signature
    expect(envelope.v0.signatures).toHaveLength(1)
  })

  it('round-trips byte-for-byte', () => {
    const input = base64ToBytes(VECTOR_7)
    const decoded = decodeTransactionEnvelope(input)
    const reencoded = encodeTransactionEnvelope(decoded)
    expect(bytesToHex(reencoded)).toBe(bytesToHex(input))
  })
})

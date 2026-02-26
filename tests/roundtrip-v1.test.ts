import { describe, it, expect } from 'vitest'
import { decodeTransactionEnvelope, encodeTransactionEnvelope } from '../src/generated/index.ts'
import { base64ToBytes, bytesToHex } from '../src/codec.ts'

// ---------------------------------------------------------------------------
// Vector 4: Payment (V1, ID Memo)
// ---------------------------------------------------------------------------
const VECTOR_4_BASE64 =
  'AAAAAgAAAADL13HWIyocdKsZ7A7HM8Srqmv+uZWc+rI4xx3M8oedCQAAAMgAAAAAAAAAAQAAAAEAAAAAAAAwOQAAAAAAAN3VAAAAAgAAAAAAAABkAAAAAQAAAAAAAAABAAAAANKYxYFXEWWR6TIJ6Vx6W/8SGy4dP2GLaND8yO/l5eRwAAAAAAAAAAJUC+QAAAAAAAAAAAHyh50JAAAAQCXOQnmno3he687bKRtDc6+BXRUf8t+RnTuHy+sKf35UjfFiQbIge+txehmg0N61JsFWfwbL0JtgOjzyeZw5JAs='

describe('Vector 4: Payment (V1, ID Memo)', () => {
  it('decodes and verifies fields', () => {
    const input = base64ToBytes(VECTOR_4_BASE64)
    const envelope = decodeTransactionEnvelope(input)

    // Envelope type
    expect(envelope.type).toBe('ENVELOPE_TYPE_TX')
    if (envelope.type !== 'ENVELOPE_TYPE_TX') throw new Error('wrong type')

    const tx = envelope.v1.tx

    // Fee
    expect(tx.fee).toBe(200)

    // Sequence number
    expect(tx.seqNum).toBe(1n)

    // Source account is KEY_TYPE_ED25519
    expect(tx.sourceAccount.type).toBe('KEY_TYPE_ED25519')

    // Memo: MEMO_ID
    expect(tx.memo.type).toBe('MEMO_ID')
    if (tx.memo.type === 'MEMO_ID') {
      expect(typeof tx.memo.id).toBe('bigint')
    }

    // Preconditions: PRECOND_TIME with timeBounds
    expect(tx.cond.type).toBe('PRECOND_TIME')
    if (tx.cond.type === 'PRECOND_TIME') {
      expect(tx.cond.timeBounds.minTime).toBe(12345n)
      expect(tx.cond.timeBounds.maxTime).toBe(56789n)
    }

    // 1 operation: PAYMENT
    expect(tx.operations.length).toBe(1)
    const op = tx.operations[0]!
    expect(op.body.type).toBe('PAYMENT')
    if (op.body.type === 'PAYMENT') {
      // Payment amount is an int64 (bigint)
      expect(typeof op.body.paymentOp.amount).toBe('bigint')
      // Destination is a MuxedAccount
      expect(op.body.paymentOp.destination.type).toBe('KEY_TYPE_ED25519')
      // Asset is native (XLM)
      expect(op.body.paymentOp.asset.type).toBe('ASSET_TYPE_NATIVE')
    }

    // 1 signature
    expect(envelope.v1.signatures.length).toBe(1)
    // Signature hint is 4 bytes
    expect(envelope.v1.signatures[0]!.hint.length).toBe(4)
    // Signature is a variable-length opaque
    expect(envelope.v1.signatures[0]!.signature.length).toBeGreaterThan(0)
  })

  it('round-trips byte-for-byte', () => {
    const input = base64ToBytes(VECTOR_4_BASE64)
    const decoded = decodeTransactionEnvelope(input)
    const reencoded = encodeTransactionEnvelope(decoded)
    expect(bytesToHex(reencoded)).toBe(bytesToHex(input))
  })
})

// ---------------------------------------------------------------------------
// Vector 6: CreateAccount (Muxed Account source)
// ---------------------------------------------------------------------------
const VECTOR_6_BASE64 =
  'AAAAAgAAAABg/GhKJU5ut52ih6Klx0ymGvsac1FPJig1CHYqyesIHQAAJxACBmMCAAAADgAAAAAAAAABAAAAATMAAAAAAAABAAAAAQAAAABg/GhKJU5ut52ih6Klx0ymGvsac1FPJig1CHYqyesIHQAAAAAAAAAAqdkSiA5dzNXstOtkPkHd6dAMPMA+MSXwK8OlrAGCKasAAAAAAcnDgAAAAAAAAAAByesIHQAAAEAuLrTfW6D+HYlUD9y+JolF1qrb40hIRATzsQaQjchKJuhOZJjLO0d7oaTD3JZ4UL4vVKtV7TvV17rQgCQnuz8F'

describe('Vector 6: CreateAccount (Muxed Account source)', () => {
  it('decodes and verifies fields', () => {
    const input = base64ToBytes(VECTOR_6_BASE64)
    const envelope = decodeTransactionEnvelope(input)

    // Envelope type
    expect(envelope.type).toBe('ENVELOPE_TYPE_TX')
    if (envelope.type !== 'ENVELOPE_TYPE_TX') throw new Error('wrong type')

    const tx = envelope.v1.tx

    // Fee: 10000 stroops
    expect(tx.fee).toBe(10000)

    // Source account is KEY_TYPE_ED25519
    expect(tx.sourceAccount.type).toBe('KEY_TYPE_ED25519')

    // Memo: MEMO_TEXT with text "3"
    expect(tx.memo.type).toBe('MEMO_TEXT')
    if (tx.memo.type === 'MEMO_TEXT') {
      expect(tx.memo.text).toBe('3')
    }

    // 1 operation: CREATE_ACCOUNT
    expect(tx.operations.length).toBe(1)
    const op = tx.operations[0]!
    expect(op.body.type).toBe('CREATE_ACCOUNT')
    if (op.body.type === 'CREATE_ACCOUNT') {
      // startingBalance is int64 (bigint)
      expect(typeof op.body.createAccountOp.startingBalance).toBe('bigint')
      // destination is an AccountID (PublicKey)
      expect(op.body.createAccountOp.destination.type).toBe('PUBLIC_KEY_TYPE_ED25519')
    }

    // The operation has a source account set (optional MuxedAccount)
    expect(op.sourceAccount).toBeDefined()
    if (op.sourceAccount) {
      expect(op.sourceAccount.type).toBe('KEY_TYPE_ED25519')
    }

    // 1 signature
    expect(envelope.v1.signatures.length).toBe(1)
    expect(envelope.v1.signatures[0]!.hint.length).toBe(4)
    expect(envelope.v1.signatures[0]!.signature.length).toBeGreaterThan(0)
  })

  it('round-trips byte-for-byte', () => {
    const input = base64ToBytes(VECTOR_6_BASE64)
    const decoded = decodeTransactionEnvelope(input)
    const reencoded = encodeTransactionEnvelope(decoded)
    expect(bytesToHex(reencoded)).toBe(bytesToHex(input))
  })
})

// ---------------------------------------------------------------------------
// Vector 8: Multiple ManageSellOffer/ManageBuyOffer operations (4 ops)
// ---------------------------------------------------------------------------
const VECTOR_8_BASE64 =
  'AAAAAgAAAADxGS0kRRx+iZ9m4JtNZSt/ha/nkW3yPY9XSodWWcTM7gAAAZAAAyJ3AAKKZAAAAAEAAAAAAAAAAAAAAABpn20uAAAAAAAAAAQAAAAAAAAADAAAAAAAAAABRVVSTAAAAACScRGjWxs3ha0UYqdUxCzKx+949i2LgtJ4WlZ3dxY6RwAAAAAABcmvBC0MowCYloAAAAAAAACHfAAAAAAAAAAMAAAAAAAAAAFFVVJMAAAAAJJxEaNbGzeFrRRip1TELMrH73j2LYuC0nhaVnd3FjpHAAAAAAAFyYIAKsQpAAYagAAAAAAAAId0AAAAAAAAAAMAAAABRVVSTAAAAACScRGjWxs3ha0UYqdUxCzKx+949i2LgtJ4WlZ3dxY6RwAAAAAAAAAAAASgeAAKw/EAAYagAAAAAAAAh3cAAAAAAAAAAwAAAAFFVVJMAAAAAJJxEaNbGzeFrRRip1TELMrH73j2LYuC0nhaVnd3FjpHAAAAAAAAAAAABJYlANdJUQAehIAAAAAAAACHhQAAAAAAAAABWcTM7gAAAEBxu0/q1lJYa6nsqMZfCrtloCifvGFPJE/ghbK6KOC23KyMtj34K7/45G9KDcvvRv6zyu6Pj9ZL+OpzDYNVO/IB'

describe('Vector 8: Multiple ManageSellOffer/ManageBuyOffer (4 ops)', () => {
  it('decodes and verifies fields', () => {
    const input = base64ToBytes(VECTOR_8_BASE64)
    const envelope = decodeTransactionEnvelope(input)

    // Envelope type
    expect(envelope.type).toBe('ENVELOPE_TYPE_TX')
    if (envelope.type !== 'ENVELOPE_TYPE_TX') throw new Error('wrong type')

    const tx = envelope.v1.tx

    // Fee: 400 stroops (100 per op x 4)
    expect(tx.fee).toBe(400)

    // Source account is KEY_TYPE_ED25519
    expect(tx.sourceAccount.type).toBe('KEY_TYPE_ED25519')

    // Memo: MEMO_NONE
    expect(tx.memo.type).toBe('MEMO_NONE')

    // Preconditions: PRECOND_TIME with timeBounds (maxTime non-zero)
    expect(tx.cond.type).toBe('PRECOND_TIME')
    if (tx.cond.type === 'PRECOND_TIME') {
      expect(tx.cond.timeBounds.minTime).toBe(0n)
      expect(tx.cond.timeBounds.maxTime).toBeGreaterThan(0n)
    }

    // 4 operations
    expect(tx.operations.length).toBe(4)

    // Collect operation types
    const opTypes = tx.operations.map((op) => op.body.type)

    // Should contain MANAGE_BUY_OFFER (discriminant 12) and/or MANAGE_SELL_OFFER (discriminant 3)
    const manageOfferTypes = opTypes.filter(
      (t) => t === 'MANAGE_SELL_OFFER' || t === 'MANAGE_BUY_OFFER',
    )
    expect(manageOfferTypes.length).toBe(4)

    // Ops 0,1 are MANAGE_BUY_OFFER; Ops 2,3 are MANAGE_SELL_OFFER
    expect(opTypes[0]).toBe('MANAGE_BUY_OFFER')
    expect(opTypes[1]).toBe('MANAGE_BUY_OFFER')
    expect(opTypes[2]).toBe('MANAGE_SELL_OFFER')
    expect(opTypes[3]).toBe('MANAGE_SELL_OFFER')

    // Helper to extract asset code string from a credit alphanum4 asset
    const assetCodeStr = (assetCode: Uint8Array) =>
      new TextDecoder().decode(assetCode).replaceAll('\u0000', '')

    // Verify each operation involves EURL (ASSET_TYPE_CREDIT_ALPHANUM4)
    for (const op of tx.operations) {
      if (op.body.type === 'MANAGE_BUY_OFFER') {
        const offer = op.body.manageBuyOfferOp
        // buying is EURL, selling is native
        expect(offer.selling.type).toBe('ASSET_TYPE_NATIVE')
        expect(offer.buying.type).toBe('ASSET_TYPE_CREDIT_ALPHANUM4')
        if (offer.buying.type === 'ASSET_TYPE_CREDIT_ALPHANUM4') {
          expect(assetCodeStr(offer.buying.alphaNum4.assetCode)).toBe('EURL')
        }
      } else if (op.body.type === 'MANAGE_SELL_OFFER') {
        const offer = op.body.manageSellOfferOp
        // selling is EURL, buying is native
        expect(offer.selling.type).toBe('ASSET_TYPE_CREDIT_ALPHANUM4')
        expect(offer.buying.type).toBe('ASSET_TYPE_NATIVE')
        if (offer.selling.type === 'ASSET_TYPE_CREDIT_ALPHANUM4') {
          expect(assetCodeStr(offer.selling.alphaNum4.assetCode)).toBe('EURL')
        }
      }
    }

    // 1 signature
    expect(envelope.v1.signatures.length).toBe(1)
    expect(envelope.v1.signatures[0]!.hint.length).toBe(4)
    expect(envelope.v1.signatures[0]!.signature.length).toBeGreaterThan(0)
  })

  it('round-trips byte-for-byte', () => {
    const input = base64ToBytes(VECTOR_8_BASE64)
    const decoded = decodeTransactionEnvelope(input)
    const reencoded = encodeTransactionEnvelope(decoded)
    expect(bytesToHex(reencoded)).toBe(bytesToHex(input))
  })
})

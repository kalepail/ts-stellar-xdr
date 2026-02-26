import { describe, it, expect } from 'vitest'
import {
  decodeTransactionEnvelope,
  encodeTransactionEnvelope,
  type TransactionEnvelope,
  type FeeBumpTransactionEnvelope,
} from '../src/generated/index.ts'
import { bytesToBase64, base64ToBytes, bytesToHex } from '../src/codec.ts'

// ---------------------------------------------------------------------------
// Vector 2: Fee Bump wrapping Payment + Text Memo
// ---------------------------------------------------------------------------
const VECTOR_2_BASE64 =
  'AAAABQAAAADgSJG2GOUMy/H9lHyjYZOwyuyytH8y0wWaoc596L+bEgAAAAAAAADIAAAAAgAAAABzdv3ojkzWHMD7KUoXhrPx0GH18vHKV0ZfqpMiEblG1gAAAGQAAAAAAAAACAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAA9IYXBweSBiaXJ0aGRheSEAAAAAAQAAAAAAAAABAAAAAOBIkbYY5QzL8f2UfKNhk7DK7LK0fzLTBZqhzn3ov5sSAAAAAAAAAASoF8gAAAAAAAAAAAERuUbWAAAAQK933Dnt1pxXlsf1B5CYn81PLxeYsx+MiV9EGbMdUfEcdDWUySyIkdzJefjpR5ejdXVp/KXosGmNUQ+DrIBlzg0AAAAAAAAAAei/mxIAAABAijIIQpL6KlFefiL4FP8UWQktWEz4wFgGNSaXe7mZdVMuiREntehi1b7MRqZ1h+W+Y0y+Z2HtMunsilT2yS5mAA=='

describe('Vector 2: Fee Bump wrapping Payment + Text Memo', () => {
  it('decodes and verifies fields', () => {
    const input = base64ToBytes(VECTOR_2_BASE64)
    const envelope = decodeTransactionEnvelope(input)

    // Outer envelope type is ENVELOPE_TYPE_TX_FEE_BUMP (discriminant 5)
    expect(envelope.type).toBe('ENVELOPE_TYPE_TX_FEE_BUMP')
    if (envelope.type !== 'ENVELOPE_TYPE_TX_FEE_BUMP') throw new Error('wrong type')

    const feeBumpEnv = envelope.feeBump
    const feeBumpTx = feeBumpEnv.tx

    // Fee bump outer fee: 200 stroops (int64/bigint)
    expect(feeBumpTx.fee).toBe(200n)

    // Fee bump source is a MuxedAccount with KEY_TYPE_ED25519
    expect(feeBumpTx.feeSource.type).toBe('KEY_TYPE_ED25519')

    // Inner tx is ENVELOPE_TYPE_TX (V1)
    expect(feeBumpTx.innerTx.type).toBe('ENVELOPE_TYPE_TX')
    if (feeBumpTx.innerTx.type !== 'ENVELOPE_TYPE_TX') throw new Error('wrong inner type')

    const innerEnv = feeBumpTx.innerTx.v1
    const innerTx = innerEnv.tx

    // Inner fee: 100 stroops (uint32/number)
    expect(innerTx.fee).toBe(100)

    // Inner source account is KEY_TYPE_ED25519
    expect(innerTx.sourceAccount.type).toBe('KEY_TYPE_ED25519')

    // Inner memo: MEMO_TEXT with text "Happy birthday!"
    expect(innerTx.memo.type).toBe('MEMO_TEXT')
    if (innerTx.memo.type === 'MEMO_TEXT') {
      expect(innerTx.memo.text).toBe('Happy birthday!')
    }

    // 1 operation: PAYMENT
    expect(innerTx.operations.length).toBe(1)
    const op = innerTx.operations[0]!
    expect(op.body.type).toBe('PAYMENT')
    if (op.body.type === 'PAYMENT') {
      // Payment destination is a MuxedAccount
      expect(op.body.paymentOp.destination.type).toBe('KEY_TYPE_ED25519')
      // Payment asset is native (XLM)
      expect(op.body.paymentOp.asset.type).toBe('ASSET_TYPE_NATIVE')
      // Payment amount is int64 (bigint)
      expect(typeof op.body.paymentOp.amount).toBe('bigint')
    }

    // Inner tx has 1 signature
    expect(innerEnv.signatures.length).toBe(1)
    expect(innerEnv.signatures[0]!.hint.length).toBe(4)
    expect(innerEnv.signatures[0]!.signature.length).toBeGreaterThan(0)

    // Outer envelope has 1 signature (2 total: 1 inner + 1 outer)
    expect(feeBumpEnv.signatures.length).toBe(1)
    expect(feeBumpEnv.signatures[0]!.hint.length).toBe(4)
    expect(feeBumpEnv.signatures[0]!.signature.length).toBeGreaterThan(0)

    // Extension is v0
    expect(feeBumpTx.ext.v).toBe(0)
  })

  it('round-trips byte-for-byte', () => {
    const input = base64ToBytes(VECTOR_2_BASE64)
    const decoded = decodeTransactionEnvelope(input)
    const reencoded = encodeTransactionEnvelope(decoded)
    expect(bytesToHex(reencoded)).toBe(bytesToHex(input))
  })
})

// ---------------------------------------------------------------------------
// Vector 9: Fee Bump + Soroban InvokeHostFunction (Mainnet)
// ---------------------------------------------------------------------------
const VECTOR_9_BASE64 =
  'AAAABQAAAAA0mMHF8QGzwsMRBhe9i8PSIqxjNjKyQMyXZODBAdhAUwAAAAAAAJaFAAAAAgAAAAArOdNmuFndZlOiXz2U1me/szlasdfKtpxFjxxFm5MH2AAAlb0DmM8lAAIt5AAAAAEAAAAAAAAAAAAAAABpn2w2AAAAAAAAAAEAAAAAAAAAGAAAAAAAAAAB1/5EvQrxHWArEJHy9KH03yEtRE0DIeoyrbPMHLurCgQAAAAFcGxhbnQAAAAAAAACAAAAEgAAAAAAAAAAeg4yv0R91ov5JEHdLIsQo/u6HJ7cHOqHfn6Q+IOCkWAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAAAAAAB6DjK/RH3Wi/kkQd0sixCj+7ocntwc6od+fpD4g4KRYCZZTJ20PT2NA6jdUgAAABAAAAABAAAAAQAAABEAAAABAAAAAgAAAA8AAAAKcHVibGljX2tleQAAAAAADQAAACB6DjK/RH3Wi/kkQd0sixCj+7ocntwc6od+fpD4g4KRYAAAAA8AAAAJc2lnbmF0dXJlAAAAAAAADQAAAEBdvOebnf3URBY0n5vvQW3r8IisXPSIbY+Z9zYNGoskzsBAZRTgsBTI7Cyr0J+yK7RCq/cram36oKbtLmLcOQwLAAAAAAAAAAHX/kS9CvEdYCsQkfL0ofTfIS1ETQMh6jKts8wcu6sKBAAAAAVwbGFudAAAAAAAAAIAAAASAAAAAAAAAAB6DjK/RH3Wi/kkQd0sixCj+7ocntwc6od+fpD4g4KRYAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAgAAAAAAAAAAeg4yv0R91ov5JEHdLIsQo/u6HJ7cHOqHfn6Q+IOCkWAAAAAH2ywUKQ1JZOOAXyUn3RMpObpfs/zKxWswv6uP0JEBFicAAAAEAAAABgAAAAAAAAAAeg4yv0R91ov5JEHdLIsQo/u6HJ7cHOqHfn6Q+IOCkWAAAAAVJllMnbQ9PY0AAAAAAAAABgAAAAHX/kS9CvEdYCsQkfL0ofTfIS1ETQMh6jKts8wcu6sKBAAAABAAAAABAAAAAgAAAA8AAAAFQmxvY2sAAAAAAAADAAH1awAAAAAAAAAGAAAAAdf+RL0K8R1gKxCR8vSh9N8hLURNAyHqMq2zzBy7qwoEAAAAEAAAAAEAAAADAAAADwAAAARQYWlsAAAAEgAAAAAAAAAAeg4yv0R91ov5JEHdLIsQo/u6HJ7cHOqHfn6Q+IOCkWAAAAADAAH1awAAAAAAAAAGAAAAAdf+RL0K8R1gKxCR8vSh9N8hLURNAyHqMq2zzBy7qwoEAAAAFAAAAAEAH6YZAAAAkAAABgwAAAAAAACVWQAAAAGbkwfYAAAAQDs9q26j96S3RsYg8RW1gZnjtG3Vl4v5z1AqCmlnRbf8mJh/+aLdjqCFNR9QyOJkNbECMrw9701azhl3OJrEGwAAAAAAAAAAAQHYQFMAAABARDC+umTxL36WNlwakNjpSqB3ServHNkenNLNLGZTixKZkhnFqkUwBIpXsH1ti4uKprOknjJmeXfAsIWazepWCQ=='

describe('Vector 9: Fee Bump + Soroban InvokeHostFunction (Mainnet)', () => {
  it('decodes and verifies fields', () => {
    const input = base64ToBytes(VECTOR_9_BASE64)
    const envelope = decodeTransactionEnvelope(input)

    // Outer envelope type is ENVELOPE_TYPE_TX_FEE_BUMP (discriminant 5)
    expect(envelope.type).toBe('ENVELOPE_TYPE_TX_FEE_BUMP')
    if (envelope.type !== 'ENVELOPE_TYPE_TX_FEE_BUMP') throw new Error('wrong type')

    const feeBumpEnv = envelope.feeBump
    const feeBumpTx = feeBumpEnv.tx

    // Fee bump source is KEY_TYPE_ED25519
    expect(feeBumpTx.feeSource.type).toBe('KEY_TYPE_ED25519')

    // Fee is a bigint
    expect(typeof feeBumpTx.fee).toBe('bigint')

    // Inner tx is ENVELOPE_TYPE_TX (V1)
    expect(feeBumpTx.innerTx.type).toBe('ENVELOPE_TYPE_TX')
    if (feeBumpTx.innerTx.type !== 'ENVELOPE_TYPE_TX') throw new Error('wrong inner type')

    const innerEnv = feeBumpTx.innerTx.v1
    const innerTx = innerEnv.tx

    // Inner source account is KEY_TYPE_ED25519
    expect(innerTx.sourceAccount.type).toBe('KEY_TYPE_ED25519')

    // 1 operation: INVOKE_HOST_FUNCTION (Soroban, opType 24)
    expect(innerTx.operations.length).toBe(1)
    const op = innerTx.operations[0]!
    expect(op.body.type).toBe('INVOKE_HOST_FUNCTION')
    if (op.body.type === 'INVOKE_HOST_FUNCTION') {
      const ihfOp = op.body.invokeHostFunctionOp

      // Host function type is HOST_FUNCTION_TYPE_INVOKE_CONTRACT
      expect(ihfOp.hostFunction.type).toBe('HOST_FUNCTION_TYPE_INVOKE_CONTRACT')

      // Has auth entries
      expect(ihfOp.auth.length).toBeGreaterThan(0)

      // First auth entry has SOROBAN_CREDENTIALS_ADDRESS credentials
      expect(ihfOp.auth[0]!.credentials.type).toBe('SOROBAN_CREDENTIALS_ADDRESS')
    }

    // Inner tx ext has sorobanData (v=1)
    expect(innerTx.ext.v).toBe(1)
    if (innerTx.ext.v === 1) {
      // SorobanTransactionData is present
      expect(innerTx.ext.sorobanData).toBeDefined()
    }

    // Inner tx has 1 signature
    expect(innerEnv.signatures.length).toBe(1)

    // Outer envelope has 1 signature
    expect(feeBumpEnv.signatures.length).toBe(1)

    // Extension is v0
    expect(feeBumpTx.ext.v).toBe(0)
  })

  it('round-trips byte-for-byte', () => {
    const input = base64ToBytes(VECTOR_9_BASE64)
    const decoded = decodeTransactionEnvelope(input)
    const reencoded = encodeTransactionEnvelope(decoded)
    expect(bytesToHex(reencoded)).toBe(bytesToHex(input))
  })
})

// ---------------------------------------------------------------------------
// Vector 10: Fee Bump + Soroban with Ed25519 Auth (Mainnet)
// ---------------------------------------------------------------------------
const VECTOR_10_BASE64 =
  'AAAABQAAAAA0mMHF8QGzwsMRBhe9i8PSIqxjNjKyQMyXZODBAdhAUwAAAAAAAJZdAAAAAgAAAADmBAd5om7t+z4XPied7PmLRO7GwOxyxnro5Qqv3qz1/gAAlZUDooSxAADUZQAAAAEAAAAAAAAAAAAAAABpn2w8AAAAAAAAAAEAAAAAAAAAGAAAAAAAAAAB1/5EvQrxHWArEJHy9KH03yEtRE0DIeoyrbPMHLurCgQAAAAFcGxhbnQAAAAAAAACAAAAEgAAAAG9neAOcdjepHsFb6XhGXMu+ovAuLMRV7ccU9dKx53/bwAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABvZ3gDnHY3qR7BW+l4RlzLvqLwLizEVe3HFPXSsed/28xfN6/Rf9kCQOo3UwAAAAQAAAAAQAAAAEAAAARAAAAAQAAAAEAAAAQAAAAAQAAAAIAAAAPAAAAB0VkMjU1MTkAAAAADQAAACAKcb1G1C+ZByDBpYeQjtP+EcTaQxI5AINFH5hHlotXLAAAABAAAAABAAAAAgAAAA8AAAAHRWQyNTUxOQAAAAANAAAAQLJVQ46c6OSyRf5vVKKece9gxXZzqAOwTm4b17LfBI7zz65j0OhRAI3ng6Z4vmpmAvU+H5DgMHDJeizsklWmNwMAAAAAAAAAAdf+RL0K8R1gKxCR8vSh9N8hLURNAyHqMq2zzBy7qwoEAAAABXBsYW50AAAAAAAAAgAAABIAAAABvZ3gDnHY3qR7BW+l4RlzLvqLwLizEVe3HFPXSsed/28AAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAQAAAAGAAAAAb2d4A5x2N6kewVvpeEZcy76i8C4sxFXtxxT10rHnf9vAAAAEAAAAAEAAAACAAAADwAAAAdFZDI1NTE5AAAAAA0AAAAgCnG9RtQvmQcgwaWHkI7T/hHE2kMSOQCDRR+YR5aLVywAAAAAAAAABgAAAAG9neAOcdjepHsFb6XhGXMu+ovAuLMRV7ccU9dKx53/bwAAABQAAAABAAAAB9ssFCkNSWTjgF8lJ90TKTm6X7P8ysVrML+rj9CRARYnAAAAB+zZkPC0XKaBcUm2F195sy77RC81cxmFoIQTHoJlxM2QAAAABAAAAAYAAAABvZ3gDnHY3qR7BW+l4RlzLvqLwLizEVe3HFPXSsed/28AAAAVMXzev0X/ZAkAAAAAAAAABgAAAAHX/kS9CvEdYCsQkfL0ofTfIS1ETQMh6jKts8wcu6sKBAAAABAAAAABAAAAAgAAAA8AAAAFQmxvY2sAAAAAAAADAAH1awAAAAAAAAAGAAAAAdf+RL0K8R1gKxCR8vSh9N8hLURNAyHqMq2zzBy7qwoEAAAAEAAAAAEAAAADAAAADwAAAARQYWlsAAAAEgAAAAG9neAOcdjepHsFb6XhGXMu+ovAuLMRV7ccU9dKx53/bwAAAAMAAfVrAAAAAAAAAAYAAAAB1/5EvQrxHWArEJHy9KH03yEtRE0DIeoyrbPMHLurCgQAAAAUAAAAAQA1VtoAAAAAAAAGBAAAAAAAAJUxAAAAAd6s9f4AAABAOX4rVDTYRn7CW0BZ+2Ao2C+/9niNbkj1xP/k3TzpphPU2Hacm5cv34QYZlpBXqiW9fxCBSQlUppBEwdSWyhfBwAAAAAAAAABAdhAUwAAAEA2YuOv5tQjGsGRK4dB9rtG9y/rkoMVx2ROpR4I9E6NH2UTvDxDrh+1oA95R44k/gLuy9W2qloQkV2nt8p9ZZkI'

describe('Vector 10: Fee Bump + Soroban with Ed25519 Auth (Mainnet)', () => {
  it('decodes and verifies fields', () => {
    const input = base64ToBytes(VECTOR_10_BASE64)
    const envelope = decodeTransactionEnvelope(input)

    // Outer envelope type is ENVELOPE_TYPE_TX_FEE_BUMP (discriminant 5)
    expect(envelope.type).toBe('ENVELOPE_TYPE_TX_FEE_BUMP')
    if (envelope.type !== 'ENVELOPE_TYPE_TX_FEE_BUMP') throw new Error('wrong type')

    const feeBumpEnv = envelope.feeBump
    const feeBumpTx = feeBumpEnv.tx

    // Fee bump source is KEY_TYPE_ED25519
    expect(feeBumpTx.feeSource.type).toBe('KEY_TYPE_ED25519')

    // Fee is a bigint
    expect(typeof feeBumpTx.fee).toBe('bigint')

    // Inner tx is ENVELOPE_TYPE_TX (V1)
    expect(feeBumpTx.innerTx.type).toBe('ENVELOPE_TYPE_TX')
    if (feeBumpTx.innerTx.type !== 'ENVELOPE_TYPE_TX') throw new Error('wrong inner type')

    const innerEnv = feeBumpTx.innerTx.v1
    const innerTx = innerEnv.tx

    // Inner source account is KEY_TYPE_ED25519
    expect(innerTx.sourceAccount.type).toBe('KEY_TYPE_ED25519')

    // 1 operation: INVOKE_HOST_FUNCTION (Soroban, opType 24)
    expect(innerTx.operations.length).toBe(1)
    const op = innerTx.operations[0]!
    expect(op.body.type).toBe('INVOKE_HOST_FUNCTION')
    if (op.body.type === 'INVOKE_HOST_FUNCTION') {
      const ihfOp = op.body.invokeHostFunctionOp

      // Host function type is HOST_FUNCTION_TYPE_INVOKE_CONTRACT
      expect(ihfOp.hostFunction.type).toBe('HOST_FUNCTION_TYPE_INVOKE_CONTRACT')

      // Has auth entries
      expect(ihfOp.auth.length).toBeGreaterThan(0)

      // Look for SOROBAN_CREDENTIALS_ADDRESS with Ed25519 auth
      const addressAuth = ihfOp.auth.find(
        (entry) => entry.credentials.type === 'SOROBAN_CREDENTIALS_ADDRESS',
      )
      expect(addressAuth).toBeDefined()
      if (addressAuth && addressAuth.credentials.type === 'SOROBAN_CREDENTIALS_ADDRESS') {
        // SorobanAddressCredentials is present
        expect(addressAuth.credentials.address).toBeDefined()
      }
    }

    // Inner tx ext has sorobanData (v=1)
    expect(innerTx.ext.v).toBe(1)
    if (innerTx.ext.v === 1) {
      expect(innerTx.ext.sorobanData).toBeDefined()
    }

    // Inner tx has 1 signature
    expect(innerEnv.signatures.length).toBe(1)

    // Outer envelope has 1 signature
    expect(feeBumpEnv.signatures.length).toBe(1)

    // Extension is v0
    expect(feeBumpTx.ext.v).toBe(0)
  })

  it('round-trips byte-for-byte', () => {
    const input = base64ToBytes(VECTOR_10_BASE64)
    const decoded = decodeTransactionEnvelope(input)
    const reencoded = encodeTransactionEnvelope(decoded)
    expect(bytesToHex(reencoded)).toBe(bytesToHex(input))
  })
})

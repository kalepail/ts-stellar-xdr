import { describe, it, expect } from 'vitest'
import { xdr } from '@stellar/stellar-base'

import {
  decodeTransactionEnvelope,
  encodeTransactionEnvelope,
  type TransactionEnvelope,
} from '../src/generated/index.ts'
import { base64ToBytes, bytesToHex, XdrReadError } from '../src/codec.ts'

interface ConformanceVector {
  name: string
  base64: string
}

const CONFORMANCE_VECTORS: ConformanceVector[] = [
  {
    name: 'Vector 1 (V0 tx)',
    base64: 'AAAAAAW8Dk9idFR5Le+xi0/h/tU47bgC1YWjtPH1vIVO3BklAAAAZACoKlYAAAABAAAAAAAAAAEAAAALdmlhIGtleWJhc2UAAAAAAQAAAAAAAAAIAAAAAN7aGcXNPO36J1I8MR8S4QFhO79T5JGG2ZeS5Ka1m4mJAAAAAAAAAAFO3BklAAAAQP0ccCoeHdm3S7bOhMjXRMn3EbmETJ9glxpKUZjPSPIxpqZ7EkyTgl3FruieqpZd9LYOzdJrNik1GNBLhgTh/AU=',
  },
  {
    name: 'Vector 2 (fee bump)',
    base64: 'AAAABQAAAADgSJG2GOUMy/H9lHyjYZOwyuyytH8y0wWaoc596L+bEgAAAAAAAADIAAAAAgAAAABzdv3ojkzWHMD7KUoXhrPx0GH18vHKV0ZfqpMiEblG1gAAAGQAAAAAAAAACAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAA9IYXBweSBiaXJ0aGRheSEAAAAAAQAAAAAAAAABAAAAAOBIkbYY5QzL8f2UfKNhk7DK7LK0fzLTBZqhzn3ov5sSAAAAAAAAAASoF8gAAAAAAAAAAAERuUbWAAAAQK933Dnt1pxXlsf1B5CYn81PLxeYsx+MiV9EGbMdUfEcdDWUySyIkdzJefjpR5ejdXVp/KXosGmNUQ+DrIBlzg0AAAAAAAAAAei/mxIAAABAijIIQpL6KlFefiL4FP8UWQktWEz4wFgGNSaXe7mZdVMuiREntehi1b7MRqZ1h+W+Y0y+Z2HtMunsilT2yS5mAA==',
  },
  {
    name: 'Vector 4 (V1 tx)',
    base64: 'AAAAAgAAAADL13HWIyocdKsZ7A7HM8Srqmv+uZWc+rI4xx3M8oedCQAAAMgAAAAAAAAAAQAAAAEAAAAAAAAwOQAAAAAAAN3VAAAAAgAAAAAAAABkAAAAAQAAAAAAAAABAAAAANKYxYFXEWWR6TIJ6Vx6W/8SGy4dP2GLaND8yO/l5eRwAAAAAAAAAAJUC+QAAAAAAAAAAAHyh50JAAAAQCXOQnmno3he687bKRtDc6+BXRUf8t+RnTuHy+sKf35UjfFiQbIge+txehmg0N61JsFWfwbL0JtgOjzyeZw5JAs=',
  },
  {
    name: 'Vector 6 (V1 tx)',
    base64: 'AAAAAgAAAABg/GhKJU5ut52ih6Klx0ymGvsac1FPJig1CHYqyesIHQAAJxACBmMCAAAADgAAAAAAAAABAAAAATMAAAAAAAABAAAAAQAAAABg/GhKJU5ut52ih6Klx0ymGvsac1FPJig1CHYqyesIHQAAAAAAAAAAqdkSiA5dzNXstOtkPkHd6dAMPMA+MSXwK8OlrAGCKasAAAAAAcnDgAAAAAAAAAAByesIHQAAAEAuLrTfW6D+HYlUD9y+JolF1qrb40hIRATzsQaQjchKJuhOZJjLO0d7oaTD3JZ4UL4vVKtV7TvV17rQgCQnuz8F',
  },
  {
    name: 'Vector 8 (V1 tx)',
    base64: 'AAAAAgAAAADxGS0kRRx+iZ9m4JtNZSt/ha/nkW3yPY9XSodWWcTM7gAAAZAAAyJ3AAKKZAAAAAEAAAAAAAAAAAAAAABpn20uAAAAAAAAAAQAAAAAAAAADAAAAAAAAAABRVVSTAAAAACScRGjWxs3ha0UYqdUxCzKx+949i2LgtJ4WlZ3dxY6RwAAAAAABcmvBC0MowCYloAAAAAAAACHfAAAAAAAAAAMAAAAAAAAAAFFVVJMAAAAAJJxEaNbGzeFrRRip1TELMrH73j2LYuC0nhaVnd3FjpHAAAAAAAFyYIAKsQpAAYagAAAAAAAAId0AAAAAAAAAAMAAAABRVVSTAAAAACScRGjWxs3ha0UYqdUxCzKx+949i2LgtJ4WlZ3dxY6RwAAAAAAAAAAAASgeAAKw/EAAYagAAAAAAAAh3cAAAAAAAAAAwAAAAFFVVJMAAAAAJJxEaNbGzeFrRRip1TELMrH73j2LYuC0nhaVnd3FjpHAAAAAAAAAAAABJYlANdJUQAehIAAAAAAAACHhQAAAAAAAAABWcTM7gAAAEBxu0/q1lJYa6nsqMZfCrtloCifvGFPJE/ghbK6KOC23KyMtj34K7/45G9KDcvvRv6zyu6Pj9ZL+OpzDYNVO/IB',
  },
  {
    name: 'Vector 9 (fee bump + soroban)',
    base64: 'AAAABQAAAAA0mMHF8QGzwsMRBhe9i8PSIqxjNjKyQMyXZODBAdhAUwAAAAAAAJaFAAAAAgAAAAArOdNmuFndZlOiXz2U1me/szlasdfKtpxFjxxFm5MH2AAAlb0DmM8lAAIt5AAAAAEAAAAAAAAAAAAAAABpn2w2AAAAAAAAAAEAAAAAAAAAGAAAAAAAAAAB1/5EvQrxHWArEJHy9KH03yEtRE0DIeoyrbPMHLurCgQAAAAFcGxhbnQAAAAAAAACAAAAEgAAAAAAAAAAeg4yv0R91ov5JEHdLIsQo/u6HJ7cHOqHfn6Q+IOCkWAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAAAAAAB6DjK/RH3Wi/kkQd0sixCj+7ocntwc6od+fpD4g4KRYCZZTJ20PT2NA6jdUgAAABAAAAABAAAAAQAAABEAAAABAAAAAgAAAA8AAAAKcHVibGljX2tleQAAAAAADQAAACB6DjK/RH3Wi/kkQd0sixCj+7ocntwc6od+fpD4g4KRYAAAAA8AAAAJc2lnbmF0dXJlAAAAAAAADQAAAEBdvOebnf3URBY0n5vvQW3r8IisXPSIbY+Z9zYNGoskzsBAZRTgsBTI7Cyr0J+yK7RCq/cram36oKbtLmLcOQwLAAAAAAAAAAHX/kS9CvEdYCsQkfL0ofTfIS1ETQMh6jKts8wcu6sKBAAAAAVwbGFudAAAAAAAAAIAAAASAAAAAAAAAAB6DjK/RH3Wi/kkQd0sixCj+7ocntwc6od+fpD4g4KRYAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAgAAAAAAAAAAeg4yv0R91ov5JEHdLIsQo/u6HJ7cHOqHfn6Q+IOCkWAAAAAH2ywUKQ1JZOOAXyUn3RMpObpfs/zKxWswv6uP0JEBFicAAAAEAAAABgAAAAAAAAAAeg4yv0R91ov5JEHdLIsQo/u6HJ7cHOqHfn6Q+IOCkWAAAAAVJllMnbQ9PY0AAAAAAAAABgAAAAHX/kS9CvEdYCsQkfL0ofTfIS1ETQMh6jKts8wcu6sKBAAAABAAAAABAAAAAgAAAA8AAAAFQmxvY2sAAAAAAAADAAH1awAAAAAAAAAGAAAAAdf+RL0K8R1gKxCR8vSh9N8hLURNAyHqMq2zzBy7qwoEAAAAEAAAAAEAAAADAAAADwAAAARQYWlsAAAAEgAAAAAAAAAAeg4yv0R91ov5JEHdLIsQo/u6HJ7cHOqHfn6Q+IOCkWAAAAADAAH1awAAAAAAAAAGAAAAAdf+RL0K8R1gKxCR8vSh9N8hLURNAyHqMq2zzBy7qwoEAAAAFAAAAAEAH6YZAAAAkAAABgwAAAAAAACVWQAAAAGbkwfYAAAAQDs9q26j96S3RsYg8RW1gZnjtG3Vl4v5z1AqCmlnRbf8mJh/+aLdjqCFNR9QyOJkNbECMrw9701azhl3OJrEGwAAAAAAAAAAAQHYQFMAAABARDC+umTxL36WNlwakNjpSqB3ServHNkenNLNLGZTixKZkhnFqkUwBIpXsH1ti4uKprOknjJmeXfAsIWazepWCQ==',
  },
  {
    name: 'Vector 10 (fee bump + soroban + ed25519 auth)',
    base64: 'AAAABQAAAAA0mMHF8QGzwsMRBhe9i8PSIqxjNjKyQMyXZODBAdhAUwAAAAAAAJZdAAAAAgAAAADmBAd5om7t+z4XPied7PmLRO7GwOxyxnro5Qqv3qz1/gAAlZUDooSxAADUZQAAAAEAAAAAAAAAAAAAAABpn2w8AAAAAAAAAAEAAAAAAAAAGAAAAAAAAAAB1/5EvQrxHWArEJHy9KH03yEtRE0DIeoyrbPMHLurCgQAAAAFcGxhbnQAAAAAAAACAAAAEgAAAAG9neAOcdjepHsFb6XhGXMu+ovAuLMRV7ccU9dKx53/bwAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABvZ3gDnHY3qR7BW+l4RlzLvqLwLizEVe3HFPXSsed/28xfN6/Rf9kCQOo3UwAAAAQAAAAAQAAAAEAAAARAAAAAQAAAAEAAAAQAAAAAQAAAAIAAAAPAAAAB0VkMjU1MTkAAAAADQAAACAKcb1G1C+ZByDBpYeQjtP+EcTaQxI5AINFH5hHlotXLAAAABAAAAABAAAAAgAAAA8AAAAHRWQyNTUxOQAAAAANAAAAQLJVQ46c6OSyRf5vVKKece9gxXZzqAOwTm4b17LfBI7zz65j0OhRAI3ng6Z4vmpmAvU+H5DgMHDJeizsklWmNwMAAAAAAAAAAdf+RL0K8R1gKxCR8vSh9N8hLURNAyHqMq2zzBy7qwoEAAAABXBsYW50AAAAAAAAAgAAABIAAAABvZ3gDnHY3qR7BW+l4RlzLvqLwLizEVe3HFPXSsed/28AAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAQAAAAGAAAAAb2d4A5x2N6kewVvpeEZcy76i8C4sxFXtxxT10rHnf9vAAAAEAAAAAEAAAACAAAADwAAAAdFZDI1NTE5AAAAAA0AAAAgCnG9RtQvmQcgwaWHkI7T/hHE2kMSOQCDRR+YR5aLVywAAAAAAAAABgAAAAG9neAOcdjepHsFb6XhGXMu+ovAuLMRV7ccU9dKx53/bwAAABQAAAABAAAAB9ssFCkNSWTjgF8lJ90TKTm6X7P8ysVrML+rj9CRARYnAAAAB+zZkPC0XKaBcUm2F195sy77RC81cxmFoIQTHoJlxM2QAAAABAAAAAYAAAABvZ3gDnHY3qR7BW+l4RlzLvqLwLizEVe3HFPXSsed/28AAAAVMXzev0X/ZAkAAAAAAAAABgAAAAHX/kS9CvEdYCsQkfL0ofTfIS1ETQMh6jKts8wcu6sKBAAAABAAAAABAAAAAgAAAA8AAAAFQmxvY2sAAAAAAAADAAH1awAAAAAAAAAGAAAAAdf+RL0K8R1gKxCR8vSh9N8hLURNAyHqMq2zzBy7qwoEAAAAEAAAAAEAAAADAAAADwAAAARQYWlsAAAAEgAAAAG9neAOcdjepHsFb6XhGXMu+ovAuLMRV7ccU9dKx53/bwAAAAMAAfVrAAAAAAAAAAYAAAAB1/5EvQrxHWArEJHy9KH03yEtRE0DIeoyrbPMHLurCgQAAAAUAAAAAQA1VtoAAAAAAAAGBAAAAAAAAJUxAAAAAd6s9f4AAABAOX4rVDTYRn7CW0BZ+2Ao2C+/9niNbkj1xP/k3TzpphPU2Hacm5cv34QYZlpBXqiW9fxCBSQlUppBEwdSWyhfBwAAAAAAAAABAdhAUwAAAEA2YuOv5tQjGsGRK4dB9rtG9y/rkoMVx2ROpR4I9E6NH2UTvDxDrh+1oA95R44k/gLuy9W2qloQkV2nt8p9ZZkI',
  },
]

const INVALID_UTF8_VECTOR_5 =
  'AAAAAAtjwtJadppTmm0NtAU99BFxXXfzPO1N/SqR43Z8aXqXAAAAZAAIj6YAAAACAAAAAAAAAAEAAAAB0QAAAAAAAAEAAAAAAAAAAQAAAADLa6390PDAqg3qDLpshQxS+uVw3ytSgKRirQcInPWt1QAAAAAAAAAAA1Z+AAAAAAAAAAABfGl6lwAAAEBC655+8Izq54MIZrXTVF/E1ycHgQWpVcBD+LFkuOjjJd995u/7wM8sFqQqambL0/ME2FTOtxMO65B9i3eAIu4P'

const ENVELOPE_TYPE_TO_BASE_SWITCH: Record<TransactionEnvelope['type'], string> = {
  ENVELOPE_TYPE_TX_V0: 'envelopeTypeTxV0',
  ENVELOPE_TYPE_TX: 'envelopeTypeTx',
  ENVELOPE_TYPE_TX_FEE_BUMP: 'envelopeTypeTxFeeBump',
  ENVELOPE_TYPE_OP_ID: 'envelopeTypeOpId',
  ENVELOPE_TYPE_POOL_REVOKE_OP_ID: 'envelopeTypePoolRevokeOpId',
  ENVELOPE_TYPE_CONTRACT_ID: 'envelopeTypeContractId',
  ENVELOPE_TYPE_SOROBAN_AUTHORIZATION: 'envelopeTypeSorobanAuthorization',
}

const MEMO_TYPE_TO_BASE_SWITCH = {
  MEMO_NONE: 'memoNone',
  MEMO_TEXT: 'memoText',
  MEMO_ID: 'memoId',
  MEMO_HASH: 'memoHash',
  MEMO_RETURN: 'memoReturn',
} as const

interface EnvelopeSummary {
  operationCount: number
  outerSignatureCount: number
  innerSignatureCount: number
  memoSwitch: string
}

function summarizeOurEnvelope(env: TransactionEnvelope): EnvelopeSummary {
  switch (env.type) {
    case 'ENVELOPE_TYPE_TX_V0':
      return {
        operationCount: env.v0.tx.operations.length,
        outerSignatureCount: env.v0.signatures.length,
        innerSignatureCount: 0,
        memoSwitch: MEMO_TYPE_TO_BASE_SWITCH[env.v0.tx.memo.type],
      }
    case 'ENVELOPE_TYPE_TX':
      return {
        operationCount: env.v1.tx.operations.length,
        outerSignatureCount: env.v1.signatures.length,
        innerSignatureCount: 0,
        memoSwitch: MEMO_TYPE_TO_BASE_SWITCH[env.v1.tx.memo.type],
      }
    case 'ENVELOPE_TYPE_TX_FEE_BUMP': {
      const inner = env.feeBump.tx.innerTx
      if (inner.type !== 'ENVELOPE_TYPE_TX') {
        throw new Error(`Unsupported inner tx type in fee bump envelope: ${inner.type}`)
      }
      return {
        operationCount: inner.v1.tx.operations.length,
        outerSignatureCount: env.feeBump.signatures.length,
        innerSignatureCount: inner.v1.signatures.length,
        memoSwitch: MEMO_TYPE_TO_BASE_SWITCH[inner.v1.tx.memo.type],
      }
    }
    default:
      throw new Error(`Unsupported envelope type for summary: ${env.type}`)
  }
}

function summarizeBaseEnvelope(baseEnv: any): EnvelopeSummary {
  const envelopeSwitch = baseEnv.switch().name as string
  switch (envelopeSwitch) {
    case 'envelopeTypeTxV0': {
      const v0 = baseEnv.v0()
      return {
        operationCount: v0.tx().operations().length,
        outerSignatureCount: v0.signatures().length,
        innerSignatureCount: 0,
        memoSwitch: v0.tx().memo().switch().name,
      }
    }
    case 'envelopeTypeTx': {
      const v1 = baseEnv.v1()
      return {
        operationCount: v1.tx().operations().length,
        outerSignatureCount: v1.signatures().length,
        innerSignatureCount: 0,
        memoSwitch: v1.tx().memo().switch().name,
      }
    }
    case 'envelopeTypeTxFeeBump': {
      const feeBump = baseEnv.feeBump()
      const inner = feeBump.tx().innerTx()
      const innerSwitch = inner.switch().name as string
      if (innerSwitch !== 'envelopeTypeTx') {
        throw new Error(`Unsupported inner tx type in base fee bump envelope: ${innerSwitch}`)
      }
      return {
        operationCount: inner.v1().tx().operations().length,
        outerSignatureCount: feeBump.signatures().length,
        innerSignatureCount: inner.v1().signatures().length,
        memoSwitch: inner.v1().tx().memo().switch().name,
      }
    }
    default:
      throw new Error(`Unsupported base envelope switch: ${envelopeSwitch}`)
  }
}

describe('Differential conformance against @stellar/stellar-base', () => {
  for (const vector of CONFORMANCE_VECTORS) {
    it(vector.name, () => {
      const inputBytes = base64ToBytes(vector.base64)
      const ourEnv = decodeTransactionEnvelope(inputBytes)
      const baseEnv = xdr.TransactionEnvelope.fromXDR(vector.base64, 'base64')

      expect(baseEnv.switch().name).toBe(ENVELOPE_TYPE_TO_BASE_SWITCH[ourEnv.type])

      const ourSummary = summarizeOurEnvelope(ourEnv)
      const baseSummary = summarizeBaseEnvelope(baseEnv)
      expect(ourSummary).toEqual(baseSummary)

      const ourReencoded = encodeTransactionEnvelope(ourEnv)
      const baseReencoded = new Uint8Array(baseEnv.toXDR())

      expect(bytesToHex(ourReencoded)).toBe(bytesToHex(inputBytes))
      expect(bytesToHex(baseReencoded)).toBe(bytesToHex(inputBytes))
      expect(bytesToHex(ourReencoded)).toBe(bytesToHex(baseReencoded))
    })
  }

  it('strict UTF-8 policy rejects invalid memo bytes', () => {
    expect(() => decodeTransactionEnvelope(INVALID_UTF8_VECTOR_5)).toThrow(XdrReadError)
    expect(() => decodeTransactionEnvelope(INVALID_UTF8_VECTOR_5)).toThrow(/Invalid UTF-8/)
  })

  it('documents behavior difference: js-stellar-base accepts invalid UTF-8 memo bytes', () => {
    expect(() => xdr.TransactionEnvelope.fromXDR(INVALID_UTF8_VECTOR_5, 'base64')).not.toThrow()
  })
})


import { describe, it, expect } from 'vitest'
import {
  ledgerEntryToKey,
  transactionToEnvelope,
  feeBumpTransactionToEnvelope,
  hashTransactionEnvelope,
  extractSorobanAuths,
} from '../src/helpers.ts'
import type {
  LedgerEntry_data,
  LedgerKey,
} from '../src/generated/ledger-entries.ts'
import type {
  Transaction,
  TransactionEnvelope,
  FeeBumpTransaction,
} from '../src/generated/transaction.ts'
import {
  decodeTransactionEnvelope,
  encodeTransaction,
  encodeFeeBumpTransaction,
} from '../src/generated/transaction.ts'
import { hashTransaction, hashFeeBumpTransaction, Networks } from '../src/hashing.ts'
import { bytesToHex, base64ToBytes } from '../src/codec.ts'

describe('ledgerEntryToKey', () => {
  it('extracts ACCOUNT key', () => {
    const data: LedgerEntry_data = {
      type: 'ACCOUNT',
      account: {
        accountID: { type: 'PUBLIC_KEY_TYPE_ED25519', ed25519: new Uint8Array(32) },
        balance: 100n,
        seqNum: 1n,
        numSubEntries: 0,
        inflationDest: undefined,
        flags: 0,
        homeDomain: '',
        thresholds: new Uint8Array(4),
        signers: [],
        ext: { v: 0 },
      },
    }
    const key = ledgerEntryToKey(data)
    expect(key.type).toBe('ACCOUNT')
    if (key.type === 'ACCOUNT') {
      expect(key.account.accountID).toEqual(data.account.accountID)
    }
  })

  it('extracts TRUSTLINE key', () => {
    const accountID = { type: 'PUBLIC_KEY_TYPE_ED25519' as const, ed25519: new Uint8Array(32) }
    const asset = { type: 'ASSET_TYPE_NATIVE' as const }
    const data: LedgerEntry_data = {
      type: 'TRUSTLINE',
      trustLine: {
        accountID,
        asset,
        balance: 0n,
        limit: 1000n,
        flags: 0,
        ext: { v: 0 },
      },
    }
    const key = ledgerEntryToKey(data)
    expect(key.type).toBe('TRUSTLINE')
    if (key.type === 'TRUSTLINE') {
      expect(key.trustLine.accountID).toEqual(accountID)
      expect(key.trustLine.asset).toEqual(asset)
    }
  })

  it('extracts CONTRACT_DATA key', () => {
    const contract = { type: 'SC_ADDRESS_TYPE_CONTRACT' as const, contractId: new Uint8Array(32) }
    const scKey = { type: 'SCV_LEDGER_KEY_CONTRACT_INSTANCE' as const }
    const data: LedgerEntry_data = {
      type: 'CONTRACT_DATA',
      contractData: {
        ext: { v: 0 },
        contract,
        key: scKey,
        durability: 'PERSISTENT',
        val: { type: 'SCV_VOID' },
      },
    }
    const key = ledgerEntryToKey(data)
    expect(key.type).toBe('CONTRACT_DATA')
    if (key.type === 'CONTRACT_DATA') {
      expect(key.contractData.contract).toEqual(contract)
      expect(key.contractData.key).toEqual(scKey)
      expect(key.contractData.durability).toBe('PERSISTENT')
    }
  })

  it('extracts TTL key', () => {
    const keyHash = new Uint8Array(32).fill(0xAB)
    const data: LedgerEntry_data = {
      type: 'TTL',
      ttl: { keyHash, liveUntilLedgerSeq: 100 },
    }
    const key = ledgerEntryToKey(data)
    expect(key.type).toBe('TTL')
    if (key.type === 'TTL') {
      expect(key.ttl.keyHash).toEqual(keyHash)
    }
  })

  it('extracts CONFIG_SETTING key', () => {
    const data: LedgerEntry_data = {
      type: 'CONFIG_SETTING',
      configSetting: {
        configSettingID: 'CONFIG_SETTING_CONTRACT_MAX_SIZE_BYTES',
        contractMaxSizeBytes: 65536,
      },
    }
    const key = ledgerEntryToKey(data)
    expect(key.type).toBe('CONFIG_SETTING')
    if (key.type === 'CONFIG_SETTING') {
      expect(key.configSetting.configSettingID).toBe('CONFIG_SETTING_CONTRACT_MAX_SIZE_BYTES')
    }
  })

  it('extracts OFFER key', () => {
    const sellerID = { type: 'PUBLIC_KEY_TYPE_ED25519' as const, ed25519: new Uint8Array(32) }
    const data: LedgerEntry_data = {
      type: 'OFFER',
      offer: {
        sellerID,
        offerID: 12345n,
        selling: { type: 'ASSET_TYPE_NATIVE' as const },
        buying: { type: 'ASSET_TYPE_NATIVE' as const },
        amount: 1000n,
        price: { n: 1, d: 1 },
        flags: 0,
        ext: { v: 0 },
      },
    }
    const key = ledgerEntryToKey(data)
    expect(key.type).toBe('OFFER')
    if (key.type === 'OFFER') {
      expect(key.offer.sellerID).toEqual(sellerID)
      expect(key.offer.offerID).toBe(12345n)
    }
  })

  it('extracts DATA key', () => {
    const accountID = { type: 'PUBLIC_KEY_TYPE_ED25519' as const, ed25519: new Uint8Array(32) }
    const data: LedgerEntry_data = {
      type: 'DATA',
      data: {
        accountID,
        dataName: 'test-key',
        dataValue: new Uint8Array([1, 2, 3]),
        ext: { v: 0 },
      },
    }
    const key = ledgerEntryToKey(data)
    expect(key.type).toBe('DATA')
    if (key.type === 'DATA') {
      expect(key.data.accountID).toEqual(accountID)
      expect(key.data.dataName).toBe('test-key')
    }
  })

  it('extracts CLAIMABLE_BALANCE key', () => {
    const balanceID = {
      type: 'CLAIMABLE_BALANCE_ID_TYPE_V0' as const,
      v0: new Uint8Array(32).fill(0xAB),
    }
    const data: LedgerEntry_data = {
      type: 'CLAIMABLE_BALANCE',
      claimableBalance: {
        balanceID,
        claimants: [],
        asset: { type: 'ASSET_TYPE_NATIVE' as const },
        amount: 500n,
        ext: { v: 0 },
      },
    }
    const key = ledgerEntryToKey(data)
    expect(key.type).toBe('CLAIMABLE_BALANCE')
    if (key.type === 'CLAIMABLE_BALANCE') {
      expect(key.claimableBalance.balanceID).toEqual(balanceID)
    }
  })

  it('extracts LIQUIDITY_POOL key', () => {
    const liquidityPoolID = new Uint8Array(32).fill(0xCD)
    const data: LedgerEntry_data = {
      type: 'LIQUIDITY_POOL',
      liquidityPool: {
        liquidityPoolID,
        body: {
          type: 'LIQUIDITY_POOL_CONSTANT_PRODUCT',
          constantProduct: {
            params: {
              assetA: { type: 'ASSET_TYPE_NATIVE' as const },
              assetB: { type: 'ASSET_TYPE_NATIVE' as const },
              fee: 30,
            },
            reserveA: 0n,
            reserveB: 0n,
            totalPoolShares: 0n,
            poolSharesTrustLineCount: 0n,
          },
        },
      },
    }
    const key = ledgerEntryToKey(data)
    expect(key.type).toBe('LIQUIDITY_POOL')
    if (key.type === 'LIQUIDITY_POOL') {
      expect(key.liquidityPool.liquidityPoolID).toEqual(liquidityPoolID)
    }
  })

  it('extracts CONTRACT_CODE key', () => {
    const hash = new Uint8Array(32).fill(0xEE)
    const data: LedgerEntry_data = {
      type: 'CONTRACT_CODE',
      contractCode: {
        ext: { v: 0 },
        hash,
        code: new Uint8Array([0x00, 0x61, 0x73, 0x6d]),
      },
    }
    const key = ledgerEntryToKey(data)
    expect(key.type).toBe('CONTRACT_CODE')
    if (key.type === 'CONTRACT_CODE') {
      expect(key.contractCode.hash).toEqual(hash)
    }
  })
})

describe('transactionToEnvelope', () => {
  it('wraps a Transaction in an unsigned V1 envelope', () => {
    const tx: Transaction = {
      sourceAccount: { type: 'KEY_TYPE_ED25519', ed25519: new Uint8Array(32) },
      fee: 100,
      seqNum: 1n,
      cond: { type: 'PRECOND_NONE' },
      memo: { type: 'MEMO_NONE' },
      operations: [],
      ext: { v: 0 },
    }
    const envelope = transactionToEnvelope(tx)
    expect(envelope.type).toBe('ENVELOPE_TYPE_TX')
    if (envelope.type === 'ENVELOPE_TYPE_TX') {
      expect(envelope.v1.tx).toBe(tx)
      expect(envelope.v1.signatures).toEqual([])
    }
  })
})

describe('hashTransactionEnvelope', () => {
  it('hashes a V1 envelope and matches hashTransaction', () => {
    const tx: Transaction = {
      sourceAccount: { type: 'KEY_TYPE_ED25519', ed25519: new Uint8Array(32) },
      fee: 100,
      seqNum: 1n,
      cond: { type: 'PRECOND_NONE' },
      memo: { type: 'MEMO_NONE' },
      operations: [],
      ext: { v: 0 },
    }
    const envelope = transactionToEnvelope(tx)
    const hash1 = hashTransactionEnvelope(envelope, Networks.TESTNET)
    const hash2 = hashTransaction(Networks.TESTNET, encodeTransaction(tx))
    expect(bytesToHex(hash1)).toBe(bytesToHex(hash2))
  })
})

describe('feeBumpTransactionToEnvelope', () => {
  it('wraps a FeeBumpTransaction in an unsigned envelope', () => {
    const innerTx: Transaction = {
      sourceAccount: { type: 'KEY_TYPE_ED25519', ed25519: new Uint8Array(32) },
      fee: 100,
      seqNum: 1n,
      cond: { type: 'PRECOND_NONE' },
      memo: { type: 'MEMO_NONE' },
      operations: [],
      ext: { v: 0 },
    }
    const feeBumpTx: FeeBumpTransaction = {
      feeSource: { type: 'KEY_TYPE_ED25519', ed25519: new Uint8Array(32).fill(0x01) },
      fee: 200n,
      innerTx: { type: 'ENVELOPE_TYPE_TX', v1: { tx: innerTx, signatures: [] } },
      ext: { v: 0 },
    }
    const envelope = feeBumpTransactionToEnvelope(feeBumpTx)
    expect(envelope.type).toBe('ENVELOPE_TYPE_TX_FEE_BUMP')
    if (envelope.type === 'ENVELOPE_TYPE_TX_FEE_BUMP') {
      expect(envelope.feeBump.tx).toBe(feeBumpTx)
      expect(envelope.feeBump.signatures).toEqual([])
    }
  })

  it('hash matches hashFeeBumpTransaction', () => {
    const innerTx: Transaction = {
      sourceAccount: { type: 'KEY_TYPE_ED25519', ed25519: new Uint8Array(32) },
      fee: 100,
      seqNum: 1n,
      cond: { type: 'PRECOND_NONE' },
      memo: { type: 'MEMO_NONE' },
      operations: [],
      ext: { v: 0 },
    }
    const feeBumpTx: FeeBumpTransaction = {
      feeSource: { type: 'KEY_TYPE_ED25519', ed25519: new Uint8Array(32).fill(0x01) },
      fee: 200n,
      innerTx: { type: 'ENVELOPE_TYPE_TX', v1: { tx: innerTx, signatures: [] } },
      ext: { v: 0 },
    }
    const envelope = feeBumpTransactionToEnvelope(feeBumpTx)
    const hash1 = hashTransactionEnvelope(envelope, Networks.TESTNET)
    const hash2 = hashFeeBumpTransaction(Networks.TESTNET, encodeFeeBumpTransaction(feeBumpTx))
    expect(bytesToHex(hash1)).toBe(bytesToHex(hash2))
  })
})

describe('hashTransactionEnvelope', () => {
  it('hashes a V1 envelope and matches hashTransaction', () => {
    const tx: Transaction = {
      sourceAccount: { type: 'KEY_TYPE_ED25519', ed25519: new Uint8Array(32) },
      fee: 100,
      seqNum: 1n,
      cond: { type: 'PRECOND_NONE' },
      memo: { type: 'MEMO_NONE' },
      operations: [],
      ext: { v: 0 },
    }
    const envelope = transactionToEnvelope(tx)
    const hash1 = hashTransactionEnvelope(envelope, Networks.TESTNET)
    const hash2 = hashTransaction(Networks.TESTNET, encodeTransaction(tx))
    expect(bytesToHex(hash1)).toBe(bytesToHex(hash2))
  })

  it('hashes a V0 envelope (converts to V1 internally)', () => {
    // Use a real V0 test vector (Account Merge with Text Memo)
    const v0Base64 = 'AAAAAAW8Dk9idFR5Le+xi0/h/tU47bgC1YWjtPH1vIVO3BklAAAAZACoKlYAAAABAAAAAAAAAAEAAAALdmlhIGtleWJhc2UAAAAAAQAAAAAAAAAIAAAAAN7aGcXNPO36J1I8MR8S4QFhO79T5JGG2ZeS5Ka1m4mJAAAAAAAAAAFO3BklAAAAQP0ccCoeHdm3S7bOhMjXRMn3EbmETJ9glxpKUZjPSPIxpqZ7EkyTgl3FruieqpZd9LYOzdJrNik1GNBLhgTh/AU='
    const envelope = decodeTransactionEnvelope(base64ToBytes(v0Base64))
    expect(envelope.type).toBe('ENVELOPE_TYPE_TX_V0')

    // hashTransactionEnvelope should produce a 32-byte SHA-256 hash
    const hash = hashTransactionEnvelope(envelope, Networks.PUBLIC)
    expect(hash).toBeInstanceOf(Uint8Array)
    expect(hash.length).toBe(32)

    // The hash should be deterministic — hashing the same envelope twice should match
    const hash2 = hashTransactionEnvelope(envelope, Networks.PUBLIC)
    expect(bytesToHex(hash)).toBe(bytesToHex(hash2))

    // Different network passphrase should produce a different hash
    const hashTestnet = hashTransactionEnvelope(envelope, Networks.TESTNET)
    expect(bytesToHex(hash)).not.toBe(bytesToHex(hashTestnet))
  })

  it('hashes a FeeBump envelope and matches hashFeeBumpTransaction', () => {
    // Use a real fee bump test vector
    const fbBase64 = 'AAAABQAAAADgSJG2GOUMy/H9lHyjYZOwyuyytH8y0wWaoc596L+bEgAAAAAAAADIAAAAAgAAAABzdv3ojkzWHMD7KUoXhrPx0GH18vHKV0ZfqpMiEblG1gAAAGQAAAAAAAAACAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAA9IYXBweSBiaXJ0aGRheSEAAAAAAQAAAAAAAAABAAAAAOBIkbYY5QzL8f2UfKNhk7DK7LK0fzLTBZqhzn3ov5sSAAAAAAAAAASoF8gAAAAAAAAAAAERuUbWAAAAQK933Dnt1pxXlsf1B5CYn81PLxeYsx+MiV9EGbMdUfEcdDWUySyIkdzJefjpR5ejdXVp/KXosGmNUQ+DrIBlzg0AAAAAAAAAAei/mxIAAABAijIIQpL6KlFefiL4FP8UWQktWEz4wFgGNSaXe7mZdVMuiREntehi1b7MRqZ1h+W+Y0y+Z2HtMunsilT2yS5mAA=='
    const envelope = decodeTransactionEnvelope(base64ToBytes(fbBase64))
    expect(envelope.type).toBe('ENVELOPE_TYPE_TX_FEE_BUMP')

    if (envelope.type === 'ENVELOPE_TYPE_TX_FEE_BUMP') {
      const hash1 = hashTransactionEnvelope(envelope, Networks.TESTNET)
      const hash2 = hashFeeBumpTransaction(Networks.TESTNET, encodeFeeBumpTransaction(envelope.feeBump.tx))
      expect(bytesToHex(hash1)).toBe(bytesToHex(hash2))
    }
  })
})

describe('extractSorobanAuths', () => {
  it('returns empty array for non-Soroban envelopes', () => {
    const tx: Transaction = {
      sourceAccount: { type: 'KEY_TYPE_ED25519', ed25519: new Uint8Array(32) },
      fee: 100,
      seqNum: 1n,
      cond: { type: 'PRECOND_NONE' },
      memo: { type: 'MEMO_NONE' },
      operations: [
        { sourceAccount: undefined, body: { type: 'INFLATION' } },
      ],
      ext: { v: 0 },
    }
    const envelope = transactionToEnvelope(tx)
    expect(extractSorobanAuths(envelope)).toEqual([])
  })

  it('extracts auth entries from a real Soroban fee-bump envelope', () => {
    // Vector 9 from roundtrip-feebump.test.ts: Fee Bump + Soroban InvokeHostFunction (Mainnet)
    const sorobanBase64 = 'AAAABQAAAAA0mMHF8QGzwsMRBhe9i8PSIqxjNjKyQMyXZODBAdhAUwAAAAAAAJaFAAAAAgAAAAArOdNmuFndZlOiXz2U1me/szlasdfKtpxFjxxFm5MH2AAAlb0DmM8lAAIt5AAAAAEAAAAAAAAAAAAAAABpn2w2AAAAAAAAAAEAAAAAAAAAGAAAAAAAAAAB1/5EvQrxHWArEJHy9KH03yEtRE0DIeoyrbPMHLurCgQAAAAFcGxhbnQAAAAAAAACAAAAEgAAAAAAAAAAeg4yv0R91ov5JEHdLIsQo/u6HJ7cHOqHfn6Q+IOCkWAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAAAAAAB6DjK/RH3Wi/kkQd0sixCj+7ocntwc6od+fpD4g4KRYCZZTJ20PT2NA6jdUgAAABAAAAABAAAAAQAAABEAAAABAAAAAgAAAA8AAAAKcHVibGljX2tleQAAAAAADQAAACB6DjK/RH3Wi/kkQd0sixCj+7ocntwc6od+fpD4g4KRYAAAAA8AAAAJc2lnbmF0dXJlAAAAAAAADQAAAEBdvOebnf3URBY0n5vvQW3r8IisXPSIbY+Z9zYNGoskzsBAZRTgsBTI7Cyr0J+yK7RCq/cram36oKbtLmLcOQwLAAAAAAAAAAHX/kS9CvEdYCsQkfL0ofTfIS1ETQMh6jKts8wcu6sKBAAAAAVwbGFudAAAAAAAAAIAAAASAAAAAAAAAAB6DjK/RH3Wi/kkQd0sixCj+7ocntwc6od+fpD4g4KRYAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAgAAAAAAAAAAeg4yv0R91ov5JEHdLIsQo/u6HJ7cHOqHfn6Q+IOCkWAAAAAH2ywUKQ1JZOOAXyUn3RMpObpfs/zKxWswv6uP0JEBFicAAAAEAAAABgAAAAAAAAAAeg4yv0R91ov5JEHdLIsQo/u6HJ7cHOqHfn6Q+IOCkWAAAAAVJllMnbQ9PY0AAAAAAAAABgAAAAHX/kS9CvEdYCsQkfL0ofTfIS1ETQMh6jKts8wcu6sKBAAAABAAAAABAAAAAgAAAA8AAAAFQmxvY2sAAAAAAAADAAH1awAAAAAAAAAGAAAAAdf+RL0K8R1gKxCR8vSh9N8hLURNAyHqMq2zzBy7qwoEAAAAEAAAAAEAAAADAAAADwAAAARQYWlsAAAAEgAAAAAAAAAAeg4yv0R91ov5JEHdLIsQo/u6HJ7cHOqHfn6Q+IOCkWAAAAADAAH1awAAAAAAAAAGAAAAAdf+RL0K8R1gKxCR8vSh9N8hLURNAyHqMq2zzBy7qwoEAAAAFAAAAAEAH6YZAAAAkAAABgwAAAAAAACVWQAAAAGbkwfYAAAAQDs9q26j96S3RsYg8RW1gZnjtG3Vl4v5z1AqCmlnRbf8mJh/+aLdjqCFNR9QyOJkNbECMrw9701azhl3OJrEGwAAAAAAAAAAAQHYQFMAAABARDC+umTxL36WNlwakNjpSqB3ServHNkenNLNLGZTixKZkhnFqkUwBIpXsH1ti4uKprOknjJmeXfAsIWazepWCQ=='
    const envelope = decodeTransactionEnvelope(base64ToBytes(sorobanBase64))
    const auths = extractSorobanAuths(envelope)

    // This envelope has exactly 1 auth entry with SOROBAN_CREDENTIALS_ADDRESS
    expect(auths.length).toBe(1)
    expect(auths[0]!.credentials.type).toBe('SOROBAN_CREDENTIALS_ADDRESS')
  })

  it('extracts auth entries from a V1 Soroban envelope', () => {
    // Decode the fee bump and extract the inner V1 envelope
    const sorobanBase64 = 'AAAABQAAAAA0mMHF8QGzwsMRBhe9i8PSIqxjNjKyQMyXZODBAdhAUwAAAAAAAJaFAAAAAgAAAAArOdNmuFndZlOiXz2U1me/szlasdfKtpxFjxxFm5MH2AAAlb0DmM8lAAIt5AAAAAEAAAAAAAAAAAAAAABpn2w2AAAAAAAAAAEAAAAAAAAAGAAAAAAAAAAB1/5EvQrxHWArEJHy9KH03yEtRE0DIeoyrbPMHLurCgQAAAAFcGxhbnQAAAAAAAACAAAAEgAAAAAAAAAAeg4yv0R91ov5JEHdLIsQo/u6HJ7cHOqHfn6Q+IOCkWAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAAAAAAB6DjK/RH3Wi/kkQd0sixCj+7ocntwc6od+fpD4g4KRYCZZTJ20PT2NA6jdUgAAABAAAAABAAAAAQAAABEAAAABAAAAAgAAAA8AAAAKcHVibGljX2tleQAAAAAADQAAACB6DjK/RH3Wi/kkQd0sixCj+7ocntwc6od+fpD4g4KRYAAAAA8AAAAJc2lnbmF0dXJlAAAAAAAADQAAAEBdvOebnf3URBY0n5vvQW3r8IisXPSIbY+Z9zYNGoskzsBAZRTgsBTI7Cyr0J+yK7RCq/cram36oKbtLmLcOQwLAAAAAAAAAAHX/kS9CvEdYCsQkfL0ofTfIS1ETQMh6jKts8wcu6sKBAAAAAVwbGFudAAAAAAAAAIAAAASAAAAAAAAAAB6DjK/RH3Wi/kkQd0sixCj+7ocntwc6od+fpD4g4KRYAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAgAAAAAAAAAAeg4yv0R91ov5JEHdLIsQo/u6HJ7cHOqHfn6Q+IOCkWAAAAAH2ywUKQ1JZOOAXyUn3RMpObpfs/zKxWswv6uP0JEBFicAAAAEAAAABgAAAAAAAAAAeg4yv0R91ov5JEHdLIsQo/u6HJ7cHOqHfn6Q+IOCkWAAAAAVJllMnbQ9PY0AAAAAAAAABgAAAAHX/kS9CvEdYCsQkfL0ofTfIS1ETQMh6jKts8wcu6sKBAAAABAAAAABAAAAAgAAAA8AAAAFQmxvY2sAAAAAAAADAAH1awAAAAAAAAAGAAAAAdf+RL0K8R1gKxCR8vSh9N8hLURNAyHqMq2zzBy7qwoEAAAAEAAAAAEAAAADAAAADwAAAARQYWlsAAAAEgAAAAAAAAAAeg4yv0R91ov5JEHdLIsQo/u6HJ7cHOqHfn6Q+IOCkWAAAAADAAH1awAAAAAAAAAGAAAAAdf+RL0K8R1gKxCR8vSh9N8hLURNAyHqMq2zzBy7qwoEAAAAFAAAAAEAH6YZAAAAkAAABgwAAAAAAACVWQAAAAGbkwfYAAAAQDs9q26j96S3RsYg8RW1gZnjtG3Vl4v5z1AqCmlnRbf8mJh/+aLdjqCFNR9QyOJkNbECMrw9701azhl3OJrEGwAAAAAAAAAAAQHYQFMAAABARDC+umTxL36WNlwakNjpSqB3ServHNkenNLNLGZTixKZkhnFqkUwBIpXsH1ti4uKprOknjJmeXfAsIWazepWCQ=='
    const fbEnvelope = decodeTransactionEnvelope(base64ToBytes(sorobanBase64))
    if (fbEnvelope.type !== 'ENVELOPE_TYPE_TX_FEE_BUMP') throw new Error('expected fee bump')

    // Extract the inner V1 envelope and test extractSorobanAuths on it directly
    const innerV1Envelope: TransactionEnvelope = {
      type: 'ENVELOPE_TYPE_TX',
      v1: fbEnvelope.feeBump.tx.innerTx.v1,
    }
    const auths = extractSorobanAuths(innerV1Envelope)
    expect(auths.length).toBe(1)
    expect(auths[0]!.credentials.type).toBe('SOROBAN_CREDENTIALS_ADDRESS')
  })
})

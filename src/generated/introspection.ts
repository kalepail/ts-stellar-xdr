// AUTO-GENERATED — do not edit manually
// Run: bun scripts/codegen/index.ts --ref v25.0

export interface EnumIntrospectionMember {
  readonly name: string
  readonly value: number | null
  readonly jsonName: string
}

export interface EnumIntrospection {
  readonly name: string
  readonly prefix: string
  readonly members: readonly EnumIntrospectionMember[]
}

export interface UnionIntrospectionCase {
  readonly raw: string | number
  readonly numericValue: number | null
  readonly jsonName: string
}

export interface UnionIntrospectionArm {
  readonly name: string | null
  readonly type: string
  readonly cases: readonly UnionIntrospectionCase[]
}

export type UnionDiscriminantKind = 'enum' | 'int'

export interface UnionIntrospection {
  readonly name: string
  readonly discriminantName: string
  readonly discriminantType: string
  readonly discriminantKind: UnionDiscriminantKind
  readonly defaultArmType: string | null
  readonly arms: readonly UnionIntrospectionArm[]
}

export const ENUM_INTROSPECTION: Record<string, EnumIntrospection> = /*#__PURE__*/ {
  "CryptoKeyType": {
    name: "CryptoKeyType",
    prefix: "KEY_TYPE_",
    members: [
      { name: "KEY_TYPE_ED25519", value: 0, jsonName: "ed25519" },
      { name: "KEY_TYPE_PRE_AUTH_TX", value: 1, jsonName: "pre_auth_tx" },
      { name: "KEY_TYPE_HASH_X", value: 2, jsonName: "hash_x" },
      { name: "KEY_TYPE_ED25519_SIGNED_PAYLOAD", value: 3, jsonName: "ed25519_signed_payload" },
      { name: "KEY_TYPE_MUXED_ED25519", value: 256, jsonName: "muxed_ed25519" },
    ],
  },
  "PublicKeyType": {
    name: "PublicKeyType",
    prefix: "",
    members: [
      { name: "PUBLIC_KEY_TYPE_ED25519", value: 0, jsonName: "public_key_type_ed25519" },
    ],
  },
  "SignerKeyType": {
    name: "SignerKeyType",
    prefix: "SIGNER_KEY_TYPE_",
    members: [
      { name: "SIGNER_KEY_TYPE_ED25519", value: 0, jsonName: "ed25519" },
      { name: "SIGNER_KEY_TYPE_PRE_AUTH_TX", value: 1, jsonName: "pre_auth_tx" },
      { name: "SIGNER_KEY_TYPE_HASH_X", value: 2, jsonName: "hash_x" },
      { name: "SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD", value: 3, jsonName: "ed25519_signed_payload" },
    ],
  },
  "BinaryFuseFilterType": {
    name: "BinaryFuseFilterType",
    prefix: "BINARY_FUSE_FILTER_",
    members: [
      { name: "BINARY_FUSE_FILTER_8_BIT", value: 0, jsonName: "b8_bit" },
      { name: "BINARY_FUSE_FILTER_16_BIT", value: 1, jsonName: "b16_bit" },
      { name: "BINARY_FUSE_FILTER_32_BIT", value: 2, jsonName: "b32_bit" },
    ],
  },
  "ClaimableBalanceIDType": {
    name: "ClaimableBalanceIDType",
    prefix: "",
    members: [
      { name: "CLAIMABLE_BALANCE_ID_TYPE_V0", value: 0, jsonName: "claimable_balance_id_type_v0" },
    ],
  },
  "SCPStatementType": {
    name: "SCPStatementType",
    prefix: "SCP_ST_",
    members: [
      { name: "SCP_ST_PREPARE", value: 0, jsonName: "prepare" },
      { name: "SCP_ST_CONFIRM", value: 1, jsonName: "confirm" },
      { name: "SCP_ST_EXTERNALIZE", value: 2, jsonName: "externalize" },
      { name: "SCP_ST_NOMINATE", value: 3, jsonName: "nominate" },
    ],
  },
  "SCValType": {
    name: "SCValType",
    prefix: "SCV_",
    members: [
      { name: "SCV_BOOL", value: 0, jsonName: "bool" },
      { name: "SCV_VOID", value: 1, jsonName: "void" },
      { name: "SCV_ERROR", value: 2, jsonName: "error" },
      { name: "SCV_U32", value: 3, jsonName: "u32" },
      { name: "SCV_I32", value: 4, jsonName: "i32" },
      { name: "SCV_U64", value: 5, jsonName: "u64" },
      { name: "SCV_I64", value: 6, jsonName: "i64" },
      { name: "SCV_TIMEPOINT", value: 7, jsonName: "timepoint" },
      { name: "SCV_DURATION", value: 8, jsonName: "duration" },
      { name: "SCV_U128", value: 9, jsonName: "u128" },
      { name: "SCV_I128", value: 10, jsonName: "i128" },
      { name: "SCV_U256", value: 11, jsonName: "u256" },
      { name: "SCV_I256", value: 12, jsonName: "i256" },
      { name: "SCV_BYTES", value: 13, jsonName: "bytes" },
      { name: "SCV_STRING", value: 14, jsonName: "string" },
      { name: "SCV_SYMBOL", value: 15, jsonName: "symbol" },
      { name: "SCV_VEC", value: 16, jsonName: "vec" },
      { name: "SCV_MAP", value: 17, jsonName: "map" },
      { name: "SCV_ADDRESS", value: 18, jsonName: "address" },
      { name: "SCV_CONTRACT_INSTANCE", value: 19, jsonName: "contract_instance" },
      { name: "SCV_LEDGER_KEY_CONTRACT_INSTANCE", value: 20, jsonName: "ledger_key_contract_instance" },
      { name: "SCV_LEDGER_KEY_NONCE", value: 21, jsonName: "ledger_key_nonce" },
    ],
  },
  "SCErrorType": {
    name: "SCErrorType",
    prefix: "SCE_",
    members: [
      { name: "SCE_CONTRACT", value: 0, jsonName: "contract" },
      { name: "SCE_WASM_VM", value: 1, jsonName: "wasm_vm" },
      { name: "SCE_CONTEXT", value: 2, jsonName: "context" },
      { name: "SCE_STORAGE", value: 3, jsonName: "storage" },
      { name: "SCE_OBJECT", value: 4, jsonName: "object" },
      { name: "SCE_CRYPTO", value: 5, jsonName: "crypto" },
      { name: "SCE_EVENTS", value: 6, jsonName: "events" },
      { name: "SCE_BUDGET", value: 7, jsonName: "budget" },
      { name: "SCE_VALUE", value: 8, jsonName: "value" },
      { name: "SCE_AUTH", value: 9, jsonName: "auth" },
    ],
  },
  "SCErrorCode": {
    name: "SCErrorCode",
    prefix: "SCEC_",
    members: [
      { name: "SCEC_ARITH_DOMAIN", value: 0, jsonName: "arith_domain" },
      { name: "SCEC_INDEX_BOUNDS", value: 1, jsonName: "index_bounds" },
      { name: "SCEC_INVALID_INPUT", value: 2, jsonName: "invalid_input" },
      { name: "SCEC_MISSING_VALUE", value: 3, jsonName: "missing_value" },
      { name: "SCEC_EXISTING_VALUE", value: 4, jsonName: "existing_value" },
      { name: "SCEC_EXCEEDED_LIMIT", value: 5, jsonName: "exceeded_limit" },
      { name: "SCEC_INVALID_ACTION", value: 6, jsonName: "invalid_action" },
      { name: "SCEC_INTERNAL_ERROR", value: 7, jsonName: "internal_error" },
      { name: "SCEC_UNEXPECTED_TYPE", value: 8, jsonName: "unexpected_type" },
      { name: "SCEC_UNEXPECTED_SIZE", value: 9, jsonName: "unexpected_size" },
    ],
  },
  "ContractExecutableType": {
    name: "ContractExecutableType",
    prefix: "CONTRACT_EXECUTABLE_",
    members: [
      { name: "CONTRACT_EXECUTABLE_WASM", value: 0, jsonName: "wasm" },
      { name: "CONTRACT_EXECUTABLE_STELLAR_ASSET", value: 1, jsonName: "stellar_asset" },
    ],
  },
  "SCAddressType": {
    name: "SCAddressType",
    prefix: "SC_ADDRESS_TYPE_",
    members: [
      { name: "SC_ADDRESS_TYPE_ACCOUNT", value: 0, jsonName: "account" },
      { name: "SC_ADDRESS_TYPE_CONTRACT", value: 1, jsonName: "contract" },
      { name: "SC_ADDRESS_TYPE_MUXED_ACCOUNT", value: 2, jsonName: "muxed_account" },
      { name: "SC_ADDRESS_TYPE_CLAIMABLE_BALANCE", value: 3, jsonName: "claimable_balance" },
      { name: "SC_ADDRESS_TYPE_LIQUIDITY_POOL", value: 4, jsonName: "liquidity_pool" },
    ],
  },
  "SCSpecType": {
    name: "SCSpecType",
    prefix: "SC_SPEC_TYPE_",
    members: [
      { name: "SC_SPEC_TYPE_VAL", value: 0, jsonName: "val" },
      { name: "SC_SPEC_TYPE_BOOL", value: 1, jsonName: "bool" },
      { name: "SC_SPEC_TYPE_VOID", value: 2, jsonName: "void" },
      { name: "SC_SPEC_TYPE_ERROR", value: 3, jsonName: "error" },
      { name: "SC_SPEC_TYPE_U32", value: 4, jsonName: "u32" },
      { name: "SC_SPEC_TYPE_I32", value: 5, jsonName: "i32" },
      { name: "SC_SPEC_TYPE_U64", value: 6, jsonName: "u64" },
      { name: "SC_SPEC_TYPE_I64", value: 7, jsonName: "i64" },
      { name: "SC_SPEC_TYPE_TIMEPOINT", value: 8, jsonName: "timepoint" },
      { name: "SC_SPEC_TYPE_DURATION", value: 9, jsonName: "duration" },
      { name: "SC_SPEC_TYPE_U128", value: 10, jsonName: "u128" },
      { name: "SC_SPEC_TYPE_I128", value: 11, jsonName: "i128" },
      { name: "SC_SPEC_TYPE_U256", value: 12, jsonName: "u256" },
      { name: "SC_SPEC_TYPE_I256", value: 13, jsonName: "i256" },
      { name: "SC_SPEC_TYPE_BYTES", value: 14, jsonName: "bytes" },
      { name: "SC_SPEC_TYPE_STRING", value: 16, jsonName: "string" },
      { name: "SC_SPEC_TYPE_SYMBOL", value: 17, jsonName: "symbol" },
      { name: "SC_SPEC_TYPE_ADDRESS", value: 19, jsonName: "address" },
      { name: "SC_SPEC_TYPE_MUXED_ADDRESS", value: 20, jsonName: "muxed_address" },
      { name: "SC_SPEC_TYPE_OPTION", value: 1000, jsonName: "option" },
      { name: "SC_SPEC_TYPE_RESULT", value: 1001, jsonName: "result" },
      { name: "SC_SPEC_TYPE_VEC", value: 1002, jsonName: "vec" },
      { name: "SC_SPEC_TYPE_MAP", value: 1004, jsonName: "map" },
      { name: "SC_SPEC_TYPE_TUPLE", value: 1005, jsonName: "tuple" },
      { name: "SC_SPEC_TYPE_BYTES_N", value: 1006, jsonName: "bytes_n" },
      { name: "SC_SPEC_TYPE_UDT", value: 2000, jsonName: "udt" },
    ],
  },
  "SCSpecUDTUnionCaseV0Kind": {
    name: "SCSpecUDTUnionCaseV0Kind",
    prefix: "SC_SPEC_UDT_UNION_CASE_",
    members: [
      { name: "SC_SPEC_UDT_UNION_CASE_VOID_V0", value: 0, jsonName: "void_v0" },
      { name: "SC_SPEC_UDT_UNION_CASE_TUPLE_V0", value: 1, jsonName: "tuple_v0" },
    ],
  },
  "SCSpecEventParamLocationV0": {
    name: "SCSpecEventParamLocationV0",
    prefix: "SC_SPEC_EVENT_PARAM_LOCATION_",
    members: [
      { name: "SC_SPEC_EVENT_PARAM_LOCATION_DATA", value: 0, jsonName: "data" },
      { name: "SC_SPEC_EVENT_PARAM_LOCATION_TOPIC_LIST", value: 1, jsonName: "topic_list" },
    ],
  },
  "SCSpecEventDataFormat": {
    name: "SCSpecEventDataFormat",
    prefix: "SC_SPEC_EVENT_DATA_FORMAT_",
    members: [
      { name: "SC_SPEC_EVENT_DATA_FORMAT_SINGLE_VALUE", value: 0, jsonName: "single_value" },
      { name: "SC_SPEC_EVENT_DATA_FORMAT_VEC", value: 1, jsonName: "vec" },
      { name: "SC_SPEC_EVENT_DATA_FORMAT_MAP", value: 2, jsonName: "map" },
    ],
  },
  "SCSpecEntryKind": {
    name: "SCSpecEntryKind",
    prefix: "SC_SPEC_ENTRY_",
    members: [
      { name: "SC_SPEC_ENTRY_FUNCTION_V0", value: 0, jsonName: "function_v0" },
      { name: "SC_SPEC_ENTRY_UDT_STRUCT_V0", value: 1, jsonName: "udt_struct_v0" },
      { name: "SC_SPEC_ENTRY_UDT_UNION_V0", value: 2, jsonName: "udt_union_v0" },
      { name: "SC_SPEC_ENTRY_UDT_ENUM_V0", value: 3, jsonName: "udt_enum_v0" },
      { name: "SC_SPEC_ENTRY_UDT_ERROR_ENUM_V0", value: 4, jsonName: "udt_error_enum_v0" },
      { name: "SC_SPEC_ENTRY_EVENT_V0", value: 5, jsonName: "event_v0" },
    ],
  },
  "SCEnvMetaKind": {
    name: "SCEnvMetaKind",
    prefix: "",
    members: [
      { name: "SC_ENV_META_KIND_INTERFACE_VERSION", value: 0, jsonName: "sc_env_meta_kind_interface_version" },
    ],
  },
  "SCMetaKind": {
    name: "SCMetaKind",
    prefix: "",
    members: [
      { name: "SC_META_V0", value: 0, jsonName: "sc_meta_v0" },
    ],
  },
  "ContractCostType": {
    name: "ContractCostType",
    prefix: "",
    members: [
      { name: "WasmInsnExec", value: 0, jsonName: "wasminsnexec" },
      { name: "MemAlloc", value: 1, jsonName: "memalloc" },
      { name: "MemCpy", value: 2, jsonName: "memcpy" },
      { name: "MemCmp", value: 3, jsonName: "memcmp" },
      { name: "DispatchHostFunction", value: 4, jsonName: "dispatchhostfunction" },
      { name: "VisitObject", value: 5, jsonName: "visitobject" },
      { name: "ValSer", value: 6, jsonName: "valser" },
      { name: "ValDeser", value: 7, jsonName: "valdeser" },
      { name: "ComputeSha256Hash", value: 8, jsonName: "computesha256hash" },
      { name: "ComputeEd25519PubKey", value: 9, jsonName: "computeed25519pubkey" },
      { name: "VerifyEd25519Sig", value: 10, jsonName: "verifyed25519sig" },
      { name: "VmInstantiation", value: 11, jsonName: "vminstantiation" },
      { name: "VmCachedInstantiation", value: 12, jsonName: "vmcachedinstantiation" },
      { name: "InvokeVmFunction", value: 13, jsonName: "invokevmfunction" },
      { name: "ComputeKeccak256Hash", value: 14, jsonName: "computekeccak256hash" },
      { name: "DecodeEcdsaCurve256Sig", value: 15, jsonName: "decodeecdsacurve256sig" },
      { name: "RecoverEcdsaSecp256k1Key", value: 16, jsonName: "recoverecdsasecp256k1key" },
      { name: "Int256AddSub", value: 17, jsonName: "int256addsub" },
      { name: "Int256Mul", value: 18, jsonName: "int256mul" },
      { name: "Int256Div", value: 19, jsonName: "int256div" },
      { name: "Int256Pow", value: 20, jsonName: "int256pow" },
      { name: "Int256Shift", value: 21, jsonName: "int256shift" },
      { name: "ChaCha20DrawBytes", value: 22, jsonName: "chacha20drawbytes" },
      { name: "ParseWasmInstructions", value: 23, jsonName: "parsewasminstructions" },
      { name: "ParseWasmFunctions", value: 24, jsonName: "parsewasmfunctions" },
      { name: "ParseWasmGlobals", value: 25, jsonName: "parsewasmglobals" },
      { name: "ParseWasmTableEntries", value: 26, jsonName: "parsewasmtableentries" },
      { name: "ParseWasmTypes", value: 27, jsonName: "parsewasmtypes" },
      { name: "ParseWasmDataSegments", value: 28, jsonName: "parsewasmdatasegments" },
      { name: "ParseWasmElemSegments", value: 29, jsonName: "parsewasmelemsegments" },
      { name: "ParseWasmImports", value: 30, jsonName: "parsewasmimports" },
      { name: "ParseWasmExports", value: 31, jsonName: "parsewasmexports" },
      { name: "ParseWasmDataSegmentBytes", value: 32, jsonName: "parsewasmdatasegmentbytes" },
      { name: "InstantiateWasmInstructions", value: 33, jsonName: "instantiatewasminstructions" },
      { name: "InstantiateWasmFunctions", value: 34, jsonName: "instantiatewasmfunctions" },
      { name: "InstantiateWasmGlobals", value: 35, jsonName: "instantiatewasmglobals" },
      { name: "InstantiateWasmTableEntries", value: 36, jsonName: "instantiatewasmtableentries" },
      { name: "InstantiateWasmTypes", value: 37, jsonName: "instantiatewasmtypes" },
      { name: "InstantiateWasmDataSegments", value: 38, jsonName: "instantiatewasmdatasegments" },
      { name: "InstantiateWasmElemSegments", value: 39, jsonName: "instantiatewasmelemsegments" },
      { name: "InstantiateWasmImports", value: 40, jsonName: "instantiatewasmimports" },
      { name: "InstantiateWasmExports", value: 41, jsonName: "instantiatewasmexports" },
      { name: "InstantiateWasmDataSegmentBytes", value: 42, jsonName: "instantiatewasmdatasegmentbytes" },
      { name: "Sec1DecodePointUncompressed", value: 43, jsonName: "sec1decodepointuncompressed" },
      { name: "VerifyEcdsaSecp256r1Sig", value: 44, jsonName: "verifyecdsasecp256r1sig" },
      { name: "Bls12381EncodeFp", value: 45, jsonName: "bls12381encodefp" },
      { name: "Bls12381DecodeFp", value: 46, jsonName: "bls12381decodefp" },
      { name: "Bls12381G1CheckPointOnCurve", value: 47, jsonName: "bls12381g1checkpointoncurve" },
      { name: "Bls12381G1CheckPointInSubgroup", value: 48, jsonName: "bls12381g1checkpointinsubgroup" },
      { name: "Bls12381G2CheckPointOnCurve", value: 49, jsonName: "bls12381g2checkpointoncurve" },
      { name: "Bls12381G2CheckPointInSubgroup", value: 50, jsonName: "bls12381g2checkpointinsubgroup" },
      { name: "Bls12381G1ProjectiveToAffine", value: 51, jsonName: "bls12381g1projectivetoaffine" },
      { name: "Bls12381G2ProjectiveToAffine", value: 52, jsonName: "bls12381g2projectivetoaffine" },
      { name: "Bls12381G1Add", value: 53, jsonName: "bls12381g1add" },
      { name: "Bls12381G1Mul", value: 54, jsonName: "bls12381g1mul" },
      { name: "Bls12381G1Msm", value: 55, jsonName: "bls12381g1msm" },
      { name: "Bls12381MapFpToG1", value: 56, jsonName: "bls12381mapfptog1" },
      { name: "Bls12381HashToG1", value: 57, jsonName: "bls12381hashtog1" },
      { name: "Bls12381G2Add", value: 58, jsonName: "bls12381g2add" },
      { name: "Bls12381G2Mul", value: 59, jsonName: "bls12381g2mul" },
      { name: "Bls12381G2Msm", value: 60, jsonName: "bls12381g2msm" },
      { name: "Bls12381MapFp2ToG2", value: 61, jsonName: "bls12381mapfp2tog2" },
      { name: "Bls12381HashToG2", value: 62, jsonName: "bls12381hashtog2" },
      { name: "Bls12381Pairing", value: 63, jsonName: "bls12381pairing" },
      { name: "Bls12381FrFromU256", value: 64, jsonName: "bls12381frfromu256" },
      { name: "Bls12381FrToU256", value: 65, jsonName: "bls12381frtou256" },
      { name: "Bls12381FrAddSub", value: 66, jsonName: "bls12381fraddsub" },
      { name: "Bls12381FrMul", value: 67, jsonName: "bls12381frmul" },
      { name: "Bls12381FrPow", value: 68, jsonName: "bls12381frpow" },
      { name: "Bls12381FrInv", value: 69, jsonName: "bls12381frinv" },
      { name: "Bn254EncodeFp", value: 70, jsonName: "bn254encodefp" },
      { name: "Bn254DecodeFp", value: 71, jsonName: "bn254decodefp" },
      { name: "Bn254G1CheckPointOnCurve", value: 72, jsonName: "bn254g1checkpointoncurve" },
      { name: "Bn254G2CheckPointOnCurve", value: 73, jsonName: "bn254g2checkpointoncurve" },
      { name: "Bn254G2CheckPointInSubgroup", value: 74, jsonName: "bn254g2checkpointinsubgroup" },
      { name: "Bn254G1ProjectiveToAffine", value: 75, jsonName: "bn254g1projectivetoaffine" },
      { name: "Bn254G1Add", value: 76, jsonName: "bn254g1add" },
      { name: "Bn254G1Mul", value: 77, jsonName: "bn254g1mul" },
      { name: "Bn254Pairing", value: 78, jsonName: "bn254pairing" },
      { name: "Bn254FrFromU256", value: 79, jsonName: "bn254frfromu256" },
      { name: "Bn254FrToU256", value: 80, jsonName: "bn254frtou256" },
      { name: "Bn254FrAddSub", value: 81, jsonName: "bn254fraddsub" },
      { name: "Bn254FrMul", value: 82, jsonName: "bn254frmul" },
      { name: "Bn254FrPow", value: 83, jsonName: "bn254frpow" },
      { name: "Bn254FrInv", value: 84, jsonName: "bn254frinv" },
    ],
  },
  "ConfigSettingID": {
    name: "ConfigSettingID",
    prefix: "CONFIG_SETTING_",
    members: [
      { name: "CONFIG_SETTING_CONTRACT_MAX_SIZE_BYTES", value: 0, jsonName: "contract_max_size_bytes" },
      { name: "CONFIG_SETTING_CONTRACT_COMPUTE_V0", value: 1, jsonName: "contract_compute_v0" },
      { name: "CONFIG_SETTING_CONTRACT_LEDGER_COST_V0", value: 2, jsonName: "contract_ledger_cost_v0" },
      { name: "CONFIG_SETTING_CONTRACT_HISTORICAL_DATA_V0", value: 3, jsonName: "contract_historical_data_v0" },
      { name: "CONFIG_SETTING_CONTRACT_EVENTS_V0", value: 4, jsonName: "contract_events_v0" },
      { name: "CONFIG_SETTING_CONTRACT_BANDWIDTH_V0", value: 5, jsonName: "contract_bandwidth_v0" },
      { name: "CONFIG_SETTING_CONTRACT_COST_PARAMS_CPU_INSTRUCTIONS", value: 6, jsonName: "contract_cost_params_cpu_instructions" },
      { name: "CONFIG_SETTING_CONTRACT_COST_PARAMS_MEMORY_BYTES", value: 7, jsonName: "contract_cost_params_memory_bytes" },
      { name: "CONFIG_SETTING_CONTRACT_DATA_KEY_SIZE_BYTES", value: 8, jsonName: "contract_data_key_size_bytes" },
      { name: "CONFIG_SETTING_CONTRACT_DATA_ENTRY_SIZE_BYTES", value: 9, jsonName: "contract_data_entry_size_bytes" },
      { name: "CONFIG_SETTING_STATE_ARCHIVAL", value: 10, jsonName: "state_archival" },
      { name: "CONFIG_SETTING_CONTRACT_EXECUTION_LANES", value: 11, jsonName: "contract_execution_lanes" },
      { name: "CONFIG_SETTING_LIVE_SOROBAN_STATE_SIZE_WINDOW", value: 12, jsonName: "live_soroban_state_size_window" },
      { name: "CONFIG_SETTING_EVICTION_ITERATOR", value: 13, jsonName: "eviction_iterator" },
      { name: "CONFIG_SETTING_CONTRACT_PARALLEL_COMPUTE_V0", value: 14, jsonName: "contract_parallel_compute_v0" },
      { name: "CONFIG_SETTING_CONTRACT_LEDGER_COST_EXT_V0", value: 15, jsonName: "contract_ledger_cost_ext_v0" },
      { name: "CONFIG_SETTING_SCP_TIMING", value: 16, jsonName: "scp_timing" },
    ],
  },
  "AssetType": {
    name: "AssetType",
    prefix: "ASSET_TYPE_",
    members: [
      { name: "ASSET_TYPE_NATIVE", value: 0, jsonName: "native" },
      { name: "ASSET_TYPE_CREDIT_ALPHANUM4", value: 1, jsonName: "credit_alphanum4" },
      { name: "ASSET_TYPE_CREDIT_ALPHANUM12", value: 2, jsonName: "credit_alphanum12" },
      { name: "ASSET_TYPE_POOL_SHARE", value: 3, jsonName: "pool_share" },
    ],
  },
  "ThresholdIndexes": {
    name: "ThresholdIndexes",
    prefix: "THRESHOLD_",
    members: [
      { name: "THRESHOLD_MASTER_WEIGHT", value: 0, jsonName: "master_weight" },
      { name: "THRESHOLD_LOW", value: 1, jsonName: "low" },
      { name: "THRESHOLD_MED", value: 2, jsonName: "med" },
      { name: "THRESHOLD_HIGH", value: 3, jsonName: "high" },
    ],
  },
  "LedgerEntryType": {
    name: "LedgerEntryType",
    prefix: "",
    members: [
      { name: "ACCOUNT", value: 0, jsonName: "account" },
      { name: "TRUSTLINE", value: 1, jsonName: "trustline" },
      { name: "OFFER", value: 2, jsonName: "offer" },
      { name: "DATA", value: 3, jsonName: "data" },
      { name: "CLAIMABLE_BALANCE", value: 4, jsonName: "claimable_balance" },
      { name: "LIQUIDITY_POOL", value: 5, jsonName: "liquidity_pool" },
      { name: "CONTRACT_DATA", value: 6, jsonName: "contract_data" },
      { name: "CONTRACT_CODE", value: 7, jsonName: "contract_code" },
      { name: "CONFIG_SETTING", value: 8, jsonName: "config_setting" },
      { name: "TTL", value: 9, jsonName: "ttl" },
    ],
  },
  "AccountFlags": {
    name: "AccountFlags",
    prefix: "AUTH_",
    members: [
      { name: "AUTH_REQUIRED_FLAG", value: 1, jsonName: "required_flag" },
      { name: "AUTH_REVOCABLE_FLAG", value: 2, jsonName: "revocable_flag" },
      { name: "AUTH_IMMUTABLE_FLAG", value: 4, jsonName: "immutable_flag" },
      { name: "AUTH_CLAWBACK_ENABLED_FLAG", value: 8, jsonName: "clawback_enabled_flag" },
    ],
  },
  "TrustLineFlags": {
    name: "TrustLineFlags",
    prefix: "",
    members: [
      { name: "AUTHORIZED_FLAG", value: 1, jsonName: "authorized_flag" },
      { name: "AUTHORIZED_TO_MAINTAIN_LIABILITIES_FLAG", value: 2, jsonName: "authorized_to_maintain_liabilities_flag" },
      { name: "TRUSTLINE_CLAWBACK_ENABLED_FLAG", value: 4, jsonName: "trustline_clawback_enabled_flag" },
    ],
  },
  "LiquidityPoolType": {
    name: "LiquidityPoolType",
    prefix: "",
    members: [
      { name: "LIQUIDITY_POOL_CONSTANT_PRODUCT", value: 0, jsonName: "liquidity_pool_constant_product" },
    ],
  },
  "OfferEntryFlags": {
    name: "OfferEntryFlags",
    prefix: "",
    members: [
      { name: "PASSIVE_FLAG", value: 1, jsonName: "passive_flag" },
    ],
  },
  "ClaimPredicateType": {
    name: "ClaimPredicateType",
    prefix: "CLAIM_PREDICATE_",
    members: [
      { name: "CLAIM_PREDICATE_UNCONDITIONAL", value: 0, jsonName: "unconditional" },
      { name: "CLAIM_PREDICATE_AND", value: 1, jsonName: "and" },
      { name: "CLAIM_PREDICATE_OR", value: 2, jsonName: "or" },
      { name: "CLAIM_PREDICATE_NOT", value: 3, jsonName: "not" },
      { name: "CLAIM_PREDICATE_BEFORE_ABSOLUTE_TIME", value: 4, jsonName: "before_absolute_time" },
      { name: "CLAIM_PREDICATE_BEFORE_RELATIVE_TIME", value: 5, jsonName: "before_relative_time" },
    ],
  },
  "ClaimantType": {
    name: "ClaimantType",
    prefix: "",
    members: [
      { name: "CLAIMANT_TYPE_V0", value: 0, jsonName: "claimant_type_v0" },
    ],
  },
  "ClaimableBalanceFlags": {
    name: "ClaimableBalanceFlags",
    prefix: "",
    members: [
      { name: "CLAIMABLE_BALANCE_CLAWBACK_ENABLED_FLAG", value: 1, jsonName: "claimable_balance_clawback_enabled_flag" },
    ],
  },
  "ContractDataDurability": {
    name: "ContractDataDurability",
    prefix: "",
    members: [
      { name: "TEMPORARY", value: 0, jsonName: "temporary" },
      { name: "PERSISTENT", value: 1, jsonName: "persistent" },
    ],
  },
  "EnvelopeType": {
    name: "EnvelopeType",
    prefix: "ENVELOPE_TYPE_",
    members: [
      { name: "ENVELOPE_TYPE_TX_V0", value: 0, jsonName: "tx_v0" },
      { name: "ENVELOPE_TYPE_SCP", value: 1, jsonName: "scp" },
      { name: "ENVELOPE_TYPE_TX", value: 2, jsonName: "tx" },
      { name: "ENVELOPE_TYPE_AUTH", value: 3, jsonName: "auth" },
      { name: "ENVELOPE_TYPE_SCPVALUE", value: 4, jsonName: "scpvalue" },
      { name: "ENVELOPE_TYPE_TX_FEE_BUMP", value: 5, jsonName: "tx_fee_bump" },
      { name: "ENVELOPE_TYPE_OP_ID", value: 6, jsonName: "op_id" },
      { name: "ENVELOPE_TYPE_POOL_REVOKE_OP_ID", value: 7, jsonName: "pool_revoke_op_id" },
      { name: "ENVELOPE_TYPE_CONTRACT_ID", value: 8, jsonName: "contract_id" },
      { name: "ENVELOPE_TYPE_SOROBAN_AUTHORIZATION", value: 9, jsonName: "soroban_authorization" },
    ],
  },
  "BucketListType": {
    name: "BucketListType",
    prefix: "",
    members: [
      { name: "LIVE", value: 0, jsonName: "live" },
      { name: "HOT_ARCHIVE", value: 1, jsonName: "hot_archive" },
    ],
  },
  "BucketEntryType": {
    name: "BucketEntryType",
    prefix: "",
    members: [
      { name: "METAENTRY", value: -1, jsonName: "metaentry" },
      { name: "LIVEENTRY", value: 0, jsonName: "liveentry" },
      { name: "DEADENTRY", value: 1, jsonName: "deadentry" },
      { name: "INITENTRY", value: 2, jsonName: "initentry" },
    ],
  },
  "HotArchiveBucketEntryType": {
    name: "HotArchiveBucketEntryType",
    prefix: "HOT_ARCHIVE_",
    members: [
      { name: "HOT_ARCHIVE_METAENTRY", value: -1, jsonName: "metaentry" },
      { name: "HOT_ARCHIVE_ARCHIVED", value: 0, jsonName: "archived" },
      { name: "HOT_ARCHIVE_LIVE", value: 1, jsonName: "live" },
    ],
  },
  "StellarValueType": {
    name: "StellarValueType",
    prefix: "STELLAR_VALUE_",
    members: [
      { name: "STELLAR_VALUE_BASIC", value: 0, jsonName: "basic" },
      { name: "STELLAR_VALUE_SIGNED", value: 1, jsonName: "signed" },
    ],
  },
  "LedgerHeaderFlags": {
    name: "LedgerHeaderFlags",
    prefix: "DISABLE_LIQUIDITY_POOL_",
    members: [
      { name: "DISABLE_LIQUIDITY_POOL_TRADING_FLAG", value: 1, jsonName: "trading_flag" },
      { name: "DISABLE_LIQUIDITY_POOL_DEPOSIT_FLAG", value: 2, jsonName: "deposit_flag" },
      { name: "DISABLE_LIQUIDITY_POOL_WITHDRAWAL_FLAG", value: 4, jsonName: "withdrawal_flag" },
    ],
  },
  "LedgerUpgradeType": {
    name: "LedgerUpgradeType",
    prefix: "LEDGER_UPGRADE_",
    members: [
      { name: "LEDGER_UPGRADE_VERSION", value: 1, jsonName: "version" },
      { name: "LEDGER_UPGRADE_BASE_FEE", value: 2, jsonName: "base_fee" },
      { name: "LEDGER_UPGRADE_MAX_TX_SET_SIZE", value: 3, jsonName: "max_tx_set_size" },
      { name: "LEDGER_UPGRADE_BASE_RESERVE", value: 4, jsonName: "base_reserve" },
      { name: "LEDGER_UPGRADE_FLAGS", value: 5, jsonName: "flags" },
      { name: "LEDGER_UPGRADE_CONFIG", value: 6, jsonName: "config" },
      { name: "LEDGER_UPGRADE_MAX_SOROBAN_TX_SET_SIZE", value: 7, jsonName: "max_soroban_tx_set_size" },
    ],
  },
  "TxSetComponentType": {
    name: "TxSetComponentType",
    prefix: "",
    members: [
      { name: "TXSET_COMP_TXS_MAYBE_DISCOUNTED_FEE", value: 0, jsonName: "txset_comp_txs_maybe_discounted_fee" },
    ],
  },
  "LedgerEntryChangeType": {
    name: "LedgerEntryChangeType",
    prefix: "LEDGER_ENTRY_",
    members: [
      { name: "LEDGER_ENTRY_CREATED", value: 0, jsonName: "created" },
      { name: "LEDGER_ENTRY_UPDATED", value: 1, jsonName: "updated" },
      { name: "LEDGER_ENTRY_REMOVED", value: 2, jsonName: "removed" },
      { name: "LEDGER_ENTRY_STATE", value: 3, jsonName: "state" },
      { name: "LEDGER_ENTRY_RESTORED", value: 4, jsonName: "restored" },
    ],
  },
  "ContractEventType": {
    name: "ContractEventType",
    prefix: "",
    members: [
      { name: "SYSTEM", value: 0, jsonName: "system" },
      { name: "CONTRACT", value: 1, jsonName: "contract" },
      { name: "DIAGNOSTIC", value: 2, jsonName: "diagnostic" },
    ],
  },
  "TransactionEventStage": {
    name: "TransactionEventStage",
    prefix: "TRANSACTION_EVENT_STAGE_",
    members: [
      { name: "TRANSACTION_EVENT_STAGE_BEFORE_ALL_TXS", value: 0, jsonName: "before_all_txs" },
      { name: "TRANSACTION_EVENT_STAGE_AFTER_TX", value: 1, jsonName: "after_tx" },
      { name: "TRANSACTION_EVENT_STAGE_AFTER_ALL_TXS", value: 2, jsonName: "after_all_txs" },
    ],
  },
  "OperationType": {
    name: "OperationType",
    prefix: "",
    members: [
      { name: "CREATE_ACCOUNT", value: 0, jsonName: "create_account" },
      { name: "PAYMENT", value: 1, jsonName: "payment" },
      { name: "PATH_PAYMENT_STRICT_RECEIVE", value: 2, jsonName: "path_payment_strict_receive" },
      { name: "MANAGE_SELL_OFFER", value: 3, jsonName: "manage_sell_offer" },
      { name: "CREATE_PASSIVE_SELL_OFFER", value: 4, jsonName: "create_passive_sell_offer" },
      { name: "SET_OPTIONS", value: 5, jsonName: "set_options" },
      { name: "CHANGE_TRUST", value: 6, jsonName: "change_trust" },
      { name: "ALLOW_TRUST", value: 7, jsonName: "allow_trust" },
      { name: "ACCOUNT_MERGE", value: 8, jsonName: "account_merge" },
      { name: "INFLATION", value: 9, jsonName: "inflation" },
      { name: "MANAGE_DATA", value: 10, jsonName: "manage_data" },
      { name: "BUMP_SEQUENCE", value: 11, jsonName: "bump_sequence" },
      { name: "MANAGE_BUY_OFFER", value: 12, jsonName: "manage_buy_offer" },
      { name: "PATH_PAYMENT_STRICT_SEND", value: 13, jsonName: "path_payment_strict_send" },
      { name: "CREATE_CLAIMABLE_BALANCE", value: 14, jsonName: "create_claimable_balance" },
      { name: "CLAIM_CLAIMABLE_BALANCE", value: 15, jsonName: "claim_claimable_balance" },
      { name: "BEGIN_SPONSORING_FUTURE_RESERVES", value: 16, jsonName: "begin_sponsoring_future_reserves" },
      { name: "END_SPONSORING_FUTURE_RESERVES", value: 17, jsonName: "end_sponsoring_future_reserves" },
      { name: "REVOKE_SPONSORSHIP", value: 18, jsonName: "revoke_sponsorship" },
      { name: "CLAWBACK", value: 19, jsonName: "clawback" },
      { name: "CLAWBACK_CLAIMABLE_BALANCE", value: 20, jsonName: "clawback_claimable_balance" },
      { name: "SET_TRUST_LINE_FLAGS", value: 21, jsonName: "set_trust_line_flags" },
      { name: "LIQUIDITY_POOL_DEPOSIT", value: 22, jsonName: "liquidity_pool_deposit" },
      { name: "LIQUIDITY_POOL_WITHDRAW", value: 23, jsonName: "liquidity_pool_withdraw" },
      { name: "INVOKE_HOST_FUNCTION", value: 24, jsonName: "invoke_host_function" },
      { name: "EXTEND_FOOTPRINT_TTL", value: 25, jsonName: "extend_footprint_ttl" },
      { name: "RESTORE_FOOTPRINT", value: 26, jsonName: "restore_footprint" },
    ],
  },
  "RevokeSponsorshipType": {
    name: "RevokeSponsorshipType",
    prefix: "REVOKE_SPONSORSHIP_",
    members: [
      { name: "REVOKE_SPONSORSHIP_LEDGER_ENTRY", value: 0, jsonName: "ledger_entry" },
      { name: "REVOKE_SPONSORSHIP_SIGNER", value: 1, jsonName: "signer" },
    ],
  },
  "HostFunctionType": {
    name: "HostFunctionType",
    prefix: "HOST_FUNCTION_TYPE_",
    members: [
      { name: "HOST_FUNCTION_TYPE_INVOKE_CONTRACT", value: 0, jsonName: "invoke_contract" },
      { name: "HOST_FUNCTION_TYPE_CREATE_CONTRACT", value: 1, jsonName: "create_contract" },
      { name: "HOST_FUNCTION_TYPE_UPLOAD_CONTRACT_WASM", value: 2, jsonName: "upload_contract_wasm" },
      { name: "HOST_FUNCTION_TYPE_CREATE_CONTRACT_V2", value: 3, jsonName: "create_contract_v2" },
    ],
  },
  "ContractIDPreimageType": {
    name: "ContractIDPreimageType",
    prefix: "CONTRACT_ID_PREIMAGE_FROM_",
    members: [
      { name: "CONTRACT_ID_PREIMAGE_FROM_ADDRESS", value: 0, jsonName: "address" },
      { name: "CONTRACT_ID_PREIMAGE_FROM_ASSET", value: 1, jsonName: "asset" },
    ],
  },
  "SorobanAuthorizedFunctionType": {
    name: "SorobanAuthorizedFunctionType",
    prefix: "SOROBAN_AUTHORIZED_FUNCTION_TYPE_",
    members: [
      { name: "SOROBAN_AUTHORIZED_FUNCTION_TYPE_CONTRACT_FN", value: 0, jsonName: "contract_fn" },
      { name: "SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_HOST_FN", value: 1, jsonName: "create_contract_host_fn" },
      { name: "SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_V2_HOST_FN", value: 2, jsonName: "create_contract_v2_host_fn" },
    ],
  },
  "SorobanCredentialsType": {
    name: "SorobanCredentialsType",
    prefix: "SOROBAN_CREDENTIALS_",
    members: [
      { name: "SOROBAN_CREDENTIALS_SOURCE_ACCOUNT", value: 0, jsonName: "source_account" },
      { name: "SOROBAN_CREDENTIALS_ADDRESS", value: 1, jsonName: "address" },
    ],
  },
  "MemoType": {
    name: "MemoType",
    prefix: "MEMO_",
    members: [
      { name: "MEMO_NONE", value: 0, jsonName: "none" },
      { name: "MEMO_TEXT", value: 1, jsonName: "text" },
      { name: "MEMO_ID", value: 2, jsonName: "id" },
      { name: "MEMO_HASH", value: 3, jsonName: "hash" },
      { name: "MEMO_RETURN", value: 4, jsonName: "return" },
    ],
  },
  "PreconditionType": {
    name: "PreconditionType",
    prefix: "PRECOND_",
    members: [
      { name: "PRECOND_NONE", value: 0, jsonName: "none" },
      { name: "PRECOND_TIME", value: 1, jsonName: "time" },
      { name: "PRECOND_V2", value: 2, jsonName: "v2" },
    ],
  },
  "ClaimAtomType": {
    name: "ClaimAtomType",
    prefix: "CLAIM_ATOM_TYPE_",
    members: [
      { name: "CLAIM_ATOM_TYPE_V0", value: 0, jsonName: "v0" },
      { name: "CLAIM_ATOM_TYPE_ORDER_BOOK", value: 1, jsonName: "order_book" },
      { name: "CLAIM_ATOM_TYPE_LIQUIDITY_POOL", value: 2, jsonName: "liquidity_pool" },
    ],
  },
  "CreateAccountResultCode": {
    name: "CreateAccountResultCode",
    prefix: "CREATE_ACCOUNT_",
    members: [
      { name: "CREATE_ACCOUNT_SUCCESS", value: 0, jsonName: "success" },
      { name: "CREATE_ACCOUNT_MALFORMED", value: -1, jsonName: "malformed" },
      { name: "CREATE_ACCOUNT_UNDERFUNDED", value: -2, jsonName: "underfunded" },
      { name: "CREATE_ACCOUNT_LOW_RESERVE", value: -3, jsonName: "low_reserve" },
      { name: "CREATE_ACCOUNT_ALREADY_EXIST", value: -4, jsonName: "already_exist" },
    ],
  },
  "PaymentResultCode": {
    name: "PaymentResultCode",
    prefix: "PAYMENT_",
    members: [
      { name: "PAYMENT_SUCCESS", value: 0, jsonName: "success" },
      { name: "PAYMENT_MALFORMED", value: -1, jsonName: "malformed" },
      { name: "PAYMENT_UNDERFUNDED", value: -2, jsonName: "underfunded" },
      { name: "PAYMENT_SRC_NO_TRUST", value: -3, jsonName: "src_no_trust" },
      { name: "PAYMENT_SRC_NOT_AUTHORIZED", value: -4, jsonName: "src_not_authorized" },
      { name: "PAYMENT_NO_DESTINATION", value: -5, jsonName: "no_destination" },
      { name: "PAYMENT_NO_TRUST", value: -6, jsonName: "no_trust" },
      { name: "PAYMENT_NOT_AUTHORIZED", value: -7, jsonName: "not_authorized" },
      { name: "PAYMENT_LINE_FULL", value: -8, jsonName: "line_full" },
      { name: "PAYMENT_NO_ISSUER", value: -9, jsonName: "no_issuer" },
    ],
  },
  "PathPaymentStrictReceiveResultCode": {
    name: "PathPaymentStrictReceiveResultCode",
    prefix: "PATH_PAYMENT_STRICT_RECEIVE_",
    members: [
      { name: "PATH_PAYMENT_STRICT_RECEIVE_SUCCESS", value: 0, jsonName: "success" },
      { name: "PATH_PAYMENT_STRICT_RECEIVE_MALFORMED", value: -1, jsonName: "malformed" },
      { name: "PATH_PAYMENT_STRICT_RECEIVE_UNDERFUNDED", value: -2, jsonName: "underfunded" },
      { name: "PATH_PAYMENT_STRICT_RECEIVE_SRC_NO_TRUST", value: -3, jsonName: "src_no_trust" },
      { name: "PATH_PAYMENT_STRICT_RECEIVE_SRC_NOT_AUTHORIZED", value: -4, jsonName: "src_not_authorized" },
      { name: "PATH_PAYMENT_STRICT_RECEIVE_NO_DESTINATION", value: -5, jsonName: "no_destination" },
      { name: "PATH_PAYMENT_STRICT_RECEIVE_NO_TRUST", value: -6, jsonName: "no_trust" },
      { name: "PATH_PAYMENT_STRICT_RECEIVE_NOT_AUTHORIZED", value: -7, jsonName: "not_authorized" },
      { name: "PATH_PAYMENT_STRICT_RECEIVE_LINE_FULL", value: -8, jsonName: "line_full" },
      { name: "PATH_PAYMENT_STRICT_RECEIVE_NO_ISSUER", value: -9, jsonName: "no_issuer" },
      { name: "PATH_PAYMENT_STRICT_RECEIVE_TOO_FEW_OFFERS", value: -10, jsonName: "too_few_offers" },
      { name: "PATH_PAYMENT_STRICT_RECEIVE_OFFER_CROSS_SELF", value: -11, jsonName: "offer_cross_self" },
      { name: "PATH_PAYMENT_STRICT_RECEIVE_OVER_SENDMAX", value: -12, jsonName: "over_sendmax" },
    ],
  },
  "PathPaymentStrictSendResultCode": {
    name: "PathPaymentStrictSendResultCode",
    prefix: "PATH_PAYMENT_STRICT_SEND_",
    members: [
      { name: "PATH_PAYMENT_STRICT_SEND_SUCCESS", value: 0, jsonName: "success" },
      { name: "PATH_PAYMENT_STRICT_SEND_MALFORMED", value: -1, jsonName: "malformed" },
      { name: "PATH_PAYMENT_STRICT_SEND_UNDERFUNDED", value: -2, jsonName: "underfunded" },
      { name: "PATH_PAYMENT_STRICT_SEND_SRC_NO_TRUST", value: -3, jsonName: "src_no_trust" },
      { name: "PATH_PAYMENT_STRICT_SEND_SRC_NOT_AUTHORIZED", value: -4, jsonName: "src_not_authorized" },
      { name: "PATH_PAYMENT_STRICT_SEND_NO_DESTINATION", value: -5, jsonName: "no_destination" },
      { name: "PATH_PAYMENT_STRICT_SEND_NO_TRUST", value: -6, jsonName: "no_trust" },
      { name: "PATH_PAYMENT_STRICT_SEND_NOT_AUTHORIZED", value: -7, jsonName: "not_authorized" },
      { name: "PATH_PAYMENT_STRICT_SEND_LINE_FULL", value: -8, jsonName: "line_full" },
      { name: "PATH_PAYMENT_STRICT_SEND_NO_ISSUER", value: -9, jsonName: "no_issuer" },
      { name: "PATH_PAYMENT_STRICT_SEND_TOO_FEW_OFFERS", value: -10, jsonName: "too_few_offers" },
      { name: "PATH_PAYMENT_STRICT_SEND_OFFER_CROSS_SELF", value: -11, jsonName: "offer_cross_self" },
      { name: "PATH_PAYMENT_STRICT_SEND_UNDER_DESTMIN", value: -12, jsonName: "under_destmin" },
    ],
  },
  "ManageSellOfferResultCode": {
    name: "ManageSellOfferResultCode",
    prefix: "MANAGE_SELL_OFFER_",
    members: [
      { name: "MANAGE_SELL_OFFER_SUCCESS", value: 0, jsonName: "success" },
      { name: "MANAGE_SELL_OFFER_MALFORMED", value: -1, jsonName: "malformed" },
      { name: "MANAGE_SELL_OFFER_SELL_NO_TRUST", value: -2, jsonName: "sell_no_trust" },
      { name: "MANAGE_SELL_OFFER_BUY_NO_TRUST", value: -3, jsonName: "buy_no_trust" },
      { name: "MANAGE_SELL_OFFER_SELL_NOT_AUTHORIZED", value: -4, jsonName: "sell_not_authorized" },
      { name: "MANAGE_SELL_OFFER_BUY_NOT_AUTHORIZED", value: -5, jsonName: "buy_not_authorized" },
      { name: "MANAGE_SELL_OFFER_LINE_FULL", value: -6, jsonName: "line_full" },
      { name: "MANAGE_SELL_OFFER_UNDERFUNDED", value: -7, jsonName: "underfunded" },
      { name: "MANAGE_SELL_OFFER_CROSS_SELF", value: -8, jsonName: "cross_self" },
      { name: "MANAGE_SELL_OFFER_SELL_NO_ISSUER", value: -9, jsonName: "sell_no_issuer" },
      { name: "MANAGE_SELL_OFFER_BUY_NO_ISSUER", value: -10, jsonName: "buy_no_issuer" },
      { name: "MANAGE_SELL_OFFER_NOT_FOUND", value: -11, jsonName: "not_found" },
      { name: "MANAGE_SELL_OFFER_LOW_RESERVE", value: -12, jsonName: "low_reserve" },
    ],
  },
  "ManageOfferEffect": {
    name: "ManageOfferEffect",
    prefix: "MANAGE_OFFER_",
    members: [
      { name: "MANAGE_OFFER_CREATED", value: 0, jsonName: "created" },
      { name: "MANAGE_OFFER_UPDATED", value: 1, jsonName: "updated" },
      { name: "MANAGE_OFFER_DELETED", value: 2, jsonName: "deleted" },
    ],
  },
  "ManageBuyOfferResultCode": {
    name: "ManageBuyOfferResultCode",
    prefix: "MANAGE_BUY_OFFER_",
    members: [
      { name: "MANAGE_BUY_OFFER_SUCCESS", value: 0, jsonName: "success" },
      { name: "MANAGE_BUY_OFFER_MALFORMED", value: -1, jsonName: "malformed" },
      { name: "MANAGE_BUY_OFFER_SELL_NO_TRUST", value: -2, jsonName: "sell_no_trust" },
      { name: "MANAGE_BUY_OFFER_BUY_NO_TRUST", value: -3, jsonName: "buy_no_trust" },
      { name: "MANAGE_BUY_OFFER_SELL_NOT_AUTHORIZED", value: -4, jsonName: "sell_not_authorized" },
      { name: "MANAGE_BUY_OFFER_BUY_NOT_AUTHORIZED", value: -5, jsonName: "buy_not_authorized" },
      { name: "MANAGE_BUY_OFFER_LINE_FULL", value: -6, jsonName: "line_full" },
      { name: "MANAGE_BUY_OFFER_UNDERFUNDED", value: -7, jsonName: "underfunded" },
      { name: "MANAGE_BUY_OFFER_CROSS_SELF", value: -8, jsonName: "cross_self" },
      { name: "MANAGE_BUY_OFFER_SELL_NO_ISSUER", value: -9, jsonName: "sell_no_issuer" },
      { name: "MANAGE_BUY_OFFER_BUY_NO_ISSUER", value: -10, jsonName: "buy_no_issuer" },
      { name: "MANAGE_BUY_OFFER_NOT_FOUND", value: -11, jsonName: "not_found" },
      { name: "MANAGE_BUY_OFFER_LOW_RESERVE", value: -12, jsonName: "low_reserve" },
    ],
  },
  "SetOptionsResultCode": {
    name: "SetOptionsResultCode",
    prefix: "SET_OPTIONS_",
    members: [
      { name: "SET_OPTIONS_SUCCESS", value: 0, jsonName: "success" },
      { name: "SET_OPTIONS_LOW_RESERVE", value: -1, jsonName: "low_reserve" },
      { name: "SET_OPTIONS_TOO_MANY_SIGNERS", value: -2, jsonName: "too_many_signers" },
      { name: "SET_OPTIONS_BAD_FLAGS", value: -3, jsonName: "bad_flags" },
      { name: "SET_OPTIONS_INVALID_INFLATION", value: -4, jsonName: "invalid_inflation" },
      { name: "SET_OPTIONS_CANT_CHANGE", value: -5, jsonName: "cant_change" },
      { name: "SET_OPTIONS_UNKNOWN_FLAG", value: -6, jsonName: "unknown_flag" },
      { name: "SET_OPTIONS_THRESHOLD_OUT_OF_RANGE", value: -7, jsonName: "threshold_out_of_range" },
      { name: "SET_OPTIONS_BAD_SIGNER", value: -8, jsonName: "bad_signer" },
      { name: "SET_OPTIONS_INVALID_HOME_DOMAIN", value: -9, jsonName: "invalid_home_domain" },
      { name: "SET_OPTIONS_AUTH_REVOCABLE_REQUIRED", value: -10, jsonName: "auth_revocable_required" },
    ],
  },
  "ChangeTrustResultCode": {
    name: "ChangeTrustResultCode",
    prefix: "CHANGE_TRUST_",
    members: [
      { name: "CHANGE_TRUST_SUCCESS", value: 0, jsonName: "success" },
      { name: "CHANGE_TRUST_MALFORMED", value: -1, jsonName: "malformed" },
      { name: "CHANGE_TRUST_NO_ISSUER", value: -2, jsonName: "no_issuer" },
      { name: "CHANGE_TRUST_INVALID_LIMIT", value: -3, jsonName: "invalid_limit" },
      { name: "CHANGE_TRUST_LOW_RESERVE", value: -4, jsonName: "low_reserve" },
      { name: "CHANGE_TRUST_SELF_NOT_ALLOWED", value: -5, jsonName: "self_not_allowed" },
      { name: "CHANGE_TRUST_TRUST_LINE_MISSING", value: -6, jsonName: "trust_line_missing" },
      { name: "CHANGE_TRUST_CANNOT_DELETE", value: -7, jsonName: "cannot_delete" },
      { name: "CHANGE_TRUST_NOT_AUTH_MAINTAIN_LIABILITIES", value: -8, jsonName: "not_auth_maintain_liabilities" },
    ],
  },
  "AllowTrustResultCode": {
    name: "AllowTrustResultCode",
    prefix: "ALLOW_TRUST_",
    members: [
      { name: "ALLOW_TRUST_SUCCESS", value: 0, jsonName: "success" },
      { name: "ALLOW_TRUST_MALFORMED", value: -1, jsonName: "malformed" },
      { name: "ALLOW_TRUST_NO_TRUST_LINE", value: -2, jsonName: "no_trust_line" },
      { name: "ALLOW_TRUST_TRUST_NOT_REQUIRED", value: -3, jsonName: "trust_not_required" },
      { name: "ALLOW_TRUST_CANT_REVOKE", value: -4, jsonName: "cant_revoke" },
      { name: "ALLOW_TRUST_SELF_NOT_ALLOWED", value: -5, jsonName: "self_not_allowed" },
      { name: "ALLOW_TRUST_LOW_RESERVE", value: -6, jsonName: "low_reserve" },
    ],
  },
  "AccountMergeResultCode": {
    name: "AccountMergeResultCode",
    prefix: "ACCOUNT_MERGE_",
    members: [
      { name: "ACCOUNT_MERGE_SUCCESS", value: 0, jsonName: "success" },
      { name: "ACCOUNT_MERGE_MALFORMED", value: -1, jsonName: "malformed" },
      { name: "ACCOUNT_MERGE_NO_ACCOUNT", value: -2, jsonName: "no_account" },
      { name: "ACCOUNT_MERGE_IMMUTABLE_SET", value: -3, jsonName: "immutable_set" },
      { name: "ACCOUNT_MERGE_HAS_SUB_ENTRIES", value: -4, jsonName: "has_sub_entries" },
      { name: "ACCOUNT_MERGE_SEQNUM_TOO_FAR", value: -5, jsonName: "seqnum_too_far" },
      { name: "ACCOUNT_MERGE_DEST_FULL", value: -6, jsonName: "dest_full" },
      { name: "ACCOUNT_MERGE_IS_SPONSOR", value: -7, jsonName: "is_sponsor" },
    ],
  },
  "InflationResultCode": {
    name: "InflationResultCode",
    prefix: "INFLATION_",
    members: [
      { name: "INFLATION_SUCCESS", value: 0, jsonName: "success" },
      { name: "INFLATION_NOT_TIME", value: -1, jsonName: "not_time" },
    ],
  },
  "ManageDataResultCode": {
    name: "ManageDataResultCode",
    prefix: "MANAGE_DATA_",
    members: [
      { name: "MANAGE_DATA_SUCCESS", value: 0, jsonName: "success" },
      { name: "MANAGE_DATA_NOT_SUPPORTED_YET", value: -1, jsonName: "not_supported_yet" },
      { name: "MANAGE_DATA_NAME_NOT_FOUND", value: -2, jsonName: "name_not_found" },
      { name: "MANAGE_DATA_LOW_RESERVE", value: -3, jsonName: "low_reserve" },
      { name: "MANAGE_DATA_INVALID_NAME", value: -4, jsonName: "invalid_name" },
    ],
  },
  "BumpSequenceResultCode": {
    name: "BumpSequenceResultCode",
    prefix: "BUMP_SEQUENCE_",
    members: [
      { name: "BUMP_SEQUENCE_SUCCESS", value: 0, jsonName: "success" },
      { name: "BUMP_SEQUENCE_BAD_SEQ", value: -1, jsonName: "bad_seq" },
    ],
  },
  "CreateClaimableBalanceResultCode": {
    name: "CreateClaimableBalanceResultCode",
    prefix: "CREATE_CLAIMABLE_BALANCE_",
    members: [
      { name: "CREATE_CLAIMABLE_BALANCE_SUCCESS", value: 0, jsonName: "success" },
      { name: "CREATE_CLAIMABLE_BALANCE_MALFORMED", value: -1, jsonName: "malformed" },
      { name: "CREATE_CLAIMABLE_BALANCE_LOW_RESERVE", value: -2, jsonName: "low_reserve" },
      { name: "CREATE_CLAIMABLE_BALANCE_NO_TRUST", value: -3, jsonName: "no_trust" },
      { name: "CREATE_CLAIMABLE_BALANCE_NOT_AUTHORIZED", value: -4, jsonName: "not_authorized" },
      { name: "CREATE_CLAIMABLE_BALANCE_UNDERFUNDED", value: -5, jsonName: "underfunded" },
    ],
  },
  "ClaimClaimableBalanceResultCode": {
    name: "ClaimClaimableBalanceResultCode",
    prefix: "CLAIM_CLAIMABLE_BALANCE_",
    members: [
      { name: "CLAIM_CLAIMABLE_BALANCE_SUCCESS", value: 0, jsonName: "success" },
      { name: "CLAIM_CLAIMABLE_BALANCE_DOES_NOT_EXIST", value: -1, jsonName: "does_not_exist" },
      { name: "CLAIM_CLAIMABLE_BALANCE_CANNOT_CLAIM", value: -2, jsonName: "cannot_claim" },
      { name: "CLAIM_CLAIMABLE_BALANCE_LINE_FULL", value: -3, jsonName: "line_full" },
      { name: "CLAIM_CLAIMABLE_BALANCE_NO_TRUST", value: -4, jsonName: "no_trust" },
      { name: "CLAIM_CLAIMABLE_BALANCE_NOT_AUTHORIZED", value: -5, jsonName: "not_authorized" },
    ],
  },
  "BeginSponsoringFutureReservesResultCode": {
    name: "BeginSponsoringFutureReservesResultCode",
    prefix: "BEGIN_SPONSORING_FUTURE_RESERVES_",
    members: [
      { name: "BEGIN_SPONSORING_FUTURE_RESERVES_SUCCESS", value: 0, jsonName: "success" },
      { name: "BEGIN_SPONSORING_FUTURE_RESERVES_MALFORMED", value: -1, jsonName: "malformed" },
      { name: "BEGIN_SPONSORING_FUTURE_RESERVES_ALREADY_SPONSORED", value: -2, jsonName: "already_sponsored" },
      { name: "BEGIN_SPONSORING_FUTURE_RESERVES_RECURSIVE", value: -3, jsonName: "recursive" },
    ],
  },
  "EndSponsoringFutureReservesResultCode": {
    name: "EndSponsoringFutureReservesResultCode",
    prefix: "END_SPONSORING_FUTURE_RESERVES_",
    members: [
      { name: "END_SPONSORING_FUTURE_RESERVES_SUCCESS", value: 0, jsonName: "success" },
      { name: "END_SPONSORING_FUTURE_RESERVES_NOT_SPONSORED", value: -1, jsonName: "not_sponsored" },
    ],
  },
  "RevokeSponsorshipResultCode": {
    name: "RevokeSponsorshipResultCode",
    prefix: "REVOKE_SPONSORSHIP_",
    members: [
      { name: "REVOKE_SPONSORSHIP_SUCCESS", value: 0, jsonName: "success" },
      { name: "REVOKE_SPONSORSHIP_DOES_NOT_EXIST", value: -1, jsonName: "does_not_exist" },
      { name: "REVOKE_SPONSORSHIP_NOT_SPONSOR", value: -2, jsonName: "not_sponsor" },
      { name: "REVOKE_SPONSORSHIP_LOW_RESERVE", value: -3, jsonName: "low_reserve" },
      { name: "REVOKE_SPONSORSHIP_ONLY_TRANSFERABLE", value: -4, jsonName: "only_transferable" },
      { name: "REVOKE_SPONSORSHIP_MALFORMED", value: -5, jsonName: "malformed" },
    ],
  },
  "ClawbackResultCode": {
    name: "ClawbackResultCode",
    prefix: "CLAWBACK_",
    members: [
      { name: "CLAWBACK_SUCCESS", value: 0, jsonName: "success" },
      { name: "CLAWBACK_MALFORMED", value: -1, jsonName: "malformed" },
      { name: "CLAWBACK_NOT_CLAWBACK_ENABLED", value: -2, jsonName: "not_clawback_enabled" },
      { name: "CLAWBACK_NO_TRUST", value: -3, jsonName: "no_trust" },
      { name: "CLAWBACK_UNDERFUNDED", value: -4, jsonName: "underfunded" },
    ],
  },
  "ClawbackClaimableBalanceResultCode": {
    name: "ClawbackClaimableBalanceResultCode",
    prefix: "CLAWBACK_CLAIMABLE_BALANCE_",
    members: [
      { name: "CLAWBACK_CLAIMABLE_BALANCE_SUCCESS", value: 0, jsonName: "success" },
      { name: "CLAWBACK_CLAIMABLE_BALANCE_DOES_NOT_EXIST", value: -1, jsonName: "does_not_exist" },
      { name: "CLAWBACK_CLAIMABLE_BALANCE_NOT_ISSUER", value: -2, jsonName: "not_issuer" },
      { name: "CLAWBACK_CLAIMABLE_BALANCE_NOT_CLAWBACK_ENABLED", value: -3, jsonName: "not_clawback_enabled" },
    ],
  },
  "SetTrustLineFlagsResultCode": {
    name: "SetTrustLineFlagsResultCode",
    prefix: "SET_TRUST_LINE_FLAGS_",
    members: [
      { name: "SET_TRUST_LINE_FLAGS_SUCCESS", value: 0, jsonName: "success" },
      { name: "SET_TRUST_LINE_FLAGS_MALFORMED", value: -1, jsonName: "malformed" },
      { name: "SET_TRUST_LINE_FLAGS_NO_TRUST_LINE", value: -2, jsonName: "no_trust_line" },
      { name: "SET_TRUST_LINE_FLAGS_CANT_REVOKE", value: -3, jsonName: "cant_revoke" },
      { name: "SET_TRUST_LINE_FLAGS_INVALID_STATE", value: -4, jsonName: "invalid_state" },
      { name: "SET_TRUST_LINE_FLAGS_LOW_RESERVE", value: -5, jsonName: "low_reserve" },
    ],
  },
  "LiquidityPoolDepositResultCode": {
    name: "LiquidityPoolDepositResultCode",
    prefix: "LIQUIDITY_POOL_DEPOSIT_",
    members: [
      { name: "LIQUIDITY_POOL_DEPOSIT_SUCCESS", value: 0, jsonName: "success" },
      { name: "LIQUIDITY_POOL_DEPOSIT_MALFORMED", value: -1, jsonName: "malformed" },
      { name: "LIQUIDITY_POOL_DEPOSIT_NO_TRUST", value: -2, jsonName: "no_trust" },
      { name: "LIQUIDITY_POOL_DEPOSIT_NOT_AUTHORIZED", value: -3, jsonName: "not_authorized" },
      { name: "LIQUIDITY_POOL_DEPOSIT_UNDERFUNDED", value: -4, jsonName: "underfunded" },
      { name: "LIQUIDITY_POOL_DEPOSIT_LINE_FULL", value: -5, jsonName: "line_full" },
      { name: "LIQUIDITY_POOL_DEPOSIT_BAD_PRICE", value: -6, jsonName: "bad_price" },
      { name: "LIQUIDITY_POOL_DEPOSIT_POOL_FULL", value: -7, jsonName: "pool_full" },
    ],
  },
  "LiquidityPoolWithdrawResultCode": {
    name: "LiquidityPoolWithdrawResultCode",
    prefix: "LIQUIDITY_POOL_WITHDRAW_",
    members: [
      { name: "LIQUIDITY_POOL_WITHDRAW_SUCCESS", value: 0, jsonName: "success" },
      { name: "LIQUIDITY_POOL_WITHDRAW_MALFORMED", value: -1, jsonName: "malformed" },
      { name: "LIQUIDITY_POOL_WITHDRAW_NO_TRUST", value: -2, jsonName: "no_trust" },
      { name: "LIQUIDITY_POOL_WITHDRAW_UNDERFUNDED", value: -3, jsonName: "underfunded" },
      { name: "LIQUIDITY_POOL_WITHDRAW_LINE_FULL", value: -4, jsonName: "line_full" },
      { name: "LIQUIDITY_POOL_WITHDRAW_UNDER_MINIMUM", value: -5, jsonName: "under_minimum" },
    ],
  },
  "InvokeHostFunctionResultCode": {
    name: "InvokeHostFunctionResultCode",
    prefix: "INVOKE_HOST_FUNCTION_",
    members: [
      { name: "INVOKE_HOST_FUNCTION_SUCCESS", value: 0, jsonName: "success" },
      { name: "INVOKE_HOST_FUNCTION_MALFORMED", value: -1, jsonName: "malformed" },
      { name: "INVOKE_HOST_FUNCTION_TRAPPED", value: -2, jsonName: "trapped" },
      { name: "INVOKE_HOST_FUNCTION_RESOURCE_LIMIT_EXCEEDED", value: -3, jsonName: "resource_limit_exceeded" },
      { name: "INVOKE_HOST_FUNCTION_ENTRY_ARCHIVED", value: -4, jsonName: "entry_archived" },
      { name: "INVOKE_HOST_FUNCTION_INSUFFICIENT_REFUNDABLE_FEE", value: -5, jsonName: "insufficient_refundable_fee" },
    ],
  },
  "ExtendFootprintTTLResultCode": {
    name: "ExtendFootprintTTLResultCode",
    prefix: "EXTEND_FOOTPRINT_TTL_",
    members: [
      { name: "EXTEND_FOOTPRINT_TTL_SUCCESS", value: 0, jsonName: "success" },
      { name: "EXTEND_FOOTPRINT_TTL_MALFORMED", value: -1, jsonName: "malformed" },
      { name: "EXTEND_FOOTPRINT_TTL_RESOURCE_LIMIT_EXCEEDED", value: -2, jsonName: "resource_limit_exceeded" },
      { name: "EXTEND_FOOTPRINT_TTL_INSUFFICIENT_REFUNDABLE_FEE", value: -3, jsonName: "insufficient_refundable_fee" },
    ],
  },
  "RestoreFootprintResultCode": {
    name: "RestoreFootprintResultCode",
    prefix: "RESTORE_FOOTPRINT_",
    members: [
      { name: "RESTORE_FOOTPRINT_SUCCESS", value: 0, jsonName: "success" },
      { name: "RESTORE_FOOTPRINT_MALFORMED", value: -1, jsonName: "malformed" },
      { name: "RESTORE_FOOTPRINT_RESOURCE_LIMIT_EXCEEDED", value: -2, jsonName: "resource_limit_exceeded" },
      { name: "RESTORE_FOOTPRINT_INSUFFICIENT_REFUNDABLE_FEE", value: -3, jsonName: "insufficient_refundable_fee" },
    ],
  },
  "OperationResultCode": {
    name: "OperationResultCode",
    prefix: "",
    members: [
      { name: "opINNER", value: 0, jsonName: "opinner" },
      { name: "opBAD_AUTH", value: -1, jsonName: "opbad_auth" },
      { name: "opNO_ACCOUNT", value: -2, jsonName: "opno_account" },
      { name: "opNOT_SUPPORTED", value: -3, jsonName: "opnot_supported" },
      { name: "opTOO_MANY_SUBENTRIES", value: -4, jsonName: "optoo_many_subentries" },
      { name: "opEXCEEDED_WORK_LIMIT", value: -5, jsonName: "opexceeded_work_limit" },
      { name: "opTOO_MANY_SPONSORING", value: -6, jsonName: "optoo_many_sponsoring" },
    ],
  },
  "TransactionResultCode": {
    name: "TransactionResultCode",
    prefix: "",
    members: [
      { name: "txFEE_BUMP_INNER_SUCCESS", value: 1, jsonName: "txfee_bump_inner_success" },
      { name: "txSUCCESS", value: 0, jsonName: "txsuccess" },
      { name: "txFAILED", value: -1, jsonName: "txfailed" },
      { name: "txTOO_EARLY", value: -2, jsonName: "txtoo_early" },
      { name: "txTOO_LATE", value: -3, jsonName: "txtoo_late" },
      { name: "txMISSING_OPERATION", value: -4, jsonName: "txmissing_operation" },
      { name: "txBAD_SEQ", value: -5, jsonName: "txbad_seq" },
      { name: "txBAD_AUTH", value: -6, jsonName: "txbad_auth" },
      { name: "txINSUFFICIENT_BALANCE", value: -7, jsonName: "txinsufficient_balance" },
      { name: "txNO_ACCOUNT", value: -8, jsonName: "txno_account" },
      { name: "txINSUFFICIENT_FEE", value: -9, jsonName: "txinsufficient_fee" },
      { name: "txBAD_AUTH_EXTRA", value: -10, jsonName: "txbad_auth_extra" },
      { name: "txINTERNAL_ERROR", value: -11, jsonName: "txinternal_error" },
      { name: "txNOT_SUPPORTED", value: -12, jsonName: "txnot_supported" },
      { name: "txFEE_BUMP_INNER_FAILED", value: -13, jsonName: "txfee_bump_inner_failed" },
      { name: "txBAD_SPONSORSHIP", value: -14, jsonName: "txbad_sponsorship" },
      { name: "txBAD_MIN_SEQ_AGE_OR_GAP", value: -15, jsonName: "txbad_min_seq_age_or_gap" },
      { name: "txMALFORMED", value: -16, jsonName: "txmalformed" },
      { name: "txSOROBAN_INVALID", value: -17, jsonName: "txsoroban_invalid" },
    ],
  },
  "ErrorCode": {
    name: "ErrorCode",
    prefix: "ERR_",
    members: [
      { name: "ERR_MISC", value: 0, jsonName: "misc" },
      { name: "ERR_DATA", value: 1, jsonName: "data" },
      { name: "ERR_CONF", value: 2, jsonName: "conf" },
      { name: "ERR_AUTH", value: 3, jsonName: "auth" },
      { name: "ERR_LOAD", value: 4, jsonName: "load" },
    ],
  },
  "IPAddrType": {
    name: "IPAddrType",
    prefix: "",
    members: [
      { name: "IPv4", value: 0, jsonName: "ipv4" },
      { name: "IPv6", value: 1, jsonName: "ipv6" },
    ],
  },
  "MessageType": {
    name: "MessageType",
    prefix: "",
    members: [
      { name: "ERROR_MSG", value: 0, jsonName: "error_msg" },
      { name: "AUTH", value: 2, jsonName: "auth" },
      { name: "DONT_HAVE", value: 3, jsonName: "dont_have" },
      { name: "PEERS", value: 5, jsonName: "peers" },
      { name: "GET_TX_SET", value: 6, jsonName: "get_tx_set" },
      { name: "TX_SET", value: 7, jsonName: "tx_set" },
      { name: "GENERALIZED_TX_SET", value: 17, jsonName: "generalized_tx_set" },
      { name: "TRANSACTION", value: 8, jsonName: "transaction" },
      { name: "GET_SCP_QUORUMSET", value: 9, jsonName: "get_scp_quorumset" },
      { name: "SCP_QUORUMSET", value: 10, jsonName: "scp_quorumset" },
      { name: "SCP_MESSAGE", value: 11, jsonName: "scp_message" },
      { name: "GET_SCP_STATE", value: 12, jsonName: "get_scp_state" },
      { name: "HELLO", value: 13, jsonName: "hello" },
      { name: "SEND_MORE", value: 16, jsonName: "send_more" },
      { name: "SEND_MORE_EXTENDED", value: 20, jsonName: "send_more_extended" },
      { name: "FLOOD_ADVERT", value: 18, jsonName: "flood_advert" },
      { name: "FLOOD_DEMAND", value: 19, jsonName: "flood_demand" },
      { name: "TIME_SLICED_SURVEY_REQUEST", value: 21, jsonName: "time_sliced_survey_request" },
      { name: "TIME_SLICED_SURVEY_RESPONSE", value: 22, jsonName: "time_sliced_survey_response" },
      { name: "TIME_SLICED_SURVEY_START_COLLECTING", value: 23, jsonName: "time_sliced_survey_start_collecting" },
      { name: "TIME_SLICED_SURVEY_STOP_COLLECTING", value: 24, jsonName: "time_sliced_survey_stop_collecting" },
    ],
  },
  "SurveyMessageCommandType": {
    name: "SurveyMessageCommandType",
    prefix: "",
    members: [
      { name: "TIME_SLICED_SURVEY_TOPOLOGY", value: 1, jsonName: "time_sliced_survey_topology" },
    ],
  },
  "SurveyMessageResponseType": {
    name: "SurveyMessageResponseType",
    prefix: "",
    members: [
      { name: "SURVEY_TOPOLOGY_RESPONSE_V2", value: 2, jsonName: "survey_topology_response_v2" },
    ],
  },
}

export const UNION_INTROSPECTION: Record<string, UnionIntrospection> = /*#__PURE__*/ {
  "ExtensionPoint": {
    name: "ExtensionPoint",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
    ],
  },
  "PublicKey": {
    name: "PublicKey",
    discriminantName: "type",
    discriminantType: "PublicKeyType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "ed25519",
        type: "uint256",
        cases: [
          { raw: "PUBLIC_KEY_TYPE_ED25519", numericValue: 0, jsonName: "public_key_type_ed25519" },
        ],
      },
    ],
  },
  "SignerKey": {
    name: "SignerKey",
    discriminantName: "type",
    discriminantType: "SignerKeyType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "ed25519",
        type: "uint256",
        cases: [
          { raw: "SIGNER_KEY_TYPE_ED25519", numericValue: 0, jsonName: "ed25519" },
        ],
      },
      {
        name: "preAuthTx",
        type: "uint256",
        cases: [
          { raw: "SIGNER_KEY_TYPE_PRE_AUTH_TX", numericValue: 1, jsonName: "pre_auth_tx" },
        ],
      },
      {
        name: "hashX",
        type: "uint256",
        cases: [
          { raw: "SIGNER_KEY_TYPE_HASH_X", numericValue: 2, jsonName: "hash_x" },
        ],
      },
      {
        name: "ed25519SignedPayload",
        type: "SignerKey_ed25519SignedPayload",
        cases: [
          { raw: "SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD", numericValue: 3, jsonName: "ed25519_signed_payload" },
        ],
      },
    ],
  },
  "ClaimableBalanceID": {
    name: "ClaimableBalanceID",
    discriminantName: "type",
    discriminantType: "ClaimableBalanceIDType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "v0",
        type: "Hash",
        cases: [
          { raw: "CLAIMABLE_BALANCE_ID_TYPE_V0", numericValue: 0, jsonName: "claimable_balance_id_type_v0" },
        ],
      },
    ],
  },
  "SCPStatement_pledges": {
    name: "SCPStatement_pledges",
    discriminantName: "type",
    discriminantType: "SCPStatementType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "prepare",
        type: "SCPStatement_prepare",
        cases: [
          { raw: "SCP_ST_PREPARE", numericValue: 0, jsonName: "prepare" },
        ],
      },
      {
        name: "confirm",
        type: "SCPStatement_confirm",
        cases: [
          { raw: "SCP_ST_CONFIRM", numericValue: 1, jsonName: "confirm" },
        ],
      },
      {
        name: "externalize",
        type: "SCPStatement_externalize",
        cases: [
          { raw: "SCP_ST_EXTERNALIZE", numericValue: 2, jsonName: "externalize" },
        ],
      },
      {
        name: "nominate",
        type: "SCPNomination",
        cases: [
          { raw: "SCP_ST_NOMINATE", numericValue: 3, jsonName: "nominate" },
        ],
      },
    ],
  },
  "SCError": {
    name: "SCError",
    discriminantName: "type",
    discriminantType: "SCErrorType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "contractCode",
        type: "uint32",
        cases: [
          { raw: "SCE_CONTRACT", numericValue: 0, jsonName: "contract" },
        ],
      },
      {
        name: "code",
        type: "SCErrorCode",
        cases: [
          { raw: "SCE_WASM_VM", numericValue: 1, jsonName: "wasm_vm" },
          { raw: "SCE_CONTEXT", numericValue: 2, jsonName: "context" },
          { raw: "SCE_STORAGE", numericValue: 3, jsonName: "storage" },
          { raw: "SCE_OBJECT", numericValue: 4, jsonName: "object" },
          { raw: "SCE_CRYPTO", numericValue: 5, jsonName: "crypto" },
          { raw: "SCE_EVENTS", numericValue: 6, jsonName: "events" },
          { raw: "SCE_BUDGET", numericValue: 7, jsonName: "budget" },
          { raw: "SCE_VALUE", numericValue: 8, jsonName: "value" },
          { raw: "SCE_AUTH", numericValue: 9, jsonName: "auth" },
        ],
      },
    ],
  },
  "ContractExecutable": {
    name: "ContractExecutable",
    discriminantName: "type",
    discriminantType: "ContractExecutableType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "wasm_hash",
        type: "Hash",
        cases: [
          { raw: "CONTRACT_EXECUTABLE_WASM", numericValue: 0, jsonName: "wasm" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "CONTRACT_EXECUTABLE_STELLAR_ASSET", numericValue: 1, jsonName: "stellar_asset" },
        ],
      },
    ],
  },
  "SCAddress": {
    name: "SCAddress",
    discriminantName: "type",
    discriminantType: "SCAddressType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "accountId",
        type: "AccountID",
        cases: [
          { raw: "SC_ADDRESS_TYPE_ACCOUNT", numericValue: 0, jsonName: "account" },
        ],
      },
      {
        name: "contractId",
        type: "ContractID",
        cases: [
          { raw: "SC_ADDRESS_TYPE_CONTRACT", numericValue: 1, jsonName: "contract" },
        ],
      },
      {
        name: "muxedAccount",
        type: "MuxedEd25519Account",
        cases: [
          { raw: "SC_ADDRESS_TYPE_MUXED_ACCOUNT", numericValue: 2, jsonName: "muxed_account" },
        ],
      },
      {
        name: "claimableBalanceId",
        type: "ClaimableBalanceID",
        cases: [
          { raw: "SC_ADDRESS_TYPE_CLAIMABLE_BALANCE", numericValue: 3, jsonName: "claimable_balance" },
        ],
      },
      {
        name: "liquidityPoolId",
        type: "PoolID",
        cases: [
          { raw: "SC_ADDRESS_TYPE_LIQUIDITY_POOL", numericValue: 4, jsonName: "liquidity_pool" },
        ],
      },
    ],
  },
  "SCVal": {
    name: "SCVal",
    discriminantName: "type",
    discriminantType: "SCValType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "b",
        type: "bool",
        cases: [
          { raw: "SCV_BOOL", numericValue: 0, jsonName: "bool" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "SCV_VOID", numericValue: 1, jsonName: "void" },
        ],
      },
      {
        name: "error",
        type: "SCError",
        cases: [
          { raw: "SCV_ERROR", numericValue: 2, jsonName: "error" },
        ],
      },
      {
        name: "u32",
        type: "uint32",
        cases: [
          { raw: "SCV_U32", numericValue: 3, jsonName: "u32" },
        ],
      },
      {
        name: "i32",
        type: "int32",
        cases: [
          { raw: "SCV_I32", numericValue: 4, jsonName: "i32" },
        ],
      },
      {
        name: "u64",
        type: "uint64",
        cases: [
          { raw: "SCV_U64", numericValue: 5, jsonName: "u64" },
        ],
      },
      {
        name: "i64",
        type: "int64",
        cases: [
          { raw: "SCV_I64", numericValue: 6, jsonName: "i64" },
        ],
      },
      {
        name: "timepoint",
        type: "TimePoint",
        cases: [
          { raw: "SCV_TIMEPOINT", numericValue: 7, jsonName: "timepoint" },
        ],
      },
      {
        name: "duration",
        type: "Duration",
        cases: [
          { raw: "SCV_DURATION", numericValue: 8, jsonName: "duration" },
        ],
      },
      {
        name: "u128",
        type: "UInt128Parts",
        cases: [
          { raw: "SCV_U128", numericValue: 9, jsonName: "u128" },
        ],
      },
      {
        name: "i128",
        type: "Int128Parts",
        cases: [
          { raw: "SCV_I128", numericValue: 10, jsonName: "i128" },
        ],
      },
      {
        name: "u256",
        type: "UInt256Parts",
        cases: [
          { raw: "SCV_U256", numericValue: 11, jsonName: "u256" },
        ],
      },
      {
        name: "i256",
        type: "Int256Parts",
        cases: [
          { raw: "SCV_I256", numericValue: 12, jsonName: "i256" },
        ],
      },
      {
        name: "bytes",
        type: "SCBytes",
        cases: [
          { raw: "SCV_BYTES", numericValue: 13, jsonName: "bytes" },
        ],
      },
      {
        name: "str",
        type: "SCString",
        cases: [
          { raw: "SCV_STRING", numericValue: 14, jsonName: "string" },
        ],
      },
      {
        name: "sym",
        type: "SCSymbol",
        cases: [
          { raw: "SCV_SYMBOL", numericValue: 15, jsonName: "symbol" },
        ],
      },
      {
        name: "vec",
        type: "SCVec*",
        cases: [
          { raw: "SCV_VEC", numericValue: 16, jsonName: "vec" },
        ],
      },
      {
        name: "map",
        type: "SCMap*",
        cases: [
          { raw: "SCV_MAP", numericValue: 17, jsonName: "map" },
        ],
      },
      {
        name: "address",
        type: "SCAddress",
        cases: [
          { raw: "SCV_ADDRESS", numericValue: 18, jsonName: "address" },
        ],
      },
      {
        name: "instance",
        type: "SCContractInstance",
        cases: [
          { raw: "SCV_CONTRACT_INSTANCE", numericValue: 19, jsonName: "contract_instance" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "SCV_LEDGER_KEY_CONTRACT_INSTANCE", numericValue: 20, jsonName: "ledger_key_contract_instance" },
        ],
      },
      {
        name: "nonce_key",
        type: "SCNonceKey",
        cases: [
          { raw: "SCV_LEDGER_KEY_NONCE", numericValue: 21, jsonName: "ledger_key_nonce" },
        ],
      },
    ],
  },
  "SCSpecTypeDef": {
    name: "SCSpecTypeDef",
    discriminantName: "type",
    discriminantType: "SCSpecType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "SC_SPEC_TYPE_VAL", numericValue: 0, jsonName: "val" },
          { raw: "SC_SPEC_TYPE_BOOL", numericValue: 1, jsonName: "bool" },
          { raw: "SC_SPEC_TYPE_VOID", numericValue: 2, jsonName: "void" },
          { raw: "SC_SPEC_TYPE_ERROR", numericValue: 3, jsonName: "error" },
          { raw: "SC_SPEC_TYPE_U32", numericValue: 4, jsonName: "u32" },
          { raw: "SC_SPEC_TYPE_I32", numericValue: 5, jsonName: "i32" },
          { raw: "SC_SPEC_TYPE_U64", numericValue: 6, jsonName: "u64" },
          { raw: "SC_SPEC_TYPE_I64", numericValue: 7, jsonName: "i64" },
          { raw: "SC_SPEC_TYPE_TIMEPOINT", numericValue: 8, jsonName: "timepoint" },
          { raw: "SC_SPEC_TYPE_DURATION", numericValue: 9, jsonName: "duration" },
          { raw: "SC_SPEC_TYPE_U128", numericValue: 10, jsonName: "u128" },
          { raw: "SC_SPEC_TYPE_I128", numericValue: 11, jsonName: "i128" },
          { raw: "SC_SPEC_TYPE_U256", numericValue: 12, jsonName: "u256" },
          { raw: "SC_SPEC_TYPE_I256", numericValue: 13, jsonName: "i256" },
          { raw: "SC_SPEC_TYPE_BYTES", numericValue: 14, jsonName: "bytes" },
          { raw: "SC_SPEC_TYPE_STRING", numericValue: 16, jsonName: "string" },
          { raw: "SC_SPEC_TYPE_SYMBOL", numericValue: 17, jsonName: "symbol" },
          { raw: "SC_SPEC_TYPE_ADDRESS", numericValue: 19, jsonName: "address" },
          { raw: "SC_SPEC_TYPE_MUXED_ADDRESS", numericValue: 20, jsonName: "muxed_address" },
        ],
      },
      {
        name: "option",
        type: "SCSpecTypeOption",
        cases: [
          { raw: "SC_SPEC_TYPE_OPTION", numericValue: 1000, jsonName: "option" },
        ],
      },
      {
        name: "result",
        type: "SCSpecTypeResult",
        cases: [
          { raw: "SC_SPEC_TYPE_RESULT", numericValue: 1001, jsonName: "result" },
        ],
      },
      {
        name: "vec",
        type: "SCSpecTypeVec",
        cases: [
          { raw: "SC_SPEC_TYPE_VEC", numericValue: 1002, jsonName: "vec" },
        ],
      },
      {
        name: "map",
        type: "SCSpecTypeMap",
        cases: [
          { raw: "SC_SPEC_TYPE_MAP", numericValue: 1004, jsonName: "map" },
        ],
      },
      {
        name: "tuple",
        type: "SCSpecTypeTuple",
        cases: [
          { raw: "SC_SPEC_TYPE_TUPLE", numericValue: 1005, jsonName: "tuple" },
        ],
      },
      {
        name: "bytesN",
        type: "SCSpecTypeBytesN",
        cases: [
          { raw: "SC_SPEC_TYPE_BYTES_N", numericValue: 1006, jsonName: "bytes_n" },
        ],
      },
      {
        name: "udt",
        type: "SCSpecTypeUDT",
        cases: [
          { raw: "SC_SPEC_TYPE_UDT", numericValue: 2000, jsonName: "udt" },
        ],
      },
    ],
  },
  "SCSpecUDTUnionCaseV0": {
    name: "SCSpecUDTUnionCaseV0",
    discriminantName: "kind",
    discriminantType: "SCSpecUDTUnionCaseV0Kind",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "voidCase",
        type: "SCSpecUDTUnionCaseVoidV0",
        cases: [
          { raw: "SC_SPEC_UDT_UNION_CASE_VOID_V0", numericValue: 0, jsonName: "void_v0" },
        ],
      },
      {
        name: "tupleCase",
        type: "SCSpecUDTUnionCaseTupleV0",
        cases: [
          { raw: "SC_SPEC_UDT_UNION_CASE_TUPLE_V0", numericValue: 1, jsonName: "tuple_v0" },
        ],
      },
    ],
  },
  "SCSpecEntry": {
    name: "SCSpecEntry",
    discriminantName: "kind",
    discriminantType: "SCSpecEntryKind",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "functionV0",
        type: "SCSpecFunctionV0",
        cases: [
          { raw: "SC_SPEC_ENTRY_FUNCTION_V0", numericValue: 0, jsonName: "function_v0" },
        ],
      },
      {
        name: "udtStructV0",
        type: "SCSpecUDTStructV0",
        cases: [
          { raw: "SC_SPEC_ENTRY_UDT_STRUCT_V0", numericValue: 1, jsonName: "udt_struct_v0" },
        ],
      },
      {
        name: "udtUnionV0",
        type: "SCSpecUDTUnionV0",
        cases: [
          { raw: "SC_SPEC_ENTRY_UDT_UNION_V0", numericValue: 2, jsonName: "udt_union_v0" },
        ],
      },
      {
        name: "udtEnumV0",
        type: "SCSpecUDTEnumV0",
        cases: [
          { raw: "SC_SPEC_ENTRY_UDT_ENUM_V0", numericValue: 3, jsonName: "udt_enum_v0" },
        ],
      },
      {
        name: "udtErrorEnumV0",
        type: "SCSpecUDTErrorEnumV0",
        cases: [
          { raw: "SC_SPEC_ENTRY_UDT_ERROR_ENUM_V0", numericValue: 4, jsonName: "udt_error_enum_v0" },
        ],
      },
      {
        name: "eventV0",
        type: "SCSpecEventV0",
        cases: [
          { raw: "SC_SPEC_ENTRY_EVENT_V0", numericValue: 5, jsonName: "event_v0" },
        ],
      },
    ],
  },
  "SCEnvMetaEntry": {
    name: "SCEnvMetaEntry",
    discriminantName: "kind",
    discriminantType: "SCEnvMetaKind",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "interfaceVersion",
        type: "SCEnvMetaEntry_interfaceVersion",
        cases: [
          { raw: "SC_ENV_META_KIND_INTERFACE_VERSION", numericValue: 0, jsonName: "sc_env_meta_kind_interface_version" },
        ],
      },
    ],
  },
  "SCMetaEntry": {
    name: "SCMetaEntry",
    discriminantName: "kind",
    discriminantType: "SCMetaKind",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "v0",
        type: "SCMetaV0",
        cases: [
          { raw: "SC_META_V0", numericValue: 0, jsonName: "sc_meta_v0" },
        ],
      },
    ],
  },
  "ConfigSettingEntry": {
    name: "ConfigSettingEntry",
    discriminantName: "configSettingID",
    discriminantType: "ConfigSettingID",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "contractMaxSizeBytes",
        type: "uint32",
        cases: [
          { raw: "CONFIG_SETTING_CONTRACT_MAX_SIZE_BYTES", numericValue: 0, jsonName: "contract_max_size_bytes" },
        ],
      },
      {
        name: "contractCompute",
        type: "ConfigSettingContractComputeV0",
        cases: [
          { raw: "CONFIG_SETTING_CONTRACT_COMPUTE_V0", numericValue: 1, jsonName: "contract_compute_v0" },
        ],
      },
      {
        name: "contractLedgerCost",
        type: "ConfigSettingContractLedgerCostV0",
        cases: [
          { raw: "CONFIG_SETTING_CONTRACT_LEDGER_COST_V0", numericValue: 2, jsonName: "contract_ledger_cost_v0" },
        ],
      },
      {
        name: "contractHistoricalData",
        type: "ConfigSettingContractHistoricalDataV0",
        cases: [
          { raw: "CONFIG_SETTING_CONTRACT_HISTORICAL_DATA_V0", numericValue: 3, jsonName: "contract_historical_data_v0" },
        ],
      },
      {
        name: "contractEvents",
        type: "ConfigSettingContractEventsV0",
        cases: [
          { raw: "CONFIG_SETTING_CONTRACT_EVENTS_V0", numericValue: 4, jsonName: "contract_events_v0" },
        ],
      },
      {
        name: "contractBandwidth",
        type: "ConfigSettingContractBandwidthV0",
        cases: [
          { raw: "CONFIG_SETTING_CONTRACT_BANDWIDTH_V0", numericValue: 5, jsonName: "contract_bandwidth_v0" },
        ],
      },
      {
        name: "contractCostParamsCpuInsns",
        type: "ContractCostParams",
        cases: [
          { raw: "CONFIG_SETTING_CONTRACT_COST_PARAMS_CPU_INSTRUCTIONS", numericValue: 6, jsonName: "contract_cost_params_cpu_instructions" },
        ],
      },
      {
        name: "contractCostParamsMemBytes",
        type: "ContractCostParams",
        cases: [
          { raw: "CONFIG_SETTING_CONTRACT_COST_PARAMS_MEMORY_BYTES", numericValue: 7, jsonName: "contract_cost_params_memory_bytes" },
        ],
      },
      {
        name: "contractDataKeySizeBytes",
        type: "uint32",
        cases: [
          { raw: "CONFIG_SETTING_CONTRACT_DATA_KEY_SIZE_BYTES", numericValue: 8, jsonName: "contract_data_key_size_bytes" },
        ],
      },
      {
        name: "contractDataEntrySizeBytes",
        type: "uint32",
        cases: [
          { raw: "CONFIG_SETTING_CONTRACT_DATA_ENTRY_SIZE_BYTES", numericValue: 9, jsonName: "contract_data_entry_size_bytes" },
        ],
      },
      {
        name: "stateArchivalSettings",
        type: "StateArchivalSettings",
        cases: [
          { raw: "CONFIG_SETTING_STATE_ARCHIVAL", numericValue: 10, jsonName: "state_archival" },
        ],
      },
      {
        name: "contractExecutionLanes",
        type: "ConfigSettingContractExecutionLanesV0",
        cases: [
          { raw: "CONFIG_SETTING_CONTRACT_EXECUTION_LANES", numericValue: 11, jsonName: "contract_execution_lanes" },
        ],
      },
      {
        name: "liveSorobanStateSizeWindow",
        type: "uint64<>",
        cases: [
          { raw: "CONFIG_SETTING_LIVE_SOROBAN_STATE_SIZE_WINDOW", numericValue: 12, jsonName: "live_soroban_state_size_window" },
        ],
      },
      {
        name: "evictionIterator",
        type: "EvictionIterator",
        cases: [
          { raw: "CONFIG_SETTING_EVICTION_ITERATOR", numericValue: 13, jsonName: "eviction_iterator" },
        ],
      },
      {
        name: "contractParallelCompute",
        type: "ConfigSettingContractParallelComputeV0",
        cases: [
          { raw: "CONFIG_SETTING_CONTRACT_PARALLEL_COMPUTE_V0", numericValue: 14, jsonName: "contract_parallel_compute_v0" },
        ],
      },
      {
        name: "contractLedgerCostExt",
        type: "ConfigSettingContractLedgerCostExtV0",
        cases: [
          { raw: "CONFIG_SETTING_CONTRACT_LEDGER_COST_EXT_V0", numericValue: 15, jsonName: "contract_ledger_cost_ext_v0" },
        ],
      },
      {
        name: "contractSCPTiming",
        type: "ConfigSettingSCPTiming",
        cases: [
          { raw: "CONFIG_SETTING_SCP_TIMING", numericValue: 16, jsonName: "scp_timing" },
        ],
      },
    ],
  },
  "AssetCode": {
    name: "AssetCode",
    discriminantName: "type",
    discriminantType: "AssetType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "assetCode4",
        type: "AssetCode4",
        cases: [
          { raw: "ASSET_TYPE_CREDIT_ALPHANUM4", numericValue: 1, jsonName: "credit_alphanum4" },
        ],
      },
      {
        name: "assetCode12",
        type: "AssetCode12",
        cases: [
          { raw: "ASSET_TYPE_CREDIT_ALPHANUM12", numericValue: 2, jsonName: "credit_alphanum12" },
        ],
      },
    ],
  },
  "Asset": {
    name: "Asset",
    discriminantName: "type",
    discriminantType: "AssetType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "ASSET_TYPE_NATIVE", numericValue: 0, jsonName: "native" },
        ],
      },
      {
        name: "alphaNum4",
        type: "AlphaNum4",
        cases: [
          { raw: "ASSET_TYPE_CREDIT_ALPHANUM4", numericValue: 1, jsonName: "credit_alphanum4" },
        ],
      },
      {
        name: "alphaNum12",
        type: "AlphaNum12",
        cases: [
          { raw: "ASSET_TYPE_CREDIT_ALPHANUM12", numericValue: 2, jsonName: "credit_alphanum12" },
        ],
      },
    ],
  },
  "AccountEntryExtensionV2_ext": {
    name: "AccountEntryExtensionV2_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
      {
        name: "v3",
        type: "AccountEntryExtensionV3",
        cases: [
          { raw: 3, numericValue: 3, jsonName: "v3" },
        ],
      },
    ],
  },
  "AccountEntryExtensionV1_ext": {
    name: "AccountEntryExtensionV1_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
      {
        name: "v2",
        type: "AccountEntryExtensionV2",
        cases: [
          { raw: 2, numericValue: 2, jsonName: "v2" },
        ],
      },
    ],
  },
  "AccountEntry_ext": {
    name: "AccountEntry_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
      {
        name: "v1",
        type: "AccountEntryExtensionV1",
        cases: [
          { raw: 1, numericValue: 1, jsonName: "v1" },
        ],
      },
    ],
  },
  "TrustLineAsset": {
    name: "TrustLineAsset",
    discriminantName: "type",
    discriminantType: "AssetType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "ASSET_TYPE_NATIVE", numericValue: 0, jsonName: "native" },
        ],
      },
      {
        name: "alphaNum4",
        type: "AlphaNum4",
        cases: [
          { raw: "ASSET_TYPE_CREDIT_ALPHANUM4", numericValue: 1, jsonName: "credit_alphanum4" },
        ],
      },
      {
        name: "alphaNum12",
        type: "AlphaNum12",
        cases: [
          { raw: "ASSET_TYPE_CREDIT_ALPHANUM12", numericValue: 2, jsonName: "credit_alphanum12" },
        ],
      },
      {
        name: "liquidityPoolID",
        type: "PoolID",
        cases: [
          { raw: "ASSET_TYPE_POOL_SHARE", numericValue: 3, jsonName: "pool_share" },
        ],
      },
    ],
  },
  "TrustLineEntryExtensionV2_ext": {
    name: "TrustLineEntryExtensionV2_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
    ],
  },
  "ext": {
    name: "ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
      {
        name: "v2",
        type: "TrustLineEntryExtensionV2",
        cases: [
          { raw: 2, numericValue: 2, jsonName: "v2" },
        ],
      },
    ],
  },
  "TrustLineEntry_ext": {
    name: "TrustLineEntry_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
      {
        name: "v1",
        type: "TrustLineEntry_v1",
        cases: [
          { raw: 1, numericValue: 1, jsonName: "v1" },
        ],
      },
    ],
  },
  "OfferEntry_ext": {
    name: "OfferEntry_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
    ],
  },
  "DataEntry_ext": {
    name: "DataEntry_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
    ],
  },
  "ClaimPredicate": {
    name: "ClaimPredicate",
    discriminantName: "type",
    discriminantType: "ClaimPredicateType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "CLAIM_PREDICATE_UNCONDITIONAL", numericValue: 0, jsonName: "unconditional" },
        ],
      },
      {
        name: "andPredicates",
        type: "ClaimPredicate<2>",
        cases: [
          { raw: "CLAIM_PREDICATE_AND", numericValue: 1, jsonName: "and" },
        ],
      },
      {
        name: "orPredicates",
        type: "ClaimPredicate<2>",
        cases: [
          { raw: "CLAIM_PREDICATE_OR", numericValue: 2, jsonName: "or" },
        ],
      },
      {
        name: "notPredicate",
        type: "ClaimPredicate*",
        cases: [
          { raw: "CLAIM_PREDICATE_NOT", numericValue: 3, jsonName: "not" },
        ],
      },
      {
        name: "absBefore",
        type: "int64",
        cases: [
          { raw: "CLAIM_PREDICATE_BEFORE_ABSOLUTE_TIME", numericValue: 4, jsonName: "before_absolute_time" },
        ],
      },
      {
        name: "relBefore",
        type: "int64",
        cases: [
          { raw: "CLAIM_PREDICATE_BEFORE_RELATIVE_TIME", numericValue: 5, jsonName: "before_relative_time" },
        ],
      },
    ],
  },
  "Claimant": {
    name: "Claimant",
    discriminantName: "type",
    discriminantType: "ClaimantType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "v0",
        type: "Claimant_v0",
        cases: [
          { raw: "CLAIMANT_TYPE_V0", numericValue: 0, jsonName: "claimant_type_v0" },
        ],
      },
    ],
  },
  "ClaimableBalanceEntryExtensionV1_ext": {
    name: "ClaimableBalanceEntryExtensionV1_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
    ],
  },
  "ClaimableBalanceEntry_ext": {
    name: "ClaimableBalanceEntry_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
      {
        name: "v1",
        type: "ClaimableBalanceEntryExtensionV1",
        cases: [
          { raw: 1, numericValue: 1, jsonName: "v1" },
        ],
      },
    ],
  },
  "LiquidityPoolEntry_body": {
    name: "LiquidityPoolEntry_body",
    discriminantName: "type",
    discriminantType: "LiquidityPoolType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "constantProduct",
        type: "LiquidityPoolEntry_constantProduct",
        cases: [
          { raw: "LIQUIDITY_POOL_CONSTANT_PRODUCT", numericValue: 0, jsonName: "liquidity_pool_constant_product" },
        ],
      },
    ],
  },
  "ContractCodeEntry_ext": {
    name: "ContractCodeEntry_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
      {
        name: "v1",
        type: "ContractCodeEntry_v1",
        cases: [
          { raw: 1, numericValue: 1, jsonName: "v1" },
        ],
      },
    ],
  },
  "LedgerEntryExtensionV1_ext": {
    name: "LedgerEntryExtensionV1_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
    ],
  },
  "LedgerEntry_data": {
    name: "LedgerEntry_data",
    discriminantName: "type",
    discriminantType: "LedgerEntryType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "account",
        type: "AccountEntry",
        cases: [
          { raw: "ACCOUNT", numericValue: 0, jsonName: "account" },
        ],
      },
      {
        name: "trustLine",
        type: "TrustLineEntry",
        cases: [
          { raw: "TRUSTLINE", numericValue: 1, jsonName: "trustline" },
        ],
      },
      {
        name: "offer",
        type: "OfferEntry",
        cases: [
          { raw: "OFFER", numericValue: 2, jsonName: "offer" },
        ],
      },
      {
        name: "data",
        type: "DataEntry",
        cases: [
          { raw: "DATA", numericValue: 3, jsonName: "data" },
        ],
      },
      {
        name: "claimableBalance",
        type: "ClaimableBalanceEntry",
        cases: [
          { raw: "CLAIMABLE_BALANCE", numericValue: 4, jsonName: "claimable_balance" },
        ],
      },
      {
        name: "liquidityPool",
        type: "LiquidityPoolEntry",
        cases: [
          { raw: "LIQUIDITY_POOL", numericValue: 5, jsonName: "liquidity_pool" },
        ],
      },
      {
        name: "contractData",
        type: "ContractDataEntry",
        cases: [
          { raw: "CONTRACT_DATA", numericValue: 6, jsonName: "contract_data" },
        ],
      },
      {
        name: "contractCode",
        type: "ContractCodeEntry",
        cases: [
          { raw: "CONTRACT_CODE", numericValue: 7, jsonName: "contract_code" },
        ],
      },
      {
        name: "configSetting",
        type: "ConfigSettingEntry",
        cases: [
          { raw: "CONFIG_SETTING", numericValue: 8, jsonName: "config_setting" },
        ],
      },
      {
        name: "ttl",
        type: "TTLEntry",
        cases: [
          { raw: "TTL", numericValue: 9, jsonName: "ttl" },
        ],
      },
    ],
  },
  "LedgerEntry_ext": {
    name: "LedgerEntry_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
      {
        name: "v1",
        type: "LedgerEntryExtensionV1",
        cases: [
          { raw: 1, numericValue: 1, jsonName: "v1" },
        ],
      },
    ],
  },
  "LedgerKey": {
    name: "LedgerKey",
    discriminantName: "type",
    discriminantType: "LedgerEntryType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "account",
        type: "LedgerKey_account",
        cases: [
          { raw: "ACCOUNT", numericValue: 0, jsonName: "account" },
        ],
      },
      {
        name: "trustLine",
        type: "LedgerKey_trustLine",
        cases: [
          { raw: "TRUSTLINE", numericValue: 1, jsonName: "trustline" },
        ],
      },
      {
        name: "offer",
        type: "LedgerKey_offer",
        cases: [
          { raw: "OFFER", numericValue: 2, jsonName: "offer" },
        ],
      },
      {
        name: "data",
        type: "LedgerKey_data",
        cases: [
          { raw: "DATA", numericValue: 3, jsonName: "data" },
        ],
      },
      {
        name: "claimableBalance",
        type: "LedgerKey_claimableBalance",
        cases: [
          { raw: "CLAIMABLE_BALANCE", numericValue: 4, jsonName: "claimable_balance" },
        ],
      },
      {
        name: "liquidityPool",
        type: "LedgerKey_liquidityPool",
        cases: [
          { raw: "LIQUIDITY_POOL", numericValue: 5, jsonName: "liquidity_pool" },
        ],
      },
      {
        name: "contractData",
        type: "LedgerKey_contractData",
        cases: [
          { raw: "CONTRACT_DATA", numericValue: 6, jsonName: "contract_data" },
        ],
      },
      {
        name: "contractCode",
        type: "LedgerKey_contractCode",
        cases: [
          { raw: "CONTRACT_CODE", numericValue: 7, jsonName: "contract_code" },
        ],
      },
      {
        name: "configSetting",
        type: "LedgerKey_configSetting",
        cases: [
          { raw: "CONFIG_SETTING", numericValue: 8, jsonName: "config_setting" },
        ],
      },
      {
        name: "ttl",
        type: "LedgerKey_ttl",
        cases: [
          { raw: "TTL", numericValue: 9, jsonName: "ttl" },
        ],
      },
    ],
  },
  "BucketMetadata_ext": {
    name: "BucketMetadata_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
      {
        name: "bucketListType",
        type: "BucketListType",
        cases: [
          { raw: 1, numericValue: 1, jsonName: "v1" },
        ],
      },
    ],
  },
  "BucketEntry": {
    name: "BucketEntry",
    discriminantName: "type",
    discriminantType: "BucketEntryType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "liveEntry",
        type: "LedgerEntry",
        cases: [
          { raw: "LIVEENTRY", numericValue: 0, jsonName: "liveentry" },
          { raw: "INITENTRY", numericValue: 2, jsonName: "initentry" },
        ],
      },
      {
        name: "deadEntry",
        type: "LedgerKey",
        cases: [
          { raw: "DEADENTRY", numericValue: 1, jsonName: "deadentry" },
        ],
      },
      {
        name: "metaEntry",
        type: "BucketMetadata",
        cases: [
          { raw: "METAENTRY", numericValue: -1, jsonName: "metaentry" },
        ],
      },
    ],
  },
  "HotArchiveBucketEntry": {
    name: "HotArchiveBucketEntry",
    discriminantName: "type",
    discriminantType: "HotArchiveBucketEntryType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "archivedEntry",
        type: "LedgerEntry",
        cases: [
          { raw: "HOT_ARCHIVE_ARCHIVED", numericValue: 0, jsonName: "archived" },
        ],
      },
      {
        name: "key",
        type: "LedgerKey",
        cases: [
          { raw: "HOT_ARCHIVE_LIVE", numericValue: 1, jsonName: "live" },
        ],
      },
      {
        name: "metaEntry",
        type: "BucketMetadata",
        cases: [
          { raw: "HOT_ARCHIVE_METAENTRY", numericValue: -1, jsonName: "metaentry" },
        ],
      },
    ],
  },
  "StellarValue_ext": {
    name: "StellarValue_ext",
    discriminantName: "v",
    discriminantType: "StellarValueType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "STELLAR_VALUE_BASIC", numericValue: 0, jsonName: "basic" },
        ],
      },
      {
        name: "lcValueSignature",
        type: "LedgerCloseValueSignature",
        cases: [
          { raw: "STELLAR_VALUE_SIGNED", numericValue: 1, jsonName: "signed" },
        ],
      },
    ],
  },
  "LedgerHeaderExtensionV1_ext": {
    name: "LedgerHeaderExtensionV1_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
    ],
  },
  "LedgerHeader_ext": {
    name: "LedgerHeader_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
      {
        name: "v1",
        type: "LedgerHeaderExtensionV1",
        cases: [
          { raw: 1, numericValue: 1, jsonName: "v1" },
        ],
      },
    ],
  },
  "LedgerUpgrade": {
    name: "LedgerUpgrade",
    discriminantName: "type",
    discriminantType: "LedgerUpgradeType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "newLedgerVersion",
        type: "uint32",
        cases: [
          { raw: "LEDGER_UPGRADE_VERSION", numericValue: 1, jsonName: "version" },
        ],
      },
      {
        name: "newBaseFee",
        type: "uint32",
        cases: [
          { raw: "LEDGER_UPGRADE_BASE_FEE", numericValue: 2, jsonName: "base_fee" },
        ],
      },
      {
        name: "newMaxTxSetSize",
        type: "uint32",
        cases: [
          { raw: "LEDGER_UPGRADE_MAX_TX_SET_SIZE", numericValue: 3, jsonName: "max_tx_set_size" },
        ],
      },
      {
        name: "newBaseReserve",
        type: "uint32",
        cases: [
          { raw: "LEDGER_UPGRADE_BASE_RESERVE", numericValue: 4, jsonName: "base_reserve" },
        ],
      },
      {
        name: "newFlags",
        type: "uint32",
        cases: [
          { raw: "LEDGER_UPGRADE_FLAGS", numericValue: 5, jsonName: "flags" },
        ],
      },
      {
        name: "newConfig",
        type: "ConfigUpgradeSetKey",
        cases: [
          { raw: "LEDGER_UPGRADE_CONFIG", numericValue: 6, jsonName: "config" },
        ],
      },
      {
        name: "newMaxSorobanTxSetSize",
        type: "uint32",
        cases: [
          { raw: "LEDGER_UPGRADE_MAX_SOROBAN_TX_SET_SIZE", numericValue: 7, jsonName: "max_soroban_tx_set_size" },
        ],
      },
    ],
  },
  "TxSetComponent": {
    name: "TxSetComponent",
    discriminantName: "type",
    discriminantType: "TxSetComponentType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "txsMaybeDiscountedFee",
        type: "TxSetComponent_txsMaybeDiscountedFee",
        cases: [
          { raw: "TXSET_COMP_TXS_MAYBE_DISCOUNTED_FEE", numericValue: 0, jsonName: "txset_comp_txs_maybe_discounted_fee" },
        ],
      },
    ],
  },
  "TransactionPhase": {
    name: "TransactionPhase",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: "v0Components",
        type: "TxSetComponent<>",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
      {
        name: "parallelTxsComponent",
        type: "ParallelTxsComponent",
        cases: [
          { raw: 1, numericValue: 1, jsonName: "v1" },
        ],
      },
    ],
  },
  "GeneralizedTransactionSet": {
    name: "GeneralizedTransactionSet",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: "v1TxSet",
        type: "TransactionSetV1",
        cases: [
          { raw: 1, numericValue: 1, jsonName: "v1" },
        ],
      },
    ],
  },
  "TransactionHistoryEntry_ext": {
    name: "TransactionHistoryEntry_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
      {
        name: "generalizedTxSet",
        type: "GeneralizedTransactionSet",
        cases: [
          { raw: 1, numericValue: 1, jsonName: "v1" },
        ],
      },
    ],
  },
  "TransactionHistoryResultEntry_ext": {
    name: "TransactionHistoryResultEntry_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
    ],
  },
  "LedgerHeaderHistoryEntry_ext": {
    name: "LedgerHeaderHistoryEntry_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
    ],
  },
  "SCPHistoryEntry": {
    name: "SCPHistoryEntry",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: "v0",
        type: "SCPHistoryEntryV0",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
    ],
  },
  "LedgerEntryChange": {
    name: "LedgerEntryChange",
    discriminantName: "type",
    discriminantType: "LedgerEntryChangeType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "created",
        type: "LedgerEntry",
        cases: [
          { raw: "LEDGER_ENTRY_CREATED", numericValue: 0, jsonName: "created" },
        ],
      },
      {
        name: "updated",
        type: "LedgerEntry",
        cases: [
          { raw: "LEDGER_ENTRY_UPDATED", numericValue: 1, jsonName: "updated" },
        ],
      },
      {
        name: "removed",
        type: "LedgerKey",
        cases: [
          { raw: "LEDGER_ENTRY_REMOVED", numericValue: 2, jsonName: "removed" },
        ],
      },
      {
        name: "state",
        type: "LedgerEntry",
        cases: [
          { raw: "LEDGER_ENTRY_STATE", numericValue: 3, jsonName: "state" },
        ],
      },
      {
        name: "restored",
        type: "LedgerEntry",
        cases: [
          { raw: "LEDGER_ENTRY_RESTORED", numericValue: 4, jsonName: "restored" },
        ],
      },
    ],
  },
  "ContractEvent_body": {
    name: "ContractEvent_body",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: "v0",
        type: "ContractEvent_v0",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
    ],
  },
  "SorobanTransactionMetaExt": {
    name: "SorobanTransactionMetaExt",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
      {
        name: "v1",
        type: "SorobanTransactionMetaExtV1",
        cases: [
          { raw: 1, numericValue: 1, jsonName: "v1" },
        ],
      },
    ],
  },
  "TransactionMeta": {
    name: "TransactionMeta",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: "operations",
        type: "OperationMeta<>",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
      {
        name: "v1",
        type: "TransactionMetaV1",
        cases: [
          { raw: 1, numericValue: 1, jsonName: "v1" },
        ],
      },
      {
        name: "v2",
        type: "TransactionMetaV2",
        cases: [
          { raw: 2, numericValue: 2, jsonName: "v2" },
        ],
      },
      {
        name: "v3",
        type: "TransactionMetaV3",
        cases: [
          { raw: 3, numericValue: 3, jsonName: "v3" },
        ],
      },
      {
        name: "v4",
        type: "TransactionMetaV4",
        cases: [
          { raw: 4, numericValue: 4, jsonName: "v4" },
        ],
      },
    ],
  },
  "LedgerCloseMetaExt": {
    name: "LedgerCloseMetaExt",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
      {
        name: "v1",
        type: "LedgerCloseMetaExtV1",
        cases: [
          { raw: 1, numericValue: 1, jsonName: "v1" },
        ],
      },
    ],
  },
  "LedgerCloseMeta": {
    name: "LedgerCloseMeta",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: "v0",
        type: "LedgerCloseMetaV0",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
      {
        name: "v1",
        type: "LedgerCloseMetaV1",
        cases: [
          { raw: 1, numericValue: 1, jsonName: "v1" },
        ],
      },
      {
        name: "v2",
        type: "LedgerCloseMetaV2",
        cases: [
          { raw: 2, numericValue: 2, jsonName: "v2" },
        ],
      },
    ],
  },
  "LiquidityPoolParameters": {
    name: "LiquidityPoolParameters",
    discriminantName: "type",
    discriminantType: "LiquidityPoolType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "constantProduct",
        type: "LiquidityPoolConstantProductParameters",
        cases: [
          { raw: "LIQUIDITY_POOL_CONSTANT_PRODUCT", numericValue: 0, jsonName: "liquidity_pool_constant_product" },
        ],
      },
    ],
  },
  "MuxedAccount": {
    name: "MuxedAccount",
    discriminantName: "type",
    discriminantType: "CryptoKeyType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "ed25519",
        type: "uint256",
        cases: [
          { raw: "KEY_TYPE_ED25519", numericValue: 0, jsonName: "ed25519" },
        ],
      },
      {
        name: "med25519",
        type: "MuxedAccount_med25519",
        cases: [
          { raw: "KEY_TYPE_MUXED_ED25519", numericValue: 256, jsonName: "muxed_ed25519" },
        ],
      },
    ],
  },
  "ChangeTrustAsset": {
    name: "ChangeTrustAsset",
    discriminantName: "type",
    discriminantType: "AssetType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "ASSET_TYPE_NATIVE", numericValue: 0, jsonName: "native" },
        ],
      },
      {
        name: "alphaNum4",
        type: "AlphaNum4",
        cases: [
          { raw: "ASSET_TYPE_CREDIT_ALPHANUM4", numericValue: 1, jsonName: "credit_alphanum4" },
        ],
      },
      {
        name: "alphaNum12",
        type: "AlphaNum12",
        cases: [
          { raw: "ASSET_TYPE_CREDIT_ALPHANUM12", numericValue: 2, jsonName: "credit_alphanum12" },
        ],
      },
      {
        name: "liquidityPool",
        type: "LiquidityPoolParameters",
        cases: [
          { raw: "ASSET_TYPE_POOL_SHARE", numericValue: 3, jsonName: "pool_share" },
        ],
      },
    ],
  },
  "RevokeSponsorshipOp": {
    name: "RevokeSponsorshipOp",
    discriminantName: "type",
    discriminantType: "RevokeSponsorshipType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "ledgerKey",
        type: "LedgerKey",
        cases: [
          { raw: "REVOKE_SPONSORSHIP_LEDGER_ENTRY", numericValue: 0, jsonName: "ledger_entry" },
        ],
      },
      {
        name: "signer",
        type: "RevokeSponsorshipOp_signer",
        cases: [
          { raw: "REVOKE_SPONSORSHIP_SIGNER", numericValue: 1, jsonName: "signer" },
        ],
      },
    ],
  },
  "ContractIDPreimage": {
    name: "ContractIDPreimage",
    discriminantName: "type",
    discriminantType: "ContractIDPreimageType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "fromAddress",
        type: "ContractIDPreimage_fromAddress",
        cases: [
          { raw: "CONTRACT_ID_PREIMAGE_FROM_ADDRESS", numericValue: 0, jsonName: "address" },
        ],
      },
      {
        name: "fromAsset",
        type: "Asset",
        cases: [
          { raw: "CONTRACT_ID_PREIMAGE_FROM_ASSET", numericValue: 1, jsonName: "asset" },
        ],
      },
    ],
  },
  "HostFunction": {
    name: "HostFunction",
    discriminantName: "type",
    discriminantType: "HostFunctionType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "invokeContract",
        type: "InvokeContractArgs",
        cases: [
          { raw: "HOST_FUNCTION_TYPE_INVOKE_CONTRACT", numericValue: 0, jsonName: "invoke_contract" },
        ],
      },
      {
        name: "createContract",
        type: "CreateContractArgs",
        cases: [
          { raw: "HOST_FUNCTION_TYPE_CREATE_CONTRACT", numericValue: 1, jsonName: "create_contract" },
        ],
      },
      {
        name: "wasm",
        type: "opaque<>",
        cases: [
          { raw: "HOST_FUNCTION_TYPE_UPLOAD_CONTRACT_WASM", numericValue: 2, jsonName: "upload_contract_wasm" },
        ],
      },
      {
        name: "createContractV2",
        type: "CreateContractArgsV2",
        cases: [
          { raw: "HOST_FUNCTION_TYPE_CREATE_CONTRACT_V2", numericValue: 3, jsonName: "create_contract_v2" },
        ],
      },
    ],
  },
  "SorobanAuthorizedFunction": {
    name: "SorobanAuthorizedFunction",
    discriminantName: "type",
    discriminantType: "SorobanAuthorizedFunctionType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "contractFn",
        type: "InvokeContractArgs",
        cases: [
          { raw: "SOROBAN_AUTHORIZED_FUNCTION_TYPE_CONTRACT_FN", numericValue: 0, jsonName: "contract_fn" },
        ],
      },
      {
        name: "createContractHostFn",
        type: "CreateContractArgs",
        cases: [
          { raw: "SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_HOST_FN", numericValue: 1, jsonName: "create_contract_host_fn" },
        ],
      },
      {
        name: "createContractV2HostFn",
        type: "CreateContractArgsV2",
        cases: [
          { raw: "SOROBAN_AUTHORIZED_FUNCTION_TYPE_CREATE_CONTRACT_V2_HOST_FN", numericValue: 2, jsonName: "create_contract_v2_host_fn" },
        ],
      },
    ],
  },
  "SorobanCredentials": {
    name: "SorobanCredentials",
    discriminantName: "type",
    discriminantType: "SorobanCredentialsType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "SOROBAN_CREDENTIALS_SOURCE_ACCOUNT", numericValue: 0, jsonName: "source_account" },
        ],
      },
      {
        name: "address",
        type: "SorobanAddressCredentials",
        cases: [
          { raw: "SOROBAN_CREDENTIALS_ADDRESS", numericValue: 1, jsonName: "address" },
        ],
      },
    ],
  },
  "Operation_body": {
    name: "Operation_body",
    discriminantName: "type",
    discriminantType: "OperationType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "createAccountOp",
        type: "CreateAccountOp",
        cases: [
          { raw: "CREATE_ACCOUNT", numericValue: 0, jsonName: "create_account" },
        ],
      },
      {
        name: "paymentOp",
        type: "PaymentOp",
        cases: [
          { raw: "PAYMENT", numericValue: 1, jsonName: "payment" },
        ],
      },
      {
        name: "pathPaymentStrictReceiveOp",
        type: "PathPaymentStrictReceiveOp",
        cases: [
          { raw: "PATH_PAYMENT_STRICT_RECEIVE", numericValue: 2, jsonName: "path_payment_strict_receive" },
        ],
      },
      {
        name: "manageSellOfferOp",
        type: "ManageSellOfferOp",
        cases: [
          { raw: "MANAGE_SELL_OFFER", numericValue: 3, jsonName: "manage_sell_offer" },
        ],
      },
      {
        name: "createPassiveSellOfferOp",
        type: "CreatePassiveSellOfferOp",
        cases: [
          { raw: "CREATE_PASSIVE_SELL_OFFER", numericValue: 4, jsonName: "create_passive_sell_offer" },
        ],
      },
      {
        name: "setOptionsOp",
        type: "SetOptionsOp",
        cases: [
          { raw: "SET_OPTIONS", numericValue: 5, jsonName: "set_options" },
        ],
      },
      {
        name: "changeTrustOp",
        type: "ChangeTrustOp",
        cases: [
          { raw: "CHANGE_TRUST", numericValue: 6, jsonName: "change_trust" },
        ],
      },
      {
        name: "allowTrustOp",
        type: "AllowTrustOp",
        cases: [
          { raw: "ALLOW_TRUST", numericValue: 7, jsonName: "allow_trust" },
        ],
      },
      {
        name: "destination",
        type: "MuxedAccount",
        cases: [
          { raw: "ACCOUNT_MERGE", numericValue: 8, jsonName: "account_merge" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "INFLATION", numericValue: 9, jsonName: "inflation" },
        ],
      },
      {
        name: "manageDataOp",
        type: "ManageDataOp",
        cases: [
          { raw: "MANAGE_DATA", numericValue: 10, jsonName: "manage_data" },
        ],
      },
      {
        name: "bumpSequenceOp",
        type: "BumpSequenceOp",
        cases: [
          { raw: "BUMP_SEQUENCE", numericValue: 11, jsonName: "bump_sequence" },
        ],
      },
      {
        name: "manageBuyOfferOp",
        type: "ManageBuyOfferOp",
        cases: [
          { raw: "MANAGE_BUY_OFFER", numericValue: 12, jsonName: "manage_buy_offer" },
        ],
      },
      {
        name: "pathPaymentStrictSendOp",
        type: "PathPaymentStrictSendOp",
        cases: [
          { raw: "PATH_PAYMENT_STRICT_SEND", numericValue: 13, jsonName: "path_payment_strict_send" },
        ],
      },
      {
        name: "createClaimableBalanceOp",
        type: "CreateClaimableBalanceOp",
        cases: [
          { raw: "CREATE_CLAIMABLE_BALANCE", numericValue: 14, jsonName: "create_claimable_balance" },
        ],
      },
      {
        name: "claimClaimableBalanceOp",
        type: "ClaimClaimableBalanceOp",
        cases: [
          { raw: "CLAIM_CLAIMABLE_BALANCE", numericValue: 15, jsonName: "claim_claimable_balance" },
        ],
      },
      {
        name: "beginSponsoringFutureReservesOp",
        type: "BeginSponsoringFutureReservesOp",
        cases: [
          { raw: "BEGIN_SPONSORING_FUTURE_RESERVES", numericValue: 16, jsonName: "begin_sponsoring_future_reserves" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "END_SPONSORING_FUTURE_RESERVES", numericValue: 17, jsonName: "end_sponsoring_future_reserves" },
        ],
      },
      {
        name: "revokeSponsorshipOp",
        type: "RevokeSponsorshipOp",
        cases: [
          { raw: "REVOKE_SPONSORSHIP", numericValue: 18, jsonName: "revoke_sponsorship" },
        ],
      },
      {
        name: "clawbackOp",
        type: "ClawbackOp",
        cases: [
          { raw: "CLAWBACK", numericValue: 19, jsonName: "clawback" },
        ],
      },
      {
        name: "clawbackClaimableBalanceOp",
        type: "ClawbackClaimableBalanceOp",
        cases: [
          { raw: "CLAWBACK_CLAIMABLE_BALANCE", numericValue: 20, jsonName: "clawback_claimable_balance" },
        ],
      },
      {
        name: "setTrustLineFlagsOp",
        type: "SetTrustLineFlagsOp",
        cases: [
          { raw: "SET_TRUST_LINE_FLAGS", numericValue: 21, jsonName: "set_trust_line_flags" },
        ],
      },
      {
        name: "liquidityPoolDepositOp",
        type: "LiquidityPoolDepositOp",
        cases: [
          { raw: "LIQUIDITY_POOL_DEPOSIT", numericValue: 22, jsonName: "liquidity_pool_deposit" },
        ],
      },
      {
        name: "liquidityPoolWithdrawOp",
        type: "LiquidityPoolWithdrawOp",
        cases: [
          { raw: "LIQUIDITY_POOL_WITHDRAW", numericValue: 23, jsonName: "liquidity_pool_withdraw" },
        ],
      },
      {
        name: "invokeHostFunctionOp",
        type: "InvokeHostFunctionOp",
        cases: [
          { raw: "INVOKE_HOST_FUNCTION", numericValue: 24, jsonName: "invoke_host_function" },
        ],
      },
      {
        name: "extendFootprintTTLOp",
        type: "ExtendFootprintTTLOp",
        cases: [
          { raw: "EXTEND_FOOTPRINT_TTL", numericValue: 25, jsonName: "extend_footprint_ttl" },
        ],
      },
      {
        name: "restoreFootprintOp",
        type: "RestoreFootprintOp",
        cases: [
          { raw: "RESTORE_FOOTPRINT", numericValue: 26, jsonName: "restore_footprint" },
        ],
      },
    ],
  },
  "HashIDPreimage": {
    name: "HashIDPreimage",
    discriminantName: "type",
    discriminantType: "EnvelopeType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "operationID",
        type: "HashIDPreimage_operationID",
        cases: [
          { raw: "ENVELOPE_TYPE_OP_ID", numericValue: 6, jsonName: "op_id" },
        ],
      },
      {
        name: "revokeID",
        type: "HashIDPreimage_revokeID",
        cases: [
          { raw: "ENVELOPE_TYPE_POOL_REVOKE_OP_ID", numericValue: 7, jsonName: "pool_revoke_op_id" },
        ],
      },
      {
        name: "contractID",
        type: "HashIDPreimage_contractID",
        cases: [
          { raw: "ENVELOPE_TYPE_CONTRACT_ID", numericValue: 8, jsonName: "contract_id" },
        ],
      },
      {
        name: "sorobanAuthorization",
        type: "HashIDPreimage_sorobanAuthorization",
        cases: [
          { raw: "ENVELOPE_TYPE_SOROBAN_AUTHORIZATION", numericValue: 9, jsonName: "soroban_authorization" },
        ],
      },
    ],
  },
  "Memo": {
    name: "Memo",
    discriminantName: "type",
    discriminantType: "MemoType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "MEMO_NONE", numericValue: 0, jsonName: "none" },
        ],
      },
      {
        name: "text",
        type: "string<28>",
        cases: [
          { raw: "MEMO_TEXT", numericValue: 1, jsonName: "text" },
        ],
      },
      {
        name: "id",
        type: "uint64",
        cases: [
          { raw: "MEMO_ID", numericValue: 2, jsonName: "id" },
        ],
      },
      {
        name: "hash",
        type: "Hash",
        cases: [
          { raw: "MEMO_HASH", numericValue: 3, jsonName: "hash" },
        ],
      },
      {
        name: "retHash",
        type: "Hash",
        cases: [
          { raw: "MEMO_RETURN", numericValue: 4, jsonName: "return" },
        ],
      },
    ],
  },
  "Preconditions": {
    name: "Preconditions",
    discriminantName: "type",
    discriminantType: "PreconditionType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "PRECOND_NONE", numericValue: 0, jsonName: "none" },
        ],
      },
      {
        name: "timeBounds",
        type: "TimeBounds",
        cases: [
          { raw: "PRECOND_TIME", numericValue: 1, jsonName: "time" },
        ],
      },
      {
        name: "v2",
        type: "PreconditionsV2",
        cases: [
          { raw: "PRECOND_V2", numericValue: 2, jsonName: "v2" },
        ],
      },
    ],
  },
  "SorobanTransactionData_ext": {
    name: "SorobanTransactionData_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
      {
        name: "resourceExt",
        type: "SorobanResourcesExtV0",
        cases: [
          { raw: 1, numericValue: 1, jsonName: "v1" },
        ],
      },
    ],
  },
  "TransactionV0_ext": {
    name: "TransactionV0_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
    ],
  },
  "Transaction_ext": {
    name: "Transaction_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
      {
        name: "sorobanData",
        type: "SorobanTransactionData",
        cases: [
          { raw: 1, numericValue: 1, jsonName: "v1" },
        ],
      },
    ],
  },
  "FeeBumpTransaction_innerTx": {
    name: "FeeBumpTransaction_innerTx",
    discriminantName: "type",
    discriminantType: "EnvelopeType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "v1",
        type: "TransactionV1Envelope",
        cases: [
          { raw: "ENVELOPE_TYPE_TX", numericValue: 2, jsonName: "tx" },
        ],
      },
    ],
  },
  "FeeBumpTransaction_ext": {
    name: "FeeBumpTransaction_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
    ],
  },
  "TransactionEnvelope": {
    name: "TransactionEnvelope",
    discriminantName: "type",
    discriminantType: "EnvelopeType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "v0",
        type: "TransactionV0Envelope",
        cases: [
          { raw: "ENVELOPE_TYPE_TX_V0", numericValue: 0, jsonName: "tx_v0" },
        ],
      },
      {
        name: "v1",
        type: "TransactionV1Envelope",
        cases: [
          { raw: "ENVELOPE_TYPE_TX", numericValue: 2, jsonName: "tx" },
        ],
      },
      {
        name: "feeBump",
        type: "FeeBumpTransactionEnvelope",
        cases: [
          { raw: "ENVELOPE_TYPE_TX_FEE_BUMP", numericValue: 5, jsonName: "tx_fee_bump" },
        ],
      },
    ],
  },
  "TransactionSignaturePayload_taggedTransaction": {
    name: "TransactionSignaturePayload_taggedTransaction",
    discriminantName: "type",
    discriminantType: "EnvelopeType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "tx",
        type: "Transaction",
        cases: [
          { raw: "ENVELOPE_TYPE_TX", numericValue: 2, jsonName: "tx" },
        ],
      },
      {
        name: "feeBump",
        type: "FeeBumpTransaction",
        cases: [
          { raw: "ENVELOPE_TYPE_TX_FEE_BUMP", numericValue: 5, jsonName: "tx_fee_bump" },
        ],
      },
    ],
  },
  "ClaimAtom": {
    name: "ClaimAtom",
    discriminantName: "type",
    discriminantType: "ClaimAtomType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "v0",
        type: "ClaimOfferAtomV0",
        cases: [
          { raw: "CLAIM_ATOM_TYPE_V0", numericValue: 0, jsonName: "v0" },
        ],
      },
      {
        name: "orderBook",
        type: "ClaimOfferAtom",
        cases: [
          { raw: "CLAIM_ATOM_TYPE_ORDER_BOOK", numericValue: 1, jsonName: "order_book" },
        ],
      },
      {
        name: "liquidityPool",
        type: "ClaimLiquidityAtom",
        cases: [
          { raw: "CLAIM_ATOM_TYPE_LIQUIDITY_POOL", numericValue: 2, jsonName: "liquidity_pool" },
        ],
      },
    ],
  },
  "CreateAccountResult": {
    name: "CreateAccountResult",
    discriminantName: "code",
    discriminantType: "CreateAccountResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "CREATE_ACCOUNT_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "CREATE_ACCOUNT_MALFORMED", numericValue: -1, jsonName: "malformed" },
          { raw: "CREATE_ACCOUNT_UNDERFUNDED", numericValue: -2, jsonName: "underfunded" },
          { raw: "CREATE_ACCOUNT_LOW_RESERVE", numericValue: -3, jsonName: "low_reserve" },
          { raw: "CREATE_ACCOUNT_ALREADY_EXIST", numericValue: -4, jsonName: "already_exist" },
        ],
      },
    ],
  },
  "PaymentResult": {
    name: "PaymentResult",
    discriminantName: "code",
    discriminantType: "PaymentResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "PAYMENT_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "PAYMENT_MALFORMED", numericValue: -1, jsonName: "malformed" },
          { raw: "PAYMENT_UNDERFUNDED", numericValue: -2, jsonName: "underfunded" },
          { raw: "PAYMENT_SRC_NO_TRUST", numericValue: -3, jsonName: "src_no_trust" },
          { raw: "PAYMENT_SRC_NOT_AUTHORIZED", numericValue: -4, jsonName: "src_not_authorized" },
          { raw: "PAYMENT_NO_DESTINATION", numericValue: -5, jsonName: "no_destination" },
          { raw: "PAYMENT_NO_TRUST", numericValue: -6, jsonName: "no_trust" },
          { raw: "PAYMENT_NOT_AUTHORIZED", numericValue: -7, jsonName: "not_authorized" },
          { raw: "PAYMENT_LINE_FULL", numericValue: -8, jsonName: "line_full" },
          { raw: "PAYMENT_NO_ISSUER", numericValue: -9, jsonName: "no_issuer" },
        ],
      },
    ],
  },
  "PathPaymentStrictReceiveResult": {
    name: "PathPaymentStrictReceiveResult",
    discriminantName: "code",
    discriminantType: "PathPaymentStrictReceiveResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "success",
        type: "PathPaymentStrictReceiveResult_success",
        cases: [
          { raw: "PATH_PAYMENT_STRICT_RECEIVE_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "PATH_PAYMENT_STRICT_RECEIVE_MALFORMED", numericValue: -1, jsonName: "malformed" },
          { raw: "PATH_PAYMENT_STRICT_RECEIVE_UNDERFUNDED", numericValue: -2, jsonName: "underfunded" },
          { raw: "PATH_PAYMENT_STRICT_RECEIVE_SRC_NO_TRUST", numericValue: -3, jsonName: "src_no_trust" },
          { raw: "PATH_PAYMENT_STRICT_RECEIVE_SRC_NOT_AUTHORIZED", numericValue: -4, jsonName: "src_not_authorized" },
          { raw: "PATH_PAYMENT_STRICT_RECEIVE_NO_DESTINATION", numericValue: -5, jsonName: "no_destination" },
          { raw: "PATH_PAYMENT_STRICT_RECEIVE_NO_TRUST", numericValue: -6, jsonName: "no_trust" },
          { raw: "PATH_PAYMENT_STRICT_RECEIVE_NOT_AUTHORIZED", numericValue: -7, jsonName: "not_authorized" },
          { raw: "PATH_PAYMENT_STRICT_RECEIVE_LINE_FULL", numericValue: -8, jsonName: "line_full" },
        ],
      },
      {
        name: "noIssuer",
        type: "Asset",
        cases: [
          { raw: "PATH_PAYMENT_STRICT_RECEIVE_NO_ISSUER", numericValue: -9, jsonName: "no_issuer" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "PATH_PAYMENT_STRICT_RECEIVE_TOO_FEW_OFFERS", numericValue: -10, jsonName: "too_few_offers" },
          { raw: "PATH_PAYMENT_STRICT_RECEIVE_OFFER_CROSS_SELF", numericValue: -11, jsonName: "offer_cross_self" },
          { raw: "PATH_PAYMENT_STRICT_RECEIVE_OVER_SENDMAX", numericValue: -12, jsonName: "over_sendmax" },
        ],
      },
    ],
  },
  "PathPaymentStrictSendResult": {
    name: "PathPaymentStrictSendResult",
    discriminantName: "code",
    discriminantType: "PathPaymentStrictSendResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "success",
        type: "PathPaymentStrictSendResult_success",
        cases: [
          { raw: "PATH_PAYMENT_STRICT_SEND_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "PATH_PAYMENT_STRICT_SEND_MALFORMED", numericValue: -1, jsonName: "malformed" },
          { raw: "PATH_PAYMENT_STRICT_SEND_UNDERFUNDED", numericValue: -2, jsonName: "underfunded" },
          { raw: "PATH_PAYMENT_STRICT_SEND_SRC_NO_TRUST", numericValue: -3, jsonName: "src_no_trust" },
          { raw: "PATH_PAYMENT_STRICT_SEND_SRC_NOT_AUTHORIZED", numericValue: -4, jsonName: "src_not_authorized" },
          { raw: "PATH_PAYMENT_STRICT_SEND_NO_DESTINATION", numericValue: -5, jsonName: "no_destination" },
          { raw: "PATH_PAYMENT_STRICT_SEND_NO_TRUST", numericValue: -6, jsonName: "no_trust" },
          { raw: "PATH_PAYMENT_STRICT_SEND_NOT_AUTHORIZED", numericValue: -7, jsonName: "not_authorized" },
          { raw: "PATH_PAYMENT_STRICT_SEND_LINE_FULL", numericValue: -8, jsonName: "line_full" },
        ],
      },
      {
        name: "noIssuer",
        type: "Asset",
        cases: [
          { raw: "PATH_PAYMENT_STRICT_SEND_NO_ISSUER", numericValue: -9, jsonName: "no_issuer" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "PATH_PAYMENT_STRICT_SEND_TOO_FEW_OFFERS", numericValue: -10, jsonName: "too_few_offers" },
          { raw: "PATH_PAYMENT_STRICT_SEND_OFFER_CROSS_SELF", numericValue: -11, jsonName: "offer_cross_self" },
          { raw: "PATH_PAYMENT_STRICT_SEND_UNDER_DESTMIN", numericValue: -12, jsonName: "under_destmin" },
        ],
      },
    ],
  },
  "ManageOfferSuccessResult_offer": {
    name: "ManageOfferSuccessResult_offer",
    discriminantName: "effect",
    discriminantType: "ManageOfferEffect",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "offer",
        type: "OfferEntry",
        cases: [
          { raw: "MANAGE_OFFER_CREATED", numericValue: 0, jsonName: "created" },
          { raw: "MANAGE_OFFER_UPDATED", numericValue: 1, jsonName: "updated" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "MANAGE_OFFER_DELETED", numericValue: 2, jsonName: "deleted" },
        ],
      },
    ],
  },
  "ManageSellOfferResult": {
    name: "ManageSellOfferResult",
    discriminantName: "code",
    discriminantType: "ManageSellOfferResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "success",
        type: "ManageOfferSuccessResult",
        cases: [
          { raw: "MANAGE_SELL_OFFER_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "MANAGE_SELL_OFFER_MALFORMED", numericValue: -1, jsonName: "malformed" },
          { raw: "MANAGE_SELL_OFFER_SELL_NO_TRUST", numericValue: -2, jsonName: "sell_no_trust" },
          { raw: "MANAGE_SELL_OFFER_BUY_NO_TRUST", numericValue: -3, jsonName: "buy_no_trust" },
          { raw: "MANAGE_SELL_OFFER_SELL_NOT_AUTHORIZED", numericValue: -4, jsonName: "sell_not_authorized" },
          { raw: "MANAGE_SELL_OFFER_BUY_NOT_AUTHORIZED", numericValue: -5, jsonName: "buy_not_authorized" },
          { raw: "MANAGE_SELL_OFFER_LINE_FULL", numericValue: -6, jsonName: "line_full" },
          { raw: "MANAGE_SELL_OFFER_UNDERFUNDED", numericValue: -7, jsonName: "underfunded" },
          { raw: "MANAGE_SELL_OFFER_CROSS_SELF", numericValue: -8, jsonName: "cross_self" },
          { raw: "MANAGE_SELL_OFFER_SELL_NO_ISSUER", numericValue: -9, jsonName: "sell_no_issuer" },
          { raw: "MANAGE_SELL_OFFER_BUY_NO_ISSUER", numericValue: -10, jsonName: "buy_no_issuer" },
          { raw: "MANAGE_SELL_OFFER_NOT_FOUND", numericValue: -11, jsonName: "not_found" },
          { raw: "MANAGE_SELL_OFFER_LOW_RESERVE", numericValue: -12, jsonName: "low_reserve" },
        ],
      },
    ],
  },
  "ManageBuyOfferResult": {
    name: "ManageBuyOfferResult",
    discriminantName: "code",
    discriminantType: "ManageBuyOfferResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "success",
        type: "ManageOfferSuccessResult",
        cases: [
          { raw: "MANAGE_BUY_OFFER_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "MANAGE_BUY_OFFER_MALFORMED", numericValue: -1, jsonName: "malformed" },
          { raw: "MANAGE_BUY_OFFER_SELL_NO_TRUST", numericValue: -2, jsonName: "sell_no_trust" },
          { raw: "MANAGE_BUY_OFFER_BUY_NO_TRUST", numericValue: -3, jsonName: "buy_no_trust" },
          { raw: "MANAGE_BUY_OFFER_SELL_NOT_AUTHORIZED", numericValue: -4, jsonName: "sell_not_authorized" },
          { raw: "MANAGE_BUY_OFFER_BUY_NOT_AUTHORIZED", numericValue: -5, jsonName: "buy_not_authorized" },
          { raw: "MANAGE_BUY_OFFER_LINE_FULL", numericValue: -6, jsonName: "line_full" },
          { raw: "MANAGE_BUY_OFFER_UNDERFUNDED", numericValue: -7, jsonName: "underfunded" },
          { raw: "MANAGE_BUY_OFFER_CROSS_SELF", numericValue: -8, jsonName: "cross_self" },
          { raw: "MANAGE_BUY_OFFER_SELL_NO_ISSUER", numericValue: -9, jsonName: "sell_no_issuer" },
          { raw: "MANAGE_BUY_OFFER_BUY_NO_ISSUER", numericValue: -10, jsonName: "buy_no_issuer" },
          { raw: "MANAGE_BUY_OFFER_NOT_FOUND", numericValue: -11, jsonName: "not_found" },
          { raw: "MANAGE_BUY_OFFER_LOW_RESERVE", numericValue: -12, jsonName: "low_reserve" },
        ],
      },
    ],
  },
  "SetOptionsResult": {
    name: "SetOptionsResult",
    discriminantName: "code",
    discriminantType: "SetOptionsResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "SET_OPTIONS_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "SET_OPTIONS_LOW_RESERVE", numericValue: -1, jsonName: "low_reserve" },
          { raw: "SET_OPTIONS_TOO_MANY_SIGNERS", numericValue: -2, jsonName: "too_many_signers" },
          { raw: "SET_OPTIONS_BAD_FLAGS", numericValue: -3, jsonName: "bad_flags" },
          { raw: "SET_OPTIONS_INVALID_INFLATION", numericValue: -4, jsonName: "invalid_inflation" },
          { raw: "SET_OPTIONS_CANT_CHANGE", numericValue: -5, jsonName: "cant_change" },
          { raw: "SET_OPTIONS_UNKNOWN_FLAG", numericValue: -6, jsonName: "unknown_flag" },
          { raw: "SET_OPTIONS_THRESHOLD_OUT_OF_RANGE", numericValue: -7, jsonName: "threshold_out_of_range" },
          { raw: "SET_OPTIONS_BAD_SIGNER", numericValue: -8, jsonName: "bad_signer" },
          { raw: "SET_OPTIONS_INVALID_HOME_DOMAIN", numericValue: -9, jsonName: "invalid_home_domain" },
          { raw: "SET_OPTIONS_AUTH_REVOCABLE_REQUIRED", numericValue: -10, jsonName: "auth_revocable_required" },
        ],
      },
    ],
  },
  "ChangeTrustResult": {
    name: "ChangeTrustResult",
    discriminantName: "code",
    discriminantType: "ChangeTrustResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "CHANGE_TRUST_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "CHANGE_TRUST_MALFORMED", numericValue: -1, jsonName: "malformed" },
          { raw: "CHANGE_TRUST_NO_ISSUER", numericValue: -2, jsonName: "no_issuer" },
          { raw: "CHANGE_TRUST_INVALID_LIMIT", numericValue: -3, jsonName: "invalid_limit" },
          { raw: "CHANGE_TRUST_LOW_RESERVE", numericValue: -4, jsonName: "low_reserve" },
          { raw: "CHANGE_TRUST_SELF_NOT_ALLOWED", numericValue: -5, jsonName: "self_not_allowed" },
          { raw: "CHANGE_TRUST_TRUST_LINE_MISSING", numericValue: -6, jsonName: "trust_line_missing" },
          { raw: "CHANGE_TRUST_CANNOT_DELETE", numericValue: -7, jsonName: "cannot_delete" },
          { raw: "CHANGE_TRUST_NOT_AUTH_MAINTAIN_LIABILITIES", numericValue: -8, jsonName: "not_auth_maintain_liabilities" },
        ],
      },
    ],
  },
  "AllowTrustResult": {
    name: "AllowTrustResult",
    discriminantName: "code",
    discriminantType: "AllowTrustResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "ALLOW_TRUST_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "ALLOW_TRUST_MALFORMED", numericValue: -1, jsonName: "malformed" },
          { raw: "ALLOW_TRUST_NO_TRUST_LINE", numericValue: -2, jsonName: "no_trust_line" },
          { raw: "ALLOW_TRUST_TRUST_NOT_REQUIRED", numericValue: -3, jsonName: "trust_not_required" },
          { raw: "ALLOW_TRUST_CANT_REVOKE", numericValue: -4, jsonName: "cant_revoke" },
          { raw: "ALLOW_TRUST_SELF_NOT_ALLOWED", numericValue: -5, jsonName: "self_not_allowed" },
          { raw: "ALLOW_TRUST_LOW_RESERVE", numericValue: -6, jsonName: "low_reserve" },
        ],
      },
    ],
  },
  "AccountMergeResult": {
    name: "AccountMergeResult",
    discriminantName: "code",
    discriminantType: "AccountMergeResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "sourceAccountBalance",
        type: "int64",
        cases: [
          { raw: "ACCOUNT_MERGE_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "ACCOUNT_MERGE_MALFORMED", numericValue: -1, jsonName: "malformed" },
          { raw: "ACCOUNT_MERGE_NO_ACCOUNT", numericValue: -2, jsonName: "no_account" },
          { raw: "ACCOUNT_MERGE_IMMUTABLE_SET", numericValue: -3, jsonName: "immutable_set" },
          { raw: "ACCOUNT_MERGE_HAS_SUB_ENTRIES", numericValue: -4, jsonName: "has_sub_entries" },
          { raw: "ACCOUNT_MERGE_SEQNUM_TOO_FAR", numericValue: -5, jsonName: "seqnum_too_far" },
          { raw: "ACCOUNT_MERGE_DEST_FULL", numericValue: -6, jsonName: "dest_full" },
          { raw: "ACCOUNT_MERGE_IS_SPONSOR", numericValue: -7, jsonName: "is_sponsor" },
        ],
      },
    ],
  },
  "InflationResult": {
    name: "InflationResult",
    discriminantName: "code",
    discriminantType: "InflationResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "payouts",
        type: "InflationPayout<>",
        cases: [
          { raw: "INFLATION_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "INFLATION_NOT_TIME", numericValue: -1, jsonName: "not_time" },
        ],
      },
    ],
  },
  "ManageDataResult": {
    name: "ManageDataResult",
    discriminantName: "code",
    discriminantType: "ManageDataResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "MANAGE_DATA_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "MANAGE_DATA_NOT_SUPPORTED_YET", numericValue: -1, jsonName: "not_supported_yet" },
          { raw: "MANAGE_DATA_NAME_NOT_FOUND", numericValue: -2, jsonName: "name_not_found" },
          { raw: "MANAGE_DATA_LOW_RESERVE", numericValue: -3, jsonName: "low_reserve" },
          { raw: "MANAGE_DATA_INVALID_NAME", numericValue: -4, jsonName: "invalid_name" },
        ],
      },
    ],
  },
  "BumpSequenceResult": {
    name: "BumpSequenceResult",
    discriminantName: "code",
    discriminantType: "BumpSequenceResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "BUMP_SEQUENCE_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "BUMP_SEQUENCE_BAD_SEQ", numericValue: -1, jsonName: "bad_seq" },
        ],
      },
    ],
  },
  "CreateClaimableBalanceResult": {
    name: "CreateClaimableBalanceResult",
    discriminantName: "code",
    discriminantType: "CreateClaimableBalanceResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "balanceID",
        type: "ClaimableBalanceID",
        cases: [
          { raw: "CREATE_CLAIMABLE_BALANCE_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "CREATE_CLAIMABLE_BALANCE_MALFORMED", numericValue: -1, jsonName: "malformed" },
          { raw: "CREATE_CLAIMABLE_BALANCE_LOW_RESERVE", numericValue: -2, jsonName: "low_reserve" },
          { raw: "CREATE_CLAIMABLE_BALANCE_NO_TRUST", numericValue: -3, jsonName: "no_trust" },
          { raw: "CREATE_CLAIMABLE_BALANCE_NOT_AUTHORIZED", numericValue: -4, jsonName: "not_authorized" },
          { raw: "CREATE_CLAIMABLE_BALANCE_UNDERFUNDED", numericValue: -5, jsonName: "underfunded" },
        ],
      },
    ],
  },
  "ClaimClaimableBalanceResult": {
    name: "ClaimClaimableBalanceResult",
    discriminantName: "code",
    discriminantType: "ClaimClaimableBalanceResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "CLAIM_CLAIMABLE_BALANCE_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "CLAIM_CLAIMABLE_BALANCE_DOES_NOT_EXIST", numericValue: -1, jsonName: "does_not_exist" },
          { raw: "CLAIM_CLAIMABLE_BALANCE_CANNOT_CLAIM", numericValue: -2, jsonName: "cannot_claim" },
          { raw: "CLAIM_CLAIMABLE_BALANCE_LINE_FULL", numericValue: -3, jsonName: "line_full" },
          { raw: "CLAIM_CLAIMABLE_BALANCE_NO_TRUST", numericValue: -4, jsonName: "no_trust" },
          { raw: "CLAIM_CLAIMABLE_BALANCE_NOT_AUTHORIZED", numericValue: -5, jsonName: "not_authorized" },
        ],
      },
    ],
  },
  "BeginSponsoringFutureReservesResult": {
    name: "BeginSponsoringFutureReservesResult",
    discriminantName: "code",
    discriminantType: "BeginSponsoringFutureReservesResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "BEGIN_SPONSORING_FUTURE_RESERVES_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "BEGIN_SPONSORING_FUTURE_RESERVES_MALFORMED", numericValue: -1, jsonName: "malformed" },
          { raw: "BEGIN_SPONSORING_FUTURE_RESERVES_ALREADY_SPONSORED", numericValue: -2, jsonName: "already_sponsored" },
          { raw: "BEGIN_SPONSORING_FUTURE_RESERVES_RECURSIVE", numericValue: -3, jsonName: "recursive" },
        ],
      },
    ],
  },
  "EndSponsoringFutureReservesResult": {
    name: "EndSponsoringFutureReservesResult",
    discriminantName: "code",
    discriminantType: "EndSponsoringFutureReservesResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "END_SPONSORING_FUTURE_RESERVES_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "END_SPONSORING_FUTURE_RESERVES_NOT_SPONSORED", numericValue: -1, jsonName: "not_sponsored" },
        ],
      },
    ],
  },
  "RevokeSponsorshipResult": {
    name: "RevokeSponsorshipResult",
    discriminantName: "code",
    discriminantType: "RevokeSponsorshipResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "REVOKE_SPONSORSHIP_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "REVOKE_SPONSORSHIP_DOES_NOT_EXIST", numericValue: -1, jsonName: "does_not_exist" },
          { raw: "REVOKE_SPONSORSHIP_NOT_SPONSOR", numericValue: -2, jsonName: "not_sponsor" },
          { raw: "REVOKE_SPONSORSHIP_LOW_RESERVE", numericValue: -3, jsonName: "low_reserve" },
          { raw: "REVOKE_SPONSORSHIP_ONLY_TRANSFERABLE", numericValue: -4, jsonName: "only_transferable" },
          { raw: "REVOKE_SPONSORSHIP_MALFORMED", numericValue: -5, jsonName: "malformed" },
        ],
      },
    ],
  },
  "ClawbackResult": {
    name: "ClawbackResult",
    discriminantName: "code",
    discriminantType: "ClawbackResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "CLAWBACK_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "CLAWBACK_MALFORMED", numericValue: -1, jsonName: "malformed" },
          { raw: "CLAWBACK_NOT_CLAWBACK_ENABLED", numericValue: -2, jsonName: "not_clawback_enabled" },
          { raw: "CLAWBACK_NO_TRUST", numericValue: -3, jsonName: "no_trust" },
          { raw: "CLAWBACK_UNDERFUNDED", numericValue: -4, jsonName: "underfunded" },
        ],
      },
    ],
  },
  "ClawbackClaimableBalanceResult": {
    name: "ClawbackClaimableBalanceResult",
    discriminantName: "code",
    discriminantType: "ClawbackClaimableBalanceResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "CLAWBACK_CLAIMABLE_BALANCE_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "CLAWBACK_CLAIMABLE_BALANCE_DOES_NOT_EXIST", numericValue: -1, jsonName: "does_not_exist" },
          { raw: "CLAWBACK_CLAIMABLE_BALANCE_NOT_ISSUER", numericValue: -2, jsonName: "not_issuer" },
          { raw: "CLAWBACK_CLAIMABLE_BALANCE_NOT_CLAWBACK_ENABLED", numericValue: -3, jsonName: "not_clawback_enabled" },
        ],
      },
    ],
  },
  "SetTrustLineFlagsResult": {
    name: "SetTrustLineFlagsResult",
    discriminantName: "code",
    discriminantType: "SetTrustLineFlagsResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "SET_TRUST_LINE_FLAGS_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "SET_TRUST_LINE_FLAGS_MALFORMED", numericValue: -1, jsonName: "malformed" },
          { raw: "SET_TRUST_LINE_FLAGS_NO_TRUST_LINE", numericValue: -2, jsonName: "no_trust_line" },
          { raw: "SET_TRUST_LINE_FLAGS_CANT_REVOKE", numericValue: -3, jsonName: "cant_revoke" },
          { raw: "SET_TRUST_LINE_FLAGS_INVALID_STATE", numericValue: -4, jsonName: "invalid_state" },
          { raw: "SET_TRUST_LINE_FLAGS_LOW_RESERVE", numericValue: -5, jsonName: "low_reserve" },
        ],
      },
    ],
  },
  "LiquidityPoolDepositResult": {
    name: "LiquidityPoolDepositResult",
    discriminantName: "code",
    discriminantType: "LiquidityPoolDepositResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "LIQUIDITY_POOL_DEPOSIT_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "LIQUIDITY_POOL_DEPOSIT_MALFORMED", numericValue: -1, jsonName: "malformed" },
          { raw: "LIQUIDITY_POOL_DEPOSIT_NO_TRUST", numericValue: -2, jsonName: "no_trust" },
          { raw: "LIQUIDITY_POOL_DEPOSIT_NOT_AUTHORIZED", numericValue: -3, jsonName: "not_authorized" },
          { raw: "LIQUIDITY_POOL_DEPOSIT_UNDERFUNDED", numericValue: -4, jsonName: "underfunded" },
          { raw: "LIQUIDITY_POOL_DEPOSIT_LINE_FULL", numericValue: -5, jsonName: "line_full" },
          { raw: "LIQUIDITY_POOL_DEPOSIT_BAD_PRICE", numericValue: -6, jsonName: "bad_price" },
          { raw: "LIQUIDITY_POOL_DEPOSIT_POOL_FULL", numericValue: -7, jsonName: "pool_full" },
        ],
      },
    ],
  },
  "LiquidityPoolWithdrawResult": {
    name: "LiquidityPoolWithdrawResult",
    discriminantName: "code",
    discriminantType: "LiquidityPoolWithdrawResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "LIQUIDITY_POOL_WITHDRAW_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "LIQUIDITY_POOL_WITHDRAW_MALFORMED", numericValue: -1, jsonName: "malformed" },
          { raw: "LIQUIDITY_POOL_WITHDRAW_NO_TRUST", numericValue: -2, jsonName: "no_trust" },
          { raw: "LIQUIDITY_POOL_WITHDRAW_UNDERFUNDED", numericValue: -3, jsonName: "underfunded" },
          { raw: "LIQUIDITY_POOL_WITHDRAW_LINE_FULL", numericValue: -4, jsonName: "line_full" },
          { raw: "LIQUIDITY_POOL_WITHDRAW_UNDER_MINIMUM", numericValue: -5, jsonName: "under_minimum" },
        ],
      },
    ],
  },
  "InvokeHostFunctionResult": {
    name: "InvokeHostFunctionResult",
    discriminantName: "code",
    discriminantType: "InvokeHostFunctionResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "success",
        type: "Hash",
        cases: [
          { raw: "INVOKE_HOST_FUNCTION_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "INVOKE_HOST_FUNCTION_MALFORMED", numericValue: -1, jsonName: "malformed" },
          { raw: "INVOKE_HOST_FUNCTION_TRAPPED", numericValue: -2, jsonName: "trapped" },
          { raw: "INVOKE_HOST_FUNCTION_RESOURCE_LIMIT_EXCEEDED", numericValue: -3, jsonName: "resource_limit_exceeded" },
          { raw: "INVOKE_HOST_FUNCTION_ENTRY_ARCHIVED", numericValue: -4, jsonName: "entry_archived" },
          { raw: "INVOKE_HOST_FUNCTION_INSUFFICIENT_REFUNDABLE_FEE", numericValue: -5, jsonName: "insufficient_refundable_fee" },
        ],
      },
    ],
  },
  "ExtendFootprintTTLResult": {
    name: "ExtendFootprintTTLResult",
    discriminantName: "code",
    discriminantType: "ExtendFootprintTTLResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "EXTEND_FOOTPRINT_TTL_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "EXTEND_FOOTPRINT_TTL_MALFORMED", numericValue: -1, jsonName: "malformed" },
          { raw: "EXTEND_FOOTPRINT_TTL_RESOURCE_LIMIT_EXCEEDED", numericValue: -2, jsonName: "resource_limit_exceeded" },
          { raw: "EXTEND_FOOTPRINT_TTL_INSUFFICIENT_REFUNDABLE_FEE", numericValue: -3, jsonName: "insufficient_refundable_fee" },
        ],
      },
    ],
  },
  "RestoreFootprintResult": {
    name: "RestoreFootprintResult",
    discriminantName: "code",
    discriminantType: "RestoreFootprintResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: "RESTORE_FOOTPRINT_SUCCESS", numericValue: 0, jsonName: "success" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "RESTORE_FOOTPRINT_MALFORMED", numericValue: -1, jsonName: "malformed" },
          { raw: "RESTORE_FOOTPRINT_RESOURCE_LIMIT_EXCEEDED", numericValue: -2, jsonName: "resource_limit_exceeded" },
          { raw: "RESTORE_FOOTPRINT_INSUFFICIENT_REFUNDABLE_FEE", numericValue: -3, jsonName: "insufficient_refundable_fee" },
        ],
      },
    ],
  },
  "OperationResult_tr": {
    name: "OperationResult_tr",
    discriminantName: "type",
    discriminantType: "OperationType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "createAccountResult",
        type: "CreateAccountResult",
        cases: [
          { raw: "CREATE_ACCOUNT", numericValue: 0, jsonName: "create_account" },
        ],
      },
      {
        name: "paymentResult",
        type: "PaymentResult",
        cases: [
          { raw: "PAYMENT", numericValue: 1, jsonName: "payment" },
        ],
      },
      {
        name: "pathPaymentStrictReceiveResult",
        type: "PathPaymentStrictReceiveResult",
        cases: [
          { raw: "PATH_PAYMENT_STRICT_RECEIVE", numericValue: 2, jsonName: "path_payment_strict_receive" },
        ],
      },
      {
        name: "manageSellOfferResult",
        type: "ManageSellOfferResult",
        cases: [
          { raw: "MANAGE_SELL_OFFER", numericValue: 3, jsonName: "manage_sell_offer" },
        ],
      },
      {
        name: "createPassiveSellOfferResult",
        type: "ManageSellOfferResult",
        cases: [
          { raw: "CREATE_PASSIVE_SELL_OFFER", numericValue: 4, jsonName: "create_passive_sell_offer" },
        ],
      },
      {
        name: "setOptionsResult",
        type: "SetOptionsResult",
        cases: [
          { raw: "SET_OPTIONS", numericValue: 5, jsonName: "set_options" },
        ],
      },
      {
        name: "changeTrustResult",
        type: "ChangeTrustResult",
        cases: [
          { raw: "CHANGE_TRUST", numericValue: 6, jsonName: "change_trust" },
        ],
      },
      {
        name: "allowTrustResult",
        type: "AllowTrustResult",
        cases: [
          { raw: "ALLOW_TRUST", numericValue: 7, jsonName: "allow_trust" },
        ],
      },
      {
        name: "accountMergeResult",
        type: "AccountMergeResult",
        cases: [
          { raw: "ACCOUNT_MERGE", numericValue: 8, jsonName: "account_merge" },
        ],
      },
      {
        name: "inflationResult",
        type: "InflationResult",
        cases: [
          { raw: "INFLATION", numericValue: 9, jsonName: "inflation" },
        ],
      },
      {
        name: "manageDataResult",
        type: "ManageDataResult",
        cases: [
          { raw: "MANAGE_DATA", numericValue: 10, jsonName: "manage_data" },
        ],
      },
      {
        name: "bumpSeqResult",
        type: "BumpSequenceResult",
        cases: [
          { raw: "BUMP_SEQUENCE", numericValue: 11, jsonName: "bump_sequence" },
        ],
      },
      {
        name: "manageBuyOfferResult",
        type: "ManageBuyOfferResult",
        cases: [
          { raw: "MANAGE_BUY_OFFER", numericValue: 12, jsonName: "manage_buy_offer" },
        ],
      },
      {
        name: "pathPaymentStrictSendResult",
        type: "PathPaymentStrictSendResult",
        cases: [
          { raw: "PATH_PAYMENT_STRICT_SEND", numericValue: 13, jsonName: "path_payment_strict_send" },
        ],
      },
      {
        name: "createClaimableBalanceResult",
        type: "CreateClaimableBalanceResult",
        cases: [
          { raw: "CREATE_CLAIMABLE_BALANCE", numericValue: 14, jsonName: "create_claimable_balance" },
        ],
      },
      {
        name: "claimClaimableBalanceResult",
        type: "ClaimClaimableBalanceResult",
        cases: [
          { raw: "CLAIM_CLAIMABLE_BALANCE", numericValue: 15, jsonName: "claim_claimable_balance" },
        ],
      },
      {
        name: "beginSponsoringFutureReservesResult",
        type: "BeginSponsoringFutureReservesResult",
        cases: [
          { raw: "BEGIN_SPONSORING_FUTURE_RESERVES", numericValue: 16, jsonName: "begin_sponsoring_future_reserves" },
        ],
      },
      {
        name: "endSponsoringFutureReservesResult",
        type: "EndSponsoringFutureReservesResult",
        cases: [
          { raw: "END_SPONSORING_FUTURE_RESERVES", numericValue: 17, jsonName: "end_sponsoring_future_reserves" },
        ],
      },
      {
        name: "revokeSponsorshipResult",
        type: "RevokeSponsorshipResult",
        cases: [
          { raw: "REVOKE_SPONSORSHIP", numericValue: 18, jsonName: "revoke_sponsorship" },
        ],
      },
      {
        name: "clawbackResult",
        type: "ClawbackResult",
        cases: [
          { raw: "CLAWBACK", numericValue: 19, jsonName: "clawback" },
        ],
      },
      {
        name: "clawbackClaimableBalanceResult",
        type: "ClawbackClaimableBalanceResult",
        cases: [
          { raw: "CLAWBACK_CLAIMABLE_BALANCE", numericValue: 20, jsonName: "clawback_claimable_balance" },
        ],
      },
      {
        name: "setTrustLineFlagsResult",
        type: "SetTrustLineFlagsResult",
        cases: [
          { raw: "SET_TRUST_LINE_FLAGS", numericValue: 21, jsonName: "set_trust_line_flags" },
        ],
      },
      {
        name: "liquidityPoolDepositResult",
        type: "LiquidityPoolDepositResult",
        cases: [
          { raw: "LIQUIDITY_POOL_DEPOSIT", numericValue: 22, jsonName: "liquidity_pool_deposit" },
        ],
      },
      {
        name: "liquidityPoolWithdrawResult",
        type: "LiquidityPoolWithdrawResult",
        cases: [
          { raw: "LIQUIDITY_POOL_WITHDRAW", numericValue: 23, jsonName: "liquidity_pool_withdraw" },
        ],
      },
      {
        name: "invokeHostFunctionResult",
        type: "InvokeHostFunctionResult",
        cases: [
          { raw: "INVOKE_HOST_FUNCTION", numericValue: 24, jsonName: "invoke_host_function" },
        ],
      },
      {
        name: "extendFootprintTTLResult",
        type: "ExtendFootprintTTLResult",
        cases: [
          { raw: "EXTEND_FOOTPRINT_TTL", numericValue: 25, jsonName: "extend_footprint_ttl" },
        ],
      },
      {
        name: "restoreFootprintResult",
        type: "RestoreFootprintResult",
        cases: [
          { raw: "RESTORE_FOOTPRINT", numericValue: 26, jsonName: "restore_footprint" },
        ],
      },
    ],
  },
  "OperationResult": {
    name: "OperationResult",
    discriminantName: "code",
    discriminantType: "OperationResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "tr",
        type: "OperationResult_tr",
        cases: [
          { raw: "opINNER", numericValue: 0, jsonName: "opinner" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "opBAD_AUTH", numericValue: -1, jsonName: "opbad_auth" },
          { raw: "opNO_ACCOUNT", numericValue: -2, jsonName: "opno_account" },
          { raw: "opNOT_SUPPORTED", numericValue: -3, jsonName: "opnot_supported" },
          { raw: "opTOO_MANY_SUBENTRIES", numericValue: -4, jsonName: "optoo_many_subentries" },
          { raw: "opEXCEEDED_WORK_LIMIT", numericValue: -5, jsonName: "opexceeded_work_limit" },
          { raw: "opTOO_MANY_SPONSORING", numericValue: -6, jsonName: "optoo_many_sponsoring" },
        ],
      },
    ],
  },
  "InnerTransactionResult_result": {
    name: "InnerTransactionResult_result",
    discriminantName: "code",
    discriminantType: "TransactionResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "results",
        type: "OperationResult<>",
        cases: [
          { raw: "txSUCCESS", numericValue: 0, jsonName: "txsuccess" },
          { raw: "txFAILED", numericValue: -1, jsonName: "txfailed" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "txTOO_EARLY", numericValue: -2, jsonName: "txtoo_early" },
          { raw: "txTOO_LATE", numericValue: -3, jsonName: "txtoo_late" },
          { raw: "txMISSING_OPERATION", numericValue: -4, jsonName: "txmissing_operation" },
          { raw: "txBAD_SEQ", numericValue: -5, jsonName: "txbad_seq" },
          { raw: "txBAD_AUTH", numericValue: -6, jsonName: "txbad_auth" },
          { raw: "txINSUFFICIENT_BALANCE", numericValue: -7, jsonName: "txinsufficient_balance" },
          { raw: "txNO_ACCOUNT", numericValue: -8, jsonName: "txno_account" },
          { raw: "txINSUFFICIENT_FEE", numericValue: -9, jsonName: "txinsufficient_fee" },
          { raw: "txBAD_AUTH_EXTRA", numericValue: -10, jsonName: "txbad_auth_extra" },
          { raw: "txINTERNAL_ERROR", numericValue: -11, jsonName: "txinternal_error" },
          { raw: "txNOT_SUPPORTED", numericValue: -12, jsonName: "txnot_supported" },
          { raw: "txBAD_SPONSORSHIP", numericValue: -14, jsonName: "txbad_sponsorship" },
          { raw: "txBAD_MIN_SEQ_AGE_OR_GAP", numericValue: -15, jsonName: "txbad_min_seq_age_or_gap" },
          { raw: "txMALFORMED", numericValue: -16, jsonName: "txmalformed" },
          { raw: "txSOROBAN_INVALID", numericValue: -17, jsonName: "txsoroban_invalid" },
        ],
      },
    ],
  },
  "InnerTransactionResult_ext": {
    name: "InnerTransactionResult_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
    ],
  },
  "TransactionResult_result": {
    name: "TransactionResult_result",
    discriminantName: "code",
    discriminantType: "TransactionResultCode",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "innerResultPair",
        type: "InnerTransactionResultPair",
        cases: [
          { raw: "txFEE_BUMP_INNER_SUCCESS", numericValue: 1, jsonName: "txfee_bump_inner_success" },
          { raw: "txFEE_BUMP_INNER_FAILED", numericValue: -13, jsonName: "txfee_bump_inner_failed" },
        ],
      },
      {
        name: "results",
        type: "OperationResult<>",
        cases: [
          { raw: "txSUCCESS", numericValue: 0, jsonName: "txsuccess" },
          { raw: "txFAILED", numericValue: -1, jsonName: "txfailed" },
        ],
      },
      {
        name: null,
        type: "void",
        cases: [
          { raw: "txTOO_EARLY", numericValue: -2, jsonName: "txtoo_early" },
          { raw: "txTOO_LATE", numericValue: -3, jsonName: "txtoo_late" },
          { raw: "txMISSING_OPERATION", numericValue: -4, jsonName: "txmissing_operation" },
          { raw: "txBAD_SEQ", numericValue: -5, jsonName: "txbad_seq" },
          { raw: "txBAD_AUTH", numericValue: -6, jsonName: "txbad_auth" },
          { raw: "txINSUFFICIENT_BALANCE", numericValue: -7, jsonName: "txinsufficient_balance" },
          { raw: "txNO_ACCOUNT", numericValue: -8, jsonName: "txno_account" },
          { raw: "txINSUFFICIENT_FEE", numericValue: -9, jsonName: "txinsufficient_fee" },
          { raw: "txBAD_AUTH_EXTRA", numericValue: -10, jsonName: "txbad_auth_extra" },
          { raw: "txINTERNAL_ERROR", numericValue: -11, jsonName: "txinternal_error" },
          { raw: "txNOT_SUPPORTED", numericValue: -12, jsonName: "txnot_supported" },
          { raw: "txBAD_SPONSORSHIP", numericValue: -14, jsonName: "txbad_sponsorship" },
          { raw: "txBAD_MIN_SEQ_AGE_OR_GAP", numericValue: -15, jsonName: "txbad_min_seq_age_or_gap" },
          { raw: "txMALFORMED", numericValue: -16, jsonName: "txmalformed" },
          { raw: "txSOROBAN_INVALID", numericValue: -17, jsonName: "txsoroban_invalid" },
        ],
      },
    ],
  },
  "TransactionResult_ext": {
    name: "TransactionResult_ext",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: null,
        type: "void",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
    ],
  },
  "PeerAddress_ip": {
    name: "PeerAddress_ip",
    discriminantName: "type",
    discriminantType: "IPAddrType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "ipv4",
        type: "opaque[4]",
        cases: [
          { raw: "IPv4", numericValue: 0, jsonName: "ipv4" },
        ],
      },
      {
        name: "ipv6",
        type: "opaque[16]",
        cases: [
          { raw: "IPv6", numericValue: 1, jsonName: "ipv6" },
        ],
      },
    ],
  },
  "SurveyResponseBody": {
    name: "SurveyResponseBody",
    discriminantName: "type",
    discriminantType: "SurveyMessageResponseType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "topologyResponseBodyV2",
        type: "TopologyResponseBodyV2",
        cases: [
          { raw: "SURVEY_TOPOLOGY_RESPONSE_V2", numericValue: 2, jsonName: "survey_topology_response_v2" },
        ],
      },
    ],
  },
  "StellarMessage": {
    name: "StellarMessage",
    discriminantName: "type",
    discriminantType: "MessageType",
    discriminantKind: "enum",
    defaultArmType: null,
    arms: [
      {
        name: "error",
        type: "Error",
        cases: [
          { raw: "ERROR_MSG", numericValue: 0, jsonName: "error_msg" },
        ],
      },
      {
        name: "hello",
        type: "Hello",
        cases: [
          { raw: "HELLO", numericValue: 13, jsonName: "hello" },
        ],
      },
      {
        name: "auth",
        type: "Auth",
        cases: [
          { raw: "AUTH", numericValue: 2, jsonName: "auth" },
        ],
      },
      {
        name: "dontHave",
        type: "DontHave",
        cases: [
          { raw: "DONT_HAVE", numericValue: 3, jsonName: "dont_have" },
        ],
      },
      {
        name: "peers",
        type: "PeerAddress<100>",
        cases: [
          { raw: "PEERS", numericValue: 5, jsonName: "peers" },
        ],
      },
      {
        name: "txSetHash",
        type: "uint256",
        cases: [
          { raw: "GET_TX_SET", numericValue: 6, jsonName: "get_tx_set" },
        ],
      },
      {
        name: "txSet",
        type: "TransactionSet",
        cases: [
          { raw: "TX_SET", numericValue: 7, jsonName: "tx_set" },
        ],
      },
      {
        name: "generalizedTxSet",
        type: "GeneralizedTransactionSet",
        cases: [
          { raw: "GENERALIZED_TX_SET", numericValue: 17, jsonName: "generalized_tx_set" },
        ],
      },
      {
        name: "transaction",
        type: "TransactionEnvelope",
        cases: [
          { raw: "TRANSACTION", numericValue: 8, jsonName: "transaction" },
        ],
      },
      {
        name: "signedTimeSlicedSurveyRequestMessage",
        type: "SignedTimeSlicedSurveyRequestMessage",
        cases: [
          { raw: "TIME_SLICED_SURVEY_REQUEST", numericValue: 21, jsonName: "time_sliced_survey_request" },
        ],
      },
      {
        name: "signedTimeSlicedSurveyResponseMessage",
        type: "SignedTimeSlicedSurveyResponseMessage",
        cases: [
          { raw: "TIME_SLICED_SURVEY_RESPONSE", numericValue: 22, jsonName: "time_sliced_survey_response" },
        ],
      },
      {
        name: "signedTimeSlicedSurveyStartCollectingMessage",
        type: "SignedTimeSlicedSurveyStartCollectingMessage",
        cases: [
          { raw: "TIME_SLICED_SURVEY_START_COLLECTING", numericValue: 23, jsonName: "time_sliced_survey_start_collecting" },
        ],
      },
      {
        name: "signedTimeSlicedSurveyStopCollectingMessage",
        type: "SignedTimeSlicedSurveyStopCollectingMessage",
        cases: [
          { raw: "TIME_SLICED_SURVEY_STOP_COLLECTING", numericValue: 24, jsonName: "time_sliced_survey_stop_collecting" },
        ],
      },
      {
        name: "qSetHash",
        type: "uint256",
        cases: [
          { raw: "GET_SCP_QUORUMSET", numericValue: 9, jsonName: "get_scp_quorumset" },
        ],
      },
      {
        name: "qSet",
        type: "SCPQuorumSet",
        cases: [
          { raw: "SCP_QUORUMSET", numericValue: 10, jsonName: "scp_quorumset" },
        ],
      },
      {
        name: "envelope",
        type: "SCPEnvelope",
        cases: [
          { raw: "SCP_MESSAGE", numericValue: 11, jsonName: "scp_message" },
        ],
      },
      {
        name: "getSCPLedgerSeq",
        type: "uint32",
        cases: [
          { raw: "GET_SCP_STATE", numericValue: 12, jsonName: "get_scp_state" },
        ],
      },
      {
        name: "sendMoreMessage",
        type: "SendMore",
        cases: [
          { raw: "SEND_MORE", numericValue: 16, jsonName: "send_more" },
        ],
      },
      {
        name: "sendMoreExtendedMessage",
        type: "SendMoreExtended",
        cases: [
          { raw: "SEND_MORE_EXTENDED", numericValue: 20, jsonName: "send_more_extended" },
        ],
      },
      {
        name: "floodAdvert",
        type: "FloodAdvert",
        cases: [
          { raw: "FLOOD_ADVERT", numericValue: 18, jsonName: "flood_advert" },
        ],
      },
      {
        name: "floodDemand",
        type: "FloodDemand",
        cases: [
          { raw: "FLOOD_DEMAND", numericValue: 19, jsonName: "flood_demand" },
        ],
      },
    ],
  },
  "AuthenticatedMessage": {
    name: "AuthenticatedMessage",
    discriminantName: "v",
    discriminantType: "uint32",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: "v0",
        type: "AuthenticatedMessage_v0",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
    ],
  },
  "StoredTransactionSet": {
    name: "StoredTransactionSet",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: "txSet",
        type: "TransactionSet",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
      {
        name: "generalizedTxSet",
        type: "GeneralizedTransactionSet",
        cases: [
          { raw: 1, numericValue: 1, jsonName: "v1" },
        ],
      },
    ],
  },
  "PersistedSCPState": {
    name: "PersistedSCPState",
    discriminantName: "v",
    discriminantType: "int",
    discriminantKind: "int",
    defaultArmType: null,
    arms: [
      {
        name: "v0",
        type: "PersistedSCPStateV0",
        cases: [
          { raw: 0, numericValue: 0, jsonName: "v0" },
        ],
      },
      {
        name: "v1",
        type: "PersistedSCPStateV1",
        cases: [
          { raw: 1, numericValue: 1, jsonName: "v1" },
        ],
      },
    ],
  },
}

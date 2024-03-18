import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface MulticallState {
  callListeners?: {
    // on a per-chain basis
    [chainId: number]: {
      // stores for each call key the listeners' preferences
      [callKey: string]: {
        // stores how many listeners there are per each blocks per fetch preference
        [blocksPerFetch: number]: number
      }
    }
  }

  callResults: {
    [chainId: number]: {
      [callKey: string]: {
        data?: string | null
        blockNumber?: number
        fetchingBlockNumber?: number
      }
    }
  }
}

export interface Call {
  address: string
  callData: string
}

export interface ListenerOptions {
  // how often this data should be fetched, by default 1
  readonly blocksPerFetch?: number
}

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/
const LOWER_HEX_REGEX = /^0x[a-f0-9]*$/
export function toCallKey(call: Call): string {
  if (!ADDRESS_REGEX.test(call.address)) {
    throw new Error(`Invalid address: ${call.address}`)
  }
  if (!LOWER_HEX_REGEX.test(call.callData)) {
    throw new Error(`Invalid hex: ${call.callData}`)
  }
  return `${call.address}-${call.callData}`
}

export const initialState: MulticallState = {
  // callListeners: {},
  callResults: {},
}

const muticallReducer = createSlice({
  name: "muticall",
  initialState,
  reducers: {
    addMulticallListeners: (
      state,
      action: PayloadAction<{ chainId: number; calls: Call[]; options?: ListenerOptions }>
    ) => {
      const { chainId, calls, options = { blocksPerFetch: 1 } } = action.payload
      const listeners: MulticallState["callListeners"] = state.callListeners
        ? state.callListeners
        : (state.callListeners = {})
      listeners[chainId] = listeners[chainId] ?? {}
      calls.forEach((call) => {
        const callKey = toCallKey(call)
        listeners[chainId][callKey] = listeners[chainId][callKey] ?? {}
        listeners[chainId][callKey][options.blocksPerFetch!] =
          (listeners[chainId][callKey][options.blocksPerFetch!] ?? 0) + 1
      })
    },
    removeMulticallListeners: (
      state,
      action: PayloadAction<{ chainId: number; calls: Call[]; options?: ListenerOptions }>
    ) => {
      const { calls, chainId, options } = action.payload
      const blocksPerFetch = options?.blocksPerFetch ?? 1
      const listeners: MulticallState["callListeners"] = state.callListeners
        ? state.callListeners
        : (state.callListeners = {})

      if (!listeners[chainId]) return
      calls.forEach((call) => {
        const callKey = toCallKey(call)
        if (!listeners[chainId][callKey]) return
        if (!listeners[chainId][callKey][blocksPerFetch]) return

        if (listeners[chainId][callKey][blocksPerFetch] === 1) {
          delete listeners[chainId][callKey][blocksPerFetch]
        } else {
          listeners[chainId][callKey][blocksPerFetch]--
        }
      })
    },
    fetchingMulticallResults: (
      state,
      action: PayloadAction<{ chainId: number; calls: Call[]; fetchingBlockNumber: number }>
    ) => {
      const { chainId, calls, fetchingBlockNumber } = action.payload
      state.callResults[chainId] = state.callResults[chainId] ?? {}
      calls.forEach((call) => {
        const callKey = toCallKey(call)
        const current = state.callResults[chainId][callKey]
        if (!current) {
          state.callResults[chainId][callKey] = {
            fetchingBlockNumber,
          }
        } else {
          if ((current.fetchingBlockNumber ?? 0) >= fetchingBlockNumber) return
          state.callResults[chainId][callKey].fetchingBlockNumber = fetchingBlockNumber
        }
      })
    },
    errorFetchingMulticallResults: (
      state,
      action: PayloadAction<{
        chainId: number
        calls: Call[]
        fetchingBlockNumber: number
      }>
    ) => {
      const { chainId, calls, fetchingBlockNumber } = action.payload
      state.callResults[chainId] = state.callResults[chainId] ?? {}
      calls.forEach((call) => {
        const callKey = toCallKey(call)
        const current = state.callResults[chainId][callKey]
        if (!current) return // only should be dispatched if we are already fetching
        if (current.fetchingBlockNumber === fetchingBlockNumber) {
          delete current.fetchingBlockNumber
          current.data = null
          current.blockNumber = fetchingBlockNumber
        }
      })
    },
    updateMulticallResults: (
      state,
      action: PayloadAction<{
        chainId: number
        blockNumber: number
        results: {
          [callKey: string]: string | null
        }
      }>
    ) => {
      const { chainId, results, blockNumber } = action.payload
      state.callResults[chainId] = state.callResults[chainId] ?? {}
      Object.keys(results).forEach((callKey) => {
        const current = state.callResults[chainId][callKey]
        if ((current?.blockNumber ?? 0) > blockNumber) return
        state.callResults[chainId][callKey] = {
          data: results[callKey],
          blockNumber,
        }
      })
    },
  },
})

export default muticallReducer.reducer

import { INITIAL_ALLOWED_SLIPPAGE, DEFAULT_DEADLINE_FROM_NOW } from "@/constants"
import { createSlice } from "@reduxjs/toolkit"

export interface SerializedToken {
  chainId: number
  address: string
  decimals: number
  symbol?: string
  name?: string
}

export interface SerializedPair {
  token0: SerializedToken
  token1: SerializedToken
}

export interface UserState {
  // 上次更新版本的时间
  lastUpdateVersionTimestamp?: number

  userDarkMode: boolean | null // 用户选择的主题
  matchesDarkMode: boolean // whether the dark mode media query matches

  userExpertMode: boolean // 是否是专家模式

  userSingleHopOnly: boolean // 是否只使用单跳交易

  // 用户定义的 bips 滑点容差，用于所有 txns
  userSlippageTolerance: number

  // 用户设置的截止时间（以分钟为单位），用于所有交易
  userDeadline: number

  tokens: {
    [chainId: number]: {
      [address: string]: SerializedToken
    }
  }

  pairs: {
    [chainId: number]: {
      // keyed by token0Address:token1Address
      [key: string]: SerializedPair
    }
  }

  timestamp: number
  URLWarningVisible: boolean
}

function pairKey(token0Address: string, token1Address: string) {
  return `${token0Address};${token1Address}`
}

const currentTimestamp = () => new Date().getTime()

export const initialState: UserState = {
  userDarkMode: null,
  matchesDarkMode: false,
  userExpertMode: false,
  userSingleHopOnly: false,
  userSlippageTolerance: INITIAL_ALLOWED_SLIPPAGE,
  userDeadline: DEFAULT_DEADLINE_FROM_NOW,
  tokens: {},
  pairs: {},
  timestamp: currentTimestamp(),
  URLWarningVisible: true,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateVersion: (state) => {
      // 如果slippage（滑点容忍度）没有在本地存储中被跟踪，将其重置为默认值
      if (typeof state.userSlippageTolerance !== "number") {
        state.userSlippageTolerance = INITIAL_ALLOWED_SLIPPAGE
      }

      // 如果截止时间（deadline）没有在本地存储中被跟踪，因此将其重置为默认值
      if (typeof state.userDeadline !== "number") {
        state.userDeadline = DEFAULT_DEADLINE_FROM_NOW
      }

      state.lastUpdateVersionTimestamp = currentTimestamp()
    },
    // 更新用户选择的主题
    updateUserDarkMode: (state, action) => {
      state.userDarkMode = action.payload.userDarkMode
      state.timestamp = currentTimestamp()
    },
    updateMatchesDarkMode: (state, action) => {
      state.matchesDarkMode = action.payload.matchesDarkMode
      state.timestamp = currentTimestamp()
    },
    updateUserExpertMode: (state, action) => {
      state.userExpertMode = action.payload.userExpertMode
      state.timestamp = currentTimestamp()
    },
    updateUserSlippageTolerance: (state, action) => {
      state.userSlippageTolerance = action.payload.userSlippageTolerance
      state.timestamp = currentTimestamp()
    },
    // 更新截止时间（deadline）
    updateUserDeadline: (state, action) => {
      state.userDeadline = action.payload.userDeadline
      state.timestamp = currentTimestamp()
    },
    // 是否只使用单跳
    updateUserSingleHopOnly: (state, action) => {
      state.userSingleHopOnly = action.payload.userSingleHopOnly
    },
    // 添加序列化token
    addSerializedToken: (state, { payload: { serializedToken } }) => {
      if (!state.tokens) {
        state.tokens = {}
      }
      state.tokens[serializedToken.chainId] = state.tokens[serializedToken.chainId] || {}
      state.tokens[serializedToken.chainId][serializedToken.address] = serializedToken
      state.timestamp = currentTimestamp()
    },
    // 移除序列化token
    removeSerializedToken: (state, { payload: { address, chainId } }) => {
      if (!state.tokens) {
        state.tokens = {}
      }
      state.tokens[chainId] = state.tokens[chainId] || {}
      delete state.tokens[chainId][address]
      state.timestamp = currentTimestamp()
    },
    // 添加序列化pair
    addSerializedPair: (state, { payload: { serializedPair } }) => {
      if (
        serializedPair.token0.chainId === serializedPair.token1.chainId &&
        serializedPair.token0.address !== serializedPair.token1.address
      ) {
        const chainId = serializedPair.token0.chainId
        state.pairs[chainId] = state.pairs[chainId] || {}
        state.pairs[chainId][pairKey(serializedPair.token0.address, serializedPair.token1.address)] = serializedPair
      }
      state.timestamp = currentTimestamp()
    },
    // 移除序列化pair
    removeSerializedPair: (state, { payload: { chainId, tokenAAddress, tokenBAddress } }) => {
      if (state.pairs[chainId]) {
        // just delete both keys if either exists
        delete state.pairs[chainId][pairKey(tokenAAddress, tokenBAddress)]
        delete state.pairs[chainId][pairKey(tokenBAddress, tokenAAddress)]
      }
      state.timestamp = currentTimestamp()
    },
    // 显示或隐藏URL警告
    toggleURLWarning: (state) => {
      state.URLWarningVisible = !state.URLWarningVisible
    },
  },
})

export const {
  updateVersion,
  updateMatchesDarkMode,
  updateUserDarkMode,
  updateUserExpertMode,
  updateUserSlippageTolerance,
  updateUserDeadline,
  updateUserSingleHopOnly,
  addSerializedToken,
  removeSerializedToken,
  addSerializedPair,
  removeSerializedPair,
  toggleURLWarning,
} = userSlice.actions

export default userSlice.reducer

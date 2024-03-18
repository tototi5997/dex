import { createSlice } from "@reduxjs/toolkit"

export interface ApplicationState {
  readonly blockNumber: { readonly [chainId: number]: number }
  // readonly popupList: PopupList
  // readonly openModal: ApplicationModal | null
}

const initialState: ApplicationState = {
  blockNumber: {},
  // popupList: [],
  // openModal: null
}

const applicationReducer = createSlice({
  name: "application",
  initialState,
  reducers: {
    // 更新bloackNumber
    updateBlockNumber: (state, action) => {
      const { chainId, blockNumber } = action.payload
      if (typeof state.blockNumber[chainId] !== "number") {
        state.blockNumber[chainId] = blockNumber
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId])
      }
    },
  },
})

export default applicationReducer.reducer
export const { updateBlockNumber } = applicationReducer.actions

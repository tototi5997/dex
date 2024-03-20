import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum Field {
  LIQUIDITY_PERCENT = "LIQUIDITY_PERCENT",
  LIQUIDITY = "LIQUIDITY",
  CURRENCY_A = "CURRENCY_A",
  CURRENCY_B = "CURRENCY_B",
}

export interface BurnState {
  readonly independentField: Field
  readonly typedValue: string
}

const initialState: BurnState = {
  independentField: Field.LIQUIDITY_PERCENT,
  typedValue: "0",
}

const burnSlice = createSlice({
  name: "brun",
  initialState,
  reducers: {
    typeInput: (state, actions: PayloadAction<{ field: Field; typedValue: string }>) => {
      const { field, typedValue } = actions.payload
      return {
        ...state,
        independentField: field,
        typedValue,
      }
    },
  },
})

export default burnSlice.reducer
export const { typeInput } = burnSlice.actions

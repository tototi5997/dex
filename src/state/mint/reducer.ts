import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum Field {
  CURRENCY_A = "CURRENCY_A",
  CURRENCY_B = "CURRENCY_B",
}

export interface MintState {
  readonly independentField: Field
  readonly typedValue: string
  readonly otherTypedValue: string // for the case when there's no liquidity
}

const initialState: MintState = {
  independentField: Field.CURRENCY_A,
  typedValue: "",
  otherTypedValue: "",
}

const mintSlice = createSlice({
  name: "mint",
  initialState,
  reducers: {
    resetMintState: () => initialState,
    typeInput: (state, actions: PayloadAction<{ field: Field; typedValue: string; noLiquidity: boolean }>) => {
      const { field, typedValue, noLiquidity } = actions.payload
      if (noLiquidity) {
        // they're typing into the field they've last typed in
        if (field === state.independentField) {
          return {
            ...state,
            independentField: field,
            typedValue,
          }
        }
        // they're typing into a new field, store the other value
        else {
          return {
            ...state,
            independentField: field,
            typedValue,
            otherTypedValue: state.typedValue,
          }
        }
      } else {
        return {
          ...state,
          independentField: field,
          typedValue,
          otherTypedValue: "",
        }
      }
    },
  },
})

export default mintSlice.reducer
export const { resetMintState, typeInput } = mintSlice.actions

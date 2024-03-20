import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum Field {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT",
}

export interface SwapState {
  readonly independentField: Field
  readonly typedValue: string
  readonly [Field.INPUT]: {
    readonly currencyId: string | undefined
  }
  readonly [Field.OUTPUT]: {
    readonly currencyId: string | undefined
  }
  // the typed recipient address or ENS name, or null if swap should go to sender
  readonly recipient: string | null
}

const initialState: SwapState = {
  independentField: Field.INPUT,
  typedValue: "",
  [Field.INPUT]: {
    currencyId: "",
  },
  [Field.OUTPUT]: {
    currencyId: "",
  },
  recipient: null,
}

const swapSlice = createSlice({
  name: "swap",
  initialState,
  reducers: {
    replaceSwapState: (
      _,
      actions: PayloadAction<{
        field: Field
        typedValue: string
        inputCurrencyId?: string
        outputCurrencyId?: string
        recipient: string | null
      }>
    ) => {
      const { field, typedValue, inputCurrencyId, outputCurrencyId, recipient } = actions.payload
      return {
        [Field.INPUT]: {
          currencyId: inputCurrencyId,
        },
        [Field.OUTPUT]: {
          currencyId: outputCurrencyId,
        },
        independentField: field,
        typedValue: typedValue,
        recipient,
      }
    },
    selectCurrency: (state, actions: PayloadAction<{ field: Field; currencyId: string }>) => {
      const { field, currencyId } = actions.payload
      const otherField = field === Field.INPUT ? Field.OUTPUT : Field.INPUT
      if (currencyId === state[otherField].currencyId) {
        // the case where we have to swap the order
        return {
          ...state,
          independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
          [field]: { currencyId: currencyId },
          [otherField]: { currencyId: state[field].currencyId },
        }
      } else {
        // the normal case
        return {
          ...state,
          [field]: { currencyId: currencyId },
        }
      }
    },
    switchCurrencies: (state) => {
      return {
        ...state,
        independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
        [Field.INPUT]: { currencyId: state[Field.OUTPUT].currencyId },
        [Field.OUTPUT]: { currencyId: state[Field.INPUT].currencyId },
      }
    },
    typeInput: (state, actions: PayloadAction<{ field: Field; typedValue: string }>) => {
      const { field, typedValue } = actions.payload
      return {
        ...state,
        independentField: field,
        typedValue,
      }
    },
    setRecipient: (state, actions: PayloadAction<{ recipient: string | null }>) => {
      const { recipient } = actions.payload
      state.recipient = recipient
    },
  },
})

export default swapSlice.reducer
export const { replaceSwapState, selectCurrency, switchCurrencies, typeInput, setRecipient } = swapSlice.actions

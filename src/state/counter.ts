import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

const fetchNum = (amount: number) => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(amount)
    }, 3000)
  })
}

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
  extraReducers: (builder) => {
    builder.addCase(incrementAsync.fulfilled, (state, action) => {
      state.value += action.payload
    })
  },
})

export const incrementAsync = createAsyncThunk("counter/incrementAsync", async () => {
  const res = await fetchNum(2)
  return res
})

export default counterSlice.reducer
export const { increment, decrement } = counterSlice.actions

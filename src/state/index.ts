import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import counterReducer from "./counter"
import userReducer from "./user/reducer"
import applicationReducer from "./application/reducer"
import muticallReducer from "./multicall/reducer"
import transactionsReducer from "./transactions/reducer"
import swapReducer from "./swap/reducer"
import mintReducer from "./mint/reducer"
import burnReducer from "./burn/reducer"
import listsReducer from "./lists/reducer"

const store = configureStore({
  reducer: {
    counter: counterReducer, // test counter

    user: userReducer,
    application: applicationReducer,
    multicall: muticallReducer,
    transactions: transactionsReducer,
    swap: swapReducer,
    mint: mintReducer,
    burn: burnReducer,
    lists: listsReducer,
  },
})

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

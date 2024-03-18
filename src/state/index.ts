import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import counterReducer from "./counter"
import userReducer from "./user/reducer"
import applicationReducer from "./application/reducer"

const store = configureStore({
  reducer: {
    counter: counterReducer, // test counter

    user: userReducer,
    application: applicationReducer,
  },
})

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

import { IModalRoot } from "@/modals/modal-root"
import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"

interface ModalState {
  modalRoot: IModalRoot | null
}

const initialState: ModalState = {
  modalRoot: null,
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalRoot: (state, action: PayloadAction<IModalRoot>) => {
      state.modalRoot = action.payload
    },
  },
})

export default modalSlice.reducer
export const { setModalRoot } = modalSlice.actions

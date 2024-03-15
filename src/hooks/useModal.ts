import { ModalContext } from "@/modals/modal-root"
import { useContext } from "react"

const useModal = () => {
  return useContext(ModalContext)
}

export default useModal

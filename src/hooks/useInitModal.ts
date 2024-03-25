import GlobalModal from "@/modals"
import { IModalRoot } from "@/modals/modal-root"
import { useEffect, useRef, useState } from "react"

// modalRef: MutableRefObject<IModalRoot | undefined>
const useInitModal = () => {
  const modalRef = useRef<IModalRoot>()

  const [globalModal, setGlobalModal] = useState<GlobalModal>()

  useEffect(() => {
    if (modalRef.current) {
      const modalInstance = new GlobalModal(modalRef)
      setGlobalModal(modalInstance)
    }
  }, [modalRef])

  return { modalRef, globalModal }
}

export default useInitModal

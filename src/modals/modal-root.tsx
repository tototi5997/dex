import React, { useImperativeHandle, useState } from "react"
import { Modal } from "antd"
import modalMap, { GlobalMoalType } from "./modals.map"

export interface IModalRoot {
  show: (key: string) => void
  hide: () => void
}

const ModalRoot = React.forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false)

  const [modalProps, setModalProps] = useState<GlobalMoalType>()

  useImperativeHandle(ref, () => ({
    show: (key: string, extra?: Record<string, unknown>) => {
      // find modal props by key, then set modal props
      const modalProps = modalMap.get(key)
      if (modalProps) {
        setModalProps({ ...modalProps, extraProps: { ...modalProps?.extraProps, ...extra } })
        setVisible(true)
      }
    },
    hide: () => {
      setVisible(false)
    },
  }))

  return (
    <Modal open={visible} onCancel={() => setVisible(false)} {...modalProps}>
      {modalProps?.component ? React.createElement(modalProps.component, modalProps?.extraProps) : null}
    </Modal>
  )
})

export default ModalRoot
export const ModalContext = React.createContext<React.MutableRefObject<IModalRoot | undefined> | undefined>(undefined)

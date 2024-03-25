import { MutableRefObject } from "react"
import { IModalRoot } from "./modal-root"

type ModalCloseCallback = (callbackParams: unknown) => void

class GlobalModal {
  private modalRef: MutableRefObject<IModalRoot | undefined>
  private onCloseCallbacks: ModalCloseCallback[] = []

  constructor(modalRef: MutableRefObject<IModalRoot | undefined>) {
    this.modalRef = modalRef
  }

  public show(key: string, extra?: Record<string, unknown>) {
    this.modalRef.current?.show(key, extra)
    return this
  }

  public hide<T>(effectPrams?: T) {
    this.modalRef.current?.hide()

    // if onClose Callbacks exit
    // hide event must be triggered by useModal hook
    const len = this.onCloseCallbacks.length
    if (len) {
      for (let i = 0; i <= len; i++) {
        const callback = this.onCloseCallbacks.shift()
        callback?.(effectPrams)
      }
    }
  }

  public onClose(callback: ModalCloseCallback) {
    this.onCloseCallbacks.push(callback)
    return this
  }
}

export default GlobalModal

// modal.show(key).onClose(() => {})

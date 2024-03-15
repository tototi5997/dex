import { ModalProps } from "antd"
import WalletsList from "./contents/wallets-list"

interface IModalMain {
  des?: string
  component: () => JSX.Element
  extraProps?: Record<string, unknown>
}

export type GlobalMoalType = IModalMain & ModalProps

const modalMap = new Map<string, GlobalMoalType>([
  [
    "wallet_list",
    {
      des: "show wallet list to change wallet",
      component: WalletsList,
      footer: null,
      width: 400,
    },
  ],
])

export default modalMap

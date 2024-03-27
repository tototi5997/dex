import { ModalProps } from "antd"
import WalletsList from "./contents/wallets-list"
import SearchModal from "./contents/search-modal"

interface IModalMain {
  des?: string
  component: (props: any) => JSX.Element
  extraProps?: Record<string, unknown>
  noPadding?: boolean
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
  [
    "search_modal",
    {
      des: "",
      component: SearchModal,
      footer: null,
      width: 400,
      noPadding: true,
    },
  ],
])

export default modalMap

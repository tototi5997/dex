import Icon from "@/components/icon"
import c from "classnames"
import s from "./index.module.less"
import { useWeb3React } from "@web3-react/core"
import { shortenAddress } from "@/utils"
import useModal from "@/hooks/useModal"

const Header = () => {
  const { active, account, deactivate } = useWeb3React()

  const modal = useModal()

  const connectWallet = async () => {
    modal?.current?.show("wallet_list")
  }

  const disconnectWallet = async () => {
    try {
      await deactivate()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={c(s.header, "h-50 w-full flex items-center p-20")}>
      <Icon name="uniswap" />
      <div className="fs16 pl10">MyDEX</div>

      <section className={c(s.header_right, "flex gap-20")}>
        <div className={c(s.account_address)}>{account && shortenAddress(account)}</div>
        <div className="hand" onClick={active ? disconnectWallet : connectWallet}>
          {active ? "Disconnect" : "Connect"}
        </div>
      </section>
    </div>
  )
}

export default Header

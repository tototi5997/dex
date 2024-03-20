import Icon from "@/components/icon"
import c from "classnames"
import s from "./index.module.less"
import { useWeb3React } from "@web3-react/core"
import { shortenAddress } from "@/utils"
import useModal from "@/hooks/useModal"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useTranslation } from "react-i18next"
import useTheme from "@/hooks/useTheme"

const Header = () => {
  const { active, account, deactivate } = useWeb3React()

  const modal = useModal()

  const { i18n } = useTranslation()

  const { toggleTheme } = useTheme()

  const [userBalance, setUserBalance] = useState("")

  const connectWallet = async () => {
    modal?.current?.show("wallet_list")
    // try {
    //   const { ethereum } = window
    //   const accounts = await ethereum?.request({
    //     method: "eth_requestAccounts",
    //   })
    //   console.log(accounts[0])
    // } catch (error) {
    //   console.log(error)
    // }
  }

  const disconnectWallet = async () => {
    try {
      await deactivate()
    } catch (error) {
      console.log(error)
    }
  }

  const getUserBalance = async () => {
    try {
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum!)
      const signer = provider.getSigner()
      const balance = await signer.getBalance()
      setUserBalance(ethers.utils.formatEther(balance))
    } catch (error) {
      console.log(error)
    }
  }

  const handleSwapLanguage = () => {
    i18n.changeLanguage(i18n.language === "zh-CN" ? "en" : "zh-CN")
  }

  const handleChangeTheme = () => {
    // console.log(toggleTheme)
    toggleTheme()
  }

  useEffect(() => {
    getUserBalance()
  }, [])

  return (
    <div className={c(s.header, "h-50 w-full flex items-center p-20")}>
      <Icon name="uniswap" />
      <div className="fs16 pl10">MyDEX</div>

      <section className={c(s.header_right, "flex gap-20")}>
        <div className={c(s.theme_test, "hand")} onClick={handleChangeTheme}>
          主题
        </div>
        <div className={c("hand")} onClick={handleSwapLanguage}>
          {i18n?.language}
        </div>
        {active && <div>{userBalance} ETH</div>}
        <div className={c(s.account_address)}>{account && shortenAddress(account)}</div>
        <div className="hand" onClick={active ? disconnectWallet : connectWallet}>
          {active ? "Disconnect" : "Connect"}
        </div>
      </section>
    </div>
  )
}

export default Header

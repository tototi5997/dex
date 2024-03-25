import React from "react"
import useModal from "@/hooks/useModal"
import s from "./index.module.less"
import c from "classnames"
import Icon from "@/components/icon"
import { SUPPORTED_WALLETS } from "@/constants"
import { injected } from "@/components/connector/wallet-connector"
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core"
import { AbstractConnector } from "@web3-react/abstract-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"

interface IWalletItem {
  name?: string
  active?: boolean
  iconName?: string
  onClick?: () => void
}

const WalletsList = () => {
  const { connector, activate } = useWeb3React()

  const modal = useModal()

  // 判断是否存在 metamask
  const getOptions = () => {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key]

      // metamask
      if (option.connector === injected) {
        if (!window.ethereum) {
          if (option.name === "MetaMask") {
            return <WalletItem key={`connect-${key}`} name="Install MetaMask" />
          } else {
            //dont want to return install twice
            return null
          }
        }

        // don't return metamask if injected provider isn't metamask
        else if (option.name === "MetaMask" && !isMetamask) {
          return null
        }
        // likewise for generic
        else if (option.name === "Injected" && isMetamask) {
          return null
        }
      }

      return (
        <WalletItem
          key={`connect-${key}`}
          name={option.name}
          active={connector === option.connector}
          iconName={option.iconName}
          onClick={() => {
            !option.href && tryActivation(option.connector)
          }}
        />
      )
    })
  }

  // 遍历钱包， 重制 walletConnect 连接器
  // 激活连接器
  const tryActivation = async (connector: AbstractConnector | undefined) => {
    // let name = ""
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        // return (name = SUPPORTED_WALLETS[key].name)
        return SUPPORTED_WALLETS[key].name
      }
      return true
    })

    // if the connector is walletconnect and the user has already tried to connec
    // manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider) {
      connector.walletConnectProvider = undefined
    }

    connector &&
      activate(connector, undefined, true)
        .then(() => {
          modal?.hide()
        })
        .catch((error) => {
          if (error instanceof UnsupportedChainIdError) {
            // a little janky...can't use setError because the connector isn't set
            activate(connector)
          } else {
            // setPendingError(true)
            console.log(error)
          }
        })
  }

  return (
    <div className={c("wh100p fbv fbjc fbac gp20")}>
      <div className={c(s.wallets_container, "fbv gp4")}>{getOptions()}</div>
    </div>
  )
}

const WalletItem: React.FC<IWalletItem> = ({ active, iconName, name, onClick }) => {
  return (
    <div
      className={c("fbh fbac gp10 pl10 hand", s.wallet_item, {
        [s.wallet_active]: active,
      })}
      onClick={onClick && onClick}
    >
      <Icon name={iconName!} />
      <div>{name}</div>
    </div>
  )
}

export default WalletsList

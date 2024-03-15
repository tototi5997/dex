import { injected, walletconnect, walletlink } from "@/components/connector/wallet-connector"
import { AbstractConnector } from "@web3-react/abstract-connector"
import { ChainId, JSBI, Percent, Token, WETH } from "@uniswap/sdk"

export const NetworkContextName = "NETWORK"

export const GOVERNANCE_ADDRESS = "0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F"

export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: "0x090D4613473dEE047c3f2706764f49E0821D256e",
}

const UNI_ADDRESS = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
export const UNI: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, UNI_ADDRESS, 18, "UNI", "Uniswap"),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, UNI_ADDRESS, 18, "UNI", "Uniswap"),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, UNI_ADDRESS, 18, "UNI", "Uniswap"),
  [ChainId.GÖRLI]: new Token(ChainId.GÖRLI, UNI_ADDRESS, 18, "UNI", "Uniswap"),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, UNI_ADDRESS, 18, "UNI", "Uniswap"),
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  // INJECTED: {
  //   connector: injected,
  //   name: "Injected",
  //   iconName: "arrow-right.svg",
  //   description: "Injected web3 provider.",
  //   href: null,
  //   color: "#010101",
  //   primary: true,
  // },
  METAMASK: {
    connector: injected,
    name: "MetaMask",
    iconName: "metamask",
    description: "Easy-to-use browser extension.",
    href: null,
    color: "#E8831D",
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: "WalletConnect",
    iconName: "walletConnectIcon",
    // iconName: "coinbaseWalletIcon",
    description: "Connect to Trust Wallet, Rainbow Wallet and more...",
    href: null,
    color: "#4196FC",
    mobile: true,
  },
  WALLET_LINK: {
    connector: walletlink,
    name: "Coinbase Wallet",
    iconName: "coinbaseWalletIcon",
    description: "Use Coinbase Wallet app on mobile device",
    href: null,
    color: "#315CF5",
  },
  // COINBASE_LINK: {
  //   name: "Open in Coinbase Wallet",
  //   iconName: "coinbaseWalletIcon.svg",
  //   description: "Open in Coinbase Wallet app.",
  //   href: "https://go.cb-w.com/mtUDhEZPy1",
  //   color: "#315CF5",
  //   mobile: true,
  //   mobileOnly: true,
  // },
  // FORTMATIC: {
  //   connector: fortmatic,
  //   name: "Fortmatic",
  //   iconName: "fortmaticIcon.png",
  //   description: "Login using Fortmatic hosted wallet",
  //   href: null,
  //   color: "#6748FF",
  //   mobile: true,
  // },
  // Portis: {
  //   connector: portis,
  //   name: "Portis",
  //   iconName: "portisIcon.png",
  //   description: "Login using Portis hosted wallet",
  //   href: null,
  //   color: "#4A6C9B",
  //   mobile: true,
  // },
}

import { injected, walletconnect, walletlink } from "@/components/connector/wallet-connector"
import { AbstractConnector } from "@web3-react/abstract-connector"
import { ChainId, JSBI, Percent, Token, WETH } from "@uniswap/sdk"

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const AMPL = new Token(ChainId.MAINNET, "0xD46bA6D942050d489DBd938a2C909A5d5039A161", 9, "AMPL", "Ampleforth")
export const DAI = new Token(ChainId.MAINNET, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18, "DAI", "Dai Stablecoin")
export const USDC = new Token(ChainId.MAINNET, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 6, "USDC", "USD//C")
export const USDT = new Token(ChainId.MAINNET, "0xdAC17F958D2ee523a2206206994597C13D831ec7", 6, "USDT", "Tether USD")
export const WBTC = new Token(ChainId.MAINNET, "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", 8, "WBTC", "Wrapped BTC")
export const FEI = new Token(ChainId.MAINNET, "0x956F47F50A910163D8BF957Cf5846D573E7f87CA", 18, "FEI", "Fei USD")
export const TRIBE = new Token(ChainId.MAINNET, "0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B", 18, "TRIBE", "Tribe")
export const FRAX = new Token(ChainId.MAINNET, "0x853d955aCEf822Db058eb8505911ED77F175b99e", 18, "FRAX", "Frax")
export const FXS = new Token(ChainId.MAINNET, "0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0", 18, "FXS", "Frax Share")
export const renBTC = new Token(ChainId.MAINNET, "0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D", 8, "renBTC", "renBTC")

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

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

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.ROPSTEN]: [WETH[ChainId.ROPSTEN]],
  [ChainId.RINKEBY]: [WETH[ChainId.RINKEBY]],
  [ChainId.GÖRLI]: [WETH[ChainId.GÖRLI]],
  [ChainId.KOVAN]: [WETH[ChainId.KOVAN]],
}

export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT, WBTC],
}

// 固定对
export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [
      new Token(ChainId.MAINNET, "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643", 8, "cDAI", "Compound Dai"),
      new Token(ChainId.MAINNET, "0x39AA39c021dfbaE8faC545936693aC917d5E7563", 8, "cUSDC", "Compound USD Coin"),
    ],
    [USDC, USDT],
    [DAI, USDT],
  ],
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

import { InjectedConnector } from "@web3-react/injected-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import { WalletLinkConnector } from "@web3-react/walletlink-connector"
import { PortisConnector } from "@web3-react/portis-connector"
import UNISWAP_LOGO_URL from "@/icons/logo.svg"
import { Currency, CurrencyAmount, ETHER, JSBI, Token, TokenAmount } from "@uniswap/sdk"
import { useMulticallContract } from "@/hooks/useContract"
import { useMemo } from "react"
import { isAddress } from "@/utils"
import { useSingleContractMultipleData } from "@/state/multicall/hooks"

const NETWORK_URL = import.meta.env.VITE_NETWORK_URL
// const FORMATIC_KEY = import.meta.env.REACT_APP_FORTMATIC_KEY
const PORTIS_ID = import.meta.env.VITE_PORTIS_ID
const WALLETCONNECT_BRIDGE_URL = import.meta.env.VITE_WALLETCONNECT_BRIDGE_URL

if (typeof NETWORK_URL === "undefined") {
  // console.log(import.meta.env)
  throw new Error(`VITE_NETWORK_URL must be a defined environment variable`)
}

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] })

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: NETWORK_URL },
  bridge: WALLETCONNECT_BRIDGE_URL,
  qrcode: true,
})

export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: "Uniswap",
  appLogoUrl: UNISWAP_LOGO_URL,
})

export const portis = new PortisConnector({
  dAppId: PORTIS_ID ?? "",
  networks: [1],
})

/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */
export function useETHBalances(uncheckedAddresses?: (string | undefined)[]): {
  [address: string]: CurrencyAmount | undefined
} {
  const multicallContract = useMulticallContract()

  const addresses: string[] = useMemo(
    () =>
      uncheckedAddresses
        ? uncheckedAddresses
            .map(isAddress)
            .filter((a): a is string => a !== false)
            .sort()
        : [],
    [uncheckedAddresses]
  )

  const results = useSingleContractMultipleData(
    multicallContract,
    "getEthBalance",
    addresses.map((address) => [address])
  )

  return useMemo(
    () =>
      addresses.reduce<{ [address: string]: CurrencyAmount }>((memo, address, i) => {
        const value = results?.[i]?.result?.[0]
        if (value) memo[address] = CurrencyAmount.ether(JSBI.BigInt(value.toString()))
        return memo
      }, {}),
    [addresses, results]
  )
}

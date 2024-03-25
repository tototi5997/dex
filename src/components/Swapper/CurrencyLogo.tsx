import { Currency, ETHER, Token } from "@uniswap/sdk"
import Logo from "../Logo"
import { useMemo } from "react"
import { WrappedTokenInfo } from "@/state/lists/hooks"
import useHttpLocations from "@/hooks/useHttpLocations"
import s from "./index.module.less"
import EthemLogo from "@/assets/ethereum-logo.png"

interface ICurrencyLogo {
  currency?: Currency
  size?: string | number
  style?: React.CSSProperties
}

export const getTokenLogoURL = (address: string) =>
  `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`

const CurrencyLogo: React.FC<ICurrencyLogo> = (props) => {
  const { currency, size = 24, style } = props

  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }
      return [getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  if (currency === ETHER) {
    return <img src={EthemLogo} className={s.currency_logo} style={{ ...style, height: size, width: size }} />
  }

  return (
    <Logo
      className={s.currency_logo}
      srcs={srcs}
      style={{ ...style, height: size, width: size }}
      alt={`${currency?.symbol ?? "token"} logo`}
    />
  )
}

export default CurrencyLogo

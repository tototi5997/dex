import c from "classnames"
import s from "./index.module.less"
import { FixedSizeList } from "react-window"
import { Currency, ETHER, Token } from "@uniswap/sdk"
import { useActiveWeb3React } from "@/hooks"
import { wrappedCurrency } from "@/utils/wrappedCurrency"
import CurrencyLogo from "../Swapper/CurrencyLogo"
import { useCallback } from "react"

interface ICurrencyList {
  currencies: Currency[]
}

function currencyKey(currency: Currency): string {
  return currency instanceof Token ? currency.address : currency === ETHER ? "ETHER" : ""
}

const CurrencyList: React.FC<ICurrencyList> = (props) => {
  const { currencies } = props

  const { chainId } = useActiveWeb3React()

  //ListChildComponentProps
  const Row = useCallback(
    ({ data, index, style }: any) => {
      const currency = data[index]
      const token = wrappedCurrency(currency, chainId)
      return (
        <div className={c(s.currency_row, "fbh fbac gp10")} style={style}>
          <CurrencyLogo currency={token} />
          {token?.symbol}
          {token?.name}
          {/* {index} */}
        </div>
      )
    },
    [chainId]
  )

  const itemKey = useCallback((index: number, data: any) => currencyKey(data[index]), [])

  return (
    <FixedSizeList
      itemKey={itemKey}
      itemData={currencies}
      height={400}
      width="100%"
      itemCount={currencies.length}
      itemSize={56}
      overscanCount={5}
    >
      {Row}
    </FixedSizeList>
  )
}

export default CurrencyList

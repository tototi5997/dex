import c from "classnames"
import s from "./index.module.less"
import { FixedSizeList } from "react-window"
import { Currency, ETHER, Token, currencyEquals } from "@uniswap/sdk"
import { useActiveWeb3React } from "@/hooks"
import { wrappedCurrency } from "@/utils/wrappedCurrency"
import CurrencyLogo from "../Swapper/CurrencyLogo"
import { useCallback } from "react"

interface ICurrencyList {
  currencies: Currency[]
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
}

function currencyKey(currency: Currency): string {
  return currency instanceof Token ? currency.address : currency === ETHER ? "ETHER" : ""
}

const CurrencyList: React.FC<ICurrencyList> = (props) => {
  const { currencies, selectedCurrency, onCurrencySelect } = props

  const { chainId } = useActiveWeb3React()

  const itemKey = useCallback((index: number, data: any) => currencyKey(data[index]), [])

  //ListChildComponentProps
  const Row = useCallback(
    ({ data, index, style }: any) => {
      const currency = data[index]
      const isSelected = Boolean(selectedCurrency && currencyEquals(selectedCurrency, currency))
      const token = wrappedCurrency(currency, chainId)
      const handleSelect = () => onCurrencySelect(currency)

      return (
        <div
          className={c(s.currency_row, "fbh fbac gp10 hand pl20 pr20", {
            [s.diabled_row]: isSelected,
          })}
          style={style}
          onClick={isSelected ? undefined : handleSelect}
        >
          <CurrencyLogo currency={token} />
          <div className="fbv">
            {token?.symbol}
            <div className={c("fs12", s.token_name)}>{token?.name}</div>
          </div>
        </div>
      )
    },
    [chainId, onCurrencySelect, selectedCurrency]
  )

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

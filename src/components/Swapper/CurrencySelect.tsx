import { Currency } from "@uniswap/sdk"
import c from "classnames"
import s from "./index.module.less"
import CurrencyLogo from "./CurrencyLogo"
import Icon from "../icon"
import { useTranslation } from "react-i18next"

interface ICurrencySelect {
  currency?: Currency
  onSelect?: () => void
}

const CurrencySelect: React.FC<ICurrencySelect> = ({ currency, onSelect }) => {
  const { t } = useTranslation()

  return (
    <div
      className={c(s.currency_select, "fbh fbac fbjsa hand usn gp10", {
        [s.no_select_currency]: !currency,
      })}
      onClick={() => onSelect?.()}
    >
      {currency && <CurrencyLogo currency={currency} />}
      <div className="nowarp">
        {(currency && currency.symbol && currency.symbol.length > 20
          ? currency.symbol.slice(0, 4) +
            "..." +
            currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
          : currency?.symbol) || t("selectToken")}
      </div>
      <Icon name="arrow-down" fill={currency ? "black" : "white"} />
    </div>
  )
}

export default CurrencySelect

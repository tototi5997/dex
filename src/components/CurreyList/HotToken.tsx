import CurrencyLogo from "../Swapper/CurrencyLogo"
import { Currency } from "@uniswap/sdk"
import c from "classnames"
import s from "./index.module.less"

interface IHotToken {
  currency: Currency
  isSelected?: boolean
  onClickToken?: (currency: Currency) => void
}

const HotToken: React.FC<IHotToken> = (props) => {
  const { currency, isSelected, onClickToken } = props
  const handeClickToken = () => onClickToken?.(currency)

  return (
    <div
      className={c(s.popular_token, "fbh gp8 fbac fs14 hand usn", {
        [s.selected]: isSelected,
      })}
      onClick={handeClickToken}
    >
      <CurrencyLogo currency={currency} />
      <div className="fs12">{currency?.symbol}</div>
    </div>
  )
}

export default HotToken

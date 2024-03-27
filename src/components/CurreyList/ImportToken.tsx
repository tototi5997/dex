import { Token } from "@uniswap/sdk"
import CurrencyLogo from "../Swapper/CurrencyLogo"
import c from "classnames"
import s from "./index.module.less"

interface IImportToken {
  token: Token
}

const ImportToken: React.FC<IImportToken> = (props) => {
  const { token } = props
  return (
    <div className={c(s.currency_row, "fbh fbac gp10 hand pl20 pr20")}>
      <CurrencyLogo currency={token} />
      <div className="fbv">
        {token?.symbol}
        <div className={c("fs12", s.token_name)}>{token?.name}</div>
      </div>
    </div>
  )
}

export default ImportToken

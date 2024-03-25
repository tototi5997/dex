import s from "./index.module.less"
import c from "classnames"
import { useTranslation } from "react-i18next"
import IconButton from "../iconButton"
import { Button, InputNumber } from "antd"
import { useDefaultsFromURLSearch, useDerivedSwapInfo } from "@/state/swap/hooks"
import CurrencySelect from "./CurrencySelect"
import useModal from "@/hooks/useModal"

const Swapper = () => {
  const { t } = useTranslation()

  const loadedUrlParams = useDefaultsFromURLSearch()

  const modal = useModal()

  const {
    // v1Trade,
    // v2Trade,
    // currencyBalances,
    // parsedAmount,
    currencies,
    // inputError: swapInputError,
  } = useDerivedSwapInfo()

  const currencyInput = currencies.INPUT

  const handleSelectCurrencyInput = () => {
    modal?.show("search_modal")
  }

  return (
    <div className={c(s.swapper)}>
      <div className={c(s.swapper_header, "pt20 pl20 pr20 fbh fbac fbjsb")}>
        {t("swap")}
        <IconButton name="setting" fill="black" hoverFill="gray" />
      </div>

      <div className="p20">
        <section className={c(s.swap_from, "pt8 pl12 pr12 pb8")}>
          <div className="flex fbac fbjsb fs12">
            <span>From</span>
            <span>Balance: 0</span>
          </div>
          <div className="pt12 fbh fbac fbjsb">
            <InputNumber controls={false} style={{ width: 160 }} step={0.1} placeholder="0.0" />
            <div className="fbh fbac gp10">
              <div className={c(s.max_btn)}>MAX</div>
              <CurrencySelect currency={currencyInput} onSelect={handleSelectCurrencyInput} />
            </div>
          </div>
        </section>

        <section className={c(s.swap_arrow, "fbh fbac fbjc pt20 pb20")}>
          <IconButton name="arrow-down2" iconSize={18} />
        </section>

        <section className={c(s.swap_to, "pt8 pl12 pr12 pb8")}>
          <div className="flex fbac fbjsb fs12">
            <span>To</span>
            <span>Balance: 0</span>
          </div>
          <div className="pt12 fbh fbac fbjsb">
            <InputNumber controls={false} style={{ width: 160 }} step={0.1} placeholder="0.0" />
            <div className="fbh fbac gp10">
              {/* <div className={c(s.max_btn)}>MAX</div> */}
              <CurrencySelect />
            </div>
          </div>
        </section>

        <div className="fbh fbjsb fbac fs14  p6">
          <div>Price</div>
          <div className="fbh fbac gp4">
            0.3ETH per 1INCH <IconButton name="switch" iconSize={14} />
          </div>
        </div>

        <div className="fbh fbjsb fbac fs14  p6">
          <div>Slippage Tolerance</div>
          <div>1%</div>
        </div>

        <Button style={{ width: "100%", height: 56, borderRadius: 20 }}>Insufficient ETH Balance</Button>
      </div>
    </div>
  )
}

export default Swapper

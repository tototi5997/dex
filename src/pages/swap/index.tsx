import Swapper from "@/components/Swapper"
import s from "./index.module.less"
import c from "classnames"

const Swap = () => {
  return (
    <div className={c(s.swap_page, "wh100p pr fbh fbjc fbac")}>
      <Swapper />
    </div>
  )
}

export default Swap

import c from "classnames"
// import s from "./index.module.less"
import { Button } from "antd"
import { useAppDispatch, useAppSelector } from "@/state"
import { decrement, increment, incrementAsync } from "@/state/counter"

const Wallet = () => {
  const dispatch = useAppDispatch()

  const { value } = useAppSelector((state) => state.counter)

  const handleAdd = () => {
    dispatch(increment())
  }

  const handleDec = () => {
    dispatch(decrement())
  }

  const handleAsync = () => {
    dispatch(incrementAsync())
  }

  return (
    <div className={c("wh100p fbv fbjc fbac gp20")}>
      <div>{value}</div>
      <div className={c("fbh gp10")}>
        <Button onClick={handleAdd}>Add</Button>
        <Button onClick={handleDec}>Dec</Button>
        <Button onClick={handleAsync}>Add Async</Button>
      </div>
    </div>
  )
}

export default Wallet

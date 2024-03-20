import c from "classnames"
// import s from "./index.module.less"
import { Button } from "antd"
import { useAppDispatch, useAppSelector } from "@/state"
import { decrement, increment, incrementAsync } from "@/state/counter"
// import { ethers } from "ethers"
// import abi from "@/constants/test/Counter.json"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

// const ContractAbi = abi.abi
// const ContractAddress = "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9"

const Wallet = () => {
  const dispatch = useAppDispatch()

  const { value } = useAppSelector((state) => state.counter)

  const [count, setCount] = useState(0)

  const { t } = useTranslation()

  // const getCounter = async () => {
  //   try {
  //     const { ethereum } = window
  //     const provider = new ethers.providers.Web3Provider(ethereum!)
  //     const singer = provider.getSigner()
  //     const ContractCounter = new ethers.Contract(ContractAddress, ContractAbi, singer)
  //     const counts = await ContractCounter.getCounts()
  //     setCount(counts.toNumber())
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   getCounter()
  // }, [])

  const handleAdd = async () => {
    dispatch(increment())
    // try {
    //   const { ethereum } = window
    //   const provider = new ethers.providers.Web3Provider(ethereum!)
    //   const singer = provider.getSigner()
    //   const ContractCounter = new ethers.Contract(ContractAddress, ContractAbi, singer)
    //   await ContractCounter.add()
    //   getCounter()
    // } catch (error) {
    //   console.log(error)
    // }
  }

  const handleDec = () => {
    dispatch(decrement())
  }

  const handleAsync = () => {
    dispatch(incrementAsync())
  }

  return (
    <div className={c("wh100p fbv fbjc fbac gp20")}>
      <div>{t("swap")}</div>
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

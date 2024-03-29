// import { useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { useActiveWeb3React } from "../../hooks"
import { AppState } from "../index"
// import { addPopup, ApplicationModal, PopupContent, removePopup, setOpenModal } from './actions'

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React()

  return useSelector((state: AppState) => state.application.blockNumber[chainId ?? -1])
}

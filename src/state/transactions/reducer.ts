import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ChainId } from "@uniswap/sdk"

export interface SerializableTransactionReceipt {
  to: string
  from: string
  contractAddress: string
  transactionIndex: number
  blockHash: string
  transactionHash: string
  blockNumber: number
  status?: number
}

export interface TransactionDetails {
  hash: string
  approval?: { tokenAddress: string; spender: string }
  summary?: string
  claim?: { recipient: string }
  receipt?: SerializableTransactionReceipt
  lastCheckedBlockNumber?: number
  addedTime: number
  confirmedTime?: number
  from: string
}

export interface TransactionState {
  [chainId: number]: {
    [txHash: string]: TransactionDetails
  }
}

const now = () => new Date().getTime()

export const initialState: TransactionState = {}

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (
      transactions,
      action: PayloadAction<{
        chainId: ChainId
        hash: string
        from: string
        approval?: { tokenAddress: string; spender: string }
        claim?: { recipient: string }
        summary?: string
      }>
    ) => {
      const { chainId, hash, from, approval, claim, summary } = action.payload
      if (transactions[chainId]?.[hash]) {
        throw Error("Attempted to add existing transaction.")
      }
      const txs = transactions[chainId] ?? {}
      txs[hash] = { hash, approval, summary, claim, from, addedTime: now() }
      transactions[chainId] = txs
    },
    checkedTransaction: (
      transactions,
      action: PayloadAction<{
        chainId: ChainId
        hash: string
        blockNumber: number
      }>
    ) => {
      const { chainId, hash, blockNumber } = action.payload
      const tx = transactions[chainId]?.[hash]
      if (!tx) {
        return
      }
      if (!tx.lastCheckedBlockNumber) {
        tx.lastCheckedBlockNumber = blockNumber
      } else {
        tx.lastCheckedBlockNumber = Math.max(blockNumber, tx.lastCheckedBlockNumber)
      }
    },
    finalizeTransaction: (
      transactions,
      action: PayloadAction<{
        chainId: ChainId
        hash: string
        receipt: SerializableTransactionReceipt
      }>
    ) => {
      const { chainId, hash, receipt } = action.payload
      const tx = transactions[chainId]?.[hash]
      if (!tx) {
        return
      }
      tx.receipt = receipt
      tx.confirmedTime = now()
    },
  },
})

export default transactionsSlice.reducer
export const { addTransaction, checkedTransaction, finalizeTransaction } = transactionsSlice.actions

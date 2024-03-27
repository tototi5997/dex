import { useCallback, useMemo, useState } from "react"
import { useAllTokens, useIsUserAddedToken, useToken } from "@/hooks/Tokens"
import { filterTokens, useSortedTokensByQuery } from "@/utils/filtering"
import useDebounce from "@/hooks/useDebounce"
import { Currency, Token, currencyEquals } from "@uniswap/sdk"
import { Input } from "antd"
import { useTokenComparator } from "@/hooks/sorting"
import CurrencyList from "@/components/CurreyList"
import { isAddress } from "@/utils"
import ImportToken from "@/components/CurreyList/ImportToken"
import c from "classnames"
import s from "./index.module.less"
import HotToken from "@/components/CurreyList/HotToken"
import useModal from "@/hooks/useModal"

export interface SearchModalProps {
  currency?: Currency
}

const SearchModal = (props: SearchModalProps) => {
  const { currency } = props

  const modal = useModal()

  // 热门 token
  const hotTokens = [Currency.ETHER]
  // 渲染默认token列表
  // 1. searchQuery
  const [searchQuery, setSearchQuery] = useState<string>("")

  const [invertSearchOrder] = useState<boolean>(false)

  // allTokens
  const allTokens = useAllTokens()

  // 3. debouncedQuery
  const debouncedQuery = useDebounce(searchQuery, 200)

  // 4. filertTokens
  const filteredTokens: Token[] = useMemo(() => {
    return filterTokens(Object.values(allTokens), debouncedQuery)
  }, [allTokens, debouncedQuery])

  // 5.sortedTokens
  const tokenComparator = useTokenComparator(invertSearchOrder)
  const sortedTokens: Token[] = useMemo(() => {
    return filteredTokens.sort()
  }, [filteredTokens, tokenComparator])

  // 6. filteredSortedTokens
  const filteredSortedTokens = useSortedTokensByQuery(sortedTokens, debouncedQuery)

  // 渲染搜索到的token结果
  const searchToken = useToken(debouncedQuery)
  const searchTokenIsAdded = useIsUserAddedToken(searchToken)

  const handleInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
  }, [])

  // 选中 token
  const handleCurrencySelect = useCallback((currency: Currency) => {
    modal?.hide(currency)
  }, [])

  const hotTokenList = useCallback(() => {
    const isSelected = Boolean(currency && currencyEquals(hotTokens[0], currency))
    return <HotToken currency={hotTokens[0]} isSelected={isSelected} onClickToken={handleCurrencySelect} />
  }, [currency])

  return (
    <div className="pb20 pt20">
      <div className="pl20 pr20 pb10">
        <div className="fs14 bold">Select a token</div>
        <Input
          className="mt10 mb10"
          placeholder="Search name or paste address"
          value={searchQuery}
          onChange={handleInput}
        />
      </div>
      <div className={c(s.hot_tokens, "pl20 pr20 pb10")}>{hotTokenList()}</div>
      {!searchTokenIsAdded && searchToken ? (
        <ImportToken token={searchToken} />
      ) : filteredSortedTokens.length ? (
        <CurrencyList
          currencies={filteredSortedTokens}
          onCurrencySelect={handleCurrencySelect}
          selectedCurrency={currency}
        />
      ) : (
        <div className="pl20 pr20">No results found.</div>
      )}
    </div>
  )
}

export default SearchModal

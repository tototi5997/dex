import { useMemo, useState } from "react"
import { useAllTokens } from "@/hooks/Tokens"
import { filterTokens, useSortedTokensByQuery } from "@/utils/filtering"
import useDebounce from "@/hooks/useDebounce"
import { Token } from "@uniswap/sdk"
import { Input } from "antd"
import { useTokenComparator } from "@/hooks/sorting"
import CurrencyList from "@/components/CurreyList"

const SearchModal = () => {
  // 渲染token列表
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

  return (
    <div>
      <div className="fs14 bold">Select a token</div>
      <Input className="mt10 mb10" placeholder="Search name or paste address" />
      <CurrencyList currencies={filteredSortedTokens} />
    </div>
  )
}

export default SearchModal

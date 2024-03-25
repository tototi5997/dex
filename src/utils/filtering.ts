import { useMemo } from "react"
import { isAddress } from "@/utils"
import { Token } from "@uniswap/sdk"

export function filterTokens(tokens: Token[], search: string): Token[] {
  if (search.length === 0) return tokens

  const searchingAddress = isAddress(search)

  if (searchingAddress) {
    return tokens.filter((token) => token.address === searchingAddress)
  }

  const lowerSearchParts = search
    .toLowerCase()
    .split(/\s+/)
    .filter((s) => s.length > 0)

  if (lowerSearchParts.length === 0) {
    return tokens
  }

  const matchesSearch = (s: string): boolean => {
    const sParts = s
      .toLowerCase()
      .split(/\s+/)
      .filter((s) => s.length > 0)

    return lowerSearchParts.every((p) => p.length === 0 || sParts.some((sp) => sp.startsWith(p) || sp.endsWith(p)))
  }

  return tokens.filter((token) => {
    const { symbol, name } = token
    return (symbol && matchesSearch(symbol)) || (name && matchesSearch(name))
  })
}

export function useSortedTokensByQuery(tokens: Token[] | undefined, searchQuery: string): Token[] {
  return useMemo(() => {
    // 如果 tokens 未定义，则返回空数组
    if (!tokens) {
      return []
    }

    // 将搜索查询转换为小写，并按空格拆分为词组，过滤掉长度为 0 的字符串
    const symbolMatch = searchQuery
      .toLowerCase()
      .split(/\s+/)
      .filter((s) => s.length > 0)

    // 如果有多个搜索词组，则返回原始 tokens 数组
    if (symbolMatch.length > 1) {
      return tokens
    }

    // 定义用于存储精确匹配、符号子字符串匹配和其余令牌的数组
    const exactMatches: Token[] = []
    const symbolSubtrings: Token[] = []
    const rest: Token[] = []

    // 根据精确匹配、符号子字符串匹配和其余令牌的顺序对 tokens 进行排序
    // sort tokens by exact match -> subtring on symbol match -> rest
    tokens.map((token) => {
      if (token.symbol?.toLowerCase() === symbolMatch[0]) {
        return exactMatches.push(token)
      } else if (token.symbol?.toLowerCase().startsWith(searchQuery.toLowerCase().trim())) {
        return symbolSubtrings.push(token)
      } else {
        return rest.push(token)
      }
    })

    // 返回排序后的令牌数组
    return [...exactMatches, ...symbolSubtrings, ...rest]
  }, [tokens, searchQuery])
}

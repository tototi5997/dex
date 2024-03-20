import { useEagerConnect } from "@/hooks"

const Web3ReactManager = ({ children }: { children: JSX.Element }) => {
  const triedEager = useEagerConnect()
  return children
}

export default Web3ReactManager

import { useEffect, useState } from "react"
import { Web3Provider } from "@ethersproject/providers"
import { ChainId } from "@uniswap/sdk"
import { useWeb3React as useWeb3ReactCore } from "@web3-react/core"
import { Web3ReactContextInterface } from "@web3-react/core/dist/types"
import { NetworkContextName } from "../constants"
import { injected } from "@/components/connector/wallet-connector"

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & { chainId?: ChainId } {
  const context = useWeb3ReactCore<Web3Provider>()
  const contextNetwork = useWeb3ReactCore<Web3Provider>(NetworkContextName)
  return context.active ? context : contextNetwork
}

export function useEagerConnect() {
  // specifically using useWeb3ReactCore because of what this hook does
  const { activate, active } = useWeb3ReactCore()
  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      }
    })
  }, [activate])
  // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried
}

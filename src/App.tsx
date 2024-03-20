import { useRef } from "react"
import { useRoutes } from "react-router-dom"
import { routerConfig } from "./router"
import { Web3ReactProvider } from "@web3-react/core"
import getLibrary from "utils/getLibrary"
import { Provider } from "react-redux"
import store from "./state"
import ModalRoot, { IModalRoot, ModalContext } from "./modals/modal-root"
import useTheme from "./hooks/useTheme"
import Web3ReactManager from "./components/Web3ReactManager"

const App = () => {
  const modalRef = useRef<IModalRoot>()

  // 如果需要做路由级别的权限控制，可以在这里处理
  const element = useRoutes(routerConfig)

  useTheme() // init theme

  return (
    <>
      <ModalContext.Provider value={modalRef}>
        <Web3ReactManager>
          <>
            <ModalRoot ref={modalRef} />
            {element}
          </>
        </Web3ReactManager>
      </ModalContext.Provider>
    </>
  )
}

const AppContent = () => {
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Provider store={store}>
          <App />
        </Provider>
      </Web3ReactProvider>
    </>
  )
}

export default AppContent

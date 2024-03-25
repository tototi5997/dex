import { useRoutes } from "react-router-dom"
import { routerConfig } from "./router"
import { Web3ReactProvider } from "@web3-react/core"
import getLibrary from "utils/getLibrary"
import { Provider } from "react-redux"
import store from "./state"
import ModalRoot, { ModalContext } from "./modals/modal-root"
import useTheme from "./hooks/useTheme"
import Web3ReactManager from "./components/Web3ReactManager"
import useInitModal from "./hooks/useInitModal"

const App = () => {
  // 如果需要做路由级别的权限控制，可以在这里处理
  const element = useRoutes(routerConfig)
  // 全局弹窗管理
  const { modalRef, globalModal } = useInitModal()
  // 多主题初始化
  useTheme()

  return (
    <>
      <ModalContext.Provider value={globalModal}>
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

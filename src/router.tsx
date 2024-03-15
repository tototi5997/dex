import { HashRouter, BrowserRouter, RouteObject, Navigate } from "react-router-dom"
import Home from "./pages/home"
import NotFoundPage from "./pages/404"
import Wallet from "./pages/wallets"

export type RouterType = "hash" | "browser"

// 当前路由模式
const ROUTER_TYPE: RouterType = "hash"

// 路由类型
const routerMap = {
  hash: HashRouter,
  browser: BrowserRouter,
}

export const RouterComponent = routerMap[ROUTER_TYPE]

// 路由配置
export const routerConfig: RouteObject[] = [
  { path: "/", element: <Navigate to="/home/wallet" replace /> },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home/wallet",
        element: <Wallet />,
      },
    ],
  },
  // 404 放在最下面
  {
    path: "*",
    element: <NotFoundPage />,
  },
]

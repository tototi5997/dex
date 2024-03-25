import { HashRouter, BrowserRouter, RouteObject, Navigate } from "react-router-dom"
import Home from "./pages/home"
import NotFoundPage from "./pages/404"
// import Wallet from "./pages/wallets"
import Swap from "./pages/swap"

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
  { path: "/", element: <Navigate to="/home/swap" replace /> },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home/swap",
        element: <Swap />,
      },
    ],
  },
  // 404 放在最下面
  {
    path: "*",
    element: <NotFoundPage />,
  },
]

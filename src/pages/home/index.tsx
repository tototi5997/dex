import { Header } from "@/layout"
import c from "classnames"
import s from "./index.module.less"
import { Outlet } from "react-router-dom"

const Home = () => {
  return (
    <div className={c(s.home, "relative flex flex-col")}>
      <Header />
      <div className="flex-1 flex">
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Home

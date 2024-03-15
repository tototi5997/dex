import c from "classnames"
import s from "./index.module.less"

const NotFoundPage = () => {
  return (
    <div className={c(s.not_found_page)}>
      <span>404 Not Found</span>
    </div>
  )
}

export default NotFoundPage

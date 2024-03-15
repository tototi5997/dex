import Icon from "../icon"
import { Popover } from "antd"
import c from "classnames"
import s from './index.module.less'

type RenderFunction = () => React.ReactNode

interface IUser {
  className?: string
  popContent?: React.ReactNode | RenderFunction
}

const User: React.FC<IUser> = (props) => {
  const { className, popContent } = props

  return (
    <div className={c(className, "w-max h-max cursor-pointer")}>
      <Popover
        trigger="click"
        content={popContent}
        placement="bottomLeft"
        arrow={false}
        rootClassName={s.user_content}
      >
        <Icon name="user" />
      </Popover>
    </div>
  )
}

export default User

import { Tooltip } from "antd"
import Icon from "../icon"
import c from "classnames"
import s from "./index.module.less"
import { useState } from "react"

interface IIconButton {
  name: string
  iconSize?: number
  type?: "block" | "single"
  title?: string
  className?: string
  onClick?: () => void
  fill?: string
  hoverFill?: string
}

const IconButton: React.FC<IIconButton> = (props) => {
  const { type = "single", name, iconSize, title, className, onClick, fill, hoverFill } = props

  const [isHover, setHoverState] = useState(false)

  const handClick = () => {
    onClick?.()
  }

  return (
    <div
      className={c(s.icon_button, s[`button_${type}`], className, "cursor-pointer trans")}
      onClick={handClick}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
    >
      <Tooltip title={title}>
        <Icon name={name} size={iconSize} fill={isHover ? (hoverFill ? hoverFill : fill) : fill} />
      </Tooltip>
    </div>
  )
}

export default IconButton

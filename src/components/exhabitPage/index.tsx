import c from "classnames"
import s from "./index.module.less"
import IconButton from "../iconButton"

interface IExhibitPage {
  title?: string | React.ReactNode
  children?: React.ReactNode
  showBack?: boolean
  onBack?: () => void
}

const ExhibitPage: React.FC<IExhibitPage> = (props) => {
  const { title, children, showBack, onBack } = props

  const handleClickBack = () => {
    if (onBack) {
      onBack()
    } else {
      window.history.back()
    }
  }

  return (
    <div className={c(s.exhibit_page, "w-full h-full p-20")}>
      <div className={c(s.title, "w-full flex items-center")}>
        {showBack && <IconButton type="block" name="arrow-left" className="mr-12" onClick={handleClickBack} />}
        {title}
      </div>
      <div className={c(s.body)}>{children}</div>
    </div>
  )
}

export default ExhibitPage

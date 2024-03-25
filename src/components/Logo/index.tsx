import { useState } from "react"

interface ILogo {
  srcs: string[]
  style?: React.CSSProperties
  alt?: string
  className?: string
}

const BAD_SRCS: { [tokenAddress: string]: true } = {}

const Logo: React.FC<ILogo> = ({ srcs, alt, ...rest }) => {
  const [, refresh] = useState<number>(0)

  const src: string | undefined = srcs.find((src) => !BAD_SRCS[src])

  return (
    <img
      {...rest}
      alt={alt}
      src={src}
      onError={() => {
        if (src) BAD_SRCS[src] = true
        refresh((i) => i + 1)
      }}
    />
  )
}

export default Logo

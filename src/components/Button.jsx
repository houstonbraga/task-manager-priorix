import { tv } from "tailwind-variants"

const Button = ({ children, color, size, className, ...rest }) => {
  const button = tv({
    base: "flex items-center justify-center gap-1 rounded-lg px-3 font-semibold hover:opacity-80",
    variants: {
      color: {
        primary: "bg-cyan-500",
        ghost: "bg-transparent",
        secondary: "bg-zinc-500",
      },
      size: {
        small: "py-1 text-xs",
        large: "py-3 text-sm",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "small",
    },
  })

  return (
    <button {...rest} className={button({ color, size, className })}>
      {children}
    </button>
  )
}

export default Button

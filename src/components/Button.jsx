import PropTypes from "prop-types"
import { tv } from "tailwind-variants"

const Button = ({ children, color, size, className, ...rest }) => {
  const button = tv({
    base: `flex items-center justify-center gap-1 rounded-lg px-3 font-semibold ${rest.disabled ? "bg-opacity-30 hover:bg-opacity-30 disabled:cursor-not-allowed" : "hover-opacity-80"}`,
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

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["primary", "ghost", "secondary"]),
  size: PropTypes.oneOf(["small", "large"]),
  className: PropTypes.string,
}

export default Button

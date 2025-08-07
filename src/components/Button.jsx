const Button = ({
  children,
  size = "small",
  variant = "primary",
  className,
  ...rest
}) => {
  const getVariantsButton = () => {
    if (variant === "primary") {
      return "bg-cyan-500"
    }

    if (variant === "ghost") {
      return "bg-transparent"
    }

    if (variant === "secondary") {
      return "bg-zinc-500"
    }
  }

  const getSizeButton = () => {
    if (size === "small") {
      return "py-1 text-xs"
    }

    if (size === "large") {
      return "py-3 text-sm"
    }
  }

  return (
    <button
      {...rest}
      className={`flex items-center justify-center gap-1 rounded-lg px-3 font-semibold hover:opacity-80 ${getVariantsButton()} ${getSizeButton()} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button

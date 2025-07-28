const Button = ({ children, variant = "primary" }) => {
  const getVariantsButton = () => {
    if (variant === "primary") {
      return "bg-cyan-500"
    }

    if (variant === "ghost") {
      return "bg-transparent"
    }
  }

  return (
    <button
      className={`flex items-center justify-center gap-1 rounded-lg px-3 py-1 text-xs font-semibold hover:opacity-80 ${getVariantsButton()}`}
    >
      {children}
    </button>
  )
}

export default Button

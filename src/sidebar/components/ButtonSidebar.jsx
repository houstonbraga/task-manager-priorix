const ButtonSidebar = ({ children, variant }) => {
  const getChangeButton = () => {
    if (variant === "activated") {
      return "text-cyan-400 bg-zinc-800"
    }

    if (variant === "deactivated") {
      return "text-white bg-zinc-900 hover:text-cyan-400"
    }
  }

  return (
    <a
      href="#"
      className={`flex items-center gap-3 rounded-lg px-6 py-3 ${getChangeButton()}`}
    >
      {children}
    </a>
  )
}

export default ButtonSidebar

import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"
import { tv } from "tailwind-variants"

const ButtonSidebar = ({ children, to }) => {
  const button = tv({
    base: "flex items-center gap-3 rounded-lg px-6 py-3",
    variants: {
      mode: {
        activated: "bg-zinc-800 text-cyan-400",
        desactivated: "bg-zinc-900 text-white hover:text-cyan-400",
      },
    },
    defaultVariants: {
      mode: "desactivated",
    },
  })

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        button({ mode: isActive ? "activated" : "desactivated" })
      }
    >
      {children}
    </NavLink>
  )
}

ButtonSidebar.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.oneOf(["activated", "desactivated"]),
}

export default ButtonSidebar

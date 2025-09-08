import PropTypes from "prop-types"

const InputErrorMessage = ({ children }) => {
  return <span className="text-xs text-red-500">{children}</span>
}

InputErrorMessage.propTypes = {
  children: PropTypes.string,
}

export default InputErrorMessage

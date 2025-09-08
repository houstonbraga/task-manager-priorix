import PropTypes from "prop-types"

const InputLabel = ({ label, ...rest }) => {
  return (
    <label className="text-sm text-zinc-400" htmlFor={rest.id}>
      {label}
    </label>
  )
}

InputLabel.propTypes = {
  label: PropTypes.string.isRequired,
}

export default InputLabel

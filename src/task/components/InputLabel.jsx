const InputLabel = ({ label, ...rest }) => {
  return (
    <label className="text-sm text-zinc-400" htmlFor={rest.id}>
      {label}
    </label>
  )
}

export default InputLabel

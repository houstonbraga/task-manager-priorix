const Input = ({ label, ...rest }) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <label className="text-sm text-zinc-400" htmlFor={rest.id}>
        {label}
      </label>
      <input
        className="rounded-md border border-solid border-zinc-500 bg-transparent px-4 py-2"
        {...rest}
      />
    </div>
  )
}

export default Input

import { forwardRef } from "react"

import InputLabel from "./InputLabel"

const Input = forwardRef(({ label, inputError, ...rest }, ref) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel forHtml={rest.id} label={label} />
      <input
        className="rounded-md border border-solid border-zinc-500 bg-transparent px-4 py-2"
        {...rest}
        ref={ref}
      />
      {inputError && (
        <span className="text-xs text-red-500">{inputError.message}</span>
      )}
    </div>
  )
})

Input.displayName = "Input"

export default Input

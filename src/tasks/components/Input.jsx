import PropTypes from "prop-types"
import { forwardRef } from "react"

import InputErrorMessage from "./InputErrorMessage"
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
      {inputError && <InputErrorMessage>{inputError}</InputErrorMessage>}
    </div>
  )
})

Input.displayName = "Input"
Input.propTypes = {
  label: PropTypes.string,
  inputError: PropTypes.string,
}

export default Input

import PropTypes from "prop-types"
import { forwardRef } from "react"

import InputErrorMessage from "./InputErrorMessage"
import InputLabel from "./InputLabel"

const TimeSelect = forwardRef(({ inputError, ...rest }, ref) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel label="Horário" forHtml="time" />

      <select
        id="time"
        className="outline-brand-primary placeholder:text-brand-text-gray rounded-md border border-solid border-zinc-500 bg-transparent px-4 py-3 placeholder:text-sm"
        {...rest}
        ref={ref}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>

      {inputError && <InputErrorMessage>{inputError}</InputErrorMessage>}
    </div>
  )
})

TimeSelect.displayName = "TimeSelect"
TimeSelect.propTypes = {
  inputError: PropTypes.string,
}

export default TimeSelect

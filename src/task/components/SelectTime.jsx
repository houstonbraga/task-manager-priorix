import InputLabel from "./InputLabel"

const SelectTime = (props) => {
  return (
    <div className="flex flex-col text-left">
      <InputLabel label="Horário" />
      <select
        className="rounded-md border border-solid border-zinc-500 bg-transparent px-4 py-2"
        {...props}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
    </div>
  )
}

export default SelectTime

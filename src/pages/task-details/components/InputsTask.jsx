import Button from "../../../components/Button"
import Input from "../../../task/components/Input"
import SelectTime from "../../../task/components/SelectTime"

const InputsTask = () => {
  return (
    <div className="flex flex-col place-items-end space-y-6 rounded-xl bg-zinc-900 p-6">
      <div className="w-full space-y-3">
        <div>
          <Input key="title" label="Título" />
        </div>
        <div>
          <SelectTime />
        </div>

        <div>
          <Input key="description" label="Descrição" />
        </div>
      </div>

      <div className="flex w-full gap-5">
        <Button size="large" color="primary">
          Salvar
        </Button>
      </div>
    </div>
  )
}

export default InputsTask

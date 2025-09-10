import { Loader2, PlusIcon, Trash2Icon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { useDeleteAllTasks } from "../hooks/data/use-delete-all-tasks"
import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"

const Header = ({ title, subtitle }) => {
  const { mutate: deleteTasks, isPending } = useDeleteAllTasks()
  const [isOpen, setIsOpen] = useState(false)

  const deleteAllTasks = async () => {
    deleteTasks(undefined, {
      onSuccess: () => {
        toast.success("Tarefas deletadas com sucesso!")
      },
      onError: () => {
        toast.error("Erro ao deletar tarefas.")
      },
    })
  }

  const handleDialogClose = () => {
    return setIsOpen(false)
  }

  const handleSubmitError = () => {
    return toast.error("Erro ao criar a tarefa!")
  }

  return (
    <div className="mb-8 flex w-full items-end justify-between">
      <AddTaskDialog
        isOpen={isOpen}
        handleClose={handleDialogClose}
        submitError={handleSubmitError}
      />
      <div>
        <span className="text-xs text-cyan-400">{title}</span>
        <h1 className="text-xl font-semibold">{subtitle}</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button color="ghost" onClick={deleteAllTasks} disabled={isPending}>
          Limpar tarefas
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Trash2Icon width={20} />
          )}
        </Button>

        <Button color="primary" size="small" onClick={() => setIsOpen(true)}>
          Nova tarefa
          <PlusIcon width={20} />
        </Button>
      </div>
    </div>
  )
}

export default Header

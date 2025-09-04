import { useQueryClient } from "@tanstack/react-query"
import {
  CloudSun,
  Loader2,
  MoonIcon,
  PlusIcon,
  SunIcon,
  Trash2Icon,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import Button from "../components/Button"
import { useDeleteAllTasks } from "../hooks/data/use-delete-all-tasks"
import { useGetTasks } from "../hooks/data/use-get-tasks"
import AddTaskDialog from "./components/AddTaskDialog"
import ItemTask from "./components/ItemTask"
import TasksSeparator from "./components/TasksSeparator"

const Tasks = () => {
  const queryClient = useQueryClient()
  const { data: tasks } = useGetTasks()
  const { mutate: deleteTasks, isPending } = useDeleteAllTasks()
  const [isOpen, setIsOpen] = useState(false)

  const morningTask = tasks?.filter((task) => task.time === "morning")
  const afternoonTask = tasks?.filter((task) => task.time === "afternoon")
  const eveningTask = tasks?.filter((task) => task.time === "evening")

  //MUDA O STATUS DA TAREFA AO SER CLICADO
  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (taskId !== task.id) {
        return task
      }

      if (task.status === "done") {
        toast.success("Tarefa desmarcada com sucesso!", {
          style: {
            backgroundColor: "#6b7280",
            color: "white",
          },
        })
        return { ...task, status: "not_started" }
      }

      if (task.status === "not_started") {
        toast.success("Tarefa inicializada com sucesso!", {
          style: {
            backgroundColor: "#5d512d",
            color: "white",
          },
        })
        return { ...task, status: "in_progress" }
      }

      if (task.status === "in_progress") {
        toast.success("Tarefa concluida com sucesso!", {
          style: {
            backgroundColor: "#3a5948",
            color: "white",
          },
        })
        return { ...task, status: "done" }
      }
      return task
    })
    queryClient.setQueryData(["tasks"], newTasks)
  }

  const handleDialogClose = () => {
    return setIsOpen(false)
  }

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

  const handleSubmitError = () => {
    return toast.error("Erro ao criar a tarefa!")
  }

  return (
    <div className="w-full px-8 py-16">
      <AddTaskDialog
        isOpen={isOpen}
        handleClose={handleDialogClose}
        submitError={handleSubmitError}
      />
      <div className="mb-8 flex w-full items-end justify-between">
        <div>
          <span className="text-xs text-cyan-400">Minhas Tarefas</span>
          <h1 className="text-xl font-semibold">Minhas Tarefas</h1>
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

      <div className="rounded-xl bg-zinc-900 p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />
          {morningTask?.length === 0 && (
            <p className="text-sm text-gray-600">
              Nenhuma tarefa encontrada para esse período.
            </p>
          )}
          {morningTask?.map((task, index) => (
            <ItemTask
              key={index}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSun />} />
          {afternoonTask?.length === 0 && (
            <p className="text-sm text-gray-600">
              Nenhuma tarefa encontrada para esse período.
            </p>
          )}
          {afternoonTask?.map((task, index) => (
            <ItemTask
              key={index}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTask?.length === 0 && (
            <p className="text-sm text-gray-600">
              Nenhuma tarefa encontrada para esse período.
            </p>
          )}
          {eveningTask?.map((task, index) => (
            <ItemTask
              key={index}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks

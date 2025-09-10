import { Check, Loader2, SquareArrowOutUpRight, Trash2 } from "lucide-react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { toast } from "sonner"

import { useDeleteTask } from "../hooks/data/use-delete-task"
import { useUpdateTask } from "../hooks/data/use-update-task-details"
import Button from "./Button"

const ItemTask = ({ task }) => {
  const { mutate: updateStatus } = useUpdateTask(task.id)
  const { mutate: deleteTask, isPending } = useDeleteTask(task.id)

  const handleDeleteClick = () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa deletada com sucesso!", {
          style: {
            backgroundColor: "white",
            color: "red",
          },
        })
      },

      onError: () => {
        toast.error("Falha ao deletar tarefa!")
      },
    })
  }

  const getStyleTasks = () => {
    if (task.status === "not_started") {
      return "bg-zinc-800 bg-opacity-30"
    }

    if (task.status === "in_progress") {
      return "bg-amber-300 bg-opacity-30"
    }

    if (task.status === "done") {
      return "bg-green-300 bg-opacity-30"
    }
  }

  const getStatusTask = () => {
    if (task.status === "in_progress") {
      return "done"
    }
    if (task.status === "not_started") {
      return "in_progress"
    }
    return "not_started"
  }

  const handleCheckboxClick = () => {
    let status = getStatusTask()
    updateStatus(
      { status },
      {
        onSuccess: () => {
          if (status === "not_started") {
            toast.success("Tarefa desmarcada com sucesso!")
          }
          if (status === "done") {
            toast.success("Tarefa finalizada com sucesso!")
          }
          if (status === "in_progress") {
            toast.success("Tarefa em progresso!")
          }
        },
        onError: () => {
          toast.error("Erro ao mudar o status da tarefa.")
        },
      }
    )
  }

  return (
    <div
      className={`flex items-center justify-between rounded-xl p-3 text-sm ${getStyleTasks()}`}
    >
      <div className="flex items-center gap-3">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${task?.status === "not_started" ? "bg-zinc-700 bg-opacity-30" : getStyleTasks()}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={handleCheckboxClick}
          />
          {task?.status === "done" && <Check width={16} />}
          {task?.status === "in_progress" && (
            <Loader2 width={16} className="animate-spin" />
          )}
        </label>
        <p className="opacity-100">{task?.title}</p>
      </div>

      <div className="flex items-center gap-1">
        <Button color="ghost" onClick={handleDeleteClick} disabled={isPending}>
          {isPending ? (
            <Loader2 width={16} className="animate-spin" />
          ) : (
            <Trash2 className="text-zinc-400 hover:text-white" />
          )}
        </Button>

        <Link to={`/tasks/${task?.id}`}>
          <SquareArrowOutUpRight className="text-zinc-400 hover:text-white" />
        </Link>
      </div>
    </div>
  )
}

ItemTask.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(["morning", "afternoon", "evening"]).isRequired,
    status: PropTypes.oneOf(["not_started", "in_progress", "done"]).isRequired,
  }).isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func,
}

export default ItemTask

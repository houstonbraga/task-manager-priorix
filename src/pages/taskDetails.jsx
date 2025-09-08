import { ChevronRight, ChevronsLeft, Loader2, Trash2Icon } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import Button from "../components/Button"
import { useDeleteTask } from "../hooks/data/use-delete-task"
import { useGetTaskDetails } from "../hooks/data/use-get-task-details"
import { useUpdateTask } from "../hooks/data/use-update-task-details"
import Sidebar from "../sidebar"
import Input from "../tasks/components/Input"
import SelectTime from "../tasks/components/SelectTime"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()
  //atualiza a pagina
  const { data: task } = useGetTaskDetails(taskId, reset)
  //update
  const { mutate: updateTask, isPending: updateIsLoading } =
    useUpdateTask(taskId)
  //delete
  const { mutate: deleteTask, isPending: deleteIsLoading } =
    useDeleteTask(taskId)

  const handleSaveTask = (data) => {
    updateTask(data, {
      onSuccess: () => {
        toast.success("Tarefa atualizada com sucesso!")
        navigate(-1)
      },
      onError: () => {
        toast.error("Erro ao atualizar tarefa.")
      },
    })
  }

  const handleDeleteClick = () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa deletada com sucesso!")
        navigate(-1)
      },
      onError: () => {
        toast.error("Erro ao deletar tarefa")
      },
    })
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex w-full flex-col px-8 py-6">
        <button
          className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400"
          onClick={() => navigate(-1)}
        >
          <ChevronsLeft width={20} />
        </button>
        <div className="mb-8 flex w-full items-end justify-between">
          <div>
            <div className="flex items-center gap-1">
              <Link
                className="cursor-pointer text-xs text-gray-400 hover:opacity-50"
                to={"/"}
              >
                Minhas Tarefas
              </Link>
              <ChevronRight width={15} className="text-gray-400" />
              <span className="text-sm font-semibold text-cyan-400">
                {task?.title}
              </span>
            </div>
            <h1 className="text-xl font-semibold">{task?.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              color="danger"
              size="small"
              onClick={handleDeleteClick}
              disabled={updateIsLoading || deleteIsLoading}
            >
              Deletar tarefa
              {deleteIsLoading ? (
                <Loader2 width={20} />
              ) : (
                <Trash2Icon width={20} />
              )}
            </Button>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(handleSaveTask)}
          className="flex flex-col place-items-end space-y-6 rounded-xl bg-zinc-900 p-6"
        >
          <div className="w-full space-y-3">
            <div>
              <Input
                id="title"
                label="Título"
                inputError={errors?.title?.message}
                disabled={isSubmitting}
                {...register("title", {
                  required: "O título é obrigatório",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "O título tem que ser ao menos 1 caractere."
                    }
                    return true
                  },
                  maxLength: {
                    value: 20,
                    message: "Ops, o título é muito grande.",
                  },
                })}
              />
            </div>
            <div>
              <SelectTime
                inputError={errors?.time?.message}
                disabled={isSubmitting}
                {...register("time", {
                  required: "O tempo é obrigatório",
                })}
              />
            </div>

            <div>
              <Input
                id="description"
                label="Descrição"
                inputError={errors?.description?.message}
                disabled={isSubmitting}
                {...register("description", {
                  required: "A descrição é obrigatória",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "A descrição que ter ao menos 1 caractere."
                    }
                    return true
                  },
                })}
              />
            </div>
          </div>

          <div className="flex w-full gap-5">
            <Button
              size="large"
              color="primary"
              type="submit"
              disabled={updateIsLoading || deleteIsLoading}
            >
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage

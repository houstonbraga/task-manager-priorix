import { ChevronRight, ChevronsLeft, Loader2, Trash2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import Button from "../../components/Button"
import Sidebar from "../../sidebar"
import Input from "../../task/components/Input"
import SelectTime from "../../task/components/SelectTime"

const TaskDetailsPage = () => {
  const [task, setTask] = useState([])
  const { taskId } = useParams()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  useEffect(() => {
    const tasksDetailsFetch = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })
      const data = await response.json()
      setTask(data)
      reset(data)
    }
    tasksDetailsFetch()
  }, [taskId, reset]) //reset é usado para sincronizar os dados do form com os da api

  const handleSaveTask = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title.trim(),
        time: data.time,
        description: data.description.trim(),
      }),
    })
    if (!response.ok) {
      return toast.error("Erro ao salvar a tarefa!")
    }
    const newTask = await response.json()
    setTask(newTask)
    toast.success("Tarefa editada com sucesso!")
    navigate(-1)
  }

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      return toast.error("Erro ao deletar tarefa!")
    }

    toast.success("Tarefa deletada com sucesso!")
    navigate(-1)
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex w-full flex-col px-8 py-6">
        <button
          className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400"
          onClick={() => navigate("/")}
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
            <Button color="danger" size="small" onClick={handleDeleteClick}>
              Deletar tarefa
              <Trash2Icon width={20} />
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
                {...register("title", {
                  required: "O título é obrigatório",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "O título tem que ser ao menos 1 caractere."
                    }
                    return true
                  },
                  maxLength: 20,
                })}
              />
            </div>
            <div>
              <SelectTime
                inputError={errors?.time?.message}
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
            <Button size="large" color="primary" type="submit">
              {isSubmitting && <Loader2 className="animate-spin" />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage

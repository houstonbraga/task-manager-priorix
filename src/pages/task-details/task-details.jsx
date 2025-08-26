import { ChevronRight, ChevronsLeft, Loader2, Trash2Icon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import Button from "../../components/Button"
import Sidebar from "../../sidebar"
import Input from "../../task/components/Input"
import SelectTime from "../../task/components/SelectTime"

const TaskDetailsPage = () => {
  const [task, setTask] = useState()
  const [errors, setErrors] = useState([])
  const [saveIsLoading, setSaveIsLoading] = useState(false)
  const { taskId } = useParams()
  const navigate = useNavigate()

  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()

  useEffect(() => {
    const tasksDetailsFetch = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })
      const data = await response.json()
      setTask(data)
    }
    tasksDetailsFetch()
  }, [taskId])

  const handleSaveTask = async () => {
    setSaveIsLoading(true)
    const newErrors = []
    const title = titleRef.current.value
    const time = timeRef.current.value
    const description = descriptionRef.current.value
    if (!title.trim()) {
      newErrors.push({
        inputName: "title",
        message: "O título é obrigatório.",
      })
    }
    if (!time.trim()) {
      newErrors.push({
        inputName: "time",
        message: "O tempo é obrigatório.",
      })
    }
    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "A descrição é obrigatória.",
      })
    }
    setErrors(newErrors)
    if (newErrors.length > 0) {
      setSaveIsLoading(false)
      return
    }
    const updateTask = {
      ...task,
      title,
      time,
      description,
    }
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify(updateTask),
    })
    if (!response.ok) {
      setSaveIsLoading(false)
      return toast.error("Erro ao salvar a tarefa!")
    }
    const data = await response.json()
    setTask(data)
    setSaveIsLoading(false)
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

  const errorTitle = errors.find((error) => error.inputName === "title")
  const errorTime = errors.find((error) => error.inputName === "time")
  const errorDescription = errors.find(
    (error) => error.inputName === "description"
  )

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
        <div className="flex flex-col place-items-end space-y-6 rounded-xl bg-zinc-900 p-6">
          <div className="w-full space-y-3">
            <div>
              <Input
                id="title"
                label="Título"
                inputError={errorTitle?.message}
                disabled={saveIsLoading}
                defaultValue={task?.title}
                ref={titleRef}
              />
            </div>
            <div>
              <SelectTime
                inputError={errorTime?.message}
                defaultValue={task?.time}
                disabled={saveIsLoading}
                ref={timeRef}
              />
            </div>

            <div>
              <Input
                id="description"
                label="Descrição"
                inputError={errorDescription?.message}
                disabled={saveIsLoading}
                defaultValue={task?.description}
                ref={descriptionRef}
              />
            </div>
          </div>

          <div className="flex w-full gap-5">
            <Button
              size="large"
              color="primary"
              onClick={handleSaveTask}
              disabled={saveIsLoading}
            >
              {saveIsLoading && <Loader2 className="animate-spin" />}
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage

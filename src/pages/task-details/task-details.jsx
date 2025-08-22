import { ChevronRight, ChevronsLeft, Trash2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Button from "../../components/Button"
import Sidebar from "../../sidebar"
import InputsTask from "./components/InputsTask"

const TaskDetailsPage = () => {
  const [task, setTask] = useState()
  const { taskId } = useParams()
  const navigate = useNavigate()

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
              <span
                className="cursor-pointer text-xs text-gray-400 hover:opacity-50"
                onClick={() => navigate("/")}
              >
                Minhas Tarefas
              </span>
              <ChevronRight width={15} className="text-gray-400" />
              <span className="text-sm font-semibold text-cyan-400">
                {task?.title}
              </span>
            </div>
            <h1 className="text-xl font-semibold">{task?.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button color="danger" size="small">
              Deletar tarefa
              <Trash2Icon width={20} />
            </Button>
          </div>
        </div>
        <InputsTask />
      </div>
    </div>
  )
}

export default TaskDetailsPage

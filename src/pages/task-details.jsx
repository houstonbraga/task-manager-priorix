import { ArrowLeftIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Sidebar from "../sidebar"

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
      <div>
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500"
              onClick={() => navigate("/")}
            >
              <ArrowLeftIcon />
            </button>
          </div>

          <div>
            <h1>{task?.title}</h1>
            <h1>{task?.description}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage

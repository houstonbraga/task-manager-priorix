import { CloudSun, MoonIcon, PlusIcon, SunIcon, Trash2Icon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import Button from "../components/Button"
import TASKS from "../constants/constants"
import AddTaskDialog from "./components/AddTaskDialog"
import ItemTask from "./components/ItemTask"
import TasksSeparator from "./components/TasksSeparator"

const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS)
  const [isOpen, setIsOpen] = useState(false)

  const MorningTask = tasks.filter((task) => task.time === "morning")
  const AfternonTask = tasks.filter((task) => task.time === "afternon")
  const EveningTask = tasks.filter((task) => task.time === "evening")

  const handleTaskDeleteClick = (taskId) => {
    const newTasks = tasks.filter((task) => taskId !== task.id)
    toast.success("Tarefa deletada com sucesso!", {
      style: {
        backgroundColor: "white",
        color: "red",
      },
    })
    setTasks(newTasks)
  }

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (taskId !== task.id) {
        return task
      }

      if (task.status === "done") {
        toast.success("Tarefa desmarcada com sucesso!", {
          style: {
            backgroundColor: "gray",
            color: "white",
          },
        })
        return { ...task, status: "not_started" }
      }

      if (task.status === "not_started") {
        toast.success("Tarefa inicializada com sucesso!", {
          style: {
            backgroundColor: "#988137",
            color: "white",
          },
        })
        return { ...task, status: "in_progress" }
      }

      if (task.status === "in_progress") {
        toast.success("Tarefa concluida com sucesso!", {
          style: {
            backgroundColor: "#53906B",
            color: "white",
          },
        })
        return { ...task, status: "done" }
      }

      return task
    })
    setTasks(newTasks)
  }

  const handleDialogClose = () => {
    return setIsOpen(false)
  }

  /* handleTaskCheckboxClick = (currentTask) => {
    const UpdateTasksStatus = tasks.map((task) => {
      if (task.id === currentTask.id) {
        const statusMap = {
          done: "not_started",
          not_started: "in_progress",
          in_progress: "done",
        }
        return { ...task, status: statusMap[task.status] }
      }
      return task
    })
    setTasks(UpdateTasksStatus)
  } */

  return (
    <div className="w-full px-8 py-16">
      <AddTaskDialog isOpen={isOpen} handleClose={handleDialogClose} />
      <div className="mb-8 flex w-full items-end justify-between">
        <div>
          <span className="text-xs text-cyan-400">Minhas Tarefas</span>
          <h1 className="text-xl font-semibold">Minhas Tarefas</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost">
            Limpar tarefas
            <Trash2Icon width={20} />
          </Button>

          <Button variant="primary" onClick={() => setIsOpen(true)}>
            Nova tarefa
            <PlusIcon width={20} />
          </Button>
        </div>
      </div>

      <div className="rounded-xl bg-zinc-900 p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />

          {MorningTask.map((task, index) => (
            <ItemTask
              key={index}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSun />} />
          {AfternonTask.map((task, index) => (
            <ItemTask
              key={index}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {EveningTask.map((task, index) => (
            <ItemTask
              key={index}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks

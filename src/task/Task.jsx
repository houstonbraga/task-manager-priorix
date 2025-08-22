import { CloudSun, MoonIcon, PlusIcon, SunIcon, Trash2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import Button from "../components/Button"
import AddTaskDialog from "./components/AddTaskDialog"
import ItemTask from "./components/ItemTask"
import TasksSeparator from "./components/TasksSeparator"

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const MorningTask = tasks.filter((task) => task.time === "morning")
  const AfternonTask = tasks.filter((task) => task.time === "afternoon")
  const EveningTask = tasks.filter((task) => task.time === "evening")
  //PEGA OS DADOS JA EXISTENTES NO DB.JSON
  //O useEffect é utilizado para assim que carregar a pagina, o front-end faz o fetch e atualiza o state tasks
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "GET",
      })
      const tasks = await response.json()
      setTasks(tasks)
    }
    fetchTasks()
  }, [])
  //DELETE ALGUMA TASK PELO ID
  const handleDeleteSuccess = async (taskId) => {
    const newTasks = tasks.filter((task) => taskId !== task.id)
    setTasks(newTasks)
    toast.success("Tarefa deletada com sucesso!", {
      style: {
        backgroundColor: "white",
        color: "red",
      },
    })
  }
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
    setTasks(newTasks)
  }

  const handleDialogClose = () => {
    return setIsOpen(false)
  }

  const handleSubmitError = () => {
    return toast.error("Erro ao criar a tarefa!")
  }
  //ADICIONA UMA NOVA TASK PARA O DB.JSON
  const handleAddTask = async (newTask) => {
    setTasks([...tasks, newTask])
    toast.success("Tarefa criada com sucesso.")
  }

  return (
    <div className="w-full px-8 py-16">
      <AddTaskDialog
        isOpen={isOpen}
        handleClose={handleDialogClose}
        handleSuccess={handleAddTask}
        submitError={handleSubmitError}
      />
      <div className="mb-8 flex w-full items-end justify-between">
        <div>
          <span className="text-xs text-cyan-400">Minhas Tarefas</span>
          <h1 className="text-xl font-semibold">Minhas Tarefas</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button color="ghost">
            Limpar tarefas
            <Trash2Icon width={20} />
          </Button>

          <Button color="primary" onClick={() => setIsOpen(true)}>
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
              onSuccess={handleDeleteSuccess}
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
              onSuccess={handleDeleteSuccess}
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
              onSuccess={handleDeleteSuccess}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks

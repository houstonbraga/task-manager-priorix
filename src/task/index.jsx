import { CloudSun, MoonIcon, PlusIcon, SunIcon, Trash2Icon } from "lucide-react"
import Button from "../components/Button"
import TasksSeparator from "./components/TasksSeparator"
import TASKS from "../constants/constants"
import { useState } from "react"
import ItemTask from "./components/ItemTask"

const Tasks = () => {
  const [tasks] = useState(TASKS)

  const MorningTask = tasks.filter((task) => task.time === "morning")
  const AfternonTask = tasks.filter((task) => task.time === "afternon")
  const EveningTask = tasks.filter((task) => task.time === "evening")

  return (
    <div className="w-full px-8 py-16">
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

          <Button variant="primary">
            Nova tarefa
            <PlusIcon width={20} />
          </Button>
        </div>
      </div>

      <div className="rounded-xl bg-zinc-900 p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />

          {MorningTask.map((task, index) => (
            <ItemTask key={index} task={task} />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSun />} />
          {AfternonTask.map((task, index) => (
            <ItemTask key={index} task={task} />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {EveningTask.map((task, index) => (
            <ItemTask key={index} task={task} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks

import { PlusIcon, Trash2Icon } from "lucide-react"
import Button from "../components/Button"

const Tasks = () => {
  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full items-end justify-between">
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
    </div>
  )
}

export default Tasks

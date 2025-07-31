import { Check, Loader2, SquareArrowOutUpRight, Trash2 } from "lucide-react"
import Button from "../../components/Button"

const ItemTask = ({ task, handleCheckboxClick, handleDeleteClick }) => {
  const getStyleTaks = () => {
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

  return (
    <div
      className={`flex items-center justify-between rounded-xl p-3 text-sm ${getStyleTaks()}`}
    >
      <div className="flex items-center gap-3">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${task.status === "not_started" ? "bg-zinc-700 bg-opacity-30" : getStyleTaks()}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleCheckboxClick(task.id)}
          />
          {task.status === "done" && <Check width={16} />}
          {task.status === "in_progress" && (
            <Loader2 width={16} className="animate-spin" />
          )}
        </label>
        <p className="opacity-100">{task.title}</p>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" onClick={() => handleDeleteClick(task.id)}>
          <Trash2 className="text-zinc-400 hover:text-white" />
        </Button>

        <a href="#">
          <SquareArrowOutUpRight className="text-zinc-400 hover:text-white" />
        </a>
      </div>
    </div>
  )
}

export default ItemTask

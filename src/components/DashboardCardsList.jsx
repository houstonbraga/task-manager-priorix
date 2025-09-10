import { Dumbbell, ListChecks, ListRestart, ListTodo } from "lucide-react"

import { useGetTasks } from "../hooks/data/use-get-tasks"
import DashboardCard from "./DashboardCard"

const DashboardCardsList = () => {
  const { data: tasks } = useGetTasks()

  const tasksInProgress = tasks?.filter(
    (task) => task.status === "in_progress"
  ).length
  const tasksDone = tasks?.filter((task) => task.status === "done").length

  return (
    <div className="grid w-full grid-cols-4 gap-6">
      <DashboardCard
        icon={<ListTodo className="text-cyan-400" />}
        content={tasks?.length}
        title="Tarefas disponíveis"
      />
      <DashboardCard
        icon={<ListRestart className="text-cyan-400" />}
        content={tasksInProgress}
        title="Tarefas em andamento"
      />
      <DashboardCard
        icon={<ListChecks className="text-cyan-400" />}
        content={tasksDone}
        title="Tarefas concluídas"
      />
      <DashboardCard
        icon={<Dumbbell className="text-cyan-400" />}
        content="5"
        title="Treinos concluídos"
      />
    </div>
  )
}

export default DashboardCardsList

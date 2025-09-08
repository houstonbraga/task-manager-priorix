import Sidebar from "../sidebar"
import Tasks from "../tasks/Task"

function TasksPage() {
  return (
    <div className="flex">
      <Sidebar />
      <Tasks />
    </div>
  )
}

export default TasksPage

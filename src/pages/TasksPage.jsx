import Tasks from "../components/Task"
import Sidebar from "../sidebar"

function TasksPage() {
  return (
    <div className="flex">
      <Sidebar />
      <Tasks />
    </div>
  )
}

export default TasksPage

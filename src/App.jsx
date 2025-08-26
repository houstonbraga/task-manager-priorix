import Sidebar from "./sidebar"
import Tasks from "./task/Task"

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Tasks />
    </div>
  )
}

export default App

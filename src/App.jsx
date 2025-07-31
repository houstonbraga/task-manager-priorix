import Sidebar from "./sidebar"
import Tasks from "./task"
import { Toaster } from "sonner"

function App() {
  return (
    <div className="flex">
      <Toaster />
      <Sidebar />
      <Tasks />
    </div>
  )
}

export default App

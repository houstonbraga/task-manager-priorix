import { Toaster } from "sonner"

import Sidebar from "./sidebar"
import Tasks from "./task/Task"

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

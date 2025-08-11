import { LayoutDashboardIcon, ListCheckIcon } from "lucide-react"

import Logo from "../assets/logo.svg"
import ButtonSidebar from "./components/ButtonSidebar"

const Sidebar = () => {
  return (
    <div className="sticky top-0 flex h-screen w-[270] flex-col justify-between bg-zinc-900">
      <div>
        <div className="space-y-4 border-b border-b-zinc-700 p-5">
          <img src={Logo} alt="logo-priorix" width={80} />
          <p>
            Um simples{" "}
            <span className="text-cyan-300">organizador de tarefas</span>
          </p>
        </div>
        <div className="flex flex-col space-y-2 p-2">
          <ButtonSidebar>
            <LayoutDashboardIcon width={20} />
            Dashboard
          </ButtonSidebar>
          <ButtonSidebar mode="activated">
            <ListCheckIcon />
            Minhas Tarefas
          </ButtonSidebar>
        </div>
      </div>
      <p className="mb-4 text-center text-sm text-zinc-600">
        Desenvolvido por Houston Braga
      </p>
    </div>
  )
}

export default Sidebar

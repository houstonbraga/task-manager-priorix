import ListEmpty from "../assets/list-empty.webp"
import DashboardCardsList from "../components/DashboardCardsList"
import Header from "../components/Header"
import ItemTask from "../components/ItemTask"
import { useGetTasks } from "../hooks/data/use-get-tasks"
import Sidebar from "../sidebar"

const HomePage = () => {
  const { data: tasks } = useGetTasks()

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex w-full flex-1 flex-col px-8 pb-6 pt-16">
        <div>
          <Header title="Dashboard" subtitle="Minha dashboard" />
          <DashboardCardsList />
        </div>
        <div className="mt-6 grid flex-1 grid-cols-[2fr,1fr] gap-6">
          {tasks?.length === 0 ? (
            <div className="rounded-xl bg-zinc-900 p-6">
              <h1 className="mb-6 block text-zinc-400">Tarefas</h1>
              <div className="flex items-center justify-center">
                <img
                  src={ListEmpty}
                  alt="listempty"
                  className="mt-10 w-[200px] opacity-50"
                />
              </div>
            </div>
          ) : (
            <div className="rounded-xl bg-zinc-900 p-6">
              <h1 className="mb-6 text-zinc-400">Tarefas</h1>
              <div className="flex flex-col gap-2">
                {tasks?.map((task) => (
                  <ItemTask task={task} key={task.id} />
                ))}
              </div>
            </div>
          )}
          <div className="rounded-xl bg-zinc-900 p-6">
            <h1 className="text-zinc-400">Treinos</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

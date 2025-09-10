import ListEmpty from "../assets/list-empty.webp"
import DashboardCardsList from "../components/DashboardCardsList"
import Header from "../components/Header"
import ItemTask from "../components/ItemTask"
import WorkoutDay from "../components/WorkDay"
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
            <div className="flex max-h-[calc(100vh-380px)] flex-col overflow-y-auto rounded-xl bg-zinc-900 p-6">
              <h1 className="mb-6 text-zinc-400">Tarefas</h1>
              <div className="flex flex-col gap-2">
                {tasks?.map((task) => (
                  <ItemTask task={task} key={task.id} />
                ))}
              </div>
            </div>
          )}
          <div className="rounded-xl bg-zinc-900 p-6">
            <h1 className="mb-6 text-zinc-400">Treinos</h1>
            <div className="flex flex-col gap-5">
              <WorkoutDay day="Segunda-feira" />
              <WorkoutDay day="Terça-feira" />
              <WorkoutDay day="Quarta-feira" />
              <WorkoutDay day="Quinta-feira" />
              <WorkoutDay day="Sexta-feira" />
            </div>
            <div className="mt-5 rounded-full bg-zinc-400 px-4 py-2">
              <h2 className="text-center text-zinc-900">
                Feature em construção
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

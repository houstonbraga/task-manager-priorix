const DashboardCard = ({ icon, content, title }) => {
  return (
    <div className="flex h-[180px] flex-col items-center justify-center gap-1 rounded-[10px] bg-zinc-900">
      <div className="flex gap-2">
        {icon}
        <h2 className="text-xl font-semibold">{content}</h2>
      </div>
      <p className="text-zinc-400">{title}</p>
    </div>
  )
}

export default DashboardCard

const TasksSeparator = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-2 border-b border-solid border-b-zinc-800 pb-2 text-zinc-500">
      {icon}
      <p className="text-xs font-semibold">{title}</p>
    </div>
  )
}

export default TasksSeparator

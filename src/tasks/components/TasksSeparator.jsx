import PropTypes from "prop-types"

const TasksSeparator = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-2 border-b border-solid border-b-zinc-800 pb-2 text-zinc-500">
      {icon}
      <p className="text-xs font-semibold">{title}</p>
    </div>
  )
}

TasksSeparator.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
}

export default TasksSeparator

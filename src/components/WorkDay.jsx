const WorkoutDay = ({ day }) => {
  return (
    <div className="flex items-center gap-2">
      <label
        className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg bg-zinc-700 bg-opacity-30`}
      >
        <input
          type="checkbox"
          className="absolute h-full w-full cursor-pointer opacity-0"
        />
      </label>
      <h1>{day}</h1>
    </div>
  )
}

export default WorkoutDay

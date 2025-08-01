import { createPortal } from "react-dom"

const AddTaskDialog = ({ isOpen }) => {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed bottom-0 left-0 right-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
      <div className="rounded-xl bg-zinc-800 p-5 text-center text-white">
        <h2 className="mb-2 text-xl font-semibold">Nova tarefa</h2>
        <p className="text-sm text-zinc-500">Insira as informações abaixo</p>
      </div>
    </div>,
    document.body
  )
}

export default AddTaskDialog

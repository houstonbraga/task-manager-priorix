import "./AddTaskDialog.css"

import { useEffect, useRef } from "react"
import { useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import { v4 } from "uuid"

import Button from "../../components/Button"
import Input from "./Imput"
import SelectTime from "./SelectTime"

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("morning")
  const [description, setDescription] = useState("")

  const handleSaveTask = () => {
    if (!title.trim() || !time.trim() || !description.trim()) {
      return alert("Algum campo obrigatório está faltando!")
    }

    handleSubmit({
      id: v4(),
      title,
      time,
      description,
      status: "not_started",
    })
    handleClose()
  }

  useEffect(() => {
    setTitle("")
    setTime("morning")
    setDescription("")
  }, [isOpen])

  const nodeRef = useRef()

  return createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={300}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div
        ref={nodeRef}
        className="fixed bottom-0 left-0 right-0 top-0 flex h-screen w-screen flex-col items-center justify-center backdrop-blur-sm"
      >
        <div className="flex w-[366px] flex-col space-y-4 rounded-xl bg-zinc-800 p-5 text-center text-white">
          <div>
            <h2 className="mb-2 text-xl font-semibold">Nova tarefa</h2>
            <p className="text-sm text-zinc-500">
              Insira as informações abaixo
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Input
              key="title"
              label="Tílulo"
              placeholder="Digite o título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <SelectTime
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <Input
              key="description"
              label="Descrição"
              placeholder="Descreva a tarefa"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="secondary"
              size="large"
              className="w-full"
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button
              size="large"
              className="w-full"
              onClick={() => handleSaveTask()}
            >
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body
  )
}

export default AddTaskDialog

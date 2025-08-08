import "./AddTaskDialog.css"

import { useRef } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"

import Button from "../../components/Button"
import Input from "./Imput"
import SelectTime from "./SelectTime"

const AddTaskDialog = ({ isOpen, handleClose }) => {
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
            <Input key="title" label="Tílulo" placeholder="Digite o título" />
            <SelectTime />
            <Input
              key="description"
              label="Descrição"
              placeholder="Descreva a tarefa"
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
            <Button size="large" className="w-full">
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

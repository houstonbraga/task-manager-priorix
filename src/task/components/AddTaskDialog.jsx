import "./AddTaskDialog.css"

import { Loader2 } from "lucide-react"
import PropTypes from "prop-types"
import { useEffect, useRef } from "react"
import { useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import { toast } from "sonner"
import { v4 } from "uuid"

import Button from "../../components/Button"
import Input from "./Input"
import SelectTime from "./SelectTime"

const AddTaskDialog = ({ isOpen, handleClose, handleSuccess }) => {
  const [time, setTime] = useState("morning")
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const nodeRef = useRef()
  const titleRef = useRef()
  const descriptionRef = useRef()

  useEffect(() => {
    setTime("morning")
  }, [isOpen]) //para apagar ao salvar, com useEffects apenas com inputs controlaveis "Controlled"
  //ou seja, o title e description usam useRef portando nao precisam de useEffect para apagar o estado, pois eles nao tem estado

  const handleSaveTask = async () => {
    setIsLoading(true)
    const newErrors = []
    const title = titleRef.current.value
    const description = descriptionRef.current.value

    if (!title.trim()) {
      newErrors.push({
        inputName: "title",
        message: "O título é obrigatório.",
      })
    }

    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "A descrição é obrigatória.",
      })
    }

    setErrors(newErrors)

    if (newErrors.length > 0) {
      setIsLoading(false)
      return
    }
    const task = { id: v4(), title, time, description, status: "not_started" }
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      return toast.error("Erro ao criar a tarefa!")
    }
    setIsLoading(false)
    handleSuccess(task)
    handleClose()
  }

  const errorTitle = errors.find((error) => error.inputName === "title")
  const errorDescription = errors.find(
    (error) => error.inputName === "description"
  )

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
        <div className="flex w-[366px] flex-col space-y-4 rounded-xl bg-zinc-700 p-5 text-center text-white">
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
              ref={titleRef}
              inputError={errorTitle}
            />
            <SelectTime
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <Input
              key="description"
              label="Descrição"
              placeholder="Descreva a tarefa"
              ref={descriptionRef}
              inputError={errorDescription}
            />
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button
              color="secondary"
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
              {isLoading && <Loader2 className="animate-spin" />}
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body
  )
}

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSuccess: PropTypes.func.isRequired,
}

export default AddTaskDialog

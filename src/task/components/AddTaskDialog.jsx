import "./AddTaskDialog.css"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import PropTypes from "prop-types"
import { useRef } from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"
import { CSSTransition } from "react-transition-group"
import { toast } from "sonner"
import { v4 } from "uuid"

import Button from "../../components/Button"
import Input from "./Input"
import SelectTime from "./SelectTime"

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationKey: ["addTask"],
    mutationFn: async (newTask) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
      })
      if (!response.ok) {
        throw new Error()
      }
      return response.json()
    },
  })

  const nodeRef = useRef()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm()

  const handleSaveTask = async (data) => {
    const title = data.title
    const description = data.description
    const time = data.time
    const newTask = {
      id: v4(),
      title,
      time,
      description,
      status: "not_started",
    } //newTasks pega todas as info que voce digitou e passa para o body JSON
    mutate(newTask, {
      onSuccess: () => {
        toast.success("Tarefa criada com sucesso.")
        queryClient.setQueryData(["tasks"], (currentData) => {
          return [...currentData, newTask]
        })
        handleClose()
        reset({
          title: "",
          time: "morning",
          description: "",
        })
      },

      onError: () => {
        toast.error("Falha ao adicionar tarefa!")
      },
    })
  }

  const handleCancelClick = () => {
    reset({
      title: "",
      time: "morning",
      description: "",
    })
    handleClose()
  }
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
          <form
            onSubmit={handleSubmit(handleSaveTask)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-4">
              <Input
                key="title"
                label="Tílulo"
                placeholder="Digite o título"
                disabled={isSubmitting}
                inputError={errors?.title?.message}
                {...register("title", {
                  required: "O título é obrigatório.",
                  maxLength: 20,
                  validate: (value) => {
                    if (!value.trim()) {
                      return "O título precisa ao menos de um caractere."
                    }
                    return true
                  },
                })}
              />
              <SelectTime
                inputError={errors?.time?.message}
                disabled={isSubmitting}
                {...register("time", { required: true })}
              />
              <Input
                key="description"
                label="Descrição"
                placeholder="Descreva a tarefa"
                disabled={isSubmitting}
                inputError={errors?.description?.message}
                {...register("description", {
                  required: "A descrição é obrigatória.",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "A descrição precisa de ao menos um caractere."
                    }
                    return true
                  },
                })}
              />
            </div>
            <div className="flex items-center justify-center gap-3">
              <Button
                color="secondary"
                size="large"
                className="w-full"
                type="button"
                disabled={isSubmitting}
                onClick={handleCancelClick}
              >
                {isSubmitting && <Loader2 className="animate-spin" />}
                Cancelar
              </Button>
              <Button
                size="large"
                className="w-full"
                type="submit"
                disabled={isSubmitting}
              >
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </CSSTransition>,
    document.body
  )
}

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSuccess: PropTypes.func,
}

export default AddTaskDialog

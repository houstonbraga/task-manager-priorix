import { useMutation, useQueryClient } from "@tanstack/react-query"

import { mutations } from "../../keys/mutations"
import { queries } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: mutations.delete(taskId),
    mutationFn: async () => {
      const { data } = await api.delete(`/tasks/${taskId}`)
      return data
    },
    onSuccess: (deletedTask) => {
      //o valor de deleted é retornado no return do mutationFn
      queryClient.setQueryData(queries.getAll(), (oldTasks) => {
        return oldTasks.filter((oldTask) => deletedTask.id !== oldTask.id)
      })
    },
  })
}

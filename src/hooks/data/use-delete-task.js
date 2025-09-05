import { useMutation, useQueryClient } from "@tanstack/react-query"

import { api } from "../../lib/axios"

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const { data } = await api.delete(`/tasks/${taskId}`)
      return data
    },
    onSuccess: (deletedTask) => {
      //o valor de deleted é retornado no return do mutationFn
      queryClient.setQueryData(["tasks"], (oldTasks) => {
        return oldTasks.filter((oldTask) => deletedTask.id !== oldTask.id)
      })
    },
  })
}

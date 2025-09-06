import { useMutation, useQueryClient } from "@tanstack/react-query"

import { mutations } from "../../keys/mutations"
import { queries } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useDeleteAllTasks = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: mutations.deleteAll(),
    mutationFn: async () => {
      const { data: tasks } = await api.get("/tasks")

      await Promise.all(tasks.map((task) => api.delete(`/tasks/${task.id}`)))
    },
    onSuccess: () => {
      queryClient.setQueryData(queries.getAll(), [])
    },
  })
}

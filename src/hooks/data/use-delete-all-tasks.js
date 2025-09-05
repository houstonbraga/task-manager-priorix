import { useMutation, useQueryClient } from "@tanstack/react-query"

import { api } from "../../lib/axios"

export const useDeleteAllTasks = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["deleteAllTasks"],
    mutationFn: async () => {
      const { data: tasks } = await api.get("/tasks")

      await Promise.all(tasks.map((task) => api.delete(`/tasks/${task.id}`)))
    },
    onSuccess: () => {
      queryClient.setQueryData(["tasks"], [])
    },
  })
}

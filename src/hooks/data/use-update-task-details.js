import { useMutation, useQueryClient } from "@tanstack/react-query"

import { mutations } from "../../keys/mutations"
import { queries } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: mutations.update(taskId),
    mutationFn: async (data) => {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, {
        title: data?.title?.trim(),
        time: data?.time,
        description: data?.description?.trim(),
        status: data?.status,
      })
      return updatedTask
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(queries.getAll(), (oldTasks) => {
        return oldTasks.map((task) => {
          if (task.id === updatedTask.id) {
            return updatedTask
          }
          return task
        })
      })
      queryClient.setQueryData(queries.getOne(taskId), updatedTask)
    },
  })
}

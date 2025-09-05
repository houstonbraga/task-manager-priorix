import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export const useUpdateTaskDetails = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (data) => {
      const { data: updatedTask } = await axios.patch(
        `http://localhost:3000/tasks/${taskId}`,
        {
          title: data.title.trim(),
          time: data.time,
          description: data.description.trim(),
        }
      )
      queryClient.setQueryData(["tasks"], (oldTasks) => {
        return oldTasks.map((task) => {
          if (task.id === updatedTask.id) {
            return updatedTask
          }
          return task
        })
      })
      queryClient.setQueryData(["task", taskId], updatedTask)
    },
  })
}

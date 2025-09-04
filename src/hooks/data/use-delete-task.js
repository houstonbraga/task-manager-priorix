import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      })
      return response.json() // <-- AQUI
    },
    onSuccess: (deletedTask) => {
      //o valor de deleted é retornado no return do mutationFn
      queryClient.setQueryData(["tasks"], (oldTasks) => {
        return oldTasks.filter((oldTask) => deletedTask.id !== oldTask.id)
      })
    },
  })
}

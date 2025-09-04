import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
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
    onSuccess: (createdTask) => {
      queryClient.setQueryData(["tasks"], (currentData) => {
        return [...currentData, createdTask]
      })
    },
  })
}

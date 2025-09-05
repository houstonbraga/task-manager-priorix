import { useMutation, useQueryClient } from "@tanstack/react-query"

import { api } from "../../lib/axios"

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["addTask"],
    mutationFn: async (newTask) => {
      const { data } = await api.post("/tasks", newTask)
      return data
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(["tasks"], (currentData) => {
        return [...currentData, createdTask]
      })
    },
  })
}

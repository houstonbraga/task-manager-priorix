import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["addTask"],
    mutationFn: async (newTask) => {
      const { data } = await axios.post("http://localhost:3000/tasks", newTask)
      return data
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(["tasks"], (currentData) => {
        return [...currentData, createdTask]
      })
    },
  })
}

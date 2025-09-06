import { useMutation, useQueryClient } from "@tanstack/react-query"

import { mutations } from "../../keys/mutations"
import { queries } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: mutations.add(),
    mutationFn: async (newTask) => {
      const { data } = await api.post("/tasks", newTask)
      return data
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(queries.getAll(), (currentData) => {
        return [...currentData, createdTask]
      })
    },
  })
}

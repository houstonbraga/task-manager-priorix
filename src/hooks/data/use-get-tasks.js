import { useQuery } from "@tanstack/react-query"

import { queries } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useGetTasks = () => {
  return useQuery({
    queryKey: queries.getAll(),
    queryFn: async () => {
      const { data } = await api.get("/tasks")
      return data
    },
  })
}

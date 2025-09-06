import { useQuery } from "@tanstack/react-query"

import { queries } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useGetTaskDetails = (taskId, reset) => {
  return useQuery({
    queryKey: queries.getOne(taskId),
    queryFn: async () => {
      const { data } = await api.get(`/tasks/${taskId}`)
      if (reset && typeof reset === "function") {
        reset(data)
      }
      return data
    },
  })
}

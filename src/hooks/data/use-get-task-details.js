import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useGetTaskDetails = (taskId, reset) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const { data } = await axios(`http://localhost:3000/tasks/${taskId}`)
      reset(data)
      return data
    },
  })
}

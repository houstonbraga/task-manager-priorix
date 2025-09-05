import { useQuery } from "@tanstack/react-query"

export const useGetTaskDetails = (taskId, reset) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })
      if (!response.ok) {
        throw new Error()
      }
      const data = await response.json()
      reset(data)
      return data
    },
  })
}

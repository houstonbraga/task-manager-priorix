import { useMutation, useQueryClient } from "@tanstack/react-query"

//NESTE HOOK OPTEI PELO FETCH PARA QUESTÃO DE ESTUDOS

export const useDeleteAllTasks = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["deleteAllTasks"],
    mutationFn: async () => {
      const tasks = await fetch("http://localhost:3000/tasks").then((res) =>
        res.json()
      )

      await Promise.all(
        tasks.map((task) =>
          fetch(`http://localhost:3000/tasks/${task.id}`, { method: "DELETE" })
        )
      )
    },
    onSuccess: () => {
      queryClient.setQueryData(["tasks"], [])
    },
  })
}

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { mutations } from "../../keys/mutations"
import { queries } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useDeleteAllTasks = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: mutations.deleteAll(),
    mutationFn: async () => {
      try {
        // Busca todas as tasks
        const { data: tasks } = await api.get("/tasks")

        if (!tasks || tasks.length === 0) {
          throw new Error()
        }

        // Deleta todas as tasks em paralelo
        await Promise.all(tasks.map((task) => api.delete(`/tasks/${task.id}`)))
      } catch (error) {
        console.error("Erro ao deletar todas as tasks:", error)
        throw error // Re-throw para que o React Query possa tratar
      }
    },
    onSuccess: () => {
      // Atualiza o cache local
      queryClient.setQueryData(queries.getAll(), [])

      // Invalida todas as queries relacionadas para garantir consistência
      queryClient.invalidateQueries({ queryKey: queries.getAll() })
    },
    onError: (error) => {
      console.error("Falha ao deletar todas as tasks:", error)
    },
  })
}

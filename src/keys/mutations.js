export const mutations = {
  add: () => ["addTask"],
  update: (taskId) => ["updateTask", taskId],
  delete: (taskId) => ["deleteTask", taskId],
  deleteAll: () => ["deleteAllTask"],
}

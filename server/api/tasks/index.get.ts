import { tasks } from '../../../mocks/tasks.json'

export default defineEventHandler((event) => {
  console.log('Available tasks:', tasks)
  const query = getQuery(event)
  let filteredTasks = [...tasks]

  // Фильтрация по типу
  if (query.type) {
    filteredTasks = filteredTasks.filter(task => task.type === parseInt(query.type as string))
  }

  // Фильтрация по статусу
  if (query.status) {
    filteredTasks = filteredTasks.filter(task => task.status === query.status)
  }

  return filteredTasks
}) 
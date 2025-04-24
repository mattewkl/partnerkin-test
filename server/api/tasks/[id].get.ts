import { tasks } from '../../../mocks/tasks.json'

export default defineEventHandler((event) => {
  const id = parseInt(event.context.params!.id)
  
  const task = tasks.find(t => t.id === id)
  
  if (!task) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Task not found'
    })
  }

  return task
}) 
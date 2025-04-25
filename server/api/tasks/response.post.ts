import type { TaskAppliedPostType } from '@/types/taskTypes'

export default defineEventHandler(async (event) => {
  const body = await readBody<TaskAppliedPostType>(event)
  
  // Валидация
  if (!body.email) {
    throw createError({
      statusCode: 400,
      message: 'Email is required'
    })
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid email format'
    })
  }
  
  // В реальном API здесь была бы валидация и сохранение в БД
  console.log('Task response received:', body)
  
  return {
    success: true,
    data: body
  }
}) 
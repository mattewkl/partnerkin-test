import type { TaskAppliedPostType } from '@/types/taskTypes'

/**
 * @openapi
 * /api/tasks/response:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Отправить отклик на задачу
 *     description: Создает новый отклик на задачу от исполнителя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskAppliedPostType'
 *     responses:
 *       200:
 *         description: Успешный отклик
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/TaskAppliedPostType'
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Email is required
 */
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
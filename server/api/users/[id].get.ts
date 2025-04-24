import { users } from '../../../mocks/users.json'

export default defineEventHandler((event) => {
  const id = parseInt(event.context.params!.id)
  
  const user = users.find(u => u.id === id)
  
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }

  return user
}) 
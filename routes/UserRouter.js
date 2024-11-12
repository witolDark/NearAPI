import Router from 'express'

const userRouter = new Router()

userRouter.post('/users')
userRouter.get('/users')
userRouter.get('/users/:id')
userRouter.put('/users')
userRouter.delete('/users/:id')

export default userRouter
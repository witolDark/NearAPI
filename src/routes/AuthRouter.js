import Router from "express"
import UserController from "../controllers/UserContoller.js"

const authRouter = new Router()

authRouter.post('/registration', UserController.register)
authRouter.post('/login', UserController.login)
authRouter.post('/logout', UserController.logout)
authRouter.get('/activate/:link', UserController.activate)
authRouter.get('/refresh', UserController.refresh)

export default authRouter
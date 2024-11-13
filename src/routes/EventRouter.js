import Router from "express"
import EventController from "../controllers/EventController.js";

const eventRouter = new Router()

eventRouter.post('/events', EventController.create)
eventRouter.get('/events')
eventRouter.get('/events/:id')
eventRouter.put('/events')
eventRouter.delete('/events/:id')

export default eventRouter
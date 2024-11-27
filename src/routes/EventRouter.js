import Router from "express"
import EventController from "../controllers/EventController.js";

const eventRouter = new Router()

eventRouter.post('/events', EventController.create)
eventRouter.get('/events', EventController.getAll)
eventRouter.get('/events/:id', EventController.getEvent)
eventRouter.get('/creator/:creator', EventController.getEventsByCreator)
eventRouter.get('/pendings', EventController.getAllPendings)
eventRouter.put('/decline/:id', EventController.cancelEvent)
eventRouter.put('/approve/:id', EventController.approveEvent)
eventRouter.delete('/events/:id', EventController.cancelEvent)

export default eventRouter
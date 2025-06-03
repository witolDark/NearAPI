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
eventRouter.put('/events/:id', EventController.cancelEvent)
eventRouter.delete('/events/:id', EventController.delete)

eventRouter.post('/review', EventController.rateEvent)
eventRouter.get('/reviews/event/:id', EventController.getReviewsByEventId)
eventRouter.get('/groups/event/:id', EventController.getGroupsByEventId)
eventRouter.post('/groups/comments', EventController.leaveComment)
eventRouter.get('/comments/group/:id', EventController.getCommentsByGroupId)
eventRouter.delete('/comments/:id', EventController.deleteComment)
eventRouter.get('/categories', EventController.getCategories)

export default eventRouter
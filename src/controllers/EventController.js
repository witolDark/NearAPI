import EventService from "../services/EventService.js";
import {EventDTO} from "../dtos/EventDTO.js";

class EventController {
    async create(request, response) {
        try {
            const eventData = new EventDTO(request.body)
            const event = await EventService.addEvent(eventData);

            response.status(200).json(event)
        } catch (e) {
            response.status(500).json(e)
        }
    }

    async getEvent(request, response) {
        try {
            const id = request.params.id;

            const event = await EventService.getEvent(id)

            response.status(200).json(event)
        } catch (e) {
            response.status(500).json(e)
        }
    }

    async getAll(request, response) {
        try {
            const events = await EventService.getAllEvents()

            response.json(events)
        } catch (e) {
            response.json(e)
        }
    }

    async getAllPendings(request, response) {
        try {
            const events = await EventService.getAllPendings()

            response.json(events)
        } catch (e) {
            response.json(e)
        }
    }

    async getEventsByCreator(request, response) {
        try {
            const creator = request.params.creator
            const events = await EventService.getEventsByCreator(creator)

            response.json(events)
        } catch (e) {
            response.json(e)
        }
    }

    async approveEvent(request, response) {
        try {
            const id = request.params.id;
            await EventService.approveEvent(id)

            const events = await EventService.getAllPendings()

            response.json(events)
        } catch (e) {
            response.json(e)
        }
    }

    async cancelEvent(request, response) {
        try {
            const id = request.params.id;
            await EventService.cancelEvent(id)

            const events = await EventService.getAllPendings()

            response.json(events)
        } catch (e) {
            response.json(e)
        }
    }

    async delete(request, response) {
        try {
            const {id} = request.params.id
            await EventService.deleteEvent(id)

            response.status(204);
        } catch (e) {
            response.status(500).json(e);
        }
    }

    async getCategories(request, response) {
        try {
            const categories = await EventService.getCategories()

            response.status(200).json(categories)
        } catch (e) {
            response.status(500).json(e);
        }
    }

    async rateEvent(request, response) {
        try {
            const { eventId, userId, rating, text } = request.body
            const review = await EventService.rateEvent({eventId, userId, rating, text});

            response.status(200).json(review)
        } catch (e) {
            response.status(500).json(e)
        }
    }

    async getReviewsByEventId(request, response) {
        try {
            const { eventId } = request.params.id;
            const reviews = await EventService.getReviewsByEventId(eventId);

            response.status(200).json(reviews)
        } catch (e) {
            response.status(500).json(e)
        }
    }

    async createGroup(request, response) {
        try {
            const group = await EventService.createGroup(request.body);

            response.status(200).json(group)
        } catch (e) {
            response.status(500).json(e)
        }
    }

    async getGroup(request, response) {
        try {
            const group = await EventService.getGroup(request.params.id);

            response.status(200).json(group)
        } catch (e) {
            response.status(500).json(e)
        }
    }

    async getGroupsByEventId(request, response) {
        try {
            const groups = await EventService.getGroupsByEventId(request.params.id);

            response.status(200).json(groups)
        } catch (e) {
            response.status(500).json(e)
        }
    }

    async leaveComment(request, response) {
        try {
            const { userId, groupId, text } = request.body
            const comment = await EventService.leaveComment({userId, groupId, text});

            response.status(200).json(comment)
        } catch (e) {
            response.status(500).json(e)
        }
    }

    async getCommentsByGroupId(request, response) {
        try {
            const comments = await EventService.getCommentsByGroupId(request.params.id);

            response.status(200).json(comments)
        } catch (e) {
            response.status(500).json(e)
        }
    }

    async deleteComment(request, response) {
        try {
            const { commentId, userId } = request.body
            const result = await EventService.deleteComment({commentId, userId});

            response.status(200).json(result)
        } catch (e) {
            response.status(500).json(e)
        }
    }
}

export default new EventController()
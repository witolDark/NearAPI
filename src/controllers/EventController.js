import EventService from "../services/EventService.js";

class EventController {
    async create(request, response) {
        try {
            const {creator, title, description, startDate, startTime, endDate, endTime, location, ticketRequired, ticketUrl} = request.body
            const event = await EventService.addEvent(creator, title, description, startDate, startTime, endDate, endTime, location, ticketRequired, ticketUrl);

            console.log(event)
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
            const {id} = request.body
            await EventService.deleteEvent(id)

            response.status(204).json("Ok");
        } catch (e) {
            response.status(500).json(e);
        }
    }
}

export default new EventController()
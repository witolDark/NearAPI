import EventService from "../services/EventService.js";

class EventController {
    async create(request, response) {
        try {
            const {creator, title, description, startDate, endDate, ticketRequired, ticketUrl} = request.body
            const event = EventService.addEvent(creator, title, description, startDate, endDate, ticketRequired, ticketUrl);

            response.json(event)
        } catch (e) {
            response.status(500).json(e)
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
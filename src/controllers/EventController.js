import Event from "../models/Event.js"

class EventController {
    async create(req, res) {
        try {
            const {title, description, startDate, endDate, ticketRequired, ticketUrl, status} = req.body
            const event = await new Event({title, description, startDate, endDate, ticketRequired, ticketUrl, status})
            await event.save()
            res.json(event)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new EventController()
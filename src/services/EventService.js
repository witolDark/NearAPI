import Status from "../shared/Status.js";

class EventService {
    async addEvent(creator, title, description, startDate, endDate, ticketRequired, ticketUrl) {
        return await Event.create({
            creator: creator,
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate,
            ticketRequired: ticketRequired,
            ticketUrl: ticketUrl,
            status: Status.PENDING
        })
    }

    async approveEvent(id) {
        const event = await Event.findById(id);

        event.status = this.getStatusByDate(event.startDate, event.endDate);
    }

    async cancelEvent(id) {
        const event = await Event.findById(id);

        event.status = Status.CANCELLED;
    }

    async getEvent(id) {
        return await Event.findById(id);
    }

    async getEventsByCreator(creator) {
        return await Event.find({creator: creator});
    }

    async getAllEvents() {
        return await Event.find();
    }

    async deleteEvent(id) {
        const event = await Event.findById(id);

        event.deleteOne({ _id: id })
    }

    getStatusByDate(startDate, endDate) {
        if (startDate < Date.now() && endDate > Date.now()) {
            return Status.ACTIVE
        } else if (startDate > Date.now()) {
            return Status.UPCOMING
        } else {
            return Status.INACTIVE
        }
    }
}

export default new EventService();
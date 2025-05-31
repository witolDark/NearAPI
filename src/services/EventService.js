import Status from "../shared/Status.js";
import Event from "../models/Event.js";
import {EventDTO} from "../dtos/EventDTO.js";

class EventService {
    async addEvent(creator, title, description, startDate, startTime, endDate, endTime,location, ticketRequired, ticketUrl) {
        const event = await Event.create({
            creator: creator,
            title: title,
            description: description,
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime,
            location: location,
            ticketRequired: ticketRequired,
            ticketUrl: ticketUrl
        });

        return new EventDTO(event);
    }

    async approveEvent(id) {
        const event = await Event.findById(id);

        event.status = this.getStatusByDate(event.startDate, event.endDate);
        event.save()
    }

    async cancelEvent(id) {
        const event = await Event.findById(id);

        event.status = Status.CANCELLED;
        event.save()
    }

    async getEvent(id) {
        const event = await Event.findById(id);

        return new EventDTO(event);
    }

    async getEventsByCreator(creator) {
        return Event.find({creator: creator});
    }

    async getAllEvents() {
        return Event.find({
            status: { $nin: [Status.PENDING, Status.CANCELLED] }
        });
    }

    async getAllPendings() {
        return Event.find({
            status: Status.PENDING
        });
    }

    async deleteEvent(id) {
        const event = await Event.findById(id);

        event.deleteOne({ _id: id })
    }

    getStatusByDate(startDate, endDate) {
        if (new Date(startDate) < Date.now() && new Date(endDate) > Date.now()) {
            return Status.ACTIVE
        } else if (new Date(startDate) > Date.now()) {
            return Status.UPCOMING
        } else {
            return Status.INACTIVE
        }
    }
}

export default new EventService();
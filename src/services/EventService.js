import Status from "../shared/Status.js";
import Event from "../models/Event.js";
import Comment from "../models/Comment.js";
import {EventDTO} from "../dtos/EventDTO.js";
import {CommentDTO} from "../dtos/CommentDTO.js";
import UserService from "./UserService.js";

class EventService {
    async addEvent(creator, title, description, startDate, startTime, endDate, endTime, location, ticketRequired, ticketUrl) {
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
            status: {$nin: [Status.PENDING, Status.CANCELLED]}
        });
    }

    async getAllPendings() {
        return Event.find({
            status: Status.PENDING
        });
    }

    async deleteEvent(id) {
        const event = await Event.findById(id);

        event.deleteOne({_id: id})
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

    async leaveComment(userId, eventId, text) {
        const comment = await Comment.create({eventId, userId, text})

        return new CommentDTO(comment);
    }

    async getComments(eventId) {
        return Comment.find({eventId: eventId});
    }

    async deleteComment(commentId, userId) {
        const user = await UserService.getUser(userId);
        const comment = await Comment.findById(commentId);

        if (!comment) {
            throw new Error(`Could not find a comment with id ${commentId}`);
        }

        if (!user) {
            throw new Error(`Could not find a user with id ${userId}`);
        }

        if (user._id.equals(comment.userId) || user.role === Role.ADMIN) {
            return Comment.findByIdAndDelete(commentId)
        }

        throw new Error('No permission to delete');
    }
}

export default new EventService();
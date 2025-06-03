import Status from "../shared/Status.js";
import Event from "../models/Event.js";
import Comment from "../models/Comment.js";
import {EventDTO} from "../dtos/EventDTO.js";
import {CommentDTO} from "../dtos/CommentDTO.js";
import UserService from "./UserService.js";
import Role from "../shared/Role.js";
import Group from "../models/Group.js";
import {GroupDTO} from "../dtos/GroupDTO.js";
import Review from "../models/Review.js";
import {ReviewDTO} from "../dtos/ReviewDTO.js";
import Category from "../models/Category.js";

class EventService {
    async addEvent(eventData) {
        const event = await Event.create({
            ...eventData,
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
        const event = await Event.findById(id).populate('categoryId').lean();

        return new EventDTO(event);
    }

    async getEventsByCreator(creator) {
        const events = await Event.find({creator: creator}).populate('categoryId').lean();
        return events.map(event => new EventDTO(event));
    }

    async getAllEvents() {
        return Event.find({
            status: {$nin: [Status.PENDING, Status.CANCELLED]}
        }).populate('categoryId').lean().map(event => new EventDTO(event));
    }

    async getAllPendings() {
        return Event.find({
            status: Status.PENDING
        }).lean().map(event => new EventDTO(event));
    }

    async deleteEvent(id) {
        await Event.findByIdAndDelete(id);
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

    async getCategories() {
        return Category.find({}).lean();
    }

    async rateEvent({eventId, userId, rating, text}) {
        const review = await Review.create({
            eventId, userId, rating, text, date: Date.now()
        });

        const event = new EventDTO(await Event.findById({eventId}).lean());
        event.numberOfRatings++;
        const reviews = await Review.find({eventId: eventId}).lean().map(review => new ReviewDTO(review));
        let reviewSum = 0;
        for (const review in reviews) {
            reviewSum += review.rating;
        }
        event.rating = reviewSum / event.numberOfRatings

        const populatedReview = await Review.findById(review._id)
            .populate('eventId')
            .populate('userId')
            .lean();

        return new ReviewDTO(populatedReview);
    }

    async getReviewsByEventId(eventId) {
        const reviews = await Review.find({eventId: eventId}).populate('eventId').populate('userId').lean();

        return reviews.map(review => new ReviewDTO(review));
    }

    async createGroup(eventData) {
        const group = await Group.create({
            ...eventData
        });

        const populatedGroup = await Group.findById(group._id).populate('userId').lean();

        return new GroupDTO(populatedGroup);
    }

    async getGroup(groupId) {
        return new GroupDTO(await Group.findById(groupId).populate('userId').lean());
    }

    async getGroupsByEventId(eventId) {
        const groups = await Group.find({eventId: eventId}).populate('userId').lean();
        return groups.map(group => new GroupDTO(group));
    }

    async leaveComment({userId, groupId, text}) {
        const comment = await Comment.create({groupId, userId, text});
        const user = await UserService.getUser(userId);
        const group = new GroupDTO(await Group.findById(groupId).lean());

        return new CommentDTO({...comment, user, group});
    }

    async getCommentsByGroupId(groupId) {
        const group = new GroupDTO(await Group.findById(groupId).lean());
        const comments = await Comment.find({groupId: groupId}).populate('userId').lean();
        console.log(comments);
        const populatedComments = comments.map(comment => new CommentDTO(comment))
        console.log(populatedComments);
        return {
            group,
            populatedComments
        }
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
            Comment.findByIdAndDelete(commentId)
        }

        throw new Error('No permission to delete');
    }
}

export default new EventService();
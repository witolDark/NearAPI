export class CommentDTO {
    id;
    eventId;
    userId;

    constructor(model) {
        this.id = model._id;
        this.eventId = model.eventId;
        this.userId = model.userId;
    }
}
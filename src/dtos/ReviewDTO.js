export class ReviewDTO {
    id;
    userI
    event;
    text;
    rating;

    constructor(model) {
        this.id = model._id;
        this.user = model.userId;
        this.event = model.eventId;
        this.text = model.text;
        this.rating = model.rating;
    }
}
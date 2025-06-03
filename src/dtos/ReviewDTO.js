export class ReviewDTO {
    id;
    user
    event;
    text;
    rating;

    constructor(model) {
        this.id = model._id;
        this.user = model.user;
        this.event = model.event;
        this.text = model.text;
        this.rating = model.rating;
    }
}
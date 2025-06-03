export class EventDTO {
    id;
    creator;
    title;
    description;
    startDate;
    endDate;
    location;
    ticketRequired;
    ticketUrl;
    category;
    rating;
    numberOfRatings;
    status;

    constructor(model) {
        this.id = model._id;
        this.creator = model.creator;
        this.title = model.title;
        this.description = model.description;
        this.startDate = model.startDate;
        this.startTime = model.startTime;
        this.endDate = model.endDate;
        this.endTime = model.endTime;
        this.location = model.location;
        this.ticketRequired = model.ticketRequired;
        this.ticketUrl = model.ticketUrl;
        this.rating = model.rating;
        this.numberOfRatings = model.numberOfRatings;
        this.category = model.category;
        this.status = model.status;
    }
}
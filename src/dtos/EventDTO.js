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
    status;

    constructor(model) {
        this.id = model._id;
        this.creator = model.creator;
        this.title = model.title;
        this.description = model.description;
        this.startDate = model.startDate;
        this.endDate = model.endDate;
        this.location = model.location;
        this.ticketRequired = model.ticketRequired;
        this.ticketUrl = model.ticketUrl;
        this.status = model.status;
    }
}
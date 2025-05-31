export class EventDTO {
    id;
    creator;
    title;
    description;
    startDate;
    startTime;
    endDate;
    endTime;
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
        this.startTime = model.startTime;
        this.endDate = model.endDate;
        this.endTime = model.endTime;
        this.location = model.location;
        this.ticketRequired = model.ticketRequired;
        this.ticketUrl = model.ticketUrl;
        this.status = model.status;
    }
}
export class EventDTO {
    creator;
    title;
    description;
    startDate;
    endDate;
    ticketRequired;
    ticketUrl;
    status;

    constructor(model) {
        this.creator = model.creator;
        this.title = model.title;
        this.description = model.description;
        this.startDate = model.startDate;
        this.endDate = model.endDate;
        this.ticketRequired = model.ticketRequired;
        this.ticketUrl = model.ticketUrl;
        this.status = model.status;
    }
}
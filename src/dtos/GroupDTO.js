export class GroupDTO {
    constructor(model) {
        this.id = model._id;
        this.eventId = model.eventId;
        this.userId = model.userId;
        this.user = model.user;
        this.groupName = model.groupName;
        this.description = model.description;
    }
}

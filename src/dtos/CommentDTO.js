export class CommentDTO {
    id;
    group;
    user;
    text;

    constructor(model) {
        this.id = model._id;
        this.group = model.groupId;
        this.user = model.userId;
        this.text = model.text;
    }
}
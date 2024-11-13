export class UserDTO {
    id;
    email;
    name;
    registerDate;
    role;
    isActivated;

    constructor(model) {
        this.id = model._id;
        this.email = model.email;
        this.name = model.name;
        this.registerDate = model.registerDate;
        this.role = model.role;
        this.isActivated = model.isActivated;
    }
}
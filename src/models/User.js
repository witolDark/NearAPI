import mongoose from 'mongoose';
import Role from "../shared/Role.js";

const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    name: {type: String, unique: true, required: true},
    passwordHash: {type: String, required: true},
    registerDate: {type: Date, required: true},
    role: {type: String, enum: [Role.DEFAULT, Role.ADMIN], default: Role.ADMIN},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String}
})

export default mongoose.model('User', UserSchema);
import mongoose from 'mongoose';
import Role from "../shared/Role.js";

const User = new mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    passwordHash: {type: String, required: true},
    registerDate: {type: Date, required: true},
    role: {type: String, enum: [Role.DEFAULT, Role.ADMIN]},
})

export default mongoose.model('User', User);
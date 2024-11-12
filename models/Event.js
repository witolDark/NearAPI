import mongoose from 'mongoose';
import Status from "../shared/Status.js";

const Event = new mongoose.Schema({
    creator: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    ticketRequired: {type: Boolean, default: false},
    ticketUrl: {type: String, required: function() { return this.ticketRequired; }},
    status: {type: String, enum: [Status.INACTIVE, Status.ACTIVE, Status.UPCOMING]},
})

export default mongoose.model('Event', Event);
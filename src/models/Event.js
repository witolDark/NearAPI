import mongoose, {Schema} from 'mongoose';
import Status from "../shared/Status.js";

const EventSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
    creator: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    location: {type: String, required: true},
    ticketRequired: {type: Boolean, default: false},
    ticketUrl: {type: String, required: function() { return this.ticketRequired; }},
    rating: {type: Number, default: 0},
    numberOfRatings: {type: Number, default: 0},
    categoryId: {type: Schema.Types.ObjectId, ref: 'Category'},
    status: {
        type: String,
        enum: Object.values(Status),
        default: Status.PENDING
    }
})

export default mongoose.model('Event', EventSchema);
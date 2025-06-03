import mongoose, {Schema} from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    eventId: {type: Schema.Types.ObjectId, required: true, ref: 'Event'},
    userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    text: {type: String, required: true},
    rating: {type: Number, required: true},
    date: {type: Date, required: true}
})

export default mongoose.model('Review', ReviewSchema);
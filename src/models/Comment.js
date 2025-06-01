import mongoose, {Schema} from 'mongoose';

const CommentSchema = new mongoose.Schema({
    eventId: {type: Schema.Types.ObjectId, required: true},
    userId: {type: Schema.Types.ObjectId, required: true},
    text: {type: String, required: true}
})

export default mongoose.model('Comment', CommentSchema);
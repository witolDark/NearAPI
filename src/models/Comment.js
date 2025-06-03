import mongoose, {Schema} from 'mongoose';

const CommentSchema = new mongoose.Schema({
    groupId: {type: Schema.Types.ObjectId, required: true, ref: 'Group'},
    userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    text: {type: String, required: true}
})

export default mongoose.model('Comment', CommentSchema);
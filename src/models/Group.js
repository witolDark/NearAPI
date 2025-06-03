import mongoose, {Schema} from 'mongoose';

const GroupSchema = new mongoose.Schema({
    eventId: {type: Schema.Types.ObjectId, required: true, ref: 'Event'},
    userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    groupName: {type: String, required: true},
    description: {type: String }
})

export default mongoose.model('Group', GroupSchema);
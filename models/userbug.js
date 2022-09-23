import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema({
    title: {type: String},
    desc: {type: String},
    assignee: {type: String},
    date: { type: Date, default: Date.now },
    time: { type: Date, default: Date.now },
    status: {type: String, default: 'Pending'},
});

export default mongoose.model('userbug', userSchema, 'user-bug');

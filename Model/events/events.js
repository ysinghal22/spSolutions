const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var events = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        title: String
    },
    startTime: {
        type: Date,
        default: new Date()
    },
    endTime: {
        type: Date,
        default: new Date()
    },
    venue: {
        type: String,
        trim: true,
        required: true
    },
    organiser: {
        type: Schema.ObjectId,
        ref: 'users'
    },
    contact: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('events', events);
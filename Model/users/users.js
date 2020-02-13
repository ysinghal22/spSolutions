const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var users = new Schema({
    name: {
        type: String,
        trim: true,
        index: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        index: true,
        required: false
    },
    contact: {
        type: String,
        required: false,
        trim: true,
        index: true,
        default: null,
        min: 10
    },
    isOrganiser: {
        type: Boolean,
        default: false,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    accessToken: {
        type: String
    },
    role: {
        type: String,
        enum: ['User', 'Admin', 'Organiser'],
        default: 'User'
    }
});

module.exports = mongoose.model('users', users);
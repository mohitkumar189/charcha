var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    first_name: {
        type: mongoose.Schema.Types.String,
    },
    last_name: {
        type: mongoose.Schema.Types.String,
    },
    email: {
        type: mongoose.Schema.Types.String,
    },
    phone: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    status: {
        type: mongoose.Schema.Types.Number,
        default: 1
    },
    phone_verified: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    email_verified: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    delete_status: {
        type: mongoose.Schema.Types.Number,
        default: 0
    },
    user_type: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    added_date: {
        type: mongoose.Schema.Types.Date
    },
    last_updated: {
        type: mongoose.Schema.Types.Date
    }
});

module.exports = mongoose.model('Users', schema);
const { Schema, Types } = require('mongoose');
const {format_date} = require('../utils/timeFormat');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: String, 
            default: Date.now,
            set: (timestamps) => format_date(timestamps)
        },
    },
    {
        toJSON: {
            getters: true,
        },
        _id: false,
    }
);

module.exports = reactionSchema;

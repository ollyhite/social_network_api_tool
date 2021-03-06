const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const {format_date} = require('../utils/timeFormat');

// Schema to create Post model
const thoughtsSchema = new Schema({
    thoughtText: { 
        type: String, 
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: { 
        type: String, 
        default: Date.now,
        set: (timestamps) => format_date(timestamps)
    },
    username:{ 
        type: String, 
        required: true 
    },
    reactions:[reactionSchema]
    },
    {
        toJSON: {
        virtuals: true,
        },
        id: false,
    }
);


thoughtsSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
    });


const Thought = model('Thought', thoughtsSchema);

const handleError = (err) => console.error(err);

Thought.find({}).exec((err, collection) => {
    if (collection.length === 0) {
        Thought.insertMany(
        [
            {
                "thoughtText": "Here's a cool thought...",
                "username": "Olly",
                "userId": "62ba2246f69da632472071be"
            }
        ],
        (insertErr) => {
            if (insertErr) {
            handleError(insertErr);
            }
        }
        );
    }
});

module.exports = Thought;

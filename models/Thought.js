const mongoose = require('mongoose');
const Reaction = require('./Reaction');

const thoughtsSchema = new mongoose.Schema({
    thoughtText: { 
        type: String, 
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    username:{ 
        type: String, 
        required: true 
    },
    reactions:[Reaction]
});

thoughtsSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
    });

const Thought = mongoose.model('Thought', thoughtsSchema);

const handleError = (err) => console.error(err);


module.exports = Thought;

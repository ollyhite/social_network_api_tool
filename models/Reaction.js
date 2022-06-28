const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: 
    { 
        type: String, 
        required: true 
    },
    username:
    { 
        type: String, 
        required: true 
    },
    reactionBody:
    {

    },
    createdAt: 
    { 
        type: Date, 
        default: Date.now 
    },
});

const Reaction = mongoose.model('Reaction', reactionSchema);

const handleError = (err) => console.error(err);


module.exports = Reaction;

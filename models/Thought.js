const mongoose = require('mongoose');

const thoughtsSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  username:{ type: String, required: true },
  reactions:{}
});

const Thought = mongoose.model('Thought', thoughtsSchema);

const handleError = (err) => console.error(err);


module.exports = Thought;

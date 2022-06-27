const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  thoughts: { type: Array, required: true },
  friends: { type: Array, required: true },
});

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

User.find({}).exec((err, collection) => {
    if (collection.length === 0) {
        User.insertMany(
        [
            { username: 'Olly', email:"ollylee@gmail.com" },
            { username: 'Eva', email:"eva@gmail.com" },
            { username: 'Maud', email:"maud@gmail.com" },
        ],
        (insertErr) => {
            if (insertErr) {
            handleError(insertErr);
            }
        }
        );
    }
});

module.exports = User;

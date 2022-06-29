const { Schema, model } = require('mongoose');

const validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// Schema to create Post model
const userSchema = new Schema({
    username: { 
        type: String,
        unique: true, 
        required: true,
        trim: true, 
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    thoughts:[
        { type: Schema.Types.ObjectId, 
            ref: 'Thought' 
        }],
    friends: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'User' 
        }],
    },
    {
        toJSON: {
        virtuals: true,
        },
        id: false,

    }
);


userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return this.friends.length;
    });



const User = model('User', userSchema);

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

const express = require('express');
const db = require('./config/connection');
// Require model
const { User, Thought, Reaction } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();
const routes = require('../routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(routes);


app.get('/', (req, res) => {
  // Using model in route to find all documents that are instances of that modelall-genres
    User.find({}, (err, result) => {
        if (result) {
        res.status(200).json(result);
        } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
        }
    });
});

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});

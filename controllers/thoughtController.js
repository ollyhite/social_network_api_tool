const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports={
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getSinglegetThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    createThought(req,res){
        // console.log(req.body);
        Thought.create(req.body)
        .then((thought) => {
            console.log(thought);
            return User.findOneAndUpdate(
            { username: req.body.username },
            { $addToSet: { thoughts: thought } },
            { new: true }
            );
        })
        .then((user) =>
            !user
            ? res.status(404).json({
                message: 'Thought created, but found no user with that ID',
                })
            : res.json('Created the Thought 🎉')
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    deleteThought(req,res){
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
                )
        )
        .then((user) =>
            !user
            ? res.status(404).json({
                message: 'Application created but no user with this id!',
                })
            : res.json({ message: 'Application successfully deleted!' })
        )
        .catch((err) => res.status(500).json(err));
    },
    // Add an reaction to thought
    addReaction(req, res) {
        console.log('You are adding an reaction');
        console.log(req.body);
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res
                .status(404)
                .json({ message: 'No thought found with that ID :(' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Remove reaction from a thought
    removeReaction(req, res) {
        console.log('You are delete an reaction');
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res
                .status(404)
                .json({ message: 'No thought found with that ID :(' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
};
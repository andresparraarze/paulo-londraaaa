const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thoughts) =>
            !thoughts
            ? res.status(404).json({ message: 'No thought' })
            : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then((thoughts) => res.json(thoughts))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thoughts) => {
            !thoughts
            ? res.status(404).json({ message: 'No thoughts' })
            : res.json(thoughts)
        })
        .catch((err) => res.status(500).json(err));
    },
  
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((dbThoughtData) => {
            return User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'no user with this id!' });
            }
            res.json({ message: 'Thought deleted!' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};
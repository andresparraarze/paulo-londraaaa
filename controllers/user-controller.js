const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err)); 
  
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) => { res.json(user)
        if(!user) {
          res.status(404).json({ message: 'No user with that ID' })
  }})
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId }, 
      req.body, 
      { new: true, runValidators: true })
    .then(user => {
        if (!user) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(user);
    })
    .catch(err => res.status(400).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
};
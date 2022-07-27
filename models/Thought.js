const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./reaction-schema');

const thoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: true,
        min_lenght:1,
        max_length: 280
    },

    createAt: {
        type: Date,
        default: Date.now,
        get: date => date
    },
    
    username: {
        type: String,
        required: true
    },

    reactions: [reactionSchema]
    },

    {
    toJSON: {
        getters: true,
    },
    }
);

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;
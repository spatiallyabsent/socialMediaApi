const { Thought, User, Reaction } = require('../models');
const {Types} = require('mongoose');

/*
routes needed:
GET all thoughts
GET one thought by _id
POST new thought(don't forget to push the created thought's _id to the associated user's thoughts array field)
PUT update thought by _id
DELETE thought by _id
POST add a new reaction to a thought's reactions array field
DELETE remove a reaction from a thought's reactions array field
*/

thoughtController = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },
    // get one thought by id
    async getThoughtById(req, res) {
        try {
            const thoughts = await Thought.findOne({ _id:req.params.thoughtId });
            if (!thoughts) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thoughts);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },
    // create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.status(201).json(thought);
            // if (!user) {
            //     return res.status(404).json({ message: 'No user found with this id!' });
            // }
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },
    // update a thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
                new: true,
            }); //below code may need to change.
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    // delete a thought by id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    // add a new reaction to a thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true }
            );
            if (!thought) { //may not need check back after testing
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    // delete a reaction by id
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thought) { //may not need check back after testing
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (error) {
            res.status(400).json(error);
        }
    },
};

module.exports = thoughtController;
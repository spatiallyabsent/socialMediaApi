const { User } = require('../models');

/*
routes needed:
GET all users
GET one user by _id and populated thought and friend data
POST new user
PUT update user by _id
DELETE user by _id
POST add a new friend to a user's friend list
DELETE remove a friend from a user's friend list
*/

//may need to change id to userId in the routes check back later if testing fails
userController = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    // get one user by id
    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
                // .populate('thoughts')
                // .populate('friends');
                if (!user) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    // update a user by id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (error) {
            res.status(400).json(error);
            
        }
    },
    // delete a user by id
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.id });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
            
        } catch (error) {
            res.status(400).json(error);
            
        }
    },
    // add a new friend to a user's friend list
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    // remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    },
};

module.exports = userController;
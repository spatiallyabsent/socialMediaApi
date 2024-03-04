const mongoose = require('mongoose');
const datas = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandumUser, getRandumThought } = require('./data');

datas.once('open', async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = await User.insertMany(getRandumUser());
    const thoughts = await Thought.insertMany(getRandumThought());

    for (let i = 0; i < thoughts.length; i++) {
        const randIndex = Math.floor(Math.random() * users.length);
        const { _id } = users[randIndex];
        await User.findByIdAndUpdate(
            _id,
            { $push: { thoughts: thoughts[i]._id } },
            { new: true }
        );
    }

    console.log('all done!');
    process.exit(0);
});

// const mongoose = require('mongoose');
// const datas = require('../config/connection');
// const { User, Thought } = require('../models');
// const { getRandomUsers, getRandomThoughts } = require('./data');

// datas.once('open', async () => {
//   try {
//     await User.deleteMany({});
//     await Thought.deleteMany({});

//     const users = await User.create(getRandomUsers(10));
//     const thoughts = await Thought.create(getRandomThoughts(users, 20));

//     console.log('all done!');
//     process.exit(0);
//   } catch (err) {
//     throw err;
//   }
// });
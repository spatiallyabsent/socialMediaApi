const { Schema, model, Types } = require('mongoose'); //may need to add more to this as we link models together, check back on this.

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

userSchema
    .virtual('friendCount')
    .get(function() {
        return this.friends.length;
    });

const User = model('User', userSchema);

module.exports = User;

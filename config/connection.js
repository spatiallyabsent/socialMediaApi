const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost/socialMediaApi';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

module.exports = mongoose.connection;
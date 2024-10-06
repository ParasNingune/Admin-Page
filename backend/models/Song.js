const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    duration: {
        type: String, // You can store duration in seconds or minutes based on your preference
        required: true
    }
});

module.exports = mongoose.model('Song', SongSchema);

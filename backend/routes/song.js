const express = require('express');
const Song = require('../models/Song');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify token
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, 'jwtSecret');
        req.user = decoded.id;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

// Get all songs for a user
router.get('/', authMiddleware, async (req, res) => {
    const songs = await Song.find({ userId: req.user });
    res.json(songs);
});

// Add a song
router.post('/', authMiddleware, async (req, res) => {
    const { title, artist, duration } = req.body;
    const newSong = new Song({ userId: req.user, title, artist, duration });
    await newSong.save();
    res.json(newSong);
});

// Delete a song
router.delete('/:id', authMiddleware, async (req, res) => {
    await Song.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Song deleted' });
});

// Update a song
router.put('/:id', authMiddleware, async (req, res) => {
    const { title, artist, duration } = req.body;
    const updatedSong = await Song.findByIdAndUpdate(req.params.id, { title, artist, duration }, { new: true });
    res.json(updatedSong);
});

module.exports = router;

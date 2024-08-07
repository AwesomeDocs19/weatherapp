const express = require('express');
const router = express.Router();
const { register, login } = require('../models/user');

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    register(username, password, (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(user);
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    login(username, password, (err, token) => {
        if (err) return res.status(401).json({ error: err.message });
        res.json({ token });
    });
});

module.exports = router;

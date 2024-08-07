const express = require('express');
const router = express.Router();
const { db } = require('../config/db');

router.post('/', (req, res) => {
    const { userId, location } = req.body;
    db.run("INSERT INTO preferences (userId, location) VALUES (?, ?)", [userId, location], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
});

router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    db.all("SELECT location FROM preferences WHERE userId = ?", [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

module.exports = router;

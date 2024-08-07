const { db } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (username, password, callback) => {
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return callback(err);
        db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash], function(err) {
            if (err) return callback(err);
            callback(null, { id: this.lastID });
        });
    });
};

const login = (username, password, callback) => {
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        if (err) return callback(err);
        if (!user) return callback(new Error('User not found'));
        bcrypt.compare(password, user.password, (err, res) => {
            if (err) return callback(err);
            if (!res) return callback(new Error('Incorrect password'));
            const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
            callback(null, token);
        });
    });
};

module.exports = { register, login };

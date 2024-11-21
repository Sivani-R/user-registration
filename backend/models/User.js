// backend/models/User.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const User = {
  createTable: () => {
    const query = `
      CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT
      )`;
    return db.run(query);
  },

  create: (name, email, password, callback) => {
    const query = `INSERT INTO Users (name, email, password) VALUES (?, ?, ?)`;
    db.run(query, [name, email, password], function(err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, name, email });
    });
  },

  findByEmail: (email, callback) => {
    const query = `SELECT * FROM Users WHERE email = ?`;
    db.get(query, [email], (err, user) => {
      if (err) return callback(err);
      callback(null, user);
    });
  }
};

module.exports = User;

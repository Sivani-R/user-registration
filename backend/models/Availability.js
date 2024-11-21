// backend/models/Availability.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const Availability = {
  createTable: () => {
    const query = `
      CREATE TABLE IF NOT EXISTS Availability (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        availableFrom TEXT,
        availableTo TEXT,
        FOREIGN KEY (userId) REFERENCES Users(id)
      )`;
    return db.run(query);
  },

  create: (userId, availableFrom, availableTo, callback) => {
    const query = `INSERT INTO Availability (userId, availableFrom, availableTo) VALUES (?, ?, ?)`;
    db.run(query, [userId, availableFrom, availableTo], function(err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, userId, availableFrom, availableTo });
    });
  },

  findByUserId: (userId, callback) => {
    const query = `SELECT * FROM Availability WHERE userId = ?`;
    db.all(query, [userId], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows);
    });
  }
};

module.exports = Availability;

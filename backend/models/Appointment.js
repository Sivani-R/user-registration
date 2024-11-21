
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const Appointment = {
  createTable: () => {
    const query = `
      CREATE TABLE IF NOT EXISTS Appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        time TEXT,
        FOREIGN KEY (userId) REFERENCES Users(id)
      )`;
    return db.run(query);
  },

  create: (userId, time, callback) => {
    const query = `INSERT INTO Appointments (userId, time) VALUES (?, ?)`;
    db.run(query, [userId, time], function(err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID, userId, time });
    });
  },

  findByUserId: (userId, callback) => {
    const query = `SELECT * FROM Appointments WHERE userId = ?`;
    db.all(query, [userId], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows);
    });
  }
};

module.exports = Appointment;

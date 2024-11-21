// backend/controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userController = {
  register: (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    User.create(name, email, hashedPassword, (err, user) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json(user);
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, user) => {
      if (err) return res.status(400).json({ error: err.message });
      if (!user) return res.status(401).json({ error: "Invalid email or password" });

      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret');
        res.json({ token });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    });
  }
};

module.exports = userController;

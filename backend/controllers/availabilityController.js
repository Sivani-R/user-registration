
const Availability = require('../models/Availability');

const availabilityController = {
  setAvailability: (req, res) => {
    const { availableFrom, availableTo } = req.body;
    const userId = req.user.id;

    Availability.create(userId, availableFrom, availableTo, (err, availability) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json(availability);
    });
  },

  getAvailability: (req, res) => {
    const userId = req.params.userId;

    Availability.findByUserId(userId, (err, availabilities) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json(availabilities);
    });
  }
};

module.exports = availabilityController;

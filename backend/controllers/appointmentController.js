
const Appointment = require('../models/Appointment');

const appointmentController = {
  scheduleAppointment: (req, res) => {
    const { userId, time } = req.body;

    Appointment.create(userId, time, (err, appointment) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json(appointment);
    });
  },

  getAppointments: (req, res) => {
    const userId = req.user.id;

    Appointment.findByUserId(userId, (err, appointments) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json(appointments);
    });
  }
};

module.exports = appointmentController;

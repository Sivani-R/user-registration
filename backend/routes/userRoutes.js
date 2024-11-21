// backend/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const availabilityController = require('../controllers/availabilityController');
const appointmentController = require('../controllers/appointmentController');
const authenticateToken = require('../middleware/authenticateToken');

module.exports = (app) => {
  app.post('/register', userController.register);
  app.post('/login', userController.login);

  app.post('/set-availability', authenticateToken, availabilityController.setAvailability);
  app.get('/availability/:userId', availabilityController.getAvailability);

  app.post('/schedule', appointmentController.scheduleAppointment);
  app.get('/appointments', authenticateToken, appointmentController.getAppointments);
};

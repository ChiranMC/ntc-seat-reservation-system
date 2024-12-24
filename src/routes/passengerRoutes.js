const express = require('express');
const PassengerController = require('../controller/passengerController');

const router = express.Router();
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new passenger
 *     description: registration end point
 *     responses:
 *       200:
 *         description: Successfully registered.
 */
router.post('/register', PassengerController.registerPassenger);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: passenger login verification
 *     description: login end point
 *     responses:
 *       200:
 *         description: Successfully logged in.
 */
router.post('/login', PassengerController.loginPassenger);

module.exports = router;
const express = require('express');
const PassengerController = require('../controller/passengerController');

const router = express.Router();
/**
 * @swagger
 * /passenger/register:
 *   post:
 *     summary: Register a new passenger
 *     description: Registration endpoint for passengers.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nic_no:
 *                 type: string
 *                 example: "990001234V"
 *               full_name:
 *                 type: string
 *                 example: "John Doe"
 *               address:
 *                 type: string
 *                 example: "123 Street Name, City"
 *               contact_number:
 *                 type: integer
 *                 example: 75319843
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *           required:
 *             - nic_no
 *             - full_name
 *             - address
 *             - contact_number
 *             - email
 *             - password
 *     responses:
 *       200:
 *         description: Successfully registered.
 *       400:
 *         description: Invalid input or missing required fields.
 *       409:
 *         description: Conflict. Passenger already exists.
 *       500:
 *         description: Internal server error.
 */
router.post('/register', PassengerController.registerPassenger);

/**
 * @swagger
 * /passenger/login:
 *   post:
 *     summary: Passenger login verification
 *     description: Login endpoint for passengers.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nic_no:
 *                 type: string
 *                 example: "990001234V"
 *               password:
 *                 type: string
 *                 example: "test"
 *           required:
 *             - nic_no
 *             - password
 *     responses:
 *       200:
 *         description: Successfully logged in.
 *       400:
 *         description: Invalid input or missing required fields.
 *       401:
 *         description: Unauthorized. Invalid NIC number or password.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', PassengerController.loginPassenger);

module.exports = router;
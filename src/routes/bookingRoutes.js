const BookingController = require('../controller/BookingController');
const jwtAuthentication = require('../config/jwtConfig');
const express = require('express');

const router = express.Router();
/**
 * @swagger
 * /booking/book-tickets:
 *   post:
 *     summary: Book bus tickets
 *     description: Allows a passenger to book bus tickets by providing booking details.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookingInfo:
 *                 type: object
 *                 properties:
 *                   passenger_id:
 *                     type: string
 *                     example: "972453789V"
 *                   paymentAmount:
 *                     type: number
 *                     format: float
 *                     example: 2100.00
 *                   bookingDate:
 *                     type: string
 *                     format: date
 *                     example: "2024-12-25"
 *                   selectedSeats:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["R5", "L3", "L4"]
 *                   numberPlate:
 *                     type: string
 *                     example: "WP-BA-1234"
 *                   scheduled_slot:
 *                     type: integer
 *                     example: 1
 *             required:
 *               - bookingInfo
 *     responses:
 *       200:
 *         description: Tickets successfully booked.
 *       400:
 *         description: Invalid input or missing required fields.
 *       401:
 *         description: Unauthorized. JWT token missing or invalid.
 *       500:
 *         description: Internal server error.
 */
router.post("/book-tickets", jwtAuthentication, BookingController.bookBusTickets);


/**
 * @swagger
 * /booking/all-available-seats:
 *   get:
 *     summary: Get all available seats
 *     description: Retrieves all available seats for a specific bus based on number plate, scheduled slot, and booking date.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number_plate:
 *                 type: string
 *                 example: "WP-BA-1234"
 *               scheduled_slot:
 *                 type: integer
 *                 example: 1
 *               booking_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-25"
 *             required:
 *               - number_plate
 *               - scheduled_slot
 *               - booking_date
 *     responses:
 *       200:
 *         description: Successfully retrieved available seats.
 *       400:
 *         description: Invalid input or missing required fields.
 *       401:
 *         description: Unauthorized. JWT token missing or invalid.
 *       500:
 *         description: Internal server error.
 */
router.get("/all-available-seats", jwtAuthentication, BookingController.getAllAvailableSeats);

module.exports = router;
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
 * /booking/all-available-seats/{number_plate}/{scheduled_slot}/{booking_date}:
 *   get:
 *     summary: Get all available seats
 *     description: Retrieves all available seats for a specific bus based on number plate, scheduled slot, and booking date.
 *     tags:
 *       - Booking
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: number_plate
 *         required: true
 *         schema:
 *           type: string
 *         description: The bus number plate.
 *         example: "WP-BA-1234"
 *       - in: path
 *         name: scheduled_slot
 *         required: true
 *         schema:
 *           type: integer
 *         description: The scheduled slot for the bus.
 *         example: 1
 *       - in: path
 *         name: booking_date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The booking date.
 *         example: "2024-12-25"
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
router.get("/all-available-seats/:number_plate/:scheduled_slot/:booking_date",jwtAuthentication, BookingController.getAllAvailableSeats);

module.exports = router;
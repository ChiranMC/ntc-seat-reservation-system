const BookingController = require('../controller/BookingController');
const jwtAuthentication = require('../config/jwtConfig');
const express = require('express');

const router = express.Router();

router.post("/book-tickets", jwtAuthentication, BookingController.bookBusTickets);
router.get("/all-available-seats", jwtAuthentication, BookingController.getAllAvailableSeats);

module.exports = router;
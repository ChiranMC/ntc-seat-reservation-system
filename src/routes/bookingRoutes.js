const BookingController = require('../controller/BookingController');
const express = require('express');

const router = express.Router();

router.post("/book-tickets", BookingController.bookBusTickets);
router.get("/all-available-seats", BookingController.getAllAvailableSeats);

module.exports = router;
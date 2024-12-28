const express = require('express');

const BookingController = require('../controller/BookingController');

const router = express.Router();

router.post("/book-tickets", BookingController.bookBusTickets);
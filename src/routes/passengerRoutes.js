const express = require('express');
const PassengerController = require('../controller/passengerController');

const router = express.Router();

router.post('/register', PassengerController.registerPassenger);

module.exports = router;
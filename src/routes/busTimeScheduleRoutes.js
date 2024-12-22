const express = require('express');
const BusTimeSchedulesController = require('../controller/butTimeSchedulesContoller');

const router = express.Router();

router.get('/getSchedules', BusTimeSchedulesController.getSchedulesByRouteId);

module.exports = router;
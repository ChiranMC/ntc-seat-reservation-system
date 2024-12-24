const express = require('express');
const BusTimeSchedulesController = require('../controller/butTimeSchedulesContoller');

const router = express.Router();

/**
 * @swagger
 * /schedules/getSchedules:
 *   get:
 *     summary: get All schedules
 *     description: fetching all schedules by id
 *     responses:
 *       200:
 *         description: Successfully got schedule data.
 */
router.get('/getSchedules', BusTimeSchedulesController.getSchedulesByRouteId);

module.exports = router;
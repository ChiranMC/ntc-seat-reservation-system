const express = require('express');
const BusTimeSchedulesController = require('../controller/butTimeSchedulesContoller');
const jwtAuthentication = require('../config/jwtConfig');
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
router.get('/getSchedules', jwtAuthentication, BusTimeSchedulesController.getSchedulesByRouteId);

/**
 * @swagger
 * /schedules/getAllBusDetails/{slot_id}:
 *   get:
 *     summary: Fetch bus details by schedule slot ID
 *     description: Retrieve detailed bus information, including route, schedule, and bus details, for a given schedule slot ID.
 *     parameters:
 *       - in: path
 *         name: slot_id
 *         required: true
 *         description: The ID of the schedule slot to fetch details for.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved bus details.
 *       400:
 *         description: Invalid slot ID provided.
 *       500:
 *         description: Internal server error.
 */
router.get('/getAllBusDetails/:slot_id', jwtAuthentication, (req, res) => BusTimeSchedulesController.getFullBusDetailsBySlotId(req, res));

module.exports = router;
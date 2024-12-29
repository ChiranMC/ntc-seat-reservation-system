const express = require('express');
const BusTimeSchedulesController = require('../controller/butTimeSchedulesContoller');
const jwtAuthentication = require('../config/jwtConfig');
const router = express.Router();

/**
 * @swagger
 * /schedules/getSchedules:
 *   get:
 *     summary: Get all schedules by route ID
 *     description: Fetch all schedules for a specific route by providing the route ID.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               route_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully got schedule data.
 *       400:
 *         description: Invalid route ID provided.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       500:
 *         description: Internal server error.
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
const express = require('express');
const RouterController = require('../controller/routeController');
const jwtAuthentication = require('../config/jwtConfig');
const router = express.Router();

/**
 * @swagger
 * /bus-routes/getAllRoutes:
 *   get:
 *     summary: Get all bus routes
 *     description: Fetches all available bus routes.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched all routes info.
 *       401:
 *         description: Unauthorized. JWT token missing or invalid.
 *       500:
 *         description: Internal server error.
 */
router.get('/getAllRoutes', jwtAuthentication, RouterController.getAllRoutes);

module.exports = router;
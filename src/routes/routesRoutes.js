const express = require('express');
const RouterController = require('../controller/routeController');

const router = express.Router();

/**
 * @swagger
 * /bus-routes/getAllRoutes:
 *   get:
 *     summary: get All routes
 *     description: fetching all routes
 *     responses:
 *       200:
 *         description: Successfully fetched all routes info .
 */
router.get('/getAllRoutes', RouterController.getAllRoutes);

module.exports = router;
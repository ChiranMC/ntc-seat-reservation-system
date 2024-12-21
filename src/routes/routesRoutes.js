const express = require('express');
const RouterController = require('../controller/routeController');

const router = express.Router();

router.get('/getAllRoutes', RouterController.getAllRoutes);

module.exports = router;
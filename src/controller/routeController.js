const routesService = require('../service/routesService');

class routeController {
    async getAllRoutes(req, res){
        try {
            const allRoutes = await routesService.getAllAvailableRoutes();
            res.status(200).json({ allRoutes });
            console.log('fetched all available routes successfully');
        } catch (error) {
            res.status(400).json({error: error.message});
            console.log('error occurred while fetching all routes information');
        }
    }
}

module.exports = new routeController();
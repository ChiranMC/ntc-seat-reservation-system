const RoutesRepository = require('../repository/routesRepository');

class RoutesService {
    constructor() {
        this.routesRepo = new RoutesRepository();
    }
    async getAllAvailableRoutes(){
        try {
            const routes = await routesRepo.getAllRoutes();
            return routes;
        } catch (error) {
            throw new Error(`Error occurred while fetching all route information: ${error.message}`);
        }
    }
}

module.exports = new RoutesService();
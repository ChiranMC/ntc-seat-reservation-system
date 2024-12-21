const RoutesRepository = require('../repository/routesRepository');

class RoutesService {
    async getAllAvailableRoutes(){
        try {
            const routes = await RoutesRepository.getAllRoutes();
            return routes;
        } catch (error) {
            throw new Error(`Error occurred while fetching all route information: ${error.message}`);
        }
    }
}

module.exports = new RoutesService();
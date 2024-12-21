const RoutesRepository = require('../repository/routesRepository');

class RoutesService {
    async getAllAvailableRoutes(){
        try {
            const routes = await RoutesRepository.getAllRoutes();
            return routes;
        } catch (error) {
            throw new Error("error occured while fetching all route information Error :${error.message} ");
        }
    }
}

module.exports = new RoutesService();
const Routes = require('../model/routes');

class RoutesRepository{
    async getAllRoutes(){
        return await Route.findAll();
    }
}
module.exports = RoutesRepository;
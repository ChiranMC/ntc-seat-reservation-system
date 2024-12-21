const Routes = require('../model/routes');

class RoutesRepository{
    async getAllRoutes(){
        return await Routes.findAll();
    }
}
module.exports = RoutesRepository;
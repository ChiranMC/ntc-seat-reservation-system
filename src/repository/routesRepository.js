const Routes = require('../model/routes');

class RoutesRepository{
    async getAllRoutes(){
        return await Routes.findAll();
    }

    async getOriginAndDestination(route_id){
        return await Routes.findByPk(route_id, {
            attributes: ['origin', 'destination'],
        });
    }
}
module.exports =new RoutesRepository();
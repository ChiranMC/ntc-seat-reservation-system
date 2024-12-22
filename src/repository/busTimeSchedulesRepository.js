const BusTimeSchedules = require('../model/busTimeSchedules');

class BusTimeSchedulesRepository{
    async findByRouteId(route_id){
        return await BusTimeSchedules.findAll({where: {route_id}});
    }
}

module.exports = new BusTimeSchedulesRepository();
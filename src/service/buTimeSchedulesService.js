const BusTimeSchedulesRepository = require('../repository/busTimeSchedulesRepository');

class BusTimeSchedulesService{
    async getTimeScheduleByRouteId(route_id){
        return await BusTimeSchedulesRepository.findByRouteId(route_id);
    }
}

module.exports = new BusTimeSchedulesService();
const BusTimeSchedules = require('../model/busTimeSchedules');

class BusTimeSchedulesRepository{
    async findByRouteId(route_id){
        return await BusTimeSchedules.findAll({where: {route_id}});
    }

    async findBySlotId(slot_id) {
        return await BusTimeSchedules.findByPk(slot_id, {
            attributes: ['route_id', 'bus_ntc', 'departure_time', 'arrival_time'],
        });
    }
}

module.exports = new BusTimeSchedulesRepository();
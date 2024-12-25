const BusTimeSchedulesRepository = require('../repository/busTimeSchedulesRepository');
const RoutesRepository = require('../repository/routesRepository');

const ScheduledBusDTO = require('../DTO/scheduledBusDetailsDTO');

const BusesService = require('./busesService');
const routeService = require('./routesService');

class BusTimeSchedulesService{
    constructor(){
        this.routeRepo = new RoutesRepository();
    }

    async getTimeScheduleByRouteId(route_id){
        return await BusTimeSchedulesRepository.findByRouteId(route_id);
    }


    async getBuseDetailsByScehduleId(slot_id){
        const scheduleDetails = BusTimeSchedulesRepository.findBySlotId(slot_id);
        const routeDetails = this.routeRepo.getOriginAndDestination(scheduleDetails.route_id);
        const busDetails = BusesService.getBusByBusNTC(scheduleDetails.bus_ntc);

        return new ScheduledBusDTO(
            routeDetails.origin,
            routeDetails.destination,
            scheduleDetails.departure_time,
            scheduleDetails.arrival_time,
            busDetails.vehicle_register_number,
            busDetails.type,
            0
        );
    }

}

module.exports = new BusTimeSchedulesService();
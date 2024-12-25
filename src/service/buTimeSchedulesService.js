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
        try {
            const scheduleDetails = await BusTimeSchedulesRepository.findBySlotId(slot_id);
            if (!scheduleDetails) {
                throw new Error(`No schedule found for slot id: ${slot_id}`);
            }
            console.log(`got all schedule details for slot id-> ${slot_id}  info :`, scheduleDetails);
            const routeDetails = await this.routeRepo.getOriginAndDestination(scheduleDetails.route_id);
            console.log(`fetched all route details according to route id from schedule details ${scheduleDetails.route_id}`);
            const busDetails = await BusesService.getBusByBusNTC(scheduleDetails.bus_ntc);
            console.log(`fetched necessary bus information for the ntc -> ${scheduleDetails.bus_ntc}`);
        
            return new ScheduledBusDTO(
                routeDetails.origin,
                routeDetails.destination,
                scheduleDetails.departure_time,
                scheduleDetails.arrival_time,
                busDetails.vehicle_register_number,
                busDetails.type,
            );
        } catch (error) {
            throw new Error(`Error occurred while fetching all bus info according to scheduled slot: ${error}`);
        }
    }

}

module.exports = new BusTimeSchedulesService();
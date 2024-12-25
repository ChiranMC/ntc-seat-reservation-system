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
            // Wait for the schedule details to be fetched
            const scheduleDetails = await BusTimeSchedulesRepository.findBySlotId(slot_id);
            console.log(`got all schedule details for slot id-> ${slot_id}  info :`, scheduleDetails);
        
            // Wait for the route details to be fetched using the route_id from scheduleDetails
            const routeDetails = await this.routeRepo.getOriginAndDestination(scheduleDetails.route_id);
            console.log(`fetched all route details according to route id from schedule details ${scheduleDetails.route_id}`);
        
            // Wait for the bus details to be fetched using the bus_ntc from scheduleDetails
            const busDetails = await BusesService.getBusByBusNTC(scheduleDetails.bus_ntc);
            console.log(`fetched necessary bus information for the ntc -> ${scheduleDetails.bus_ntc}`);


            console.log(`pay load ------------>>>>>>>>   ${busDetails}`);
        
            // Return a new DTO with the resolved values
            return new ScheduledBusDTO(
                routeDetails.origin,
                routeDetails.destination,
                scheduleDetails.departure_time,
                scheduleDetails.arrival_time,
                busDetails.vehicle_register_number,
                busDetails.type,
                0
            );
        } catch (error) {
            throw new Error(`Error occurred while fetching all bus info according to scheduled slot: ${error}`);
        }        
    }

}

module.exports = new BusTimeSchedulesService();
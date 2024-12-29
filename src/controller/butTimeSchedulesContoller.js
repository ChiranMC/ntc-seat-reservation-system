const BusTimeSchedulesService = require('../service/buTimeSchedulesService');

class BusTimeSchedulesController {
    async getSchedulesByRouteId(req, res){
        try {
            const { route_id } = req.body;
            const allSchedules = await BusTimeSchedulesService.getTimeScheduleByRouteId(route_id);
            res.status(200).json(allSchedules);
            console.log(`Successfully fetched all schedule informations under routeId : ${route_id}`);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async getFullBusDetailsBySlotId(req, res){
        try{
            const { slot_id } = req.params;
            console.log(`Request came to fetch all bus info on schduled slot -> ${slot_id}`);
            const busAllDetials = await BusTimeSchedulesService.getBuseDetailsByScehduleId(slot_id);
            res.status(200).json(busAllDetials);
            console.log(`Successfully fetched all Bus Details informations under schedule slot id : ${slot_id}`);
        }catch (error){
            console.log(`failed to fetched all bus details under slot id ${slot_id}`);
            res.status(500).json({error: error.message});
        }
    }
}
module.exports = new BusTimeSchedulesController();
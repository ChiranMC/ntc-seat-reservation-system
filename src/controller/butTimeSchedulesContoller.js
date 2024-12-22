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
}
module.exports = new BusTimeSchedulesController();
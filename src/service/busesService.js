const BusesRepository = require('../repository/busesRepository');
const ScheduledBusDTO = require('../DTO/scheduledBusDTO');


class BusesService{
    async getBusByBusNTC(ntc_no){
        return await BusesRepository.findByBusNTC(ntc_no);
    }
    

}

module.exports = new BusesService();
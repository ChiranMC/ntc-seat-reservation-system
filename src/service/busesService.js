const BusesRepository = require('../repository/busesRepository');


class BusesService{
    async getBusByBusNTC(ntc_no){
        return await BusesRepository.findByBusNTC(ntc_no);
    }
    

}

module.exports = new BusesService();
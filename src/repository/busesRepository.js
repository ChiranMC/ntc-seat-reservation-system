const Buses = require('../model/buses');

class BusesRepository{
    async findByBusNTC(ntc_registered_number){
        return await Buses.findOne({where: {ntc_registered_number}});
    }
}

module.exports = new BusesRepository();
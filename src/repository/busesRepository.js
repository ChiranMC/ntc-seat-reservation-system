const Buses = require('../model/buses');

class BusesRepository{
    async findByBusNTC(ntc_registered_number){
        return await Buses.findByPk(ntc_registered_number);
    }

    async getBusTypeByNumberPlate(number_plate) {
        try {
            const busType = await Buses.findOne({
                where: {
                    vehicle_register_number: number_plate,
                },
                attributes: ['type'],
            });
            return busType ? busType.type : null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

module.exports = new BusesRepository();
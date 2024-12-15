const Passenger = require('../model/passenger');

class PassengerRepository {
  async createPassenger(passenger) {
    const newPassenger = await Passenger.create(passenger);
    return newPassenger;
  }

  async findByNic(nic_no){
    return await Passenger.findOne({where: { nic_no }})
  }
}

module.exports = new PassengerRepository();

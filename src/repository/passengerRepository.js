const Passenger = require('../model/passenger');

class PassengerRepository {
  async createPassenger(passenger) {
    const newPassenger = await Passenger.create(passenger);
    return newPassenger;
  }
}

module.exports = new PassengerRepository();

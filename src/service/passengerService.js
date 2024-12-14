const PassangerRepository = require('../repository/passengerRepository');
const bcrypt = require('bcrypt');

class PassengerService {
  async registerPassenger(nic_no, full_name, address, contact_number, email, password) {
    
    const hashedPswrd = await bcrypt.hash(password, 10);
    const passenger = { nic_no, full_name, address, contact_number, email, password: hashedPswrd };
    const createPassenger = await PassangerRepository.createPassenger(passenger);
    return createPassenger;
  }
}

module.exports = new PassengerService();
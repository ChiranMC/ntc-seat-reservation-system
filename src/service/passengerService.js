const PassangerRepository = require('../repository/passengerRepository');
const bcrypt = require('bcrypt');

class PassengerService {
  async registerPassenger(nic_no, full_name, address, contact_number, email, password) {
    
    const hashedPswrd = await bcrypt.hash(password, 10);
    const passenger = { nic_no, full_name, address, contact_number, email, password: hashedPswrd };
    const createPassenger = await PassangerRepository.createPassenger(passenger);
    return createPassenger;
  }

  async verifyPassenger(nic_no, password){
    const passengerDetails = await PassangerRepository.findByNic(nic_no);
    if (!passengerDetails) {
      throw new Error('Invalid nic');
    }
    else{
      const verifyPassword = await bcrypt.compare(password, passengerDetails.password);
      if (verifyPassword) {
        return passengerDetails;
      }
      else{
        throw new Error('invalid password');
      }
    }
  }
}

module.exports = new PassengerService();
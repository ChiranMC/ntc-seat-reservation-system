const passengerService = require('../service/passengerService');

class PassengerController {
  async registerPassenger(req, res) {
    try {
      const { nic_no, full_name, address, contact_number, email, password } = req.body;
      const newPassenger = await passengerService.registerPassenger(nic_no, full_name, address, contact_number, email, password);
      res.status(201).json({ message: 'Passenger registered successfully', newPassenger: newPassenger.nic_no });
      console.log('new passenger added to the system passenger :', newPassenger.full_name, newPassenger.nic_no);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.error('Error : ', error.message);
    }
  }
}

module.exports = new PassengerController();
const passengerService = require('../service/passengerService');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "8ff2332b46a7e76aac621bf77a417d5eeaf3ca038829e4e118a36d98824a43855729571f95d1b83371d240fff83e7ddd4e2e650c6838ebce095e6197a8918576";

class PassengerController {
  async registerPassenger(req, res) {
    try {
      const { nic_no, full_name, address, contact_number, email, password } = req.body;
      const formatedContactNo = parseInt(contact_number, 10);
      const newPassenger = await passengerService.registerPassenger(nic_no, full_name, address, formatedContactNo, email, password);
      res.status(201).json({ message: 'Passenger registered successfully', newPassenger: newPassenger.nic_no });
      console.log('new passenger added to the system passenger :', newPassenger.full_name, newPassenger.nic_no);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.error('Error : ', error.message);
    }
  }
  async loginPassenger(req, res){
    try{
      const {nic_no, password} = req.body;
      const loginVerified = await passengerService.verifyPassenger(nic_no, password);
      if (loginVerified) {
        const jwtToken = jwt.sign({ nic_no, password }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Passenger verified sucessfully', jwtToken});
        console.log('passenger verification sucessfull for user with nic : ', nic_no);
      }
    }catch(error){
      res.status(401).json({ error: error.message });
      console.log('failed to verify passenger with nic :', nic_no);
    }
  }
}

module.exports = new PassengerController();
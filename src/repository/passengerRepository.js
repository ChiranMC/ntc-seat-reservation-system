const db = require('../config/database');

class PassangerRepository{
    async createPassenger(passenger){
        const query = 'INSERT INTO passenger (nic_no, full_name, address, contact_number, email, password) VALUES($1, $2, $3, $4, $5, $6) returning nic_no';
        const VALUES = [passenger.nic_no, passenger.full_name, passenger.address, passenger.contact_number, passenger.email, passenger.password];
        const result = await db.query(query, VALUES);
        return result.row[0];
    }
}

module.exports = new PassangerRepository();
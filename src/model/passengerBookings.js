const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PassengerBooking = sequelize.define('passengerBooking', {
    booking_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    passenger_id: DataTypes.STRING,
    payment_reciept_id: DataTypes.INTEGER,
    number_plate: DataTypes.STRING,
    scheduled_slot: DataTypes.INTEGER,
    seat_no: DataTypes.STRING,
    booking_date: DataTypes.DATE,
},{
    tableName: 'passenger_bookings',
    timestamps: false,
});

module.exports = PassengerBooking;
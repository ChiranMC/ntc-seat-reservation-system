const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const BusTimeSchedules = require('./busTimeSchedules');

const Buses = sequelize.define('buses', {
    ntc_registered_number:{
        type: DataTypes.STRING,
        primaryKey: true,
    },
    vehicle_register_number: DataTypes.STRING,
    vehicle_capacity: DataTypes.INTEGER,
    type: DataTypes.STRING,
    owner_id: DataTypes.STRING,
    operator_id: DataTypes.STRING,
    conductor_id: DataTypes.STRING
}, {
    tableName: 'buses',
    timestamps: false,
});

Buses.hasMany(BusTimeSchedules, { foreignKey: 'bus_ntc', as: 'busTimeSchedules' });

module.exports = Buses;
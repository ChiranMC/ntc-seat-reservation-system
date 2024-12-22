const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BusTimeSchedules = sequelize.define('bus_time_schedules', {
    slot_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    route_id: DataTypes.INTEGER,
    bus_ntc: DataTypes.STRING,
    departure_time: DataTypes.TIME,
    arrival_time: DataTypes.TIME,
    schedule_date: DataTypes.STRING,
    status: DataTypes.SMALLINT
}, {
    tableName: 'bus_time_schedules',
    timestamps: false,
});

module.exports = BusTimeSchedules;
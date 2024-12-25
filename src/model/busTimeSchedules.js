const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Buses = require('./buses');
const Route = require('./routes')

const BusTimeSchedules = sequelize.define('bus_time_schedules', {
    slot_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    route_id: DataTypes.INTEGER,
    bus_ntc: DataTypes.STRING,
    departure_time: DataTypes.TIME,
    arrival_time: DataTypes.TIME,
    scheduled_date: DataTypes.STRING,
    status: DataTypes.SMALLINT
}, {
    tableName: 'bus_time_schedules',
    timestamps: false,
});

BusTimeSchedules.belongsTo(Buses, { foreignKey: 'bus_ntc', as: 'bus' });
BusTimeSchedules.belongsTo(Route, { foreignKey: 'route_id', as: 'route' });

module.exports = BusTimeSchedules;
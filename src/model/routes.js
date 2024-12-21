const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Route = sequelize.define('routes',{
    route_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    origin: DataTypes.STRING,
    destination: DataTypes.STRING,
    distance_between: DataTypes.FLOAT
}, {
    tableName: 'routes',
    timestamps: false,
});

module.exports = Route;
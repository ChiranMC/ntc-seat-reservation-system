const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PaymentRecieptHistory = sequelize.define('PaymentRecieptHistory',{
    payment_receipt_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    passenger_id: DataTypes.STRING,
    payment_amount: DataTypes.FLOAT,
    issued_time: DataTypes.TIME,
},{
    tableName: 'payment_receipt_history',
    timestamps: false,
});

module.exports = PaymentRecieptHistory;
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ntc_seat_reservation_db_rd9s', 'test', 'lAm31nYB3atMFMhWbQaoZDzDTwXX8ktM', {
  host: 'dpg-ct87snhopnds73bu7tlg-a',
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = sequelize;
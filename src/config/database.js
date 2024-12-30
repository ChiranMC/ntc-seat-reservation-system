const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ntc_seat_reservation_db_xg88', 'test', '3XLYwzAuLzny52M7GCfX5Paia8YPTit0', {
  host: 'dpg-ctpc4eogph6c73dco4tg-a',
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
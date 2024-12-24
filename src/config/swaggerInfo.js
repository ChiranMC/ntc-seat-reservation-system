const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ntc-seat-reservation-system',
      version: '1.0.0',
      description: 'NTC API End points',
    },
    servers: [
      {
        url: 'https://ntc-seat-reservation-system.onrender.com',
        description: 'National Transportation Seat Reservation System',
      },
    ],
  },
  apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
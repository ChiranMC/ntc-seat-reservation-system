class ScheduledBusDTO {

    constructor(origin, destination, departure_time, arrival_time, number_plate, type) {
      this.origin = origin;
      this.destination = destination;
      this.departure_time = departure_time;
      this.arrival_time = arrival_time;
      this.number_plate = number_plate;
      this.type = type;
    }
  }
  
  module.exports = ScheduledBusDTO;
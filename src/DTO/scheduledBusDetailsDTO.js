class ScheduledBusDTO {

  constructor(origin, destination, departure_time, arrival_time, vehicle_register_number, type) {
    this.origin = origin;
    this.destination = destination;
    this.departure_time = departure_time;
    this.arrival_time = arrival_time;
    this.vehicle_register_number = vehicle_register_number;
    this.type = type;
  }
  }
  
  module.exports = ScheduledBusDTO;
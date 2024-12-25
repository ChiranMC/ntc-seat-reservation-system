class ScheduledBusDTO {

    constructor(origin, destination, departure_time, arrival_time, number_plate, bus_type, total_booked_seats) {
      this.origin = origin;
      this.destination = destination;
      this.departure_time = departure_time;
      this.arrival_time = arrival_time;
      this.number_plate = number_plate;
      this.type = bus_type;
      this.total_booked_seats = total_booked_seats;
    }
  }
  
  module.exports = ScheduledBusDTO;
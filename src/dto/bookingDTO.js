class BookingDTO {

  constructor(passenger_id, paymentAmount, bookingDate, selectedSeats = [], numberPlate, scheduled_slot) {
    this.passenger_id = passenger_id;
    this.paymentAmount = paymentAmount;
    this.bookingDate = bookingDate;
    this.selectedSeats = selectedSeats;
    this.numberPlate = numberPlate;
    this.scheduled_slot = scheduled_slot;
  }
}
  
module.exports = BookingDTO;
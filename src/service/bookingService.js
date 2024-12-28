const PassengerBookingsRepository = require('../repository/passengerBookingRepository');
const PaymentRecieptHistoryRepository = require('../repository/PaymentRecieptHistoryRepositoy');

const bustSeatsUtill = require('../utils/busSeatsUtill');
const BookingDTO = require('../dto/bookingDTO');

class BookingService {
    checkSeatsAvailability(selectedSeats = [], numberPlate, scheduled_slot, booking_date){
        const bookedSeats = PassengerBookingsRepository.getBookedSeatsListByNumberPlateAndTimeSlot(numberPlate, scheduled_slot, booking_date);
        const BookedSeatsArray = bookedSeats.map(seat => seat.seat_no);
        if (BookedSeatsArray.filter(seats => !selectedSeats.includes(seats))) {
            return true;
        }else{
            return false;
        }
    }
    
    async sendpayment(passenger_id, paymentAmount, issueTime){
        const payment = {passenger_id, paymentAmount, issueTime};
        const confirmation = await PaymentRecieptHistoryRepository.addNewRecieptHistory(payment);
        return confirmation;
    }


    async BookingSeats(bookingData) {
        try {
            const booking = new BookingDTO(
                bookingData.passenger_id,
                bookingData.paymentAmount,
                bookingData.bookingDate,
                bookingData.selectedSeats,
                bookingData.numberPlate,
                bookingData.scheduled_slot
            );
            const seatsAvailable = await this.checkSeatsAvailability(booking.selectedSeats, booking.numberPlate, booking.scheduled_slot);
            
            if (!seatsAvailable) {
                const paymentIssuedTime = new Date();
                const payment = await this.sendpayment(booking.passenger_id, bookingData.paymentAmount, paymentIssuedTime);
                let bookedCount = 0;
                if (payment) {
                    const payment_id = payment.payment_reciept_id;
                    for (let seat of bookingData.selectedSeats) {
                        const bookinfo = {
                            passenger_id: bookingData.passenger_id,
                            payment_reciept_id: payment_id,
                            number_plate: bookingData.numberPlate,
                            scheduled_slot: bookingData.scheduled_slot,
                            seat_no: seat,
                            booking_date: bookingData.bookingDate
                        };
                        const saved = await PassengerBookingsRepository.createBooking(bookinfo);
                        if(saved){
                            bookedCount++;
                        }

                    }
                    if (bookedCount>0) {
                        return 1;
                    }
                } else {
                    console.error('Payment verification failed to complete');
                    return 0;
                }
            } else {
                console.error(`Seats that passenger -> ${booking.passenger_id} trying to book are already booked.`);
                return 0;
            }
        } catch (error) {
            console.error('Error occurred while booking seats:', error);
            return 0;
        }
    }
    
}

module.exports = new BookingService();



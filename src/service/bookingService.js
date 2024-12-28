const PassengerBookingsRepository = require('../repository/passengerBookingRepository');
const PaymentRecieptHistoryRepository = require('../repository/PaymentRecieptHistoryRepositoy');

const bustSeatsUtill = require('../utils/busSeatsUtill');
const BookingDTO = require('../dto/bookingDTO');

class BookingService {
    checkSeatsAvailability(selectedSeats = [], numberPlate, scheduled_slot, booking_date){
        const bookedSeats = PassengerBookingsRepository.getBookedSeatsListByNumberPlateAndTimeSlot(numberPlate, scheduled_slot, booking_date);
        if (bookedSeats.length > 0) {
            const BookedSeatsArray = bookedSeats;
            if (BookedSeatsArray.filter(seat => !selectedSeats.includes(seat)).length > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            console.log('No seats booked for the given date and slot');
            return true;
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
            console.log(`all dto info - > debug ${booking}`);
            const seatsAvailable = await this.checkSeatsAvailability(booking.selectedSeats, booking.numberPlate, booking.scheduled_slot, booking.bookingDate);
            
            if (seatsAvailable) {
                const paymentIssuedTime = new Date();
                console.log(`payment.payment amount -> ${booking.paymentAmount}`);
                const payment = await this.sendpayment(booking.passenger_id, booking.paymentAmount, paymentIssuedTime);
                console.log(`payment id ${payment}`);
                let bookedCount = 0;
                if (payment) {
                    booking.selectedSeats.forEach(async (seat) => {
                        const bookinfo = {
                            passenger_id: booking.passenger_id,
                            payment_reciept_id: payment,
                            number_plate: booking.numberPlate,
                            scheduled_slot: booking.scheduled_slot,
                            seat_no: seat,
                            booking_date: booking.bookingDate
                        };
                
                        const saved = await PassengerBookingsRepository.createBooking(bookinfo);
                        if (saved) {
                            bookedCount++;
                        }});
                    // for (let seat of booking.selectedSeats) {
                    //     const bookinfo = {
                    //         passenger_id: booking.passenger_id,
                    //         payment_reciept_id: payment,
                    //         number_plate: booking.numberPlate,
                    //         scheduled_slot: booking.scheduled_slot,
                    //         seat_no: seat,
                    //         booking_date: booking.bookingDate
                    //     };
                    //     const saved = await PassengerBookingsRepository.createBooking(bookinfo);
                    //     if(saved){
                    //         bookedCount++;
                    //     }

                    // }
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



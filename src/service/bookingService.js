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
    
    // async sendPayment(passenger_id, paymentAmount, issueTime) {
    //     try {
    //         const payment = { passenger_id, paymentAmount, issueTime };
    //         const confirmation = await PaymentRecieptHistoryRepository.addNewRecieptHistory(payment);
    //         return confirmation;
    //     } catch (error) {
    //         console.error("Error inserting payment info:", error);
    //         throw new Error("Payment failed.");
    //     }
    // }

    async bookSeats(bookingData) {
        try {
            const { passenger_id, paymentAmount, bookingDate, selectedSeats, numberPlate, scheduled_slot } = bookingData;
    
            console.log(`Booking data received: ${JSON.stringify(bookingData)}`);
            const seatsAvailable = await this.checkSeatsAvailability(selectedSeats, numberPlate, scheduled_slot, bookingDate);

            if (!seatsAvailable) {
                console.error("Selected seats are already booked.");
                return 0;
            }
    
            const paymentIssuedTime = new Date();
            const payment = { passenger_id, payment_amount: paymentAmount, issued_time: paymentIssuedTime };
    
            console.log("Initiating payment with data:", payment);
            const payment_confo = await PaymentRecieptHistoryRepository.saveToPayment(payment);
    
            if (!payment_confo) {
                console.error("Payment verification failed.");
                return 0;
            }
    
            console.log(`Payment successful. Receipt ID: ${payment_confo.payment_reciept_id}`);
            const bookingPromises = selectedSeats.map(seat => {
                const bookingInfo = {
                    passenger_id,
                    payment_reciept_id,
                    number_plate: numberPlate,
                    scheduled_slot,
                    seat_no: seat,
                    booking_date: bookingDate
                };
    
                console.log("Booking Info for Seat:", bookingInfo);
                const savedRcd = PassengerBookingsRepository.createBooking({
                    passenger_id: passenger_id, 
                    payment_reciept_id: payment_confo.payment_reciept_id,
                    number_plate: numberPlate,
                    scheduled_slot: scheduled_slot,
                    seat_no: seat,
                    booking_date: bookingDate
                });
            });
    
            const bookingResults = await Promise.all(bookingPromises);
    
            const successfulBookings = bookingResults.filter(result => result).length;
            if (successfulBookings > 0) {
                console.log(`Successfully booked ${successfulBookings} seats.`);
                return successfulBookings;
            } else {
                console.error("No seats were successfully booked.");
                return 0;
            }
        } catch (error) {
            console.error("Error occurred while booking seats:", error);
            return 0;
        }
    }
    
}

module.exports = new BookingService();



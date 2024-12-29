const PassengerBookingsRepository = require('../repository/passengerBookingRepository');
const PaymentRecieptHistoryRepository = require('../repository/PaymentRecieptHistoryRepositoy');

const BusesRepository = require('../repository/busesRepository');

const bustSeatsUtill = require('../utils/busSeatsUtill');
const BookingDTO = require('../dto/bookingDTO');

class BookingService {

    async getAllAvailableSeats(number_plate, scheduled_slot, booking_date){
        try {
            const busType = BusesRepository.getBusTypeByNumberPlate(number_plate);
            if (busType === 'Semi-Luxury' || busType === 'Normal') {
                const bookedSeats = await PassengerBookingsRepository.getBookedSeatsListByNumberPlateAndTimeSlot(number_plate, scheduled_slot, booking_date);
                const availableSeats = bustSeatsUtill.filterAvailableSemiLuxuryOrNormalSeats(bookedSeats);
                console.log("successfully fetched all available seats");
                return availableSeats;
            }
            else if (busType === 'Luxury') {
                const bookedSeats = await PassengerBookingsRepository.getBookedSeatsListByNumberPlateAndTimeSlot(number_plate, scheduled_slot, booking_date);
                const availableSeats = bustSeatsUtill.filterAvailableLuxurySeats(bookedSeats);
                console.log("successfully fetched all available seats");
                return availableSeats;
            }
        } catch (error) {
            console.error("Error occurred while fetching available seats information:", error);
            return [];
        }
    }

    async checkSeatsAvailability(selectedSeats = [], numberPlate, scheduled_slot, booking_date) {
        const bookedSeats = await PassengerBookingsRepository.getBookedSeatsListByNumberPlateAndTimeSlot(numberPlate, scheduled_slot, booking_date);
        if (bookedSeats.length > 0) {
            return bookedSeats.some(seat => !selectedSeats.includes(seat));
        } else {
            console.log('No seats booked for the given date and slot');
            return false; // Seats are available
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
            const payment_id = await PaymentRecieptHistoryRepository.getPaymentIdByIssuedTime(paymentIssuedTime);
            console.log(`Payment successful. Receipt ID: ${payment_confo}`);
            const bookingPromises = selectedSeats.map(seat => {
                const bookingInfo = {
                    passenger_id,
                    payment_confo,
                    number_plate: numberPlate,
                    scheduled_slot,
                    seat_no: seat,
                    booking_date: bookingDate
                };
    
                console.log("Booking Info for Seat:", bookingInfo);
                return PassengerBookingsRepository.createBooking({
                    passenger_id: passenger_id, 
                    payment_receipt_id: payment_id,
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



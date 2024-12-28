const PassengerBookings = require('../model/passengerBookings');

class PassengerBookingsRepository{
    async getBookedSeatsListByNumberPlateAndTimeSlot(number_plate, scheduled_slot, booking_date) {
        try {
            const bookedSeats = await PassengerBookings.findAll({
                where: {
                    number_plate: number_plate,
                    scheduled_slot: scheduled_slot,
                    booking_date: booking_date,
                },
                attributes: ['seat_no'],
            });
            return bookedSeats.map(seat => seat.seat_no);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async createBooking({ passenger_id, payment_reciept_id, number_plate, scheduled_slot, seat_no, booking_date }) {
        try {
            return await PassengerBookings.create({
                passenger_id,
                payment_reciept_id,
                number_plate,
                scheduled_slot,
                seat_no,
                booking_date
            });
        } catch (error) {
            console.error("Error creating booking:", error);
            throw error; // Optional: Propagate the error to the calling method
        }
    }
}

module.exports = new PassengerBookingsRepository();
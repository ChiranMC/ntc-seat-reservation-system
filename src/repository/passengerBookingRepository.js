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

    async createBooking(bookingInfo){
        try{
            return await PassengerBookings.create(bookingInfo);
        }catch(error){
            console.error(error);
        }
    }
}

module.exports = new PassengerBookingsRepository();
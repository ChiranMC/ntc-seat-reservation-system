const BookingService = require('../service/bookingService');

class BookingController{
    async bookBusTickets(req, res){
        try {
            const { bookingInfo } = req.body;
            console.log("request came to save booking info");
            const status = await BookingService.bookSeats(bookingInfo);
            if (status>0) {
                res.status(200).json(`Successfully saved booking information for ${status}`);
                console.log("successfully saved booking info");
            }
            else if(status === 0){
                res.status(500).json(`failed to save booking information`);
                console.log('failed to save booking information');
            }
        } catch (error) {
            res.status(500).json("failed to save booking information");

            console.log(`error occured while calling bus ticket service method to save and create bookings ${error}`);
        }
    }

    async getAllAvailableSeats(req, res){
        try {
            const { number_plate, scheduled_slot, booking_date } = req.body;
            console.log("request came to fetch available seats info");
            const availableSeats = await BookingService.getAllAvailableSeats(number_plate,scheduled_slot,booking_date);
            if (availableSeats != null) {
                res.status(200).json(availableSeats);
                console.log("successfully fetched all available information");
            }
            else{
                res.status(400).json("failed fetch available information");
                console.log("failed fetched all available seat information");
            }
        } catch (error) {
            res.status(500).json("failed to fetch available seats information");
            console.log(`error occured while calling bus ticket service method to fetch availabl seats info-> ${error}`);
            console.log(`error occured while calling bus ticket service method to save and create bookings ${error}`)

        }
    }
}

module.exports = new BookingController();
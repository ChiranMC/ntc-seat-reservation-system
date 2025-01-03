const BookingService = require('../service/bookingService');

class BookingController{
    async bookBusTickets(req, res){
        try {
            const { bookingInfo } = req.body;
            const status = BookingService.BookingSeats(bookingInfo);
            if (status>0) {
                res.status(200).json(`Successfully saved booking information for ${status}`);
                console.log("successfully saved booking info");
            }
        } catch (error) {
            res.status(500).json("failed to save booking information");
            console.log(`error occured while calling bus ticket service method to save and create bookings ${error}`)
        }
    }
}

module.exports = new BookingController();
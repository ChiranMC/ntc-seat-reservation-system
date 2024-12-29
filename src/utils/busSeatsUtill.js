class BusSeatsUtill {
    async filterAvailableSemiLuxuryOrNormalSeats(bookedSeats = []) {
        const fullSeatsList = [];
        for (let num = 1; num <= 45; num++) {
            if (num >= 20 && num <= 45) {
                fullSeatsList.push('L' + num); 
            } else if (num >= 1 && num <= 19) {
                fullSeatsList.push('R' + num); 
            } else {
                fullSeatsList.push('B' + num);
            }
        }

        const availableSeats = fullSeatsList.filter(seat => !bookedSeats.includes(seat));
        return availableSeats;
    }

    async filterAvailableLuxurySeats(bookedSeats = []) {
        const fullSeatsList = [];
        for (let num = 1; num <= 50; num++) {
            if (num >= 22 && num <= 50) {
                fullSeatsList.push('L' + num);
            } else if (num >= 1 && num <= 21) {
                fullSeatsList.push('R' + num);
            } else {
                fullSeatsList.push('B' + num);
            }
        }

        const availableSeats = fullSeatsList.filter(seat => !bookedSeats.includes(seat));
        return availableSeats;
    }
}

module.exports = new BusSeatsUtill();
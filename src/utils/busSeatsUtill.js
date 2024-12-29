class BusSeatsUtill {
    async filterAvailableSemiLuxuryOrNormalSeats(bookedSeats = []) {
        const fullSeatsList = [];
        for (let num = 1; num <= 45; num++) {
            if (num >= 1 && num <= 20) {
                fullSeatsList.push('R' + num);
            } else if (num >= 21 && num <= 40) {
                fullSeatsList.push('L' + num);
            } else if (num >= 41 && num <= 45) {
                fullSeatsList.push('B' + num);
            }
        }
        const availableSeats = fullSeatsList.filter(seat => !bookedSeats.includes(seat));
        return availableSeats;
    }

    async filterAvailableLuxurySeats(bookedSeats = []) {
        const fullSeatsList = [];
        for (let num = 1; num <= 50; num++) {
            if (num >= 1 && num <= 20) {
                fullSeatsList.push('R' + num);
            } else if (num >= 21 && num <= 40) {
                fullSeatsList.push('L' + num);
            } else if (num >= 41 && num <= 50) {
                fullSeatsList.push('B' + num);
            }
        }
        const availableSeats = fullSeatsList.filter(seat => !bookedSeats.includes(seat));
        return availableSeats;
    }
}

module.exports = new BusSeatsUtill();
class BusSeatsUtill{
    async filterAvailableSemiLuxuryOrNormalSeats(bookedSeats = []){
        const fullSeatsList = [];
        for(let num=1; num<=45; num++){
            if (num>=20) {
                fullSeatsList.push('L'+num);
            }
            else if (num<20 && num>41) {
                fullSeatsList.push('R'+num);
            }
            else if (num<=45) {
                fullSeatsList.push('B'+num);
            }
        }

        const availableSeats = fullSeatsList.filter(seat => !bookedSeats.includes(seat));
        return availableSeats;
    }

    async filterAvailableLuxurySeats(bookedSeats = []){
        const fullSeatsList = [];
        for(let num=1; num<=50; num++){
            if (num>=22) {
                fullSeatsList.push('L'+num);
            }
            else if (num<22 && num>44) {
                fullSeatsList.push('R'+num);
            }
            else if (num<=50) {
                fullSeatsList.push('B'+num);
            }
        }

        const availableSeats = fullSeatsList.filter(seat => !bookedSeats.includes(seat));
    }
}

module.exports = new BusSeatsUtill();
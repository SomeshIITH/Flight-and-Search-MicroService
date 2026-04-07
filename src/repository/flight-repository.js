const {Flight,Airplane} = require('./../models/index.js')
const {Op} = require('sequelize'); //for operations like greater than, less than, like , strartswith etc
const db = require('./../models/index.js')

class FlightRepository{

    #createFilter(data){
        let filter = {};

        if (data.departureAirportId) {
            filter.departureAirportId = data.departureAirportId;
        }
        if (data.arrivalAirportId) {
            filter.arrivalAirportId = data.arrivalAirportId;
        }

        let priceFilter = [];
        if (data.minPrice) {
            priceFilter.push({ price: { [Op.gte]: data.minPrice } });
        }
        if (data.maxPrice) {
            priceFilter.push({ price: { [Op.lte]: data.maxPrice } });
        }

        // Only add to filter if the array is NOT empty
        if (priceFilter.length > 0) {
            Object.assign(filter, { [Op.and]: priceFilter });
        }

        return filter;
    }

    async createflight(data,transaction){
        try{
            //handled in service layer
            // let payload = {...data};
            // if(!data.totalSeats){
            //     const airplane = await Airplane.findByPk(data.airplaneId);
            //     payload = {...payload, totalSeats : airplane.capacity};
            // }
            /// Pass the transaction to the create call
            const flight = await Flight.create(data,{transaction}); 
            return flight;
        }catch(error){
            console.log("Something went wrong in flight repository layer");
            throw error;
        }
    }

    async createMultipleflights(flights){
        // Start one big transaction for the entire batch
        return await db.sequelize.transaction(async (t) => {
            try {
                const results = [];
                for (const flightData of flights) {
                    // We reuse our existing createflight logic!
                    // This ensures each flight is checked for overlaps
                    const flight = await this.createflight(flightData, t);
                    results.push(flight);
                }
                return results;
            } catch (error) {
                // If even ONE flight in the loop has a conflict, 
                // the whole batch rolls back.
                throw error;
            }
        });
    }

    async getflightById(id){
        try{
            const flight = await Flight.findByPk(id);
            return flight;
        }catch(error){
            console.log("Something went wrong in flight repository layer");
            throw error;
        }
    }

    async getflightByFilter(filter){
        try{
            const filterObject = this.#createFilter(filter);
            // Use findAndCountAll instead of findAll
            // This returns { count: totalItems, rows: [flights] }
            // Very useful for the frontend to calculate total pages
            const flights = await Flight.findAndCountAll({
                where : filterObject,
                limit: filter.limit ? parseInt(filter.limit) : 10, // Default to 10
                offset: filter.offset ? parseInt(filter.offset) : 0,
                order: [['price', 'ASC']] // Pagination NEEDS a stable sort order
            })
            return flights;
        }catch(error){
            console.log("Something went wrong in flight repository layer");
            throw error;
        }
    }

    async updateflightById(id,data){
        try{
            const flight = await Flight.findByPk(id);
            if(data.flghtNumber)flight.flghtNumber = data.flghtNumber;
            if(data.airplaneId)flight.airplaneId = data.airplaneId;
            if(data.departureAirportId)flight.departureAirportId = data.departureAirportId;
            if(data.arrivalAirportId)flight.arrivalAirportId = data.arrivalAirportId;
            if(data.arrivalTime)flight.arrivalTime = data.arrivalTime;
            if(data.departureTime)flight.departureTime = data.departureTime;
            if(data.price)flight.price = data.price;
            if(data.boardingGate)flight.boardingGate = data.boardingGate;
            if(data.totalSeats)flight.totalSeats = data.totalSeats;
            await flight.save();
            return flight;
        }catch(error){
            console.log("Something went wrong in flight repository layer");
            throw error;
        }
    }

    async destroyflightById(id){
        try{
            const flight = await Flight.destroy({
                where : {
                    id : id
                }
            })
            return flight;
        }catch(error){
            console.log("Something went wrong in flight repository layer");
            throw error;
        }
    }

    async getOverlappingFlights(airplaneId,arrivalTime,departureTime,transaction){
        try{
            // Ex there exist flight whose departure is Da , arrival is Aa , then the new flight B must not overlap
            //condition for overalp Db <= Aa && Da <= Ab
            const flights = await Flight.findAll({
                where : {
                    airplaneId : airplaneId,
                    [Op.and] : [
                        {
                            departureTime : { [Op.lt] : arrivalTime } 
                        },
                        {
                            arrivalTime : { [Op.gt] : departureTime }
                        }
                    ]
                },
                transaction : transaction
            })
            return flights;
        }catch(error){
            throw error;
        }
    }
    // Repository just does the work using the provided transaction 't'
    async updateRemainingSeats(flightId, seats, dec = true, transaction) {
        try {
            const flight = await Flight.findByPk(flightId, {
                transaction: transaction,
                lock: transaction.LOCK.UPDATE
            });

            if (dec) {
                if (flight.remainingSeats < seats) {
                    throw new Error("Not enough seats available");
                }
                await flight.decrement('remainingSeats', { by: seats, transaction });
            } else {
                await flight.increment('remainingSeats', { by: seats, transaction });
            }
            return flight;
        } catch (error) { throw error; }
    }

};

module.exports = FlightRepository;
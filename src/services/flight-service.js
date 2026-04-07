const {FlightRepository,AirplaneRepository} = require('./../repository/index.js');
const {compareTime} = require('./../utils/helper.js')
const db = require('./../models/index.js');
const redisClient = require('./../config/redis-config.js');
const AppError  = require('./../utils/app-error.js');
const {StatusCodes} = require('http-status-codes');


class FlightService{
    constructor(){
        this.flightrepo = new FlightRepository();
        this.airplanerepo = new AirplaneRepository();
    }

    // This is the "Worker" logic. It doesn't know about transaction start/stop.
    async _createFlightLogic(data, transaction) {
        if (!data.flightNumber || !data.airplaneId || !data.departureAirportId || !data.arrivalAirportId || !data.arrivalTime || !data.departureTime || !data.price) {
            throw new AppError("All fields are required", StatusCodes.BAD_REQUEST);
        }
        if (!compareTime(data.departureTime, data.arrivalTime)) {
            throw new AppError("Arrival time must be after departure time", StatusCodes.BAD_REQUEST);
        }

        // ALWAYS LOCK THE AIRPLANE. Even if totalSeats is provided, 
        // we lock it to prevent race conditions during the overlap check.
        const airplane = await this.airplanerepo.getairplaneById(data.airplaneId, { transaction, lock: transaction.LOCK.UPDATE });
        if (!airplane)throw new AppError("The airplane with the given ID was not found", StatusCodes.NOT_FOUND);

        if (!data.totalSeats) data.totalSeats = airplane.capacity;

        const overlapping = await this.flightrepo.getOverlappingFlights(data.airplaneId, data.arrivalTime, data.departureTime, transaction);
        if (overlapping.length > 0) throw new AppError("Airplane is already scheduled during this time", StatusCodes.CONFLICT);

        return await this.flightrepo.createflight(data, transaction);
    }

    // Public API for single flight
    async createflight(data) {
        return await db.sequelize.transaction(async (t) => {
            return await this._createFlightLogic(data, t);
        });
        /* In transaction, the following happens:
        If the function finishes successfully: It automatically calls COMMIT.
        If the function throws an error: It automatically calls ROLLBACK.
        so dont need to bind in try/catch
        */
    }

    // Public API for bulk flights - NOW ATOMIC!
    async createMultipleflights(flights) {
        return await db.sequelize.transaction(async (t) => {
            const result = [];
            for (let flight of flights) {
                // All flights use the SAME transaction 't'
                result.push(await this._createFlightLogic(flight, t));
            }
            return result;
        });
    }

    async getflightById(id){
        try{
            const flight = await this.flightrepo.getflightById(id);
            if(!flight)throw new AppError("Flight not found",StatusCodes.NOT_FOUND);
            return flight;
        }catch(error){
            console.log("Something went wrong in flight service layer");
            throw error;
        }
    }
    async getflightByFilter(filter){
        try {
            //I implemneted cache aside pattern
            // 1. Generate a unique key based on the search parameters
            const cacheKey = `flights:${JSON.stringify(filter)}`;
    
            // 2. Check if data exists in Redis
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                console.log("CACHE HIT");
                return JSON.parse(cachedData);
            }
    
            // 3. Cache Miss: Go to Database
            console.log("CACHE MISS");
            const flights = await this.flightrepo.getflightByFilter(filter);
    
            // 4. Store in Redis with an Expiry (TTL - Time To Live)
            // We don't want old schedules staying forever!
            await redisClient.set(cacheKey, JSON.stringify(flights), {
                EX: 3600 // Expire in 1 hour
            });
    
            return flights;
        } catch (error) {
            // If Redis is down, don't crash the app! Just fallback to DB.
            console.log("Redis Error, falling back to DB", error);
            return await this.flightrepo.getflightByFilter(filter);
        }
    }

    async updateflightById(id,data){
        try{
            if(data.departureTime && data.arrivalTime && !compareTime(data.departureTime,data.arrivalTime)){
                throw new AppError("Arrival time should be greater than departure time",StatusCodes.BAD_REQUEST);
            }
            const flight = await this.flightrepo.updateflightById(id,data);
            if(!flight)throw new AppError("Flight not found",StatusCodes.NOT_FOUND);
            return flight;
        }catch(error){
            console.log("Something went wrong in flight service layer");
            throw error;
        }
    }

    async destroyflightById(id){
        try{
            const flight = await this.flightrepo.destroyflightById(id);
            if(!flight)throw new AppError("Flight not found",StatusCodes.NOT_FOUND);
            return flight;
        }catch(error){
            console.log("Something went wrong in flight service layer");
            throw error;
        }
    }

}

module.exports = FlightService;
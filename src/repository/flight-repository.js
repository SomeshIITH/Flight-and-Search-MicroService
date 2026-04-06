const {Flight,Airplane} = require('./../models/index.js')
const {Op} = require('sequelize'); //for operations like greater than, less than, like , strartswith etc

class FlightRepository{

    #createFilter(data){
        let filter = {};
        if(data.departureAirportId)filter.departureAirportId = data.departureAirportId;
        if(data.arrivalAirportId)filter.arrivalAirportId = data.arrivalAirportId;
        //filtering based on price
        //M1
        // if(data.minPrice && data.maxPrice) {
        //     Object.assign(filter, {
        //         [Op.and]: [
        //             { price: {[Op.lte]: data.maxPrice} }, 
        //             { price: {[Op.gte]: data.minPrice} }
        //         ]
        //     })
        // }
        //M2
        let pricefilter = [];
        if(data.minPrice){
            pricefilter.push({price : {[Op.gte] : data.minPrice}});
        }
        if(data.maxPrice){
            pricefilter.push({price : {[Op.lte] : data.maxPrice}});
        }
        Object.assign(filter,{[Op.and] : pricefilter});
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

    async createMultipleflights(flightList){
        try{
            const flights = await Flight.bulkCreate(flightList);
            return flights;
        }catch(error){
            console.log("Something went wrong in flight repository layer");
            throw error;
        }
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
            const flights = await Flight.findAll({
                where : filterObject
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

};

module.exports = FlightRepository;
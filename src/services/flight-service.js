const {FlightRepository,AirplaneRepository} = require('./../repository/index.js');
const {compareTime} = require('./../utils/helper.js')
const {db} = require('./../models/index.js');


// try{
//     if(!data.flightNumber || !data.airplaneId || !data.departureAirportId || !data.arrivalAirportId || !data.arrivalTime || !data.departureTime || !data.price){
//         throw new Error("All fields are required");
//     }
//     if(!compareTime(data.departureTime,data.arrivalTime)){
//         throw new Error("Arrival time should be greater than departure time");
//     }
//     if(!data.totalSeats){
//         const airplane = await this.airplanerepo.getairplaneById(data.airplaneId);
//         if(!airplane){
//             throw new Error("Airplane not found with the given id");
//         }
//         data.totalSeats = airplane.capacity;
//     }
//     //check if Airplane already is used in some other flight overlappingproblem
//     const overlappingFlights = await this.flightrepo.getOverlappingFlights(data.airplaneId,data.arrivalTime,data.departureTime);
//     if(overlappingFlights.length > 0){
//         throw new Error("Airplane is already used in some other flight");
//     }


//     const flight = await this.flightrepo.createflight(data);
//     return flight;
// }catch(error){
//     console.log("Something went wrong in flight service layer");
//     throw error;
// }

class FlightService{
    constructor(){
        this.flightrepo = new FlightRepository();
        this.airplanerepo = new AirplaneRepository();
    }

    async createflight(data){
        return await db.sequelize.transaction(async (t) => {
            
            try{
                if(!data.flightNumber || !data.airplaneId || !data.departureAirportId || !data.arrivalAirportId || !data.arrivalTime || !data.departureTime || !data.price){
                    throw new Error("All fields are required");
                }
                if(!compareTime(data.departureTime,data.arrivalTime)){
                    throw new Error("Arrival time should be greater than departure time");
                }
                if(!data.totalSeats){
                    // LOCK THE AIRPLANE RECORD (Pessimistic Locking)
                    const airplane = await this.airplanerepo.getairplaneById(data.airplaneId,{transaction : t,lock : t.LOCK.UPDATE}); 
                    if(!airplane){
                        throw new Error("Airplane not found with the given id");
                    }
                    data.totalSeats = airplane.capacity;
                }
                //check if Airplane already is used in some other flight overlappingproblem
                const overlappingFlights = await this.flightrepo.getOverlappingFlights(data.airplaneId,data.arrivalTime,data.departureTime,t);
                if(overlappingFlights.length > 0){
                    throw new Error("Airplane is already used in some other flight");
                }
                const flight = await this.flightrepo.createflight(data,t);
                return flight; // Transaction auto-commits here

            }catch(error){
                // Transaction auto-rolls back here
                console.log("Something went wrong in flight service layer");
                throw error;
            }

        })
    }

    async createMultipleflights(flights){
        try{    
            const result = [];
            for(let flight of flights){
                result.push(await this.createflight(flight));//needed else it will not wait for the promise to resolve and will return an array of promises instead of an array of flight objects
            }
            return result;
        }catch(error){
            console.log("Something went wrong in flight service layer");
            throw error;
        }
    }
    async getflightById(id){
        try{
            const flight = await this.flightrepo.getflightById(id);
            return flight;
        }catch(error){
            console.log("Something went wrong in flight service layer");
            throw error;
        }
    }
    async getflightByFilter(filter){
        try{
            const flights = await this.flightrepo.getflightByFilter(filter);
            return flights;
        }catch(error){
            console.log("Something went wrong in flight service layer");
            throw error;
        }
    }

    async updateflightById(id,data){
        try{
            if(data.departureTime && data.arrivalTime && !compareTime(data.departureTime,data.arrivalTime)){
                throw new Error("Arrival time should be less than departure time");
            }
            const flight = await this.flightrepo.updateflightById(id,data);
            return flight;
        }catch(error){
            console.log("Something went wrong in flight service layer");
            throw error;
        }
    }

    async destroyflightById(id){
        try{
            const flight = await this.flightrepo.destroyflightById(id);
            return flight;
        }catch(error){
            console.log("Something went wrong in flight service layer");
            throw error;
        }
    }

}

module.exports = FlightService;
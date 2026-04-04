const {AirportRepository} = require('./../repository/index.js');

class AirportService{
    constructor(){
        this.airportRepo = new AirportRepository();
    }

    async createAirport(data){
        try{
            const airport = await this.airportRepo.createAirport(data);
            return airport;
        }catch(error){
            console.log("Something went wrong in airport service layer");
            throw error;
        }
    }

    async createMultipleAirports(data){
        try{
            const airports = await this.airportRepo.createMultipleAirports(data);
            return airports;
        }catch(error){
            console.log("Something went wrong in airport service layer");
            throw error;
        }
    }

    async getAirportById(id){
        try{
            const airport = await this.airportRepo.getAirportById(id);
            return airport;
        }catch(error){
            console.log("Something went wrong in airport service layer");
            throw error;
        }
    }

    async getAirportByFilter(filter){
        try{
            const airport = await this.airportRepo.getAirportByFilter(filter);
            return airport;
        }catch(error){
            console.log("Something went wrong in airport service layer");
            throw error;
        }
    }

    async updateAirportById(id,data){
        try{
            const airport = await this.airportRepo.updateAirportById(id,data);
            return airport;
        }catch(error){
            console.log("Something went wrong in airport service layer");
            throw error;
        }
    }

    async destroyAirportById(id){
        try{
            const airport = await this.airportRepo.destroyAirportById(id);
            return airport;
        }catch(error){
            console.log("Something went wrong in airport service layer");
            throw error;
        }
    }
};

module.exports = AirportService;
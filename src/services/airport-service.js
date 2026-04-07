const {AirportRepository} = require('./../repository/index.js');
const AppError = require('./../utils/app-error.js')
const { StatusCodes } = require('http-status-codes');

class AirportService{
    constructor(){
        this.airportRepo = new AirportRepository();
    }

    async createAirport(data){
        try{
            const airport = await this.airportRepo.createAirport(data);
            if(!airport)throw new AppError("Airport not created", StatusCodes.INTERNAL_SERVER_ERROR);
            return airport;
        }catch(error){
            console.log("Something went wrong in airport service layer");
            throw error;
        }
    }

    async createMultipleAirports(data){
        try{
            const airports = await this.airportRepo.createMultipleAirports(data);
            if(!airports)throw new AppError("Airports not created", StatusCodes.INTERNAL_SERVER_ERROR);
            return airports;
        }catch(error){
            console.log("Something went wrong in airport service layer");
            throw error;
        }
    }

    async getAirportById(id){
        try{
            const airport = await this.airportRepo.getAirportById(id);
            if(!airport)throw new AppError("Airport not found", StatusCodes.NOT_FOUND);
            return airport;
        }catch(error){
            console.log("Something went wrong in airport service layer");
            throw error;
        }
    }

    async getAirportByFilter(filter){
        try{
            const airport = await this.airportRepo.getAirportByFilter(filter);
            if(!airport)throw new AppError("Airport not found", StatusCodes.NOT_FOUND);
            return airport;
        }catch(error){
            console.log("Something went wrong in airport service layer");
            throw error;
        }
    }

    async updateAirportById(id,data){
        try{
            const airport = await this.airportRepo.updateAirportById(id,data);
            if(!airport)throw new AppError("Airport not found", StatusCodes.NOT_FOUND);
            return airport;
        }catch(error){
            console.log("Something went wrong in airport service layer");
            throw error;
        }
    }

    async destroyAirportById(id){
        try{
            const airport = await this.airportRepo.destroyAirportById(id);
            if(!airport)throw new AppError("Airport not found", StatusCodes.NOT_FOUND);
            return airport;
        }catch(error){
            console.log("Something went wrong in airport service layer");
            throw error;
        }
    }
};

module.exports = AirportService;
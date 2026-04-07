const {AirplaneRepository} = require('./../repository/index.js');
const AppError = require('./../utils/app-error.js')
const { StatusCodes } = require('http-status-codes');

class AirplaneService{
    constructor(){
        this.airplaneRepo = new AirplaneRepository();
    }

    async createairplane(data){
        try{
            const airplane = await this.airplaneRepo.createairplane(data);
            if(!airplane)throw new AppError("Airplane not created", StatusCodes.INTERNAL_SERVER_ERROR);
            return airplane;
        }catch(error){
            console.log("Something went wrong in airplane service layer");
            throw error;
        }
    }

    async createMultipleairplanes(data){
        try{
            const airplanes = await this.airplaneRepo.createMultipleairplanes(data);
            if(!airplanes)throw new AppError("Airplanes not created", StatusCodes.INTERNAL_SERVER_ERROR);
            return airplanes;
        }catch(error){
            console.log("Something went wrong in airplane service layer");
            throw error;
        }
    }

    async getairplaneById(id){
        try{
            const airplane = await this.airplaneRepo.getairplaneById(id);
            if(!airplane)throw new AppError("Airplane not found", StatusCodes.NOT_FOUND);
            return airplane;
        }catch(error){
            console.log("Something went wrong in airplane service layer");
            throw error;
        }
    }

    async getairplaneByFilter(filter){
        try{
            const airplane = await this.airplaneRepo.getairplaneByFilter(filter);
            if(airplane.length === 0) throw new AppError("No airplanes match the given criteria", StatusCodes.NOT_FOUND);
            return airplane;
        }catch(error){
            console.log("Something went wrong in airplane service layer");
            throw error;
        }
    }

    async updateairplaneById(id,data){
        try{
            const airplane = await this.airplaneRepo.updateairplaneById(id,data);
            if(!airplane)throw new AppError("Airplane not found", StatusCodes.NOT_FOUND);
            return airplane;
        }catch(error){
            console.log("Something went wrong in airplane service layer");
            throw error;
        }
    }

    async destroyairplaneById(id){
        try{
            const airplane = await this.airplaneRepo.destroyairplaneById(id);
            if(!airplane)throw new AppError("Airplane not found", StatusCodes.NOT_FOUND);
            return airplane;
        }catch(error){
            console.log("Something went wrong in airplane service layer");
            throw error;
        }
    }
};

module.exports = AirplaneService;


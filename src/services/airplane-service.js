const {AirplaneRepository} = require('./../repository/index.js');

class AirplaneService{
    constructor(){
        this.airplaneRepo = new AirplaneRepository();
    }

    async createairplane(data){
        try{
            const airplane = await this.airplaneRepo.createairplane(data);
            return airplane;
        }catch(error){
            console.log("Something went wrong in airplane service layer");
            throw error;
        }
    }

    async createMultipleairplanes(data){
        try{
            const airplanes = await this.airplaneRepo.createMultipleairplanes(data);
            return airplanes;
        }catch(error){
            console.log("Something went wrong in airplane service layer");
            throw error;
        }
    }

    async getairplaneById(id){
        try{
            const airplane = await this.airplaneRepo.getairplaneById(id);
            return airplane;
        }catch(error){
            console.log("Something went wrong in airplane service layer");
            throw error;
        }
    }

    async getairplaneByFilter(filter){
        try{
            const airplane = await this.airplaneRepo.getairplaneByFilter(filter);
            return airplane;
        }catch(error){
            console.log("Something went wrong in airplane service layer");
            throw error;
        }
    }

    async updateairplaneById(id,data){
        try{
            const airplane = await this.airplaneRepo.updateairplaneById(id,data);
            return airplane;
        }catch(error){
            console.log("Something went wrong in airplane service layer");
            throw error;
        }
    }

    async destroyairplaneById(id){
        try{
            const airplane = await this.airplaneRepo.destroyairplaneById(id);
            return airplane;
        }catch(error){
            console.log("Something went wrong in airplane service layer");
            throw error;
        }
    }
};

module.exports = AirplaneService;


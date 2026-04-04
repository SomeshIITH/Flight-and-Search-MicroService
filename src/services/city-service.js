const {CityRepository} = require('./../repository/index.js');

class CityService{
    constructor(){
        this.cityRepo = new CityRepository();
    }

    async createCity(data){
        try{
            const city = await this.cityRepo.createCity(data);
            return city;
        }catch(error){
            console.log("Something went wrong in city service layer");
            throw error;
        }
    }

    async createMultipleCities(data){
        try{
            const cities = await this.cityRepo.createMultipleCities(data);
            return cities;
        }catch(error){
            console.log("Something went wrong in city service layer");
            throw error;
        }
    }

    async getCityById(id){
        try{
            const city = await this.cityRepo.getCityById(id);
            return city;
        }catch(error){
            console.log("Something went wrong in city service layer");
            throw error;
        }
    }

    async getCityByFilter(filter){
        try{
            const city = await this.cityRepo.getCityByFilter(filter);
            return city;
        }catch(error){
            console.log("Something went wrong in city service layer");
            throw error;
        }
    }

    async updateCityById(id,data){
        try{
            const city = await this.cityRepo.updateCityById(id,data);
            return city;
        }catch(error){
            console.log("Something went wrong in city service layer");
            throw error;
        }
    }

    async destroyCityById(id){
        try{
            const city = await this.cityRepo.destroyCityById(id);
            return city;
        }catch(error){
            console.log("Something went wrong in city service layer");
            throw error;
        }
    }

    async getAllAirportsOfCity(id){
        try{
            const airports = await this.cityRepo.getAllAirportsOfCity(id);
            return airports;
        }catch(error){
            console.log("Something went wrong in city service layer");
            throw error;
        }
    }
};

module.exports = CityService;
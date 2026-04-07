const {CityRepository} = require('./../repository/index.js');
const AppError = require('./../utils/app-error.js')
const { StatusCodes } = require('http-status-codes');

class CityService{
    constructor(){
        this.cityRepo = new CityRepository();
    }

    async createCity(data){
        try{
            const city = await this.cityRepo.createCity(data);
            if(!city)throw new AppError("City not created", StatusCodes.INTERNAL_SERVER_ERROR);
            return city;
        }catch(error){
            console.log("Something went wrong in city service layer");
            throw error;
        }
    }

    async createMultipleCities(data){
        try{
            const cities = await this.cityRepo.createMultipleCities(data);
            if(!cities)throw new AppError("Cities not created", StatusCodes.INTERNAL_SERVER_ERROR);
            return cities;
        }catch(error){
            console.log("Something went wrong in city service layer");
            throw error;
        }
    }

    async getCityById(id){
        try{
            const city = await this.cityRepo.getCityById(id);
            if(!city)throw new AppError("City not found", StatusCodes.NOT_FOUND);
            return city;
        }catch(error){
            console.log("Something went wrong in city service layer");
            throw error;
        }
    }

    async getCityByFilter(filter){
        try{
            const city = await this.cityRepo.getCityByFilter(filter);
            if(!city)throw new AppError("City not found", StatusCodes.NOT_FOUND);
            return city;
        }catch(error){
            console.log("Something went wrong in city service layer");
            throw error;
        }
    }

    async updateCityById(id,data){
        try{
            const city = await this.cityRepo.updateCityById(id,data);
            if(!city)throw new AppError("City not found", StatusCodes.NOT_FOUND);
            return city;
        }catch(error){
            console.log("Something went wrong in city service layer");
            throw error;
        }
    }

    async destroyCityById(id){
        try{
            const city = await this.cityRepo.destroyCityById(id);
            if(!city)throw new AppError("City not found", StatusCodes.NOT_FOUND);
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
    async addAirportToCity(cityid,airportid){
        try{
            const airports = await this.cityRepo.addAirportToCity(cityid,airportid);
            if(!airports)throw new AppError(`Not able to create airport ${airportid} to city ${cityid}`, StatusCodes.INTERNAL_SERVER_ERROR);
            return airports;
        }catch(error){
            console.log("Something went wrong in city service layer");
            throw error;
        }
    }

    async removeAirportFromCity(cityid,airportid){
        try{
            const airports = await this.cityRepo.removeAirportFromCity(cityid,airportid);
            if(!airports)throw new AppError(`Not able to remove airport ${airportid} from city ${cityid}`, StatusCodes.INTERNAL_SERVER_ERROR);
            return airports;
        }catch(error){
            console.log("Something went wrong in city service layer");
            throw error;
        }
    }
    async getCityWithMostAirports(){
        try{
            const airports = await this.cityRepo.getCityWithMostAirports();
            if(!airports)throw new AppError("No airport found", StatusCodes.NOT_FOUND);
            return airports;
        }catch(error){
            console.log("Something went wrong in city service layer");
            throw error;
        }
    }

};

module.exports = CityService;
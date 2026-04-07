const {Airport} = require('./../models/index.js');
const {Op} = require('sequelize'); //for operations like greater than, less than, like , strartswith etc
const AppError = require('./../utils/app-error.js')
const { StatusCodes } = require('http-status-codes');

class AirportRepository{

    async createAirport(data){
        try{
            // const Airport = await Airport.create({name : name});
            if(!data.name || !data.address || !data.cityId){
                throw new Error("All fields are required");
            }
            const payload = {name : data.name , address : data.address , cityId : data.cityId};
            const airport = await Airport.create(payload); 
            return airport;
        }catch(error){
            console.log("Something went wrong in Airport repository layer");
            throw error;
        }
    }

    async createMultipleAirports(AirportList){
        try{
            //data validationf
            const airports = await Airport.bulkCreate(AirportList);
            return airports;
        }catch(error){
            console.log("Something went wrong in Airport repository layer");
            throw error;
        }
    }

    async getAirportById(id){
        try{
            const airport = await Airport.findByPk(id);
            return airport;
        }catch(error){
            console.log("Something went wrong in Airport repository layer");
            throw error;
        }
    }

    async getAirportByFilter(filter){
        try{
            const where = {};
            if (filter.name) {
                where.name = { [Op.startsWith]: filter.name };
            }
            if (filter.cityId) {
                where.cityId = filter.cityId;
            }
            if (filter.id) {
                where.id = filter.id;
            }
            return await Airport.findAll({ where });
        }catch(error){
            console.log("Something went wrong in Airport repository layer");
            throw error;
        }
    }

    async updateAirportById(id,data){
        try{
            const airport = await Airport.findByPk(id);
            if(!airport) throw new AppError("Airport not found", StatusCodes.NOT_FOUND);
            if(data.name)airport.name = data.name;
            if(data.address)airport.address = data.address;
            if(data.cityId)airport.cityId = data.cityId;
            await airport.save();
            return airport;
        }catch(error){
            console.log("Something went wrong in Airport repository layer");
            throw error;
        }
    }

    async destroyAirportById(id){
        try{
            const airport = await Airport.destroy({
                where : {
                    id : id
                }
            })
            return airport;
        }catch(error){
            console.log("Something went wrong in Airport repository layer");
            throw error;
        }
    }

};

module.exports = AirportRepository;
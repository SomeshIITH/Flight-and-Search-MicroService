const {Airplane} = require('./../models/index.js');
const {Op} = require('sequelize'); //for operations like greater than, less than, like , strartswith etc
const AppError = require('./../utils/app-error.js')
const { StatusCodes } = require('http-status-codes');

class AirplaneRepository{

    async createairplane(data){
        try{

            if(!data.modelNumber){
                throw new AppError("Model Number is required to create an airplane", StatusCodes.BAD_REQUEST);
            }
            let payload = {modelNumber : data.modelNumber};
            if(data.capacity)payload = {...payload, capacity : data.capacity};
            const airplane = await Airplane.create(payload); 
            return airplane;
        }catch(error){
            console.log("Something went wrong in airplane repository layer");
            throw error;
        }
    }

    async createMultipleairplanes(airplaneList){
        try{
            //data validation
            const airplanes = await Airplane.bulkCreate(airplaneList);
            return airplanes;
        }catch(error){
            console.log("Something went wrong in airplane repository layer");
            throw error;
        }
    }

    async getairplaneById(id,options = {}){
        try{// We pass the entire options object (which contains transaction and lock)
            const airplane = await Airplane.findByPk(id,options);
            return airplane;
        }catch(error){
            console.log("Something went wrong in airplane repository layer");
            throw error;
        }
    }

    async getairplaneByFilter(filter){
        try{
            const where = {};
            if (filter.modelNumber) {
                where.modelNumber = { [Op.startsWith]: filter.modelNumber };
            }
            if (filter.id) {
                where.id = filter.id;
            }
            // If 'where' is empty, it returns all. If not, it combines them.
            return await Airplane.findAll({ where });
        }catch(error){
            console.log("Something went wrong in airplane repository layer");
            throw error;
        }
    }

    async updateairplaneById(id,data){
        try{
            const airplane = await Airplane.findByPk(id);
            if(!airplane)throw new AppError("Airplane not found", StatusCodes.NOT_FOUND);
            if(data.modelNumber)airplane.modelNumber = data.modelNumber;
            if(data.capacity)airplane.capacity = data.capacity;
            await airplane.save();
            return airplane;
        }catch(error){
            console.log("Something went wrong in airplane repository layer");
            throw error;
        }
    }

    async destroyairplaneById(id){
        try{
            const airplane = await Airplane.destroy({
                where : {
                    id : id
                }
            })
            return airplane;
        }catch(error){
            console.log("Something went wrong in airplane repository layer");
            throw error;
        }
    }

};

module.exports = AirplaneRepository;
const {Airplane} = require('./../models/index.js');
const {Op} = require('sequelize'); //for operations like greater than, less than, like , strartswith etc

class AirplaneRepository{

    async createairplane(data){
        try{

            if(!data.modelNumber){
                throw new Error("All fields are required");
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

    async getairplaneById(id){
        try{
            const airplane = await Airplane.findByPk(id);
            return airplane;
        }catch(error){
            console.log("Something went wrong in airplane repository layer");
            throw error;
        }
    }

    async getairplaneByFilter(filter){
        try{
            if(filter.modelNumber){//find does not exist in sequelize
                const airplane = await Airplane.findAll({
                    where : {
                        modelNumber: {
                            [Op.startsWith] : filter.modelNumber  // for prefix matching , if user enter pray -> prayagraj will come
                        }
                    }
                })
                return airplane;
            }
            if(filter.id){
                const airplane = await Airplane.findAll({
                    where : {
                        id : filter.id
                    }
                })
                return airplane;
            }
            const airplanes = await Airplane.findAll();
            return airplanes;
        }catch(error){
            console.log("Something went wrong in airplane repository layer");
            throw error;
        }
    }

    async updateairplaneById(id,data){
        try{
            const airplane = await Airplane.findByPk(id);
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
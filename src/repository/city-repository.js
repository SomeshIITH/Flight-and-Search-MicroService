const {City} = require('./../models/index.js');

class cityRepository{

    async createCity({name}){
        try{
            // const city = await City.create({name : name});
            const city = await City.create({name}); // if key and value are same then we can write in this way
            return city;
        }catch(error){
            console.log("Something went wrong in city repository layer");
            throw {error};
        }
    }

    async createMultipleCities(CityList){
        try{
            const cities = await City.bulkCreate(CityList);
            return cities;
        }catch(error){
            console.log("Something went wrong in city repository layer");
            throw {error};
        }
    }

    async getCityById(id){
        try{
            const city =await City.findByPk(id);
            return city;
        }catch(error){
            console.log("Something went wrong in city repository layer");
            throw {error};
        }
    }

    async getCityByFilter(filter){
        try{
            if(filter.name){
                const city = await City.findAll({
                    where : {
                        name : filter.name
                    }
                })
                return city;
            }
            if(filter.id){
                const city = await City.findAll({
                    where : {
                        id : filter.id
                    }
                })
                return city;
            }
            const cities = await City.findAll();
            return cities;
        }catch(error){
            console.log("Something went wrong in city repository layer");
            throw {error};
        }
    }

    async updateCityById(id,data){
        try{
            const city = await City.findByPk(id);
            city.name = data.name;
            await city.save();
            return city;
        }catch(error){
            console.log("Something went wrong in city repository layer");
            throw {error};
        }
    }

    async destroyCityById(id){
        try{
            const city = await City.destroy({
                where : {
                    id : id
                }
            })
            return city;
        }catch(error){
            console.log("Something went wrong in city repository layer");
            throw {error};
        }
    }
};

module.exports = cityRepository;
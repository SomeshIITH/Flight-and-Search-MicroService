const {City, Airport} = require('./../models/index.js');
const { Op, fn, col } = require('sequelize'); //for operations like greater than, less than, like , strartswith etc

class cityRepository{

    async createCity({name}){
        try{
            // const city = await City.create({name : name});
            const city = await City.create({name}); // if key and value are same then we can write in this way
            return city;
        }catch(error){
            console.log("Something went wrong in city repository layer");
            throw error;
        }
    }

    async createMultipleCities(cityList){
        try{
            // No transaction needed here because we are telling the DB 
        // to handle conflicts row-by-row.
        const cities = await City.bulkCreate(cityList, { 
            ignoreDuplicates: true, // This tells SQL: "ON DUPLICATE KEY IGNORE"
            validate: true          // Still check for nulls/data types before sending
        });
            return cities;
        }catch(error){
            console.log("Something went wrong in city repository layer");
            throw error;
        }
    }

    async getCityById(id){
        try{
            const city = await City.findByPk(id);
            return city;
        }catch(error){
            console.log("Something went wrong in city repository layer");
            throw error;
        }
    }

    async getCityByFilter(filter){
        try{
            if(filter.name){//find does not exist in sequelize
                const city = await City.findAll({
                    where : {
                        name : {
                            [Op.startsWith] : filter.name  // for prefix matching , if user enter pray -> prayagraj will come
                        }
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
            throw error;
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
            throw error;
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
            throw error;
        }
    }

    async getAllAirportsOfCity(cityid){
        try{
            //M1 by eager loading
            // const city = await City.findByPk(cityid,{
            //     include : ["airports"] // as we have defined alias as airports in city model while defining association
            // })
            // return city;
            //M2 by magic metods
            const city = await City.findByPk(cityid);
            const airports = await city.getAirports(); // get + alias name of association
            return airports;
        }catch(error){
            console.log("Something went wrong in city repository layer");
            throw error;
        }
    }
    async addAirportToCity(cityid,airportid){
        try{
            const city = await City.findByPk(cityid);
            await city.addAirport(airportid); // add + alias name of association
            return city;
        }catch(error){
            console.log("Something went wrong in city repository layer");
            throw error;
        }
    }
    async removeAirportFromCity(cityid,airportid){
        try{
            const city = await City.findByPk(cityid);
            await city.removeAirport(airportid); // remove + alias name of association
            return city;
        }catch(error){
            console.log("Something went wrong in city repository layer");
            throw error;
        }
    }

    async getCityWithMostAirports(){
        try{
            const city = await City.findAll({
                attributes: [
                    'id',
                    'name',
                    [fn('COUNT', col('Airports.id')), 'airportCount']
                ],
                include: [{
                    model: Airport,
                    attributes: []
                }],
                group: ['City.id'],
                order: [
                    [fn('COUNT', col('Airports.id')), 'DESC'],
                    ['id', 'ASC']
                ],
                limit: 1,
                subQuery: false   // IMPORTANT FIX
            });
    
            return city;
    
        }catch(error){
            console.log("Something went wrong in city repository layer");
            throw error;
        }
    }
};

module.exports = cityRepository;
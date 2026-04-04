const {CityService} = require('./../services/index.js');
const {StatusCodes} = require('http-status-codes');

const cityService = new CityService();

const create = async (req,res) => {
    try{
        const city = await cityService.createCity(req.body);
        return res.status(StatusCodes.CREATED).json({
            data : city,
            success : true,
            message : `City ${city.name} created successfully`,
            err : {}
        })
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data : {},
            success : false,
            message : "City not created",
            err : error
        })
    }
}

const createBulk = async (req,res) => {
    try{
        const cities = await cityService.createMultipleCities(req.body);
        return res.status(StatusCodes.CREATED).json({
            data : cities,
            success : true,
            message : `Cities created successfully`,
            err : {}
        })
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data : {},
            success : false,
            message : "Cities not created",
            err : error
        })
    }
}

const get = async (req,res) => {
    try{
        const city = await cityService.getCityById(req.params.id);
        return res.status(StatusCodes.OK).json({
            data : city,
            success : true,
            message : `City fetched successfully`,
            err : {}
        })
    }catch(error){
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data : {},
            success : false,
            message : "City not fetched",
            err : error
        })
    }
}
const getAll = async (req,res) => {
    try{
        console.log("req.query ",req.query);
        const cities = await cityService.getCityByFilter(req.query);
        return res.status(StatusCodes.OK).json({
            data : cities,
            success : true,
            message : "Cities fetched successfully",
            err : {}
        })
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data : {},
            success : false,
            message : "Cities fetched failed",
            err : error
        })
    }
}
const update = async (req,res) => {
    try{
        const city = await cityService.updateCityById(req.params.id,req.body);
        return res.status(StatusCodes.OK).json({
            data : city,
            success : true,
            message : "updated successfully",
            err :{}
        })
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data : {},
            success : false,
            message : "Update failed",
            err : error
        })
    }
}

const destroy = async (req,res) => {
    try{
        const city = await cityService.destroyCityById(req.params.id);
        return res.status(StatusCodes.OK).json({
            data : city,
            success : true,
            message : "deleted successfully",
            err :{}
        })
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data : {},
            success : false,
            message : "deletion failed",
            err : error
        })
    }
}

module.exports = {create,createBulk,get,getAll,update,destroy};




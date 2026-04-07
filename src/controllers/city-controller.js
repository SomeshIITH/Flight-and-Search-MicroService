const {CityService} = require('./../services/index.js');
const {StatusCodes} = require('http-status-codes');

const cityService = new CityService();

const create = async (req,res,next) => {
    try{
        const city = await cityService.createCity(req.body);
        return res.status(StatusCodes.CREATED).json({
            data : city,
            success : true,
            message : `City ${city.name} created successfully`,
            err : {}
        })
    }catch(error){
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     data : {},
        //     success : false,
        //     message : "City not created",
        //     err : error
        // })
        next(error);
    }
}

const createBulk = async (req,res,next) => {
    try{
        const cities = await cityService.createMultipleCities(req.body.cities); //body me cities add kar rhe hai
        return res.status(StatusCodes.CREATED).json({
            data : cities,
            success : true,
            message : `Cities created successfully`,
            err : {}
        })
    }catch(error){
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     data : {},
        //     success : false,
        //     message : "Cities not created",
        //     err : error
        // })
        next(error);
    }
}

const get = async (req,res,next) => {
    try{
        const city = await cityService.getCityById(req.params.id);
        return res.status(StatusCodes.OK).json({
            data : city,
            success : true,
            message : `City fetched successfully`,
            err : {}
        })
    }catch(error){
        // return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     data : {},
        //     success : false,
        //     message : "City not fetched",
        //     err : error
        // })
        next(error);
    }
}
const getAll = async (req,res,next) => {
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
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     data : {},
        //     success : false,
        //     message : "Cities fetched failed",
        //     err : error
        // })
        next(error);
    }
}
const update = async (req,res,next) => {
    try{
        const city = await cityService.updateCityById(req.params.id,req.body);
        return res.status(StatusCodes.OK).json({
            data : city,
            success : true,
            message : "updated successfully",
            err :{}
        })
    }catch(error){
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     data : {},
        //     success : false,
        //     message : "Update failed",
        //     err : error
        // })
        next(error);
    }
}

const destroy = async (req,res,next) => {
    try{
        const city = await cityService.destroyCityById(req.params.id);
        return res.status(StatusCodes.OK).json({
            data : city,
            success : true,
            message : "deleted successfully",
            err :{}
        })
    }catch(error){
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     data : {},
        //     success : false,
        //     message : "deletion failed",
        //     err : error
        // })
        next(error);
    }
}

const getAllAirportsOfCity = async (req,res,next) => {
    try{
        const airports = await cityService.getAllAirportsOfCity(req.params.id);
        return res.status(StatusCodes.OK).json({
            data : airports,
            success : true,
            message : "Airports fetched successfully",
            err : {}
        })
    }catch(error){
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     data : {},
        //     success : false,
        //     message : "Airports fetched failed",
        //     err : error
        // })
        next(error);
    }
}

const addAirportToCity = async (req,res,next) => {
    try{
        const airports = await cityService.addAirportToCity(req.params.cityid,req.params.airportid);
        return res.status(StatusCodes.OK).json({
            data : airports,
            success : true,
            message : "Airport added to city successfully",
            err : {}
        })
    }catch(error){
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     data : {},
        //     success : false,
        //     message : "Airport added to city failed",
        //     err : error
        // })
        next(error);
    }
}

const removeAirportFromCity = async (req,res,next) => {
    try{
        const airports = await cityService.removeAirportFromCity(req.params.cityid,req.params.airportid);
        return res.status(StatusCodes.OK).json({
            data : airports,
            success : true,
            message : "Airport removed from city successfully",
            err : {}
        })
    }catch(error){
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     data : {},
        //     success : false,
        //     message : "Airport removed from city failed",
        //     err : error
        // })
        next(error);
    }
}

const getCityWithMostAirports = async (req,res,next) => {
    try{
        const city = await cityService.getCityWithMostAirports();
        return res.status(StatusCodes.OK).json({
            data : city,
            success : true,
            message : "City with most airports fetched successfully",
            err : {}
        })
    }catch(error){
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     data : {},
        //     success : false,
        //     message : "City with most airports fetched failed",
        //     err : error
        // })
        next(error);
    }
}

module.exports = {create,createBulk,get,getAll,update,destroy,getAllAirportsOfCity
    ,addAirportToCity,removeAirportFromCity,getCityWithMostAirports
};




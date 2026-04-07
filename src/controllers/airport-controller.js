const {AirportService} = require('./../services/index.js');
const {StatusCodes} = require('http-status-codes');

const airportService = new AirportService();

const create = async (req,res,next) => {
    try{
        const airport = await airportService.createAirport(req.body);
        return res.status(StatusCodes.CREATED).json({
            data : airport,
            success : true,
            message : `airport ${airport.name} created successfully`,
            err : {}
        })
    }catch(error){
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     data : {},
        //     success : false,
        //     message : "airport not created",
        //     err : error
        // })
        next(error);
    }
}

const createBulk = async (req,res,next) => {
    try{
        const airports = await airportService.createMultipleAirports(req.body.airports); //body me cities add kar rhe hai
        return res.status(StatusCodes.CREATED).json({
            data : airports,
            success : true,
            message : `airport created successfully`,
            err : {}
        })
    }catch(error){
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     data : {},
        //     success : false,
        //     message : "airport not created",
        //     err : error
        // })
        next(error);
    }
}

const get = async (req,res,next) => {
    try{
        const airport = await airportService.getAirportById(req.params.id);
        return res.status(StatusCodes.OK).json({
            data : airport,
            success : true,
            message : `airport fetched successfully`,
            err : {}
        })
    }catch(error){
        // return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     data : {},
        //     success : false,
        //     message : "airport not fetched",
        //     err : error
        // })
        next(error);
    }
}
const getAll = async (req,res,next) => {
    try{
        // console.log("req.query ",req.query);
        const airports = await airportService.getAirportByFilter(req.query);
        return res.status(StatusCodes.OK).json({
            data : airports,
            success : true,
            message : "airport fetched successfully",
            err : {}
        })
    }catch(error){
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     data : {},
        //     success : false,
        //     message : "airport fetched failed",
        //     err : error
        // })
        next(error);
    }
}
const update = async (req,res,next) => {
    try{
        const airport = await airportService.updateAirportById(req.params.id,req.body);
        return res.status(StatusCodes.OK).json({
            data : airport,
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
        const airport = await airportService.destroyAirportById(req.params.id);
        return res.status(StatusCodes.OK).json({
            data : airport,
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

module.exports = {create,createBulk,get,getAll,update,destroy};




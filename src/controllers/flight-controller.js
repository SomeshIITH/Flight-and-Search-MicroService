const {FlightService} = require('./../services/index.js');
const {StatusCodes} = require('http-status-codes');

const flightService = new FlightService();

const create = async (req,res,next) => {
    try{
        const flight = await flightService.createflight(req.body);
        return res.status(StatusCodes.CREATED).json({
            data : flight,
            success : true,
            message : `flight ${flight.name} created successfully`,
            err : {}
        })
    }catch(error){
        // console.log(error);
        next(error);
    }
}

const createBulk = async (req,res,next) => {
    try{
        const flights = await flightService.createMultipleflights(req.body.flights); 
        return res.status(StatusCodes.CREATED).json({
            data : flights,
            success : true,
            message : `flight created successfully`,
            err : {}
        })
    }catch(error){
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     data : {},
        //     success : false,
        //     message : "flight not created",
        //     err : error
        // })
        next(error);
    }
}

const get = async (req,res,next) => {
    try{
        const flight = await flightService.getflightById(req.params.id);
        return res.status(StatusCodes.OK).json({
            data : flight,
            success : true,
            message : `flight fetched successfully`,
            err : {}
        })
    }catch(error){
        // return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     data : {},
        //     success : false,
        //     message : "flight not fetched",
        //     err : error
        // })
        next(error);
    }
}
const getAll = async (req,res,next) => {
    try{
        // req.query contains our filters + limit/offset
        const flights = await flightService.getflightByFilter(req.query);
        return res.status(StatusCodes.OK).json({
            data: flights.rows,      // The actual flights
            total: flights.count,    // Total matches in DB (for frontend)
            success : true,
            message : "flight fetched successfully",
            err : {}
        })
        //By returning the total, i allow the frontend to build a pagination bar (e.g., "Page 1 of 5"). Without the count, the frontend wouldn't know when to stop showing the "Next" button.
    }catch(error){
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     data : {},
        //     success : false,
        //     message : "flight fetched failed",
        //     err : error
        // })
        next(error);
    }
}
const update = async (req,res,next) => {
    try{
        const flight = await flightService.updateflightById(req.params.id,req.body);
        return res.status(StatusCodes.OK).json({
            data : flight,
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
        const flight = await flightService.destroyflightById(req.params.id);
        return res.status(StatusCodes.OK).json({
            data : flight,
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




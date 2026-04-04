const {AirplaneService} = require('./../services/index.js');
const {StatusCodes} = require('http-status-codes');

const airplaneService = new AirplaneService();

const create = async (req,res) => {
    try{
        const airplane = await airplaneService.createairplane(req.body);
        return res.status(StatusCodes.CREATED).json({
            data : airplane,
            success : true,
            message : `airplane ${airplane.name} created successfully`,
            err : {}
        })
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data : {},
            success : false,
            message : "airplane not created",
            err : error
        })
    }
}

const createBulk = async (req,res) => {
    try{
        const airplanes = await airplaneService.createMultipleairplanes(req.body.airplanes); 
        return res.status(StatusCodes.CREATED).json({
            data : airplanes,
            success : true,
            message : `airplane created successfully`,
            err : {}
        })
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data : {},
            success : false,
            message : "airplane not created",
            err : error
        })
    }
}

const get = async (req,res) => {
    try{
        const airplane = await airplaneService.getairplaneById(req.params.id);
        return res.status(StatusCodes.OK).json({
            data : airplane,
            success : true,
            message : `airplane fetched successfully`,
            err : {}
        })
    }catch(error){
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data : {},
            success : false,
            message : "airplane not fetched",
            err : error
        })
    }
}
const getAll = async (req,res) => {
    try{
        // console.log("req.query ",req.query);
        const airplanes = await airplaneService.getairplaneByFilter(req.query);
        return res.status(StatusCodes.OK).json({
            data : airplanes,
            success : true,
            message : "airplane fetched successfully",
            err : {}
        })
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data : {},
            success : false,
            message : "airplane fetched failed",
            err : error
        })
    }
}
const update = async (req,res) => {
    try{
        const airplane = await airplaneService.updateairplaneById(req.params.id,req.body);
        return res.status(StatusCodes.OK).json({
            data : airplane,
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
        const airplane = await airplaneService.destroyairplaneById(req.params.id);
        return res.status(StatusCodes.OK).json({
            data : airplane,
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




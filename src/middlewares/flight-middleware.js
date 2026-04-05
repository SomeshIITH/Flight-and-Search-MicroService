const validateCreateFlight = (req,res,next) => {
    if(!req.body.flightNumber || 
    !req.body.airplaneId ||
    !req.body.departureAirportId ||
    !req.body.arrivalAirportId ||
    !req.body.arrivalTime ||
    !req.body.departureTime ||
    !req.body.price){
        return res.status(StatusCodes.BAD_REQUEST).json({
            data : {},
            success : false,
            message : "All fields are required",
            err : { "message" : "All fields are required" }
        })
    }
    next();
}

module.exports = {
    validateCreateFlight
}
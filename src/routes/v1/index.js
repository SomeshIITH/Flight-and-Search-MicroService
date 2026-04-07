const express = require('express');
const router = express.Router();

const {CityController,AirportController,AirplaneController,FlightController} = require('./../../controllers/index.js');
const {FlightMiddleware} = require('./../../middlewares/index.js');
const validate = require('./../../middlewares/validate-request.js');
const {flightSchema,airportSchema,airplaneSchema,citySchema} = require('./../../utils/validators/index.js');


//City Routes
// router.post('/city',CityController.create);
router.post('/city',validate(citySchema),CityController.create);
router.post('/cities',CityController.createBulk);
//if we not put this route before /city/:id then it will consider with-most-airports as id and will not work
router.get('/city/with-most-airports',CityController.getCityWithMostAirports);
/*
 {
    "cities" : [
        {"name" : "haridwar"},
        {"name" : "nasik" }
    ]
}
 */
router.get('/city/:id',CityController.get);
router.get('/city',CityController.getAll);
router.patch('/city/:id',CityController.update);
router.delete('/city/:id',CityController.destroy);

router.get('/city/:id/Airport',CityController.getAllAirportsOfCity);
router.post('/city/:cityid/Airport/:airportid',CityController.addAirportToCity);
router.delete('/city/:cityid/Airport/:airportid',CityController.removeAirportFromCity);



//Airport Routes
// router.post('/airport',AirportController.create);
router.post('/airport',validate(airportSchema),AirportController.create);
router.post('/airports',AirportController.createBulk);
router.get('/airport/:id',AirportController.get);
router.get('/airport',AirportController.getAll);
router.patch('/airport/:id',AirportController.update);
router.delete('/airport/:id',AirportController.destroy);

//Airplane Routes
// router.post('/airplane',AirplaneController.create);
router.post('/airplane',validate(airplaneSchema),AirplaneController.create);
router.post('/airplanes',AirplaneController.createBulk);
router.get('/airplane/:id',AirplaneController.get);
router.get('/airplane',AirplaneController.getAll);
router.patch('/airplane/:id',AirplaneController.update);
router.delete('/airplane/:id',AirplaneController.destroy);

//Flights Routes
// router.post('/flight',FlightMiddleware.validateCreateFlight,FlightController.create);
router.post('/flight',validate(flightSchema),FlightController.create);
router.post('/flights',FlightController.createBulk);
router.get('/flight/:id',FlightController.get);
router.get('/flight',FlightController.getAll);
router.patch('/flight/:id',FlightController.update);
router.delete('/flight/:id',FlightController.destroy);


// {
//     "flights" : [
//         {
//             "flightNumber": "XtoYY1",
//             "airplaneId": 2,
//             "departureAirportId": 5,
//             "arrivalAirportId": 6,
//             "arrivalTime": "2025-01-11T17:45:00.000Z",
//             "departureTime": "2025-01-11T14:30:00.000Z",
//             "price": 6600,
//             "boardingGate": "T2"
//         },
//         {
//             "flightNumber": "XtoYY2",
//             "airplaneId": 4,
//             "departureAirportId": 5,
//             "arrivalAirportId": 6,
//             "arrivalTime": "2025-01-13T17:45:00.000Z",
//             "departureTime": "2025-01-13T12:30:00.000Z",
//             "price": 9600,
//             "boardingGate": "T3"
//         },
//         {
//             "flightNumber": "XtoYY3",
//             "airplaneId": 5,
//             "departureAirportId": 5,
//             "arrivalAirportId": 6,
//             "arrivalTime": "2025-01-16T17:45:00.000Z",
//             "departureTime": "2025-01-15T14:30:00.000Z",
//             "price": 8600,
//             "boardingGate": "T8"
//         }
//     ]
// }

module.exports = router




const express = require('express');
const router = express.Router();

const {CityController,AirportController,AirplaneController,FlightController} = require('./../../controllers/index.js');
const {FlightMiddleware} = require('./../../middlewares/index.js');
const validate = require('./../../middlewares/validate-request.js');
const {flightSchema,airportSchema,airplaneSchema,citySchema} = require('./../../utils/validators/index.js');
const bulkCitySchema = z.object({cities: z.array(citySchema)});


// --- City Routes ---
router.post('/cities', validate(citySchema), CityController.create); 
router.get('/cities/with-most-airports', CityController.getCityWithMostAirports);
router.get('/cities/:id', CityController.get);
router.get('/cities', CityController.getAll);
router.patch('/cities/:id', CityController.update);
router.delete('/cities/:id', CityController.destroy);

// City-Airport Sub-resources
router.get('/cities/:id/airports', CityController.getAllAirportsOfCity);
router.post('/cities/:cityid/airports/:airportid', CityController.addAirportToCity);
router.delete('/cities/:cityid/airports/:airportid', CityController.removeAirportFromCity);

// --- Airport Routes ---
router.post('/airports', validate(airportSchema), AirportController.create);
router.get('/airports/:id', AirportController.get);
router.get('/airports', AirportController.getAll);
router.patch('/airports/:id', AirportController.update);
router.delete('/airports/:id', AirportController.destroy);

// --- Airplane Routes ---
router.post('/airplanes', validate(airplaneSchema), AirplaneController.create);
router.get('/airplanes/:id', AirplaneController.get);
router.get('/airplanes', AirplaneController.getAll);

// --- Flight Routes ---
router.post('/flights', validate(flightSchema), FlightController.create);
router.get('/flights/:id', FlightController.get);
router.get('/flights', FlightController.getAll);
router.patch('/flights/:id', FlightController.update);

module.exports = router;


//if we not put this route before /city/:id then it will consider with-most-airports as id and will not work
// router.post('/cities',validate(bulkCitySchema),CityController.createBulk);
/*
 {
    "cities" : [
        {"name" : "haridwar"},
        {"name" : "nasik" }
    ]
}
 */

// router.post('/airports',AirportController.createBulk);

//Airplane Routes
// router.post('/airplanes',AirplaneController.createBulk);

//Flights Routes
// router.post('/flights',FlightController.createBulk);
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




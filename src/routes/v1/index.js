const express = require('express');
const router = express.Router();

const {CityController,AirportController} = require('./../../controllers/index.js');

//City Routes
router.post('/city',CityController.create);
router.post('/cities',CityController.createBulk);
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

router.get('/city/:id/Airports',CityController.getAllAirportsOfCity);

//Airport Routes
router.post('/airport',AirportController.create);
router.post('/airports',AirportController.createBulk);
router.get('/airport/:id',AirportController.get);
router.get('/airport',AirportController.getAll);
router.patch('/airport/:id',AirportController.update);
router.delete('/airport/:id',AirportController.destroy);

module.exports = router




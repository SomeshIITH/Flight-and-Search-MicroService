const express = require('express');
const router = express.Router();

const {CityController,AirportController} = require('./../../controllers/index.js');

//City Routes
router.post('/city',CityController.create);
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
router.post('/airport',AirportController.create);
router.post('/airports',AirportController.createBulk);
router.get('/airport/:id',AirportController.get);
router.get('/airport',AirportController.getAll);
router.patch('/airport/:id',AirportController.update);
router.delete('/airport/:id',AirportController.destroy);

module.exports = router




# FLIGHTANDSEARCHSERVICE

### Start project
- npm init

- npm i express nodemon body-parser dotenv sequelize sequelize-cli mysql2

- make src and test folder , folder inside them , make server and to run either use npx nodemon index.js or do changes in `package.json` and put `start : npx nodemon src/index`  and run  `npm start`   

- In Node.js, every file is treated as a module , so do module.exports = {} for exporting

-setup server , then setup sequelize by `npx sequelize init` then `npx sequelize db:create`

-   DB Design
    - City --> name, (id, created_at, updated_at) are default created by sequelize
    - Airport --> airportname ,address ,cityId ,(id, createdAt updatedAt) 
    - Airplane -->modelNumber, capacity, (id, createdAt updatedAt) 
    - Flight    -->flightNumber,airplaneId,departureAirportId,arrivalAirportId,arrivalTime,departureTime,price,boardingGate,totalSeats ,(id, createdAt updatedAt) 

- create Cities table by (models convention name should be singular City but table name must be plural - Cities) 
    `npx sequelize model:generate --name City --attributes cityname:String`     --create model and migration
    - A model is a JavaScript class that represents a database table. Think of a model as:    “A blueprint for a table in the database”
    - A migration is a file that describes changes to the database structure. It is Script to create/modify/drop tables Think of a migration as:   “Version control for your database”
        - Running migrations creates the actual table in the database `npx sequelize db:migrate` .This executes the up function → creates the Cities table , and help us to do incremental changes.
        - If you want to undo it: `npx sequelize db:migrate:undo`. This runs the down function → drops the table.

- create city-repository.js -> city-service.js -> city-controllers.js and there general index.js for export

- make routers, works in version and server  and handle /api/v1/city

- create Airports table by (go to src and execute) `npx sequelize model:generate --name Airport --attributes airportname:String,address:String,cityId:integer`.Do associations in migrate and make relation of foreign key in City and Airport Model then commit them by `npx sequelize db:migrate`

- now make seeds by `npx sequelize seed:generate --name add-airports` , make dummy data in seeders/  and then seed all by `npx sequelize db:seed:all`

- sync the db (sync once as it is heavy operation) , Sequelize auto-generated method to get associated airports for the city 

- Homework , make 2 more api in controllers.js and api for Airports

- create Airplanes table by (go to src) `npx sequelize model:generate --name Airplane --attributes modelNumber:String,capacity:integer`  apply constraint and do 'npx sequelize db:migrate' make some seed data `npx sequelize seed:generate --name add-airplane`  then seed all them by `npx sequelize db:seed:all`

- create Flights table by (go to src) `npx sequelize model:generate --name Flight --attributes flightNumber:String,aiplaneId:integer,departureAirportId:integer,arrivalAirportId:integer,arrivalTime:Date,departureTime:Date,price:integer,boardingGate:String,totalSeats:integer`  apply constraint and do 'npx sequelize db:migrate' make some seed data `npx sequelize seed:generate --name add-flights`  then seed all them by `npx sequelize db:seed:all`

- can make crud-repository for general to avoid repetition of code

- make flights then setup its API too, make middlewares whom make function is to validate request then , setup error codes ENUM for general status Handling.

- Now built the AuthService in AuthService folder
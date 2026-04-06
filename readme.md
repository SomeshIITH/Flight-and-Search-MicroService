# Flight and Search Microservice

## Functional Requirements
- A user should be able to search for flights from one place to another
- User should be able to mention source, destination details, date of journey, class of flights, select no of seats they want to book.
- Sort data based on cheaper and minimum time.
- We need to support pagination so that we can list chunk of flights at same time.
- Filtering based on Price, Duration time.
- **[V2]** User should be able to search for return flights and multi-city flights. 
- A user should be able to search flight with authentication but for booking they need to signup.
- User should be able to download boarding pass. 
- Notification via email for completing online check in before 3 hours of departure.
- User should be able to review flights only if they have booked.
- Should be notified if some delay happens.
- User should be able to book extra luggage.
- **[V2]** prepare seat selection

## Non Functional Requirements
- We can expect that there are more flight searches than flight bookings.
- System needs to be accurate in terms of booking. 
- In one day we can expect 2000 bookings.
- Concurrency should be handled so RDBMS is good option.

## Back of the Envelope Estimation
- Storage, Load, Resource Estimation

---

## Search and Flights Service
- Create, Delete, Update Flights
- Search based on multiple filtration criteria and pagination

### Repository Initialization
```bash
echo "# Flight-and-Search-MicroService" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin [https://github.com/SomeshIITH/Flight-and-Search-MicroService.git](https://github.com/SomeshIITH/Flight-and-Search-MicroService.git)
git push -u origin main


## Project Setup
- clone project in your local
- execute `npm install` on same path 
- create `.env` file at root directory with 
    - `PORT = 3000`

- inside `src/config` folder create new file `config.json` and then add:
```json
{
    "development": {
    "username": "root",
    "password": "<YOUR DB PASSWORD>",
    "database": "Flight-and-Search-MicroService-DB",
    "host": "127.0.0.1",
    "dialect": "mysql"
    }
}

- then go to src folder and run `npx sequelize db:create` then `npx sequelize db:migrate`

---

## Technical Implementation & Notes

### MySQL and Sequelize CLI Configuration
1. `mysql -u root -p` and then enter my password (IN TERMINAL)
2. to remove folder `rm -rf folder name` and then git clone from github
3. if u have package.json, use `npm install` to download it packages
4. do `npx sequelize init` in Main folder not in src, it will generate seeders, migrations, models (remove your models), config; put them in our src 
5. in config.json make your Flight-and-Search-MicroService-DB and password and then go to src (in same level) `npx sequelize db:create`
6. come out of src and hide config.json 
7. **Do DB designing, Airplane, Flights, City, Airport Model:**
    - Convention is Model class are Singular and Database table names are plural.
    - So go to src because model folder is in that level:
    - `npx sequelize model:generate --name City --attributes name:String`
    - `npx sequelize model:generate --name Airport --attributes name:String,address:String,cityId:integer`
    - `npx sequelize model:generate --name Airplane --attributes modelNumber:String,capacity:integer`
    - `npx sequelize seed:generate --name add-airplanes`
    - `npx sequelize model:generate --name Flight --attributes flightNumber:String,airplaneId:integer,departureAirportId:integer,arrivalAirportId:integer,arrivalTime:Date,departureTime:Date,price:integer,boardingGate:String,totalSeats:integer`
    - `npx sequelize model:generate --name User --attributes email:String,password:String`
    - `npx sequelize model:generate --name Role --attributes name:String`
    - `npx sequelize seed:generate --name add-roles`
    - `npx sequelize db:seed --seed seedfilename(20260405092846-add-roles.js)`

    - This will generate City model and migrations but still table is not created because it is giving second chance to do changes in schema in Model and migrations (ex-make allowNull : false) and then finally do:
    - `npx sequelize db:migrate`
    - to undo our previous migration: `npx sequelize db:migrate:undo`
    - **Database-level constraints** → Migrations
    - **JavaScript / application-level validation** → Models
    - Start Making Repository -> service -> controller -> router for modularity

    - `req.params` means url params 
    - `req.query` means query params
    - `req.body` means body params

    - Sequelize provide `[Op]` operations which is used in like, startswith, >=, <, > type of sql operations

### Associations: One to Many
- City has Many Airport: `this.hasMany(models.Airport,{ foreignKey : "cityId"});`
- Airport belongs to 1 city: `this.belongsTo(models.City,{ foreignKey : "cityId", onDelete : "CASCADE" });`
- In migration of Airport update cityId because now it is not normal column:
```javascript
cityId: {
    type: Sequelize.INTEGER,
    onDelete : "CASCADE",
    references : {
      model : "Cities",
      key : "id",  // Cities table ka id column is referenced as cityId of Airports table
      as : "cityId"
    }
}

- make allowNULL : false
- for many to many associations like User has Many role, 1 role has many users, we need through table 

---

### Database Sync & Loading Patterns
8. `db.sequelize.sync({alter : true});`
  - Compare my models with the database schema and update the DB accordingly.
  - When we define associations `City.hasMany(Airport); Airport.belongsTo(City);` BUT: If DB doesn’t have that column Or schema is outdated, then associations don’t work properly, magic methods behave weirdly.
  - So it will sync DB and model, Adds missing columns, Updates column types, Tries to align DB with models.
  - In our case it is not needed because we are handling all by migration.

  - If associated properly we can use magic methods (helper functions) make add, get, has, set logic easy instead of manually performing there join and also provide Eager Loading.

  - **Lazy Loading (On-demand fetching):** Fetch main data first, then fetch related data separately when needed.
    - Ex: `const cities = await City.findAll();` (SELECT * FROM Cities)
    - Then looping: `await city.getAirports();` (SELECT * FROM Airports WHERE cityId = X)
    - Cause problem → **N+1 Query Problem**.

  - **Eager Loading (Fetch everything together):** Fetch main + related data in one query using JOIN.
    - Ex: `const cities = await City.findAll({ include: [Airport] });`
    - SELECT * FROM Cities LEFT JOIN Airports ON Cities.id = Airports.cityId;
    - Advantage: One query, fast, scalable.

  - Use Lazy Loading when: Data is optional, You don’t always need relation, Small dataset.
  - Use Eager Loading when: Building APIs (like yours), Need relational data, Performance matters.

---

### Error Handling & Response Enumeration
9. `throw new Error("All fields are required")` or error all are objects like:
   - Key: Error is an object, but its properties are non-enumerable.
   - Error object `{ message: "All fields are required", stack: "..." }`.
   - Problem happens when in controller while sending response:
```javascript
return res.json({                     
    err: error
});

- Output is `{ "err": {} }` because Error object properties are non-enumerable, and `JSON.stringify()` only includes “enumerable” properties.
- We have to enumerate manually:
```javascript
return res.json({
    err: {
        message: error.message,
        stack: error.stack
    }
});

---

### Git, Hooks & Authentication
10. **To undo previous commit:**
    - `git add .`
    - `git commit --amend --no-edit`
    - `git push --force` (only if already pushed)
    - Avoid `--force` on shared branches.

11. **User Auth Logic:**
    - Signup: Create account / Register.
    - Login / SignIn: Access account / Enter credentials.
    - With help of hooks/triggers `[ User.beforeCreate ]` using `bcrypt.hashSync` to encrypt password and `bcrypt.genSaltSync(10)` in config.

11. **Many to Many:** For many to many association for making of through table we need to sync db. Now make isAuthenticated, isAdmin, type api, roles are only 3 so i seeded them.

12. **Notification Config:**
    - App password from google, make `EMAIL_PASS = hxvn tlnl plit vfsr`, `EMAIL_ID`.
    - Install `nodemailer`, `node-cron` for job scheduling after some time.

---

### Date & Time Handling in Requests
13. **How to send date in requests:**
    - **Case 1:** time `2026-04-06T11:50:00+05:30` (IST) sent in request.
    - `const parsedDate = new Date("2026-04-06T11:50:00+05:30");`
    - IST → UTC (11:50 IST → 06:20 UTC).
    - `utc time = parsedDate.toISOString()` ("2026-04-06T06:20:00.000Z").
    - Cron runs `const currentTime = new Date();` Current UTC = 06:30.

    - **Case 2:** time `2026-04-06T11:50:00`. Node assumes it UTC time.
    - `parsedDate.toISOString()` remains `2026-04-06T11:50:00.000Z`.
    - `2026-04-06 11:50:00` store in db.
    - IST = 11:36 AM, UTC = 06:06.

---

### RabbitMQ (AMQP) Architecture
14. **ampq -> Advanced Message Queue Protocol**, `npm i amqplib` in reminder Service.
    - You connect once to RabbitMQ (expensive), One TCP connection to RabbitMQ.
    - Then create many channels (cheap) used to send messages, receive messages, declare queues/exchanges.
    - Channels are like sessions.

    - Internet Connection = Highway
    - Channel = Lane on the highway 
    - Message = Car

```text
Your App
   |
   | (Connection)
   |
=====================================================
|                RabbitMQ Server                    |
|                                                   |
|   [ Channel 1/send email ] ---------> Exchange ---|---> Multiple Queues ---> Consumers
|   [ Channel 2/notification service] -> Exchange ---|---> Queue
|   [ Channel 3/process payment ] ----> Exchange ---|---> Queue
|                                                   |
=====================================================

- **Exchange (direct) / exchange routes message**
   - binding_key: email → Queue1
   - binding_key: sms → Queue2

- **Publishing Logic:**
```javascript
// publish
channel.publish(EXCHANGE_NAME, "email", msg);
channel.publish(EXCHANGE_NAME, "sms", msg);

- **Consuming Logic:**
```javascript
// consume
channel.assertQueue("email_queue");
channel.bindQueue("email_queue", EXCHANGE_NAME, "email");
channel.assertQueue("sms_queue");
channel.bindQueue("sms_queue", EXCHANGE_NAME, "sms");

- **Data Format:** RabbitMQ only accepts binary data: `Buffer.from(JSON.stringify(message))`.

- **Acknowledgement:**
    - ✔ **Acknowledge message:** Remove from queue (`channel.ack(msg)`).
    - ✖ **Else:** `channel.nack(msg, false, false)`. Message is discarded or goes to DLQ (Dead Letter Queue).

- **Critical Note:** Consumer has to start first else -> Producer sends -> Exchange -> No queue bound yet -> **Message LOST**.
    - Consumer starts → queue created + bound. 
    - Producer sends → works.

- **Execution Flow:**
    - **Consumer:** Always running (server-like).
    - **Producer:** Runs when needed.
    - Service A (Producer) → sends message.
    - Service B (Consumer) → listens always.
    - So from booking service we can send the payload which will be taken by reminder service whenever it is on.

---

### API Gateway & Infrastructure
15. **API Gateway:**
    - Used for routing, rate limiting, validation.
    - Acts as a reverse proxy of the server (handled by `http-proxy-middleware`).

- **Logging:** `morgan` is for logging incoming requests and performance.
const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig.js');
// const {City} = require('./models/index.js');
const apiRoutes = require('./routes/index.js');
const db = require('./models/index.js');
const morgan = require('morgan');
const globalErrorHandler = require('./middlewares/error-handler.js');

const SetupServer = async () => {
    const app = express();
    app.use(morgan('combined'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/api' , apiRoutes);

    //This MUST be after apiRoutes and before app.listen
    //When a controller calls next(error), Express stops looking for regular routes and starts searching downward for the first middleware with four arguments.
    //Express Logic: Once next() is called with an argument, Express stops looking at any more routes. It skips every other line of code in your routes.
    app.use(globalErrorHandler);

    app.listen(PORT,async () => {
        console.log(PORT);
        // console.log(City);
        console.log(`Server is running on http://localhost:${PORT}`);
        // if(process.env.SYNC_DB){
        //     db.sequelize.sync({alter : true});
        // }
    })
}

SetupServer();

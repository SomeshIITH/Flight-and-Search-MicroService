const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;


const SetupServer = async () => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.listen(PORT,()=>{
        console.log(PORT);
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}

SetupServer();

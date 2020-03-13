const express = require('express');
const authRoute = require('./routes/auth');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/posts');

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, 
    {
        useNewUrlParser : true,
        useUnifiedTopology: true
    }
);

const application = express();

//Body-parser config
application.use(bodyParser.urlencoded({extended : true}));
application.use(bodyParser.json());

//Route middleware
application.use(authRoute);
application.use(postRoutes);

const serverPort = 3000;
application.listen(serverPort);
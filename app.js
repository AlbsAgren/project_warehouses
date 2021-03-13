/**
 * Main express module
 */

// import modules
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// import routes
const api = require('./routes/api');
const login = require('./routes/login');

// use heroku port
const port = process.env.PORT || 3000;

// connect to mongodb through mongoose
mongoose.connect(/* mongodb connection goes here */, 
                    { useNewUrlParser: true, useUnifiedTopology: true });

// create express instance
const app = express();

// use session to manage user accounts
app.set('trust proxy', 1);    // required for heroku to use secure cookies
app.use(session({ 
    secret: 'enhemlighet',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({    // use mongoose as store for session
        mongooseConnection: mongoose.connection
    }),
    cookie: {
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60    // one day
    }
}));

// set cors headers
app.use(cors({ origin: true, credentials: true }));

// assign the api and login routes
app.use('/api', api);
app.use('/login', login);

// start server
app.listen(port, function() {
    console.log("Server running on port " + port);
});

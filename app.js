const express = require('express');
const session = require('express-session');
const app = express();
require('dotenv').config();
const port = 5000 || process.env.PORT;
const router = require('./routes/routes');

// using the session middleware
/**
 * This is the link to the express-session npm documentation -> https://www.npmjs.com/package/express-session
 */
app.use(session({
    resave: false, // as it is set to false, now the session will not be resaved everytime a request comes even if the session is not modified at all
    saveUninitialized: false, // won't allow saving uninitialized sessions
    secret: process.env.SESSION_KEY,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2, // 2 hours in milliseconds
        secure: false, // should not be set to true if https is not in use
    }
}));

app.use(express.urlencoded({ extended: false }));

// for all '/' routes
app.use('/', router);


app.listen(port, console.log(`server is up on http://localhost:${port}`));
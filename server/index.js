require("dotenv").config();

const express = require('express'),
    massive = require("massive"),
    session = require('express-session'),
    { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
    app = express()

app.use(express.json())

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(dbObj => {
    app.set('db', dbObj)
    console.log('<---------- Database connected ---------->')
    app.listen(SERVER_PORT, () => `<---- Server running on port => ${SERVER_PORT} ---->`)
})



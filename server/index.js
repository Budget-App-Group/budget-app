require("dotenv").config();

const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
  app = express();

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    rejectUnauthorized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    secret: SESSION_SECRET,
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
}).then((dbObj) => {
  app.set("db", dbObj);
  console.log("<---------- Database connected ---------->");
  app.listen(
    SERVER_PORT,
    () => `<---- Server running on port => ${SERVER_PORT} ---->`
  );
});

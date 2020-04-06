require("dotenv").config();

const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  kidCtrl = require("./controllers/kidController"),
  parentCtrl = require("./controllers/parentController"),
  authCtrl = require("./controllers/authController"),
  mailCtrl = require("./controllers/nodeMailerController"), // added for nodemailer contact form
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
  app = express();

app.use(express.json());

/* ------- Auth -------- */
// app.post('/auth/login', authCtrl.login)
// app.post('/auth/logout', authCtrl.logout)
// app.post('/auth/register', authCtrl.register)

/* -------- Parents -------- */

app.get("/api/budget/:user_id", parentCtrl.getBudget);
app.post("/api/admin/budget", parentCtrl.postBudget);
app.put("/api/admin/budget/:budget_id", parentCtrl.updateBudget);
app.delete("/api/admin/budget/:budget_id", parentCtrl.deleteBudget);

/* -------- Kids --------- */

app.get("/api/kid/budget:user_id", kidCtrl.getBudget);
app.post("/api/kid/purchased/:user_id", kidCtrl.postBudget);
app.put("/api/kid/purchased/:user_id", kidCtrl.updateBudget);

// Nodemailer for contact form
app.post(`/api/mailer`, mailCtrl.sendEmail); // nodemailer contact form from ContactUs.js

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
  app.listen(SERVER_PORT, () =>
    console.log(`<---- Server running on port => ${SERVER_PORT} ---->`)
  );
});

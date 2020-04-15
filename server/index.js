require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  kidCtrl = require("./controllers/kidController"),
  parentCtrl = require("./controllers/parentController"),
  authCtrl = require("./controllers/authController"),
  middleCtrl = require("./middlewareControllers/middleControllers"),
  mailCtrl = require("./controllers/nodeMailerController"), // added for nodemailer contact form
  socket = require("socket.io"),
  router = require("./router"),
  cors = require("cors"),
  app = express(),
  { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js"),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

io = socket(
  app.listen(SERVER_PORT, () =>
    console.log(`<---- Server running on port => ${SERVER_PORT} ---->`)
  )
);

app.use(express.json());

//sockets

app.use(router);
app.use(cors());
const sessionObj = session({
  resave: false,
  saveUninitialized: true,
  rejectUnauthorized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
  secret: SESSION_SECRET,
});
app.use(sessionObj);

// const server = http.createServer(app);
// const io = socket(server);
io.use((socket, next) => {
  sessionObj(socket.request, socket.request.res || {}, next);
});
io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room  ${user.room}`,
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined!`,
    });

    io.to(socket.request.session.user.room).emit("roomData", {
      room: user.room,
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log(socket.handshake, "hit")

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

/* ------- Auth -------- */
app.post("/auth/login", authCtrl.login);
app.post("/auth/logout", authCtrl.logout);
app.post("/auth/register", authCtrl.register);
app.post("/auth/kid/register/:parents_id", authCtrl.kidRegister);
app.get("/auth/check", authCtrl.getUser);

/* -------- Parents -------- */

app.get(
  "/api/budget/:parents_id",
  middleCtrl.isParents,
  parentCtrl.getAllKidBudget
);
app.get("/api/kids/:parents_id", middleCtrl.isParents, parentCtrl.getKids)
app.post("/api/admin/budget", middleCtrl.isParents, parentCtrl.postBudget);
app.put(
  "/api/admin/budget/:budget_id",
  middleCtrl.isParents,
  parentCtrl.updateBudget
);
app.delete(
  "/api/admin/budget/:budget_id",
  middleCtrl.isParents,
  parentCtrl.deleteBudget
);

/* -------- Kids --------- */

app.get("/api/kid/budget/:kid_id", middleCtrl.isLogin, kidCtrl.getBudget);
app.get("/api/kid/purchases/:kid_id", middleCtrl.isLogin, kidCtrl.getPurchases);
app.post(
  "/api/kid/purchased/:kid_id",
  middleCtrl.isLogin,
  kidCtrl.postPurchase
);
app.put(
  "/api/kid/purchased/:kid_id",
  middleCtrl.isLogin,
  kidCtrl.updateBudget
);

// Nodemailer for contact form
app.post(`/api/mailer`, mailCtrl.sendEmail); // nodemailer contact form from ContactUs.js

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
}).then((dbObj) => {
  app.set("db", dbObj);
  console.log("<---------- Database connected ---------->");
});

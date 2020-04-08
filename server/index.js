require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  kidCtrl = require("./controllers/kidController"),
  parentCtrl = require("./controllers/parentController"),
  authCtrl = require("./controllers/authController"),
  middleCtrl = require('./middlewareControllers/middleControllers'),
  mailCtrl = require("./controllers/nodeMailerController"), // added for nodemailer contact form
  socketio = require("socket.io"),
  http = require("http"),
  router = require("./router"),
  cors = require("cors"),
  app = express(),
  { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js'),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(express.json());


//sockets
app.use(router)
app.use(cors())



const server = http.createServer(app)
const io = socketio(server)

io.on("connection", (socket) => {
  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });

    if(error) return callback(error)

    socket.join(user.room)

    socket.emit('message', { user: 'admin', text: `${user.username}, welcome to the room  ${user.room}` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` })

    callback()
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.username, text: message })

    callback();
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.username} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});


/* ------- Auth -------- */
app.post('/auth/login', authCtrl.login)
app.post('/auth/logout', authCtrl.logout)
app.post('/auth/register', authCtrl.register)
app.get('/auth/check', authCtrl.getUser)

/* -------- Parents -------- */

app.get('/api/budget/:user_id', middleCtrl.isAdmin, parentCtrl.getAllKidBudget)
app.post('/api/admin/budget', middleCtrl.isAdmin, parentCtrl.postBudget)
app.put('/api/admin/budget/:budget_id', middleCtrl.isAdmin, parentCtrl.updateBudget)
app.delete('/api/admin/budget/:budget_id', middleCtrl.isAdmin, parentCtrl.deleteBudget)

/* -------- Kids --------- */

app.get('/api/kid/budget:user_id', middleCtrl.isUser, kidCtrl.getBudget)
app.post('/api/kid/purchased/:user_id', middleCtrl.isUser, kidCtrl.postPurchase)
app.put('/api/kid/pruchased/:user_id', middleCtrl.isUser, kidCtrl.updateBudget)

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
  io.listen(SERVER_PORT, () =>
    console.log(`<---- Server running on port => ${SERVER_PORT} ---->`))
  // );
});

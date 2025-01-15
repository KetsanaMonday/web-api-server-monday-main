"use strict";

var express = require('express');

var cors = require('cors');

var dotenv = require('dotenv').config();

var app = express();

var conn = require('./connect/mongodb');

var serverless = require("serverless-http");

var _require = require('uuid'),
    uuidv4 = _require.v4;

var port = process.env.PORT;

var session = require('express-session');

var RedisStore = require('connect-redis');

app.use(express.urlencoded({
  extended: true
}));
app.set('trust proxy', 1); // trust first proxy

app.use(session({
  genid: function genid() {
    return uuidv4();
  },
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true
  },
  store: RedisStore.session
}));
app.use(express.json());
app.use(cors());

var cookiesRouters = require('./routers/cookies.routers');

var userTypeRouters = require('./routers/usertype.routers');

var usersRouters1 = require('./routers/users1.routers');

var departmentRouter = require('./routers/department.routers');

var employee_types = require('./routers/employee_types.routers');

var group = require('./routers/group.routers');

var holiday_types = require('./routers/holiday_types.routers');

var position = require('./routers/position.routers');

var Country = require('./routers/Country.routers');

var Provice = require('./routers/Provice.routers');

var District = require('./routers/District.routers');

var Village = require('./routers/Village.routers');

var TitleLao = require('./routers/TitleLao.routers');

var TitleEng = require('./routers/TitleEng.routers');

var Gender = require('./routers/Gender.routers');

var Religion = require('./routers/Religion.routers');

var Nationality = require('./routers/Nationality.routers');

var login = require('./routers/login.routers');

app.use("/api", cookiesRouters);
app.use("/api", userTypeRouters);
app.use("/api", usersRouters1);
app.use("/api", departmentRouter);
app.use("/api", employee_types);
app.use("/api", group);
app.use("/api", holiday_types);
app.use("/api", position);
app.use("/api", Country);
app.use("/api", Provice);
app.use("/api", District);
app.use("/api", Village);
app.use("/api", TitleLao);
app.use("/api", TitleEng);
app.use("/api", Gender);
app.use("/api", Religion);
app.use("/api", Nationality);
app.use("/api", login);
app.listen(port, function () {
  console.log('Server listenting on port' + port);
});
app.get('/', function (req, res) {
  res.send("Run Server Monday");
});
exports.app = app;
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();
const conn = require('./connect/mongodb');

const port = process.env.PORT;
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors());
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));
const cookiesRouters = require('./routers/cookies.routers');
const userTypeRouters = require('./routers/usertype.routers');
const usersRouters = require('./routers/login.routers');
const usersRouters1 = require('./routers/users1.routers');
const departmentRouter = require('./routers/department.routers');
const employee_types = require('./routers/employee_types.routers');
const group = require('./routers/group.routers');
const holiday_types = require('./routers/holiday_types.routers');
const position = require('./routers/position.routers');
const Country = require('./routers/Country.routers');
const Provice = require('./routers/Provice.routers');
const District = require('./routers/District.routers');
const Village = require('./routers/Village.routers');
const TitleLao = require('./routers/TitleLao.routers');
const TitleEng = require('./routers/TitleEng.routers');
const Gender = require('./routers/Gender.routers');
const Religion = require('./routers/Religion.routers');
const Nationality = require('./routers/Nationality.routers');

app.use("/api", cookiesRouters);
app.use("/api", userTypeRouters);
app.use("/api", usersRouters);
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


// ສ້າງຂໍ້ຜິດພາດກັບ .status. ພວກເຮົາ
// ຫຼັງຈາກນັ້ນສາມາດນໍາໃຊ້ຊັບສິນໃນຂອງພວກເຮົາ
// ຕົວຈັດການຄວາມຜິດພາດທີ່ກໍາຫນົດເອງ (ເຊື່ອມຕໍ່ເຄົາລົບ prop ນີ້ເຊັ່ນກັນ)

function error(status, msg) {
    var err = new Error(msg);
    err.status = status;
    return err;
  }
  

// ຖ້າພວກເຮົາຕ້ອງການສະຫນອງຫຼາຍກ່ວາ JSON, ພວກເຮົາສາມາດເຮັດໄດ້
// ໃຊ້ບາງສິ່ງບາງຢ່າງທີ່ຄ້າຍຄືກັນກັບເນື້ອໃນ - ການເຈລະຈາ
// ຕົວຢ່າງ.
// ນີ້ພວກເຮົາກວດສອບລະຫັດ API,
// ໂດຍການຕິດຕັ້ງຕົວກາງນີ້ໃສ່ /api
// ໝາຍເຖິງເສັ້ນທາງທີ່ນຳໜ້າດ້ວຍ "/api" ເທົ່ານັ້ນ
// ຈະເຮັດໃຫ້ເຄື່ອງກາງນີ້ຖືກເອີ້ນ

app.use('/api', function(req, res, next){
    var key = req.query['Token'];

    // ຄີບໍ່ຢູ່
    // key isn't present

    if (!key) return next(error(400, 'api key required'));
  
 // ຄີບໍ່ຖືກຕ້ອງ

 if (apiKeys.indexOf(key) === -1) return next(error(401, 'invalid api key'))

    // ທັງຫມົດທີ່ດີ, ເກັບຮັກສາ req.key ສໍາລັບການເຂົ້າເຖິງເສັ້ນທາງ
    // all good, store req.key for route access

    req.key = key;
    next();
  });

 
  // ແຜນທີ່ຂອງກະແຈ api ທີ່ຖືກຕ້ອງ, ໂດຍທົ່ວໄປແລ້ວແມ່ນແຜນທີ່
  // ຂໍ້ມູນບັນຊີກັບບາງປະເພດຂອງຖານຂໍ້ມູນເຊັ່ນ redis.
  // ປຸ່ມ api ເຮັດ _not_ ເປັນການກວດສອບຄວາມຖືກຕ້ອງ, ພຽງແຕ່
  // ຕິດຕາມການນໍາໃຊ້ API ຫຼືຊ່ວຍປ້ອງກັນພຶດຕິກໍາທີ່ເປັນອັນຕະລາຍແລະອື່ນໆ.

  var apiKeys = ['whatday', 'bar', 'baz'];

// these two objects will serve as our faux database
// ວັດຖຸສອງອັນນີ້ຈະເປັນຖານຂໍ້ມູນ faux ຂອງພວກເຮົາ

var repos = [
  { name: 'express', url: 'https://github.com/expressjs/express' },
  { name: 'stylus', url: 'https://github.com/learnboost/stylus' },
  { name: 'cluster', url: 'https://github.com/learnboost/cluster' }
];

var users = [
  { name: 'tobi' }
  , { name: 'loki' }
  , { name: 'jane' }
];

var userRepos = {
  tobi: [repos[0], repos[1]]
  , loki: [repos[1]]
  , jane: [repos[2]]
};

// ດຽວນີ້ພວກເຮົາສາມາດສົມມຸດວ່າກະແຈ api ຖືກຕ້ອງ,
// ດຽວນີ້ພວກເຮົາສາມາດສົມມຸດວ່າກະແຈ api ຖືກຕ້ອງ,
// ແລະພຽງແຕ່ເປີດເຜີຍຂໍ້ມູນ

// ຕົວຢ່າງ: http://localhost:3000/api/users/?api-key=foo
app.get('/api/users', function (req, res) {
    res.send(users);
  });
  
  // example: http://localhost:3000/api/repos/?api-key=foo
  app.get('/api/repos', function (req, res) {
    res.send(repos);
  });
  
  // example: http://localhost:3000/api/user/tobi/repos/?api-key=foo
  app.get('/api/user/:name/repos', function(req, res, next){
    var name = req.params.name;
    var user = userRepos[name];
  
    if (user) res.send(user);
    else next();
  });
  
  // middleware with an arity of 4 are considered
  // error handling middleware. When you next(err)
  // it will be passed through the defined middleware
  // in order, but ONLY those with an arity of 4, ignoring
  // regular middleware.
  // middleware ທີ່ມີ arity ຂອງ 4 ແມ່ນພິຈາລະນາ
// ຄວາມຜິດພາດການຈັດການຕົວກາງ. ເມື່ອເຈົ້າຕໍ່ໄປ (ຜິດ)
// ມັນຈະຖືກສົ່ງຜ່ານຕົວກາງທີ່ກໍານົດ
// ໃນຄໍາສັ່ງ, ແຕ່ວ່າພຽງແຕ່ຜູ້ທີ່ມີ arity ຂອງ 4, ignoring
// ເຄື່ອງກາງປົກກະຕິ.
  app.use(function(err, req, res, next){
    // whatever you want here, feel free to populate
    // properties on `err` to treat it differently in here.
    res.status(err.status || 500);
    res.send({ error: err.message });
  });
  
  // our custom JSON 404 middleware. Since it's placed last
  // it will be the last middleware called, if all others
  // invoke next() and do not respond.
  app.use(function(req, res){
    res.status(404);
    res.send({ error: "Sorry, can't find that" })
  });


app.listen(port, () => {
    console.log('Server listenting on port' + port);
})

exports.app = app;
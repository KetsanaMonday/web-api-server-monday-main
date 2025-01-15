"use strict";

var mongoose = require('mongoose');

var uri = "mongodb+srv://admin:To@77977441@115.84.114.11/32.twcai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.set('strictQuery', false);
var clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
};

function run() {
  return regeneratorRuntime.async(function run$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(mongoose.connect(uri, clientOptions));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(mongoose.connection.db.admin().command({
            ping: 1
          }));

        case 5:
          console.log("Pinged your deployment. You successfully connected to MongoDB!");

        case 6:
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(mongoose.disconnect());

        case 9:
          return _context.finish(6);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0,, 6, 10]]);
}

run()["catch"](console.dir);
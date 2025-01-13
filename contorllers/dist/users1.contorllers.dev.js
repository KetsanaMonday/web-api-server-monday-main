"use strict";

var userModels = require("../models/users1.models");

var jwt = require('jsonwebtoken');

var maxAge = 60000;

var bcrypt = require('bcryptjs');

module.exports.createUsers = function _callee(req, res, next) {
  var form, salt, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          form = req.body;
          console.log(form);
          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.genSalt());

        case 4:
          salt = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(bcrypt.hash(form.password, salt));

        case 7:
          password = _context.sent;
          data = {
            username: form.username,
            password: password,
            user_online: false,
            user_type_id: form.user_type_id,
            created_date: new Date()
          };
          console.log(data);
          _context.next = 12;
          return regeneratorRuntime.awrap(userModels.create(data, function (err) {
            if (!err) {
              console.log("Save");
              res.json({
                status: true,
                message: "Saved"
              });
            } else {
              console.log("error ");
              res.json({
                status: false,
                message: "Email have been!"
              });
            }
          }));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.readUsers1 = function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userModels.aggregate([{
            $lookup: {
              from: "user_types",
              localField: "user_type_id",
              foreignField: "_id",
              as: "user_type_name"
            }
          }]).exec(function (err, data) {
            if (!err) {
              res.json({
                status: true,
                message: "selete all data ",
                data: data
              });
            } else {
              console.log("error");
              res.json({
                status: false,
                message: err
              });
            }
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.readUsers = function _callee3(req, res, next) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userModels.find().exec(function (err, data) {
            if (!err) {
              res.json({
                status: true,
                message: "selete all data ",
                data: data
              });
            } else {
              res.json({
                status: false,
                message: err
              });
            }
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports.testUser = function _callee4(req, res, next) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          userModels.find().populate('author').exec(function (err, data) {
            if (!err) {
              res.json({
                status: true,
                message: "selete all data ",
                data: data
              });
            } else {
              console.log("error");
              res.json({
                status: false,
                message: err
              });
            }
          });

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports.updateUsers = function _callee5(req, res, next) {
  var form, salt, data;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          form = req.body;
          _context5.next = 3;
          return regeneratorRuntime.awrap(bcrypt.genSalt());

        case 3:
          salt = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(bcrypt.hash(form.password, salt));

        case 6:
          password = _context5.sent;
          data = {
            email: form.email,
            password: password,
            user_type_id: form.user_type_id,
            updated_date: new Date()
          };
          userModels.findByIdAndUpdate(form._id, data, {
            useFindAndModify: false
          }).exec(function (err, data) {
            if (!err) {
              console.log("Updatwe Sucess  ");
              res.json({
                status: true,
                message: "Update Sucess !",
                data: data
              });
            } else {
              console.log("error");
              res.json({
                status: false,
                message: err
              });
            }
          });

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  });
};

module.exports.deleteUsers = function _callee6(req, res, next) {
  var form;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          form = req.body;
          userModels.findByIdAndDelete(form._id, {
            useFindAndModify: false
          }).exec(function (err, data) {
            if (!err) {
              console.log("Delete Sucess  ");
              res.json({
                status: true,
                message: "Delete Sucess !",
                data: data
              });
            } else {
              console.log(" Delete error");
              res.json({
                status: false,
                message: err
              });
            }
          });

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
};
"use strict";

var User = require("../models/users1.models");

var jwt = require('jsonwebtoken');

module.exports.checkUser = function _callee2(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          token = req.cookies['id'];

          if (token) {
            console.log("token start");
            decoded = jwt.verify(token, process.env.JWT_SECRET, function _callee(err, decodedToken) {
              var user;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!err) {
                        _context.next = 4;
                        break;
                      }

                      return _context.abrupt("return", res.json({
                        status: false,
                        messqge: "error check user"
                      }));

                    case 4:
                      _context.next = 6;
                      return regeneratorRuntime.awrap(User.findById(decodedToken.id));

                    case 6:
                      user = _context.sent;

                      if (!user) {
                        _context.next = 9;
                        break;
                      }

                      return _context.abrupt("return", res.json({
                        status: true,
                        user: user.username
                      }));

                    case 9:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });
          } else {
            res.json({
              status: false,
              message: "token is not "
            });
            next();
          }

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.checkToken = function _callee3(req, res, next) {
  var token, decoded, user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))) {
            _context3.next = 10;
            break;
          }

          token = req.headers.authorization.split(' ')[1];
          decoded = jwt.verify(token, process.env.JWT_SECRET);
          _context3.next = 5;
          return regeneratorRuntime.awrap(User.findById(decoded.id));

        case 5:
          user = _context3.sent;

          if (!user) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.status(200).json({
            status: true,
            data: user
          }));

        case 8:
          _context3.next = 11;
          break;

        case 10:
          return _context3.abrupt("return", res.status(401).json({
            status: false,
            message: "Token is not "
          }));

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
};
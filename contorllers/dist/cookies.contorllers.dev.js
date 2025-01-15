"use strict";

module.exports.cookiesget = function _callee(req, res, next) {
  var email, password, id;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          email = req.cookies.email || '';
          password = req.cookies.password || '';
          id = req.cookies.id || '';
          res.json({
            email: email,
            password: password,
            id: id
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.cookiesset = function _callee2(req, res, next) {
  var email, password;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          email = req.body.email || '';
          password = req.body.password || '';
          res.cookie('email', email, {
            maxAge: 60000
          });
          res.cookie('password', password, {
            maxAge: 60000
          });
          res.json({
            email: email,
            password: password
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};
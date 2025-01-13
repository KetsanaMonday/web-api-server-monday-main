"use strict";

var userModels = require("../models/users1.models");

var jwt = require('jsonwebtoken');

var maxAge = 60000;

var bcrypt = require('bcryptjs');

var createToken = function createToken(id) {
  return jwt.sign({
    id: id
  }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
};

module.exports.createUsers = function _callee(req, res, next) {
  var form, data1, result, data, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          form = req.body;
          data1 = {
            username: form.username,
            password: form.password,
            user_online: false,
            user_types_id: form.user_types_id
          };
          result = userModels.find({
            username: data1.username
          });

          if (!result) {
            _context.next = 7;
            break;
          }

          res.json({
            status: false,
            message: "username have been ! "
          });
          _context.next = 14;
          break;

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(userModels.create(data1));

        case 9:
          data = _context.sent;
          token = createToken(data._id);
          res.cookie("id", token, {
            withCredent: true,
            httpOnly: false,
            maxAge: 60000
          });
          console.log("create  user");
          res.json({
            status: true,
            message: "selete all data ",
            data: token
          });

        case 14:
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
              localField: "user_types_id",
              foreignField: "_id",
              as: "user_type"
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
              console.log("select ", data);
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
              console.log("select ", data);
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
            username: form.username,
            password: password,
            use_types_id: form.user_types_id
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

module.exports.userLogin = function _callee7(req, res, next) {
  var form, username, user, auth, data1, token;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          form = req.body;
          username = form.username;
          _context7.next = 4;
          return regeneratorRuntime.awrap(userModels.findOne({
            username: username
          }));

        case 4:
          user = _context7.sent;

          if (!user) {
            _context7.next = 11;
            break;
          }

          _context7.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(form.password, user.password));

        case 8:
          auth = _context7.sent;

          if (auth) {
            data1 = {
              user_online: true
            };
            userModels.findByIdAndUpdate(user._id, data1, {
              useFindAndModify: false
            }).exec(function (err) {
              if (!err) {
                console.log("Update Status User Sucess  ");
              } else {
                console.log("error");
              }
            });
            token = createToken(user._id);
            res.cookie("id", token, {
              withCredent: true,
              httpOnly: true,
              maxAge: 60000
            });
            res.json({
              status: true,
              message: "login Succecss  !",
              token: token
            });
          } else {
            res.json({
              status: false,
              message: "password is not corect!"
            });
          }

          return _context7.abrupt("return");

        case 11:
          res.json({
            status: false,
            message: "username have not !"
          });

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  });
};

module.exports.checkToken = function _callee8(req, res, next) {
  var token, decoded, user;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          if (!(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))) {
            _context8.next = 10;
            break;
          }

          token = req.headers.authorization.split(' ')[1];
          decoded = jwt.verify(token, process.env.JWT_SECRET);
          _context8.next = 5;
          return regeneratorRuntime.awrap(userModels.findById(decoded.id));

        case 5:
          user = _context8.sent;

          if (!user) {
            _context8.next = 8;
            break;
          }

          return _context8.abrupt("return", res.status(200).json({
            status: true,
            data: user
          }));

        case 8:
          _context8.next = 11;
          break;

        case 10:
          return _context8.abrupt("return", res.status(401).json({
            status: false,
            message: "Token is not "
          }));

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  });
};

module.exports.register = function _callee9(req, res, next) {
  var form, data, errors;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          form = req.body;
          console.log(form);
          data = {
            username: form.username,
            password: form.password,
            user_online: false,
            user_type_id: form.user_type_id,
            created_date: new Date()
          };
          console.log(data);
          _context9.next = 7;
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
                message: "username have been!"
              });
            }
          }));

        case 7:
          _context9.next = 14;
          break;

        case 9:
          _context9.prev = 9;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0.message);
          errors = handleError(_context9.t0);
          res.json({
            errors: errors,
            created: false
          });

        case 14:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

module.exports.checkUser1 = function _callee11(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          token = req.session['id'];

          if (token) {
            console.log("token start");
            decoded = jwt.verify(token, process.env.JWT_SECRET, function _callee10(err, decodedToken) {
              var user;
              return regeneratorRuntime.async(function _callee10$(_context10) {
                while (1) {
                  switch (_context10.prev = _context10.next) {
                    case 0:
                      if (!err) {
                        _context10.next = 4;
                        break;
                      }

                      return _context10.abrupt("return", res.json({
                        status: false,
                        messqge: "error check user"
                      }));

                    case 4:
                      _context10.next = 6;
                      return regeneratorRuntime.awrap(User.findById(decodedToken.id));

                    case 6:
                      user = _context10.sent;

                      if (!user) {
                        _context10.next = 9;
                        break;
                      }

                      return _context10.abrupt("return", res.json({
                        status: true,
                        user: user.username
                      }));

                    case 9:
                    case "end":
                      return _context10.stop();
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
          return _context11.stop();
      }
    }
  });
};

module.exports.checkToken1 = function _callee12(req, res, next) {
  var token, decoded, user;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          if (!(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))) {
            _context12.next = 10;
            break;
          }

          token = req.headers.authorization.split(' ')[1];
          decoded = jwt.verify(token, process.env.JWT_SECRET);
          _context12.next = 5;
          return regeneratorRuntime.awrap(User.findById(decoded.id));

        case 5:
          user = _context12.sent;

          if (!user) {
            _context12.next = 8;
            break;
          }

          return _context12.abrupt("return", res.status(200).json({
            status: true,
            data: user
          }));

        case 8:
          _context12.next = 11;
          break;

        case 10:
          return _context12.abrupt("return", res.status(401).json({
            status: false,
            message: "Token is not "
          }));

        case 11:
        case "end":
          return _context12.stop();
      }
    }
  });
};
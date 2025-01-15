"use strict";

var Department = require("../models/Department.models");

module.exports.create = function _callee(req, res, next) {
  var form, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          form = req.body;
          data = {
            department_name: form.department_name,
            groups_id: form.groups_id,
            created_date: new Date()
          };
          Department.create(data, function (err) {
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
                message: err
              });
            }
          });

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.read1 = function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          Department.aggregate([{
            $lookup: {
              from: "groups",
              localField: "groups_id",
              foreignField: "_id",
              as: "groups_name"
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

module.exports.read = function _callee3(req, res, next) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          Department.find().exec(function (err, data) {
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
          return _context3.stop();
      }
    }
  });
};

module.exports.update = function _callee4(req, res, next) {
  var form, data;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          form = req.body;
          data = {
            department_name: form.department_name,
            groups_id: form.groups_id,
            updated_date: new Date()
          };
          console.log(form);
          Department.findByIdAndUpdate(form._id, data, {
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

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports["delete"] = function _callee5(req, res, next) {
  var form;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          form = req.body;
          Department.findByIdAndDelete(form._id, {
            useFindAndModify: false
          }).exec(function (err) {
            if (!err) {
              console.log("Delete Sucess  ");
              res.json({
                status: true,
                message: "Delete Sucess !"
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
          return _context5.stop();
      }
    }
  });
};
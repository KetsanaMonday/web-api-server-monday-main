const Contorllers = require('../contorllers/employee_types.contorllers');
const router = require('express').Router();


router.post("/employee_types/create", Contorllers.create);
router.get("/employee_types/read", Contorllers.read);
router.post("/employee_types/update", Contorllers.update);
router.post("/employee_types/delete", Contorllers.delete);

module.exports=router;  
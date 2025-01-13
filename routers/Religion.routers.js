const Contorllers = require('../contorllers/Religion.contorllers');
const router = require('express').Router();


router.post("/Religion/create", Contorllers.create);
router.get("/Religion/read", Contorllers.read);
router.post("/Religion/update", Contorllers.update);
router.post("/Religion/delete", Contorllers.delete);

module.exports=router;  
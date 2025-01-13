const Contorllers = require('../contorllers/Nationality.contorllers');
const router = require('express').Router();


router.post("/Nationality/create", Contorllers.create);
router.get("/Nationality/read", Contorllers.read);
router.post("/Nationality/update", Contorllers.update);
router.post("/Nationality/delete", Contorllers.delete);

module.exports=router;  
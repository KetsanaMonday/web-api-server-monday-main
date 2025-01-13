const Contorllers = require('../contorllers/Provice.contorllers');
const router = require('express').Router();


router.post("/Provice/create", Contorllers.create);
router.get("/Provice/read", Contorllers.read);
router.post("/Provice/update", Contorllers.update);
router.post("/Provice/delete", Contorllers.delete);
router.get("/Provice/read1", Contorllers.read1);
module.exports=router;  
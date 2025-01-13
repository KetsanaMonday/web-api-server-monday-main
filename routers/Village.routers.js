const Contorllers = require('../contorllers/Village.contorllers');
const router = require('express').Router();


router.post("/Village/create", Contorllers.create);
router.get("/Village/read", Contorllers.read);
router.post("/Village/update", Contorllers.update);
router.post("/Village/delete", Contorllers.delete);
router.get("/Village/read1", Contorllers.read1);
module.exports=router;  
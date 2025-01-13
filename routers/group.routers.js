const Contorllers = require('../contorllers/group.contorllers');
const router = require('express').Router();


router.post("/group/create", Contorllers.create);
router.get("/group/read", Contorllers.read);
router.post("/group/update", Contorllers.update);
router.post("/group/delete", Contorllers.delete);

module.exports=router;  
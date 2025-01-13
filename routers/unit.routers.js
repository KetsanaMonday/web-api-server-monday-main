const Router = require('../contorllers/unit.contorllers');
const router = require('express').Router();


router.post("/unit/create", Router.create);
router.get("/unit/read", Router.read);
router.post("/unit/update", Router.update);
router.post("/unit/delete", Router.delete);
router.get("/unit/read1", Router.read1);
module.exports=router;  
const Router = require('../contorllers/department.contorllers');
const router = require('express').Router();


router.post("/department/create", Router.create);
router.get("/department/read", Router.read);
router.post("/department/update", Router.update);
router.post("/department/delete", Router.delete);
router.get("/department/read1", Router.read1);
module.exports=router;  
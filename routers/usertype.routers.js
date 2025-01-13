const UserType = require('../contorllers/usertype.contorllers');
const router = require('express').Router();


router.post("/user-type/create", UserType.createUserType);
router.get("/user-type/read", UserType.readUserType);
router.post("/user-type/update", UserType.updateUsertype);
router.post("/user-type/delete", UserType.deleteUserType);

module.exports=router;  
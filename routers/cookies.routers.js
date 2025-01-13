
const {cookiesget,cookiesset} = require('../contorllers/cookies.contorllers');

const router = require('express').Router();
router.post("/cookies/get", cookiesget);

router.post("/cookies/set",cookiesset);



module.exports=router;
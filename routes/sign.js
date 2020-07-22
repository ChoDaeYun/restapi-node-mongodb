var express = require('express');
const AuthController = require("../controller/SignController");
var router = express.Router();

router.post("/in",AuthController.signin);
router.post("/up",AuthController.signup);

module.exports = router;

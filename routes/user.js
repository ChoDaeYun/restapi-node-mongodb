var express = require('express');
const UserController = require("../controller/UserController");
var router = express.Router();

router.get("/",UserController.find);
router.put("/",UserController.update);
router.delete("/",UserController.delete);

module.exports = router;

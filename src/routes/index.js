const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();


router.post("/register",userController.userRegistration);


router.post("/login",userController.userLogin);

module.exports = router;


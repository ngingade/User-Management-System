const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

const userController = new UserController();

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);

module.exports = router;

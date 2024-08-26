const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

const userController = new UserController();

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);

module.exports = router;

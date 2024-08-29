const User = require("../models/user");
const { body, validationResult } = require("express-validator");

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.send(users);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async createUser(req, res) {
    await body("firstName")
      .isLength({ max: 100 })
      .withMessage("Max 100 characters are allowed")
      .isAlpha()
      .withMessage("Firstname should only contain alphabetical characters")
      .run(req);
    await body("lastName")
      .isLength({ max: 100 })
      .withMessage("Max 100 characters are allowed")
      .isAlpha()
      .withMessage("Lastname should only contain alphabetical characters")
      .run(req);
    await body("email").isEmail().withMessage("Invalid email address").run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const user = new User(req.body);
      await user.save();
      res.send(user);
    } catch (err) {
      res.status(500).send({ message: "Failed to create user" });
    }
  }
}

module.exports = UserController;

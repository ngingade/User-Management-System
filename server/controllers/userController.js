const User = require("../models/User");

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
    try {
      const user = new User(req.body);
      await user.save();
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = UserController;

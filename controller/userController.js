const User = require('../models/User');

module.exports = {
  getUsers: async (req, res) => {
    try {
      const data = await User.find({});

      res.status(200).send({ success: true, data });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;

      const data = await User.findOne({ _id: id });

      if (!data) {
        return res.status(422).send({ success: false, message: `We couldn't find the ID that you're looking for` });
      }

      res.status(200).send({ success: true, data });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  createUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const newUser = await User.create({ username, password });

      res.status(201).send({ success: true, user_id: newUser._id });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findOne({ _id: id });

      if (!user) {
        return res.status(422).send({ success: false, message: `Please check the User ID` });
      }

      for (let prop in req.body) {
        user[prop] = req.body[prop];
      }

      // menggunakan method ini agar mentrigger pre save hook mongoose
      await user.save();

      res.status(200).send({ success: true });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      await User.deleteOne({ _id: id });

      res.status(200).send({ success: true });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

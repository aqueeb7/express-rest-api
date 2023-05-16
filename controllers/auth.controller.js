const { Validator } = require("node-input-validator");

const user = require("./../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const v = new Validator(req.body, {
    first_name: "required|string|minLength:2|maxLength:100",
    last_name: "required|string|minLength:2|maxLength:100",
    email: "required|email|unique:User,email",
    password: "required",
  });

  const matched = await v.check();

  if (!matched) {
    return res.status(422).send(v.errors);
  }

  try {
    const newUser = new user({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    });

    let userData = await newUser.save();

    if (userData) {
      return res.status(201).send({
        message: "User created successfully",
        user: userData,
      });
    }
  } catch (error) {
    return res.status(500).send({
      error: error.message,
      data: error,
    });
  }
};

exports.login = async (req, res) => {
  const v = new Validator(req.body, {
    email: "required|email",
    password: "required",
  });

  const matched = await v.check();

  if (!matched) {
    return res.status(422).send(v.errors);
  }
  try {
    let userData = await user.findOne({ email: req.body.email });

    if (userData) {
      if (bcrypt.compareSync(req.body.password, userData.password)) {
        let jwt_secret = process.env.JWT_SECRET || "mysecret";
        const token = jwt.sign(
          {
            data: userData,
          },
          jwt_secret,
          {
            expiresIn: "12h",
          }
        );
        return res.status(201).send({
          message: "User logged in successfully",
          data: {
            token: token,
            user: userData,
          },
        });
      } else {
        return res.status(400).send({
          message: "Invalid credentials",
          data: {},
        });
      }
    } else {
      return res.status(400).send({
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      data: error,
    });
  }
};

const { Validator } = require("node-input-validator");

const user = require('./../models/user.model');

exports.register = async (req, res) => {

  const v = new Validator(req.body, {
    first_name: "required|string|minLength:2|maxLength:100",
    last_name: "required|string|minLength:2|maxLength:100",
    email: "required|email|unique:User,email",
    password: "required",
  })

  const matched = await v.check();

  if (!matched) {
    return res.status(422).send(v.errors);
  }

  try {
    const newUser = new user({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    });

    let userData = await newUser.save();

    if (userData) {
      return res.status(201).send({
        message: "User created successfully",
        user: userData
      })
    }
  } catch (error) {
    return res.status(500).send({
      error: error.message,
      data: error,
      });
  }
}
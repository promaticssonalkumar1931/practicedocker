const userModel = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
async function registerUser(req, res) {
  const { name, email, role, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "NAME, EMAIL AND PASSWORD ARE REQUIRED."
      });
    }

    const hashPass = await bcrypt.hash(password, saltRounds);

    const userPerson = await userModel.create({
      name,
      email,
      role: role || "user",
      password: hashPass
    });

    const token = jwt.sign(
      {
        id: userPerson._id,
        role: userPerson.role
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "3h"
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3 * 60 * 60 * 1000
    });

    return res.status(201).json({
      message: "User Created Successfully.",
      user: {
        id: userPerson._id,
        name: userPerson.name,
        email: userPerson.email,
        role: userPerson.role
      }
    });

  } catch (err) {
    console.log("While creating the user account...");
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "EMAIL AND PASSWORD ARE REQUIRED."
      });
    }

    const userPerson = await userModel.findOne({ email });

    if (!userPerson) {
      return res.status(404).json({
        message: "USER NOT FOUND."
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      userPerson.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "INVALID EMAIL OR PASSWORD."
      });
    }

    const token = jwt.sign(
      {
        id: userPerson._id,
        role: userPerson.role
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "3h"
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "User Login Successfully.",
      user: {
        id: userPerson._id,
        name: userPerson.name,
        email: userPerson.email,
        role: userPerson.role
      }
    });

  } catch (err) {
    console.log("While logging in user...");
    console.log(err);

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

module.exports = {
  registerUser,
  loginUser
};
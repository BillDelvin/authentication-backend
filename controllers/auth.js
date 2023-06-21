const { query } = require("../database");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function validateRegister(req, res, next) {
  const { username, password, confirmPassword } = req.body;

  if (
    username === "" ||
    username === undefined ||
    password === undefined ||
    password === "" ||
    confirmPassword === undefined ||
    confirmPassword === ""
  )
    return res.status(400).json({ msg: "Invalid data!" });

  if (password !== confirmPassword) return res.status(400).json({ msg: "Password not match!" });

  return next();
}

function validateLogin(req, res, next) {
  const { username, password } = req.body;

  if (username === undefined || username === "" || password === undefined || password === "")
    return res.status(400).json({ msg: "Invalid data!" });

  return next();
}

async function register(req, res) {
  const { username, password } = req.body;

  try {
    // check if user exist in database
    const [checkUser] = await query(
      `
        SELECT id FROM users WHERE username = ?
    `,
      [username]
    );

    // validation for check user
    if (checkUser !== undefined) return res.status(400).json({ msg: "User alreday exists!" });

    const salt = await bcryptjs.genSalt(12);
    const hash = await bcryptjs.hash(password, salt);

    // creating new user
    await query(
      `
        INSERT INTO users (username, password)
        VALUES (?, ?) 
      `,
      [username, hash]
    );

    return res.status(200).json({ msg: "Register successfully!" });
  } catch (error) {
    return res.status(400).json("Something went wrong!");
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  try {
    // check if user exist in database
    const [checkUser] = await query(
      `
      SELECT id, username, password FROM users WHERE username = ?
      `,
      [username]
    );

    // validation for check user if not exists
    if (checkUser === undefined) return res.status(400).json("User not exists!");

    // compare password
    const isMatch = await bcryptjs.compare(password, checkUser.password);
    if (!isMatch) return res.status(400).json("Password not match!");

    // return user token
    const token = jwt.sign(
      { username: checkUser.username },
      "2837da9c-b240-4230-83a7-a5088e34046c",
      {
        expiresIn: "1 days",
      }
    );

    return res.status(200).json({ Authorization: `bearer ${token}` });
  } catch (error) {
    return res.status(400).json("Something went wrong!");
  }
}

module.exports = { validateRegister, register, validateLogin, login };

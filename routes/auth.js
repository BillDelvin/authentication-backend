const express = require("express");
const { validateRegister, register, validateLogin, login } = require("../controllers/auth");
const routes = express();

// define API
routes.post("/register", [validateRegister, register]);
routes.post("/login", [validateLogin, login]);

module.exports = routes;

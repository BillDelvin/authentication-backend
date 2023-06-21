const express = require("express");
const authApi = require("./auth");

const app = express();

const api = "/api/v1";

app.use(api, authApi);

module.exports = app;

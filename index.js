const express = require("express");
const bosyParser = require("body-parser");
const cors = require("cors");
const { createServer } = require("http");
const router = require("./routes");
const app = express();

const server = createServer(app);
const PORT = 1234;

app.use(cors());
app.use(bosyParser.json());
app.use(router);

server.listen(PORT, () => console.log(`server are running in http://localhost:${PORT}`));

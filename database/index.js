// get the client
const mysql = require("mysql2/promise");

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "authentication",
  password: "bill1234",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

const query = async (value, array) => {
  try {
    const [result] = await pool.query(value, array === undefined ? [] : array);
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { query };

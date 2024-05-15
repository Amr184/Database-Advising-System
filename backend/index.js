const express = require("express");
const morgan = require("morgan");
const env = require("dotenv").config();
const sql = require("mssql/msnodesqlv8");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded());
const port = 8000;
const router = express.Router();
const student = require("./routes/student");
const advisor = require("./routes/advisor");
const admin = require("./routes/admin");

const sqlConfig = {
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  server: process.env.DB_SERVER,
  pool: {
    max: 3000,
  },
  options: {
    trustServerCertificate: true, // change to true for local dev / self-signed certs
    trustedConnection: true,
    instanceName: process.env.DB_INSTANCE_NAME,
    enableArithAbort: true,
  },
};
const pool = new sql.ConnectionPool(sqlConfig);

pool.connect((err) => {
  if (err) console.log(err);
  else console.log("Connected to MSSQL");
});

// Define routes and their corresponding handlers

student.map((e) => {
  router[e.method.toLowerCase()]("/student" + e.path, async (req, res) => {
    const request = new sql.Request(pool);
    try {
      const tb = await request.query(e.query(req.body));
      console.log(tb);
      res.status(200).json(tb.recordset);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
})

advisor.map((e) => {
  router[e.method.toLowerCase()]("/advisor" + e.path, async (req, res) => {
    const request = new sql.Request(pool);
    try {
      const tb = await request.query(e.query(req.body));
      console.log(tb);
      res.status(200).json(tb.recordset);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
})

admin.map((e) => {
  router[e.method.toLowerCase()]("/admin" + e.path, async (req, res) => {
    const request = new sql.Request(pool);
    try {
      const tb = await request.query(e.query(req.body));
      console.log(tb);
      res.status(200).json(tb.recordset);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
})

// Mount the router on the main app
app.use(router);
app.listen(port, () => console.log(`Server listening on port ${port}!`));

const mysql = require("mysql");
const fs = require("fs");
const { listenerCount } = require("process");
const sqlFunctions = require("./sql_functions.js");
const password = fs.readFileSync("./password.config", "utf8");

//set up the connection to the db
const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: password,
  database: "employee_tracker_db",
});

//init function
function init() {
  connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    sqlFunctions.firstQuestion(connection);
  });
}

//call init
init();

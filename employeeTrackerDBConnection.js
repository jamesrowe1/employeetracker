//dependencies
const mysql = require("mysql");
const fs = require("fs");
const cTable = require("console.table");
const sqlFunctions = require("./sql_functions.js");

//read in the password from config file
const password = fs.readFileSync("./password.config", "utf8");

//create the connection to the db
const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: password,
  database: "employee_tracker_db",
});

//start the program
function init() {
  connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    sqlFunctions.firstQuestion(connection);
  });
}

//init
init();

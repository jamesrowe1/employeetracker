const mysql = require("mysql");
const fs = require("fs");
const cTable = require("console.table");
const { listenerCount } = require("process");
const inquirer = require("inquirer");
const sqlCalls = require("./orms.js");
const sqlFunctions = require("./sql_functions.js");
const questions = require("./questions.js");
const password = fs.readFileSync("./password.config", "utf8");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: password,
  database: "employee_tracker_db",
});

const listSqlCalls = "SELECT department FROM departments";

function init() {
  connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    sqlFunctions.firstQuestion(connection);
  });
}

init();

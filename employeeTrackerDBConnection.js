const mysql = require("mysql");
const fs = require("fs");
const cTable = require("console.table");

const password = fs.readFileSync("./password.config", "utf8");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: password,
  database: "employee_tracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.query(
    "SELECT * FROM employees INNER JOIN roles ON employees.role_id=roles.id INNER JOIN departments ON roles.department_id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
    }
  );
  connection.query(
    "SELECT * FROM employees INNER JOIN roles ON employees.role_id=roles.id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      connection.end();
    }
  );
});

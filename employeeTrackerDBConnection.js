const mysql = require("mysql");
const fs = require("fs");
const cTable = require("console.table");
const { listenerCount } = require("process");
const inquirer = require("inquirer");

const password = fs.readFileSync("./password.config", "utf8");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: password,
  database: "employee_tracker_db",
});

//all the sqlCalls
const sqlCalls = {
  viewAllEmployees:
    "SELECT e.id, e.first_name, e.last_name, roles.title, departments.department, roles.salary,  CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id INNER JOIN roles ON e.role_id=roles.id INNER JOIN departments ON roles.department_id=departments.id",
  viewAllRoles: "SELECT * FROM roles",
  viewAllDepartments: "SELECT * FROM departments",
};

const listSqlCalls = "SELECT department FROM departments";

function init() {
  connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    firstQuestion();
  });
}

async function firstQuestion() {
  inquirer.prompt(bigQuestion).then((answer) => {
    switch (answer.whatToDo) {
      case "View all Employees":
        viewSqlCalls(sqlCalls.viewAllEmployees);
        break;
      case "No more actions":
        connection.end();
        break;
      case "View all Roles":
        viewSqlCalls(sqlCalls.viewAllRoles);
        break;
      case "View all Departments":
        viewSqlCalls(sqlCalls.viewAllDepartments);
        break;
      case "Add Department":
        addDepartment();
        break;
      case "Add Role":
        addRole();
        break;
      default:
        break;
    }
  });
}

async function addRole() {
  //get array of objects of departments and their keys
  let departmentListObj = await getSqlCalls(sqlCalls.viewAllDepartments);

  //turn the array of objects into just an array
  let departmentList = departmentListObj.map((obj) => obj.department);

  //set the role question about departments to the department list
  addRoleQuestions[2].choices = departmentList;

  //ask the questions
  let newRole = await inquirer.prompt(addRoleQuestions);

  //map the department to the correct id and assign the id in the newRole object
  departmentListObj.forEach((department) => {
    if (department.department === newRole.department) {
      newRole.department = department.id;
    }
  });
  //did this with object
  connection.query(
    //put the new role into the db
    "INSERT INTO ROLES SET ?",
    {
      title: newRole.roleName,
      salary: newRole.salary,
      department_id: newRole.department,
    },
    (err, results, fields) => {
      if (err) throw err;
      console.log("added");
      //ask what to do next
      firstQuestion();
    }
  );
}

async function addDepartment() {
  let departmentName = await inquirer.prompt(addDepartmentQuestion);
  departmentName = departmentName.departmentName;
  connection.query(
    "INSERT INTO departments (department) VALUES(?)",
    departmentName,
    (err, results, fields) => {
      if (err) {
        console.log(err);
      }
      firstQuestion();
    }
  );
  console.log(departmentName);
}

async function getSqlCalls(sqlFunction) {
  let results;
  return new Promise((data) => {
    connection.query(sqlFunction, (err, res) => {
      if (err) throw err;
      try {
        //console.log(res);
        data(res);
      } catch (err) {
        throw err;
      }
    });
  });
}

function viewSqlCalls(sqlFunction) {
  connection.query(
    sqlFunction,
    //listSqlCalls,
    // roles.title, roles.salary, departments.name,
    // INNER JOIN roles ON employees.role_id=roles.id INNER JOIN departments ON roles.department_id
    function (err, res) {
      if (err) throw err;
      console.table(res);
      firstQuestion();
    }
  );
}

const bigQuestion = [
  {
    name: "whatToDo",
    message: "What would you like to do?",
    type: "list",
    choices: [
      //sql command
      "View all Employees",
      //sql command
      "View all Roles",
      //sql command
      "View all Departments",
      //ask which manager
      "View Employees by Manager",
      //ask which department
      "View Utilized Budget of Department",
      //ask questions then add to sql
      "Add Employee",
      //ask questions then add to sql
      "Add Role",
      //ask questions then add to sql
      "Add Department",
      //update role
      "Update Role",
      //remove employee
      "Remove Employee",
      //remove role question
      "Remove Role",
      //remove department question
      "Remove Department",
      //update employee manager
      "Change Employee Manager",
      //no more changes
      "No more actions",
    ],
  },
];
const changeEmployeeManagerQuestions = [
  {
    name: "employeeName",
    message: "Which employee is changing manager?",
    type: "list",
    choices: [
      //list of employees
    ],
  },
  {
    name: "managerName",
    message: "Who is the employees manager?",
    type: "list",
    choices: [
      //list of managers
    ],
  },
];
const removeDepartmentQuestion = [
  {
    name: "departmentName",
    message: "Which department would you like to remove?",
    type: "list",
    choices: [
      //list of all department
    ],
  },
];
const removeRoleQuestion = [
  {
    name: "role",
    message: "Which role would you like to remove?",
    type: "list",
    choices: [
      //list of all roles
    ],
  },
];
const removeEmployeeQuestion = [
  {
    name: "employeeName",
    message: "Which Employee would you like to remove?",
    type: "list",
    choices: [
      //list of all employees
    ],
  },
];
const updateRoleQuestions = [
  {
    name: "salary",
    //maybe try to add old salary here as reference
    message: "What is the salary?",
    type: "number",
  },
  {
    name: "department",
    message: "What is the department?",
    type: "list",
    choices: [
      //array of departments (and need to assign to department_id as a number)
    ],
  },
];
//add department questions
const addDepartmentQuestion = [
  {
    name: "departmentName",
    Message: "Please enter the department name:",
  },
];
//add role questions
const addRoleQuestions = [
  {
    name: "roleName",
    message: "What is the title of the role?",
  },
  {
    name: "salary",
    message: "What is the salary?",
    type: "number",
  },
  {
    name: "department",
    message: "What is the department?",
    type: "list",
    choices: [
      //array of departments (and need to assign to department_id as a number)
    ],
  },
];
//view employees of manager
const managerQuestion = [
  {
    name: "managerChoice",
    message: "Which manager would you like to view the employees of?",
    type: "list",
    choices: [
      //array of managers from sql command
    ],
  },
];

//question about budget
const budgetQuestion = [
  {
    name: "viewBudget",
    message: "Which department would you like to see the budget of?",
    type: "list",
    choices: [
      //array of departments sql command
    ],
  },
];

//adding employee
const addEmployeeQuestions = [
  {
    name: "firstname",
    message: "What is the employee's first name?",
  },
  {
    name: "lastname",
    message: "What is the employee's last name?",
  },
  {
    name: "role",
    message: "What is the employee's role?",
    type: "list",
    choices: [
      //list from sql command of roles
    ],
  },
  {
    name: "manager",
    message: "Who is the employees manager?",
    type: "list",
    choices: [
      //list of employees or None
    ],
  },
];

init();

const sqlCalls = require("./orms.js");
const inquirer = require("inquirer");
const questions = require("./questions.js");
let connection;
class sqlFunctions {
  constructor() {}
}

async function firstQuestion(connectionInit) {
  connection = connectionInit;
  inquirer.prompt(questions.bigQuestion).then((answer) => {
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
      case "Add Employee":
        addEmployee();
        break;
      default:
        break;
    }
  });
}

async function addEmployee() {
  //get an array of the role objects
  let roleListObj = await getSqlCalls(sqlCalls.viewAllRoles);
  console.log(roleListObj);

  //turn it into an array
  let roleList = await roleListObj.map((obj) => obj.title + " ID: " + obj.id);
  console.log(roleList);

  let currentEmployeeListObj = await getSqlCalls(sqlCalls.viewAllEmployees);
  let currentEmployeeList = await currentEmployeeListObj.map(
    (obj) => obj.first_name + " " + obj.last_name + " ID: " + obj.id
  );
  console.log(currentEmployeeList);
  //addEmployeeQuestions asks first name, last name, role, manager
  questions.addEmployeeQuestions[2].choices = roleList;
  questions.addEmployeeQuestions[3].choices = currentEmployeeList;

  let newEmployee = await inquirer.prompt(questions.addEmployeeQuestions);
  console.log(newEmployee);

  connection.query(
    //put the new employee into the db
    "INSERT INTO employees SET ?",
    {
      first_name: newEmployee.firstname,
      last_name: newEmployee.lastname,
      role_id: newEmployee.role.split(" ID: ")[1],
      manager_id: newEmployee.manager.split(" ID: ")[1],
    },
    (err, results, fields) => {
      if (err) throw err;
      console.log("added");
      //ask what to do next
      firstQuestion(connection);
    }
  );
}

const addDepartment = async function () {
  let departmentName = await inquirer.prompt(questions.addDepartmentQuestion);
  departmentName = departmentName.departmentName;
  connection.query(
    "INSERT INTO departments (department) VALUES(?)",
    departmentName,
    (err, results, fields) => {
      if (err) {
        console.log(err);
      }
      firstQuestion(connection);
    }
  );
  console.log(departmentName);
};

const addRole = async function () {
  //get array of objects of departments and their keys
  let departmentListObj = await getSqlCalls(sqlCalls.viewAllDepartments);

  //turn the array of objects into just an array
  let departmentList = departmentListObj.map(
    (obj) => obj.department + " ID: " + obj.id
  );

  //set the role question about departments to the department list
  questions.addRoleQuestions[2].choices = departmentList;

  //ask the questions
  let newRole = await inquirer.prompt(questions.addRoleQuestions);

  //map the department to the correct id and assign the id in the newRole object
  //   departmentListObj.forEach((department) => {
  //     if (department.department === newRole.department) {
  //       newRole.department = department.id;
  //     }
  //   });
  //did this with object
  connection.query(
    //put the new role into the db
    "INSERT INTO ROLES SET ?",
    {
      title: newRole.roleName,
      salary: newRole.salary,
      department_id: newRole.department.split(" ID: ")[1],
    },
    (err, results, fields) => {
      if (err) throw err;
      console.log("added");
      //ask what to do next
      firstQuestion(connection);
    }
  );
};

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
      firstQuestion(connection);
    }
  );
}
module.exports = {
  addDepartment: addDepartment,
  addRole: addRole,
  viewSqlCalls: viewSqlCalls,
  getSqlCalls: getSqlCalls,
  addEmployee: addEmployee,
  firstQuestion: firstQuestion,
};

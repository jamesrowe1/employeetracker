const sqlCalls = require("./orms.js");
const inquirer = require("inquirer");
const questions = require("./questions.js");
let connection;

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
      case "Update Employee Role":
        updateEmployeeRole();
        break;
      case "Change Employee Manager":
        updateEmployeeManager();
        break;
      case "View Employees by Manager":
        viewSqlCalls(sqlCalls.viewEmployeesByManager);
        break;
      case "Remove Department":
        deleteDepartment();
        break;
      case "Remove Role":
        deleteRole();
        break;
      case "Remove Employee":
        deleteEmployee();
        break;
      case "View Utilized Budget of Department":
        viewBudget();
        break;
      default:
        break;
    }
  });
}
const viewBudget = async function () {
  let departmentList = await getDepartmentListandId;
  questions.budgetQuestion[0].choices = departmentList;
  let budgetDepartment = await inquirer.prompt(questions.budgetQuestion);

  connection.query(
    //delete the department
    "SELECT SUM(salary) as budget FROM employees INNER JOIN roles ON employees.role_id=roles.id INNER JOIN departments ON roles.department_id=departments.id WHERE departments.id=?",
    [budgetDepartment.viewBudget.split(" ID: ")[1]],
    (err, results, fields) => {
      if (err) throw err;
      console.log("$" + results[0].budget);
      //ask what to do next
      firstQuestion(connection);
    }
  );
};
const deleteEmployee = async function () {
  let employeeList = await getEmployeeListandId;
  questions.removeEmployeeQuestion[0].choices = employeeList;
  let employeeToBeRemoved = await inquirer.prompt(
    questions.removeEmployeeQuestion
  );
  connection.query(
    //delete the department
    "DELETE FROM employees WHERE id= ?",
    [employeeToBeRemoved.employeeName.split(" ID: ")[1]],
    (err, results, fields) => {
      if (err) throw err;
      console.log("added");
      //ask what to do next
      firstQuestion(connection);
    }
  );
};

const deleteRole = async function () {
  let roleList = await getRoleListandId;
  questions.removeRoleQuestion[0].choices = roleList;
  let roleToBeRemoved = await inquirer.prompt(questions.removeRoleQuestion);
  connection.query(
    //delete the department
    "DELETE FROM roles WHERE id= ?",
    [roleToBeRemoved.role.split(" ID: ")[1]],
    (err, results, fields) => {
      if (err) throw err;
      console.log("added");
      //ask what to do next
      firstQuestion(connection);
    }
  );
};

const deleteDepartment = async function () {
  let departmentList = await getDepartmentListandId;
  questions.removeDepartmentQuestion[0].choices = departmentList;
  let departmentToBeRemoved = await inquirer.prompt(
    questions.removeDepartmentQuestion
  );
  connection.query(
    //delete the department
    "DELETE FROM departments WHERE id= ?",
    [departmentToBeRemoved.departmentName.split(" ID: ")[1]],
    (err, results, fields) => {
      if (err) throw err;
      console.log("added");
      //ask what to do next
      firstQuestion(connection);
    }
  );
};

const getEmployeeListandId = async function () {
  let currentEmployeeListObj = await getSqlCalls(sqlCalls.viewAllEmployees);
  let currentEmployeeList = currentEmployeeListObj.map(
    (obj) => obj.first_name + " " + obj.last_name + " ID: " + obj.id
  );
  return currentEmployeeList;
};

const getRoleListandId = async function () {
  //get an array of the role objects
  let roleListObj = await getSqlCalls(sqlCalls.viewAllRoles);

  //turn it into an array
  let roleList = roleListObj.map((obj) => obj.title + " ID: " + obj.id);

  return roleList;
};

const getDepartmentListandId = async function () {
  //get array of objects of departments and their keys
  let departmentListObj = await getSqlCalls(sqlCalls.viewAllDepartments);

  //turn the array of objects into just an array
  let departmentList = departmentListObj.map(
    (obj) => obj.department + " ID: " + obj.id
  );
  return departmentList;
};

//update an employees manager
const updateEmployeeManager = async function () {
  //get the employee list
  let currentEmployeeList = await getEmployeeListandId();

  questions.changeEmployeeManagerQuestions[0].choices = currentEmployeeList;
  questions.changeEmployeeManagerQuestions[1].choices = currentEmployeeList;

  let changeManager = await inquirer.prompt(
    questions.changeEmployeeManagerQuestions
  );
  connection.query(
    //update the employees role
    "UPDATE employees SET manager_id = ? WHERE id= ?",
    [
      changeManager.managerName.split(" ID: ")[1],
      changeManager.employeeName.split(" ID: ")[1],
    ],
    (err, results, fields) => {
      if (err) throw err;
      console.log("added");
      //ask what to do next
      firstQuestion(connection);
    }
  );
};

//update employee's role
const updateEmployeeRole = async function () {
  //get the employee and role list
  let currentEmployeeList = await getEmployeeListandId();
  let currentRoleList = await getRoleListandId();

  //put the correct lists in the question
  questions.updateRoleQuestions[0].choices = currentEmployeeList;
  questions.updateRoleQuestions[1].choices = currentRoleList;

  let updateEmployee = await inquirer.prompt(questions.updateRoleQuestions);

  connection.query(
    //update the employees role
    "UPDATE employees SET role_id = ? WHERE id= ?",
    [
      updateEmployee.role.split(" ID: ")[1],
      updateEmployee.employee.split(" ID: ")[1],
    ],
    (err, results, fields) => {
      if (err) throw err;
      console.log("added");
      //ask what to do next
      firstQuestion(connection);
    }
  );
};
//add employee
const addEmployee = async function () {
  //get a list of the roles and employees
  let roleList = await getRoleListandId();
  let currentEmployeeList = await getEmployeeListandId();

  //addEmployeeQuestions asks first name, last name, role, manager
  questions.addEmployeeQuestions[2].choices = roleList;
  questions.addEmployeeQuestions[3].choices = currentEmployeeList;

  //ask the new employee questions
  let newEmployee = await inquirer.prompt(questions.addEmployeeQuestions);

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
};

const addDepartment = async function () {
  //ask the department question (name of department)
  let departmentName = await inquirer.prompt(questions.addDepartmentQuestion);
  departmentName = departmentName.departmentName;

  //put the department into the db
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
};

//add a new role
const addRole = async function () {
  //turn the array of objects into just an array
  let departmentList = await getDepartmentListandId();

  //set the role question about departments to the department list
  questions.addRoleQuestions[2].choices = departmentList;

  //ask the questions
  let newRole = await inquirer.prompt(questions.addRoleQuestions);

  //put the new role into the role table
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

//sql function that returns the database object
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

//sql function that shows the output of the call on the screen
function viewSqlCalls(sqlFunction) {
  connection.query(sqlFunction, function (err, res) {
    if (err) throw err;
    console.table(res);
    firstQuestion(connection);
  });
}

//send firstquestion out
module.exports = {
  firstQuestion: firstQuestion,
};

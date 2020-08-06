const sqlCalls = require("./orms.js");
const inquirer = require("inquirer");
class sqlFunctions {
  constructor() {}
  //   addDepartment () {
  //     let departmentName = await inquirer.prompt(addDepartmentQuestion);
  //     departmentName = departmentName.departmentName;
  //     connection.query(
  //       "INSERT INTO departments (department) VALUES(?)",
  //       departmentName,
  //       (err, results, fields) => {
  //         if (err) {
  //           console.log(err);
  //         }
  //         firstQuestion();
  //       }
  //     );
  //     console.log(departmentName);
  //   };
}

const addDepartment = async function () {
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
};

const addRole = async function () {
  //get array of objects of departments and their keys
  let departmentListObj = await getSqlCalls(sqlCalls.viewAllDepartments);

  //turn the array of objects into just an array
  let departmentList = departmentListObj.map(
    (obj) => obj.department + " DepartmentId: " + obj.id
  );

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
};

module.exports = { addDepartment: addDepartment, addRole: addRole };

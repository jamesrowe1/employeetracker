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
    type: "rawlist",
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
module.exports = {
  bigQuestion: bigQuestion,
  changeEmployeeManagerQuestions: changeEmployeeManagerQuestions,
  removeDepartmentQuestion: removeDepartmentQuestion,
  removeRoleQuestion: removeRoleQuestion,
  removeEmployeeQuestion: removeEmployeeQuestion,
  updateRoleQuestions: updateRoleQuestions,
  addDepartmentQuestion: addDepartmentQuestion,
  addRoleQuestions: addRoleQuestions,
  managerQuestion: managerQuestion,
  budgetQuestion: budgetQuestion,
  addEmployeeQuestions: addEmployeeQuestions,
};

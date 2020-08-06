//all the sqlCalls
const sqlCalls = {
  viewAllEmployees:
    "SELECT e.id, e.first_name, e.last_name, roles.title, departments.department, roles.salary,  CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id INNER JOIN roles ON e.role_id=roles.id INNER JOIN departments ON roles.department_id=departments.id ORDER BY e.id",
  viewAllRoles:
    "SELECT roles.id, roles.title, roles.salary, departments.department FROM roles LEFT JOIN departments ON roles.department_id=departments.id",
  viewAllDepartments: "SELECT * FROM departments",
  viewEmployeesByManager:
    "SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS employee_name, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id ORDER BY m.id",
  getDepartmentBudget:
    "SELECT SUM(salary) FROM employees INNER JOIN roles ON employees.role_id=roles.id INNER JOIN departments ON roles.department_id=departments.id ",
};

module.exports = sqlCalls;

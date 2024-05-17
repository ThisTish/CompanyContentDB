-- *Queries for assignment in order of chooseAction s/c function

-- view all departments
SELECT * FROM departments;

-- view all roles
SELECT * FROM roles;

-- view all employees
SELECT * FROM employees;

-- add a department
INSERT INTO departments(name)
VALUES ($1);

-- add a role
INSERT INTO roles(title, salary, department_id)
VALUES ($1, $2, $3);

-- add an employee
INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ($1, $2, $3, $4);

-- update employee role
UPDATE employees SET role_id = $1 WHERE id = $2

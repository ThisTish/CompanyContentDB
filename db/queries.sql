-- *Queries for assignment in order of chooseAction s/c function

-- view all departments
SELECT * FROM departments;

-- view all roles
SELECT r.id, r.title, r.salary, d.name
FROM roles AS r
LEFT JOIN departments AS d
ON r.department_id = d.id;

-- view all employees
SELECT e.id, e.first_name, e.last_name, r.title AS title, d.name AS department, r.salary AS salary, m.first_name ||' '|| m.last_name AS manager
FROM employees AS e
JOIN roles AS r on e.role_id = r.id
JOIN departments AS d on r.department_id = d.id
LEFT JOIN employees AS m ON e.manager_id = m.id;

-- add a department
INSERT INTO departments (name) VALUES ('Supplier');

-- add a role
INSERT INTO roles (title, salary, department_id)
VALUES ('Drifter', 100, 4);

-- -- add an employee
INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ('Bob', 'Fossil', 3, 1);

-- update employee role
UPDATE employees SET role_id = 4 WHERE id = 4;


--* bonuses
-- update employee manager
UPDATE employees SET manager_id = 3 WHERE role_id = 4;

-- view employees by manager
SELECT first_name ||' '|| last_name AS Employee
FROM employees
WHERE manager_id = 1;

-- -- view employees by department
SELECT e.first_name ||' '|| e.last_name AS employee, d.name AS department
FROM employees AS e
JOIN roles AS r ON e.role_id = r.id
INNER JOIN departments AS d ON r.department_id = d.id;

-- view the total salary in each department
SELECT SUM(salary) FROM roles;



-- *Queries for assignment in order of chooseAction s/c function

-- view all departments
SELECT * FROM departments;

-- view all roles
SELECT r.id, r.title, r.salary, d.name
FROM roles AS r
LEFT JOIN departments AS d
ON r.department_id = d.id;

-- view all employees
SELECT e.id, e.first_name, e.last_name, r.title, r.salary
FROM employees AS e
LEFT JOIN roles as r
ON e.role_id = r.id;

SELECT e.id, e.first_name, e.last_name, m.first_name AS manager_fn, m.last_name AS manager_ln
FROM employees AS e
INNER JOIN employees as m
ON e.manager_id = m.id
ORDER BY e.id;
-- ?subquery of roles matching departments?

-- add a department
-- INSERT INTO departments(name)
-- VALUES ($1);

-- add a role
-- INSERT INTO roles(title, salary, department_id)
-- VALUES ($1, $2, $3);

-- add an employee
-- INSERT INTO employees(first_name, last_name, role_id, manager_id)
-- VALUES ($1, $2, $3, $4);

-- update employee role
-- UPDATE employees SET role_id = $1 WHERE id = $2


--* bonuses
-- update employee manager
-- UPDATE employees SET manager_id = $1 WHERE id = $2
-- view employees by manager
-- SELECT * FROM employees WHERE manager_id = 2
-- view employees by department
-- SELECT * FROM employees WHERE department_id = 2
-- delete departments, roles and employees

-- view the total salary in each department
-- SELECT SUM(salary) FROM roles;--almost not there yet



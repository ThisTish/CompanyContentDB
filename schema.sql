CREATE DATABASE company_db;

\c company_db;

CREATE TABLE employees (
	employee_id SERIAL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	role_id INT,
	FOREIGN KEY role_id REFERENCES roles(role_id)
);

CREATE TABLE departments (
	department_id SERIAL PRIMARY KEY,
	department_name VARCHAR(50) NOT NULL,
	department_manager VARCHAR(50),
	employee_id INT,
	FOREIGN KEY(employee_id) REFERENCES employees(employee_id)
);

CREATE TABLE roles (
	role_id SERIAL PRIMARY KEY,
	role_name VARCHAR(50) NOT NULL,
	role_salary INT NOT NULL,
	department_id INT,
	employee_id INT
	FOREIGN KEY employee_id REFERENCES employees(employee_id),
	FOREIGN KEY department_id REFERENCES departments(department_id)
);

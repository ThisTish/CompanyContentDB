DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

\c company_db;

CREATE TABLE departments(
	id SERIAL PRIMARY KEY,
	name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles(
	id SERIAL  PRIMARY KEY,
	title VARCHAR(30) UNIQUE NOT NULL,
	department_id INT,
	salary DECIMAL NOT NULL,
	FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE employees(
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	role_id INT,
	FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
	manager_id INT REFERENCES employees(id) ON DELETE SET NULL
);
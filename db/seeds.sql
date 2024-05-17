INSERT INTO departments(name)
VALUES ('Management'),
	('Sales');

INSERT INTO roles(title, salary, department_id)
VALUES ('Owner', 12000, 1),
	('Shop Boy', 13000, 2);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES('Naboo', '', 1, NULL),
	('Howard', 'Moon', 2, 1)

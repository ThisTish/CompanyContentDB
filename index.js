const inquirer = require("inquirer");
const { startingPoint, addDepartment, addRole, addEmployee, updateRole } = require('./prompts');
const {CompanyDB ,SelectTable}= require('./helpers');
const { Pool } = require('pg');

const pool = new Pool(
    {
        user: 'postgres',
        password: 'letsgo',
        host: 'localhost',
        database: 'company_db',
		port: 5432
    },
    console.log('Connected to the Company Database')
);
const db = new CompanyDB(pool)

// switch and case for startingPoint
async function chooseAction(choice) {
    console.log(`Choice: ${choice}`);
    try {
        switch (choice) {
            case 'View all departments':
                try {
                    const selectedDepartments = await db.makeQuery(`SELECT * FROM departments;`);
                    const deptTable = new SelectTable(selectedDepartments.rows, [4, 20]);
                    deptTable.createTable();
                } catch (error) {
                    console.error('Error fetching departments:', error);
                }
                break;
            case 'View all roles':
                try {
                    const selectedRoles = await db.makeQuery(`SELECT r.id, r.title, d.name AS department, r.salary 
                        FROM roles AS r
                        LEFT JOIN departments AS d
                        ON r.department_id = d.id;`);
                    const roleTable = new SelectTable(selectedRoles.rows, [4, 15, 20, 10]);
                    roleTable.createTable();
                } catch (error) {
                    console.error('Error fetching roles:', error);
                }
                break;
            case 'View all employees':
                try {
                    const selectedEmployees = await db.makeQuery(`
                    SELECT e.id, e.first_name || ' ' || e.last_name AS employee, 
                    r.title AS title, 
                    d.name AS department, 
                    r.salary AS salary, 
                    m.first_name ||' '|| m.last_name AS manager
                    FROM employees AS e
                    JOIN roles AS r on e.role_id = r.id
                    JOIN departments AS d on r.department_id = d.id
                    LEFT JOIN employees AS m ON e.manager_id = m.id;`);
                    const employeeTable = new SelectTable(selectedEmployees.rows, [4, 30, 15, 20, 10, 30]);
                    employeeTable.createTable();
                } catch (error) {
                    console.error('Error fetching employees:', error);
                }
                break;
            case 'Add a department':
                try {
                    inquirer.prompt(addDepartment).then((dep) => 
                        db.makeQuery(`INSERT INTO departments(name) VALUES ($1);`, [dep.department])
                    )
                    // .then((dep) => console.log(`Success! ${dep.department} added.`))
                } catch (error) {
                    console.error('Error adding department:', error);
                }
                break;
            case 'Add a role':
                try {
                    inquirer.prompt(addRole).then((role) => 
                        db.makeQuery(`INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3);`, [role.name, role.salary, role.department])
                    );
                } catch (error) {
                    console.error('Error adding role:', error);
                }
                break;
            case 'Add an employee':
                try {
                    inquirer.prompt(addEmployee).then((emp) => 
                        db.makeQuery(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);`, [emp.firstName, emp.lastName, emp.role, emp.manager])
                    );
                } catch (error) {
                    console.error('Error adding employee:', error);
                }
                break;
            case 'Update employee role':
                try {
                    const questions = await updateRole()
                    const update = await inquirer.prompt(questions) 
                    await db.makeQuery(`UPDATE employees SET role_id = $2 WHERE first_name ||' '|| last_name = $1;`, [update.employeeId, update.new_role])

                } catch (error) {
                    console.error('Error updating employee role:', error);
                }
                break;
            case 'Quit':
                console.log('Shut Down');
                break;
            default:
                console.log('Invalid choice');
        }
    } catch (error) {
        console.error('Error during action:', error);
    }
        // choice !== 'Quit' ? init() : pool.end();
};


async function init() {
    try {
        const answer = await inquirer.prompt(startingPoint);
        await chooseAction(answer.action, db);
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}

init();



module.exports = pool
const inquirer = require("inquirer");
const { startingPoint, addDepartment, addRole, addEmployee } = require('./prompts');
//  updateRole
// const CompanyDB = require("./db");
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
    console.log(`Choice:${choice}`)
    switch (choice) {
        case 'View all departments':
            const selectedDepartments = await db.makeQuery(`SELECT * FROM departments;`)
            const deptTable = new SelectTable(selectedDepartments.rows, [4,20]);
			deptTable.createTable();
            break;
        case 'View all roles':
            const selectedRoles = await db.makeQuery(`SELECT r.id, r.title, d.name AS department, r.salary 
			FROM roles AS r
			LEFT JOIN departments AS d
			ON r.department_id = d.id;`);
            const roleTable = new SelectTable(selectedRoles.rows, [4,15,20,10]);
			roleTable.createTable();
            break;
            
        case 'View all employees':
            const selectedEmployees = await db.makeQuery(`
            SELECT e.id, e.first_name || ' ' || e.last_name AS employee, 
            r.title AS title, 
            d.name AS department, 
            r.salary AS salary, 
            m.first_name ||' '|| m.last_name AS manager
            FROM employees AS e
            JOIN roles AS r on e.role_id = r.id
            JOIN departments AS d on r.department_id = d.id
            LEFT JOIN employees AS m ON e.manager_id = m.id;`)
            const employeeTable = new SelectTable(selectedEmployees.rows, [4, 30, 15, 20, 10, 30]);
			employeeTable.createTable();            break;

        case 'Add a department':
			inquirer.prompt(addDepartment).then((dep) => connectedDB.addADepartment(dep));
            break;
        case 'Add a role':
            addRole()
			// inquirer.prompt(addRole).then((role) => connectedDB.addARole(role));
			break;

        // case 'Add an employee':
		// 	const{ firstName, lastName, role, manager} = employee;
		// 	inquirer.prompt(addEmployee).then((emp) =>{
		// 	});
		// 	break;
        // case 'Update employee role':
		// 	inquirer.prompt(updateRole).then((role, empId) =>{
        //     // todo UPDATE employee SET role = `${role}` WHERE employee_id = ${empId}
		// 	});
        //     break;
        case 'Quit':
            console.log('Shut Down');
            break;
        default:
            console.log('Invalid choice');
    };
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
module.exports = pool
init();
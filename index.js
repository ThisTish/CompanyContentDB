const inquirer = require("inquirer");
const { startingPoint } = require('./prompts');
// , addDepartment, addEmployee, addRole, updateRole
const CompanyDB = require("./db");

const { Pool } = require('pg');

const pool = new Pool(
    {
        user: 'postgres',
        password: '1086721La',
        host: 'localhost',
        database: 'company_db',
		port: 5432
    },
    console.log('Connected to the Company Database')
);

const connectedDB = new CompanyDB(pool)

// switch and case for startingPoint
async function chooseAction(choice) {
    console.log(`Choice:${choice}`)
    switch (choice) {
        case 'View all departments':
            const departments = await connectedDB.getDepartments()
            console.log(`All departments:${departments}`)
            break;
        // case 'View all roles':
        //     // todo SELECT * FROM roles--(role, id, dep., salary)
        //     break;
        // case 'View all employees':
        //     // todo SELECT * FROM employees--(id, firstname, lastname, role, dep., salary, manager)join tables
        //     break;
        // case 'Add a department':
		// 	inquirer.prompt(addDepartment).then((dep) =>{
        //     // todo INSERT INTO departments(department_name)VALUES(prompt.department)
		// 	});
        //     break;
        // case 'Add a role':
		// 	inquirer.prompt(addRole).then((role) =>{
        //     // todo INSERT INTO roles(name, salary, department)VALUES(prompt.role_name, prompt.salary, prompt.department(s/c w/dep. id?))
		// 	});
		// 	break;
        // case 'Add an employee':
		// 	const{ firstName, lastName, role, manager} = employee;
		// 	inquirer.prompt(addEmployee).then((emp) =>{
        //     // todo INSERT INTO employees(first_name, last_name, role, manager)
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
};


async function init() {
    try {
        const answer = await inquirer.prompt(startingPoint);
        await chooseAction(answer.action, connectedDB); // Pass the instance of CompanyDB
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}

init();
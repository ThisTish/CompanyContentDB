const inquirer = require("inquirer");
const { startingPoint, addDepartment, addRole, addEmployee } = require('./prompts');
//  updateRole
const CompanyDB = require("./db");

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

const connectedDB = new CompanyDB(pool)

// switch and case for startingPoint
async function chooseAction(choice) {
    console.log(`Choice:${choice}`)
    switch (choice) {
        case 'View all departments':
            await connectedDB.getDepartments()
            break;
        case 'View all roles':
            await connectedDB.getRoles()
            break;
            
        case 'View all employees':
            await connectedDB.getEmployees()
            break;

        case 'Add a department':
			inquirer.prompt(addDepartment).then((dep) => connectedDB.addADepartment(dep));
            break;
        case 'Add a role':
			inquirer.prompt(addRole).then((role) => connectedDB.addARole(role));
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
        await chooseAction(answer.action, connectedDB);
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}

init();
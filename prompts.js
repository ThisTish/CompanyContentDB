const {CompanyDB ,SelectTable}= require('./helpers');
const {Pool} = require('pg')
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


// prompt to start out making a selection
const startingPoint = [
	{
		name: 'action',
		message: 'What would you like to do?',
		type: 'list',
		choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role', 'Quit']
	}
];

// adding prompts section
const addDepartment = [{
	name: 'department',
	message: 'Name of new department:',
	type: 'input',
	validate: async(input) =>{
		return input ?  true : error('Please enter a new department.')
		}
	}
];

// const updateRole = ()=> db.getList(`SELECT first_name ||' '|| last_name AS employee
// FROM employees;`).then((choicesArray)=>[
const addRole = () => db.getList(`SELECT name FROM departments;`).then((choicesArray)=>
	[
		{
	name: 'name',
	message: 'Name of new role:',
	type: 'input',
	validate: async(input) =>{
		return input ?  true : error('Please enter a new role.')
		}
	},
	{
	name: 'salary',
	message: 'Salary:',
	type: 'input',
	validate: async(input) =>{
		return input ?  true : error('Please enter an amount.')
		}
	},
	{
	name: 'department',
	message: 'Department:',
	type: 'list',
	choices: choicesArray
	}
])
// )
// })
// }

const addEmployee = [
	{
	name: 'firstName',
	message: "Employee's first name:",
	type: 'input',
	validate: async(input) =>{
		return input ?  true : error('Please enter a first name.')
		}
	},
	{
	name: 'lastName',
	message: "Employee's last name:",
	type: 'input',
	validate: async(input) =>{
		return input ?  true : error('Please enter a last name.')
		}
	},
	{
	name: 'role',
	message: "Employee's role Id:",
	type: 'input',
	// choices: [retrieveRoles()]
	validate: async(input) =>{
		return input ?  true : error('Please enter a last name.')
		}
	},
	{
	name: 'manager',
	message: "Employee's direct manager Id:",
	type: 'input',
	// choices: [retrieveManagers()]
	validate: async(input) =>{
		return input ?  true : error('Please enter a last name.')
		}
	}
];

// updating prompt section
const updateRole = ()=> db.getList(`SELECT first_name ||' '|| last_name AS name
FROM employees;`).then((choicesArray)=>[
	{
		name: 'employeeId',
		message:"Employee:",
		type: 'list',
		choices: choicesArray
	},
	{
		name:'new_role',
		message: "Employee's role:",
		type: 'input',
		validate: async(input) =>{
			return input ? true : error('Please select a new role.')
		}
	}
])

module.exports = { startingPoint, addDepartment, addRole, addEmployee, updateRole }
// , , addRole, updateRole
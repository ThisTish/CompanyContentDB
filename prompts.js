const {CompanyDB }= require('./helpers');
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
		choices: ['View all departments', 'View all roles', 'View all employees', 'View employees by manager', 'View employees by department',
		'Add a department', 'Add a role', 'Add an employee', 'Update employee role', 'Update employee manager', 'Quit']
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
]);
const addEmployee = async () => {
	const choicesArray = await db.getList(`SELECT first_name||' '||last_name AS name FROM employees;`)
	const rolesArray = await db.getList(`SELECT title AS name FROM roles;`)
	
	return [
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
	type: 'list',
	choices: rolesArray
	},
	{
	name: 'manager',
	message: "Employee's direct manager Id:",
	type: 'list',
	choices: choicesArray
	}
]}

// updating prompt section
const updateRole = async () =>{
const employeesArray = await db.getList(`SELECT first_name ||' '|| last_name AS name
FROM employees;`)
const rolesArray = await db.getList(`SELECT title AS name FROM roles;`)
return [
	{
		name: 'name',
		message:"Employee:",
		type: 'list',
		choices: employeesArray
	},
	{
		name:'role',
		message: "Employee's role:",
		type: 'list',
		choices: rolesArray
	}
]}
const updateManager = ()=> db.getList(`SELECT first_name ||' '|| last_name AS name
FROM employees;`).then((choicesArray)=>[
	{
		name: 'employee',
		message:"Employee:",
		type: 'list',
		choices: choicesArray
	},
	{
		name:'manager',
		message: "Employee's role:",
		type: 'list',
		choices: choicesArray
	}
])

// prompts for catagorized viewing
const selectManager = () => db.getList(`SELECT first_name ||' '|| last_name AS name
FROM employees;`).then((choicesArray)=>
[
	{
		name: 'name',
		message: 'Manager:',
		type: 'list',
		choices: choicesArray
	}
])
const selectDepartment = () => db.getList(`SELECT name FROM departments`).then((choicesArray)=>
[
	{
		name: 'name',
		message: 'Department:',
		type: 'list',
		choices: choicesArray
	}
])




module.exports = { startingPoint, addDepartment, addRole, addEmployee, updateRole, updateManager, selectManager, selectDepartment }
// , , addRole, updateRole
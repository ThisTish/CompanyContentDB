const inquirer = require("inquirer");
const CompanyDB = require("./db");
const db = new CompanyDB
const listSelected = require('./helpers')
// prompt to start out making a selection
const startingPoint = [
	{
		name: 'action',
		message: 'What would you like to do?',
		type: 'list',
		choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role', 'Quit']
	}
];

// // adding prompts section
const addDepartment = [{
	name: 'department',
	message: 'Name of new department:',
	type: 'input',
	validate: async(input) =>{
		return input ?  true : error('Please enter a new department.')
		}
	}
];

// function addRole() {
// 	db.getsThings().then(({rows})=>{
// 		let depts = rows
// 		console.log(`Depts:${depts}`)
// 		const deptsChoice = depts.map(({id,name})=>{
// 			({name: name, value: id})
// 		})
	
	// inquirer.prompt([
const addRole = [
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
	// ! How to fill choices with list of departments
	{
	name: 'department',
	message: 'Department Id:',
	type: 'input',
	// choices: 
	}
]
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

// // updating prompt section
// const updateRole = [
// 	{
// 		name: 'employee',
// 		message:"Employee:",
// 		type: 'list',
// 		choices: [retrieveEmployees()]
// 	},
// 	{
// 		name:'new_role',
// 		message: "Employee's role:",
// 		type: 'input',
// 		validate: async(input) =>{
// 			return input ? true : error('Please select a new role.')
// 		}
// 	}
// ]

module.exports = { startingPoint, addDepartment, addRole, addEmployee }
// , , addRole, updateRole
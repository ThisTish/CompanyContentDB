const inquirer = require("inquirer");
const CompanyDB = require("./db");
const db = new CompanyDB
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
		return input ?  true : error('Please enter an amout.')
		}
	},
	// ! How to fill choices with list of departments
// 	{
// 	name: 'department',
// 	message: 'Department:',
// 	type: 'list',
// 	choices: db.listDept()
// }
{
	name: 'department',
	message: 'Department:',
	type: 'input',
	validate: async(input) =>{
		return input ?  true : error('Please enter an amout.')
		}
}
];
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
	message: "Employee's role:",
	type: 'input',
	// choices: [retrieveRoles()]
	validate: async(input) =>{
		return input ?  true : error('Please enter a last name.')
		}
	},
	{
	name: 'manager',
	message: "Employee's direct manager:",
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
const inquirer = require("inquirer");
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
	{
	name: 'department',
	message: 'Department:',
	type: 'input',
	choices: [retrieveDepartments()]
	}
];
// todo retrieveDepartments() by getDepartments, but fill in answer.rows as choices.
// const addEmployee = [
// 	{
// 	name: 'firstName',
// 	message: "Employee's first name:",
// 	type: 'input',
// 	validate: async(input) =>{
// 		return input ?  true : error('Please enter a first name.')
// 		}
// 	},
// 	{
// 	name: 'lastName',
// 	message: "Employee's last name:",
// 	type: 'input',
// 	validate: async(input) =>{
// 		return input ?  true : error('Please enter a last name.')
// 		}
// 	},
// 	{
// 	name: 'role',
// 	message: "Employee's role:",
// 	type: 'input',
// 	choices: [retrieveRoles()]
// 	},
// 	{
// 	name: 'manager',
// 	message: "Manager:",
// 	type: 'input',
// 	choices: [retrieveManagers()]
// 	}
// ];

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

module.exports = { startingPoint, addDepartment  }
// , addEmployee, addRole, updateRole
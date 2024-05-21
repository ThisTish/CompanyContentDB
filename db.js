// const Table = require('cli-table3');

const selectTable = require("./helpers");
const listSelected = require('./helpers');

class CompanyDB{
	constructor(pool){
		this.pool = pool;
	}
	async getDepartments(){
		try{
			const selected = await this.pool.query('SELECT * FROM departments;');
			const deptTable = new selectTable(selected.rows, [4,20]);
			deptTable.createTable();
		}
		catch(err){
		console.log('Error in creating table!', err);
		}
	}
	async getRoles(){
		try{
			const selected = await this.pool.query(`SELECT r.id, r.title, d.name AS department, r.salary 
			FROM roles AS r
			LEFT JOIN departments AS d
			ON r.department_id = d.id;`);
			const roleTable = new selectTable(selected.rows, [4,15,20,10]);
			roleTable.createTable();
		}
		catch(err){
		console.log('Error in creating table!', err);
		}
	}
	async getEmployees(){
		try{
			const selected = await this.pool.query(`
				SELECT e.id, e.first_name || ' ' || e.last_name AS employee, 
				r.title AS title, 
				d.name AS department, 
				r.salary AS salary, 
				m.first_name ||' '|| m.last_name AS manager
				FROM employees AS e
				JOIN roles AS r on e.role_id = r.id
				JOIN departments AS d on r.department_id = d.id
				LEFT JOIN employees AS m ON e.manager_id = m.id;`);
			const empTable = new selectTable(selected.rows, [4, 30, 15, 20, 10, 30]);
			empTable.createTable();
		}
		catch(err){
		console.log('Error in creating table!', err);
		}
	}
		async addADepartment(input){
			console.log(input)
			try{
			await this.pool.query(`INSERT INTO departments(name)
			VALUES ($1);`, [input.department])
			console.log('Success! Department added!')
			}
			catch(err){
				console.log('Error trying to add department.', err)
			}
		}
		async addARole(input){
			console.log(input)
			
			try{
			await this.pool.query(`INSERT INTO roles (title, salary, department_id)
			VALUES ($1, $2, $3);`, [input.title, input.salary, input.department])
			console.log('Success! Role added!')
			}
			catch(err){
				console.log('Error trying to add department.', err)
			}
		}

		// !one part of list making
		async listDept(){
			const selected = await this.pool.query(`SELECT * FROM departments;`);
			console.log(`listDept Selected: ${selected}`)
			listSelected(selected);

		}

		async getsThings(){
			const selected = await pool.query(`SELECT * FROM departments;`)
			console.log(selected.rows)
			const choicesArray = selected.rows.map(row =>row.name)
			console.log(choicesArray)
			return choicesArray
		}
		// ! how to input dept id, by selecting department name???
		// async addAnEmployee(input){
		// 	console.log(input)
		// 	try{
		// 	await this.pool.query(`INSERT INTO employees(first_name, last_name, ..)
		// 	VALUES ($1);`, [input.department])
		// 	console.log('Success! Department added!')
		// 	}
		// 	catch(err){
		// 		console.log('Error trying to add department.', err)
		// 	}
		// }

		// *Bonuses
		// todo add to prompts & s/c
	// // todo create new table layout with span column for manager's name
//	// todo select from manager list?
	// 	async getEmpByManager(){
	// 		try{
	// 			const selected = await this.pool.query(`SELECT first_name ||' '|| last_name AS Employee
	// 			FROM employees
	// 			WHERE manager_id = $1;`);
	// 			const empByManagerTable = new selectTable(selected.rows, [25]);
	// 			empByManagerTable.createTable();
	// 		}
	// 		catch(err){
	// 		console.log('Error in creating table!', err);
	// 		}
	// 	}
	// // todo additional from above, match name with r.department_id?
	// 	async getEmpByDept(){
	// 		try{
	// 			const selected = await this.pool.query(`SELECT e.first_name ||' '|| e.last_name AS employee, d.name AS department
	// 			FROM employees AS e
	// 			JOIN roles AS r ON e.role_id = r.id
	// 			INNER JOIN departments AS d ON r.department_id = $1;`);
	// 			const deptTable = new selectTable(selected.rows, [25,25]);
	// 			deptTable.createTable();
	// 		}
	// 		catch(err){
	// 		console.log('Error in creating table!', err);
	// 		}
	// 	}
	// // todo same as above, provide department names, then match department name with department id to match up with r.department_id
	// 	async salaryByDepartment(){
	// 		try{
	// 			const selected = await this.pool.query(`SELECT SUM(r.salary), d.name
	// 			FROM roles AS r 
	// 			LEFT JOIN departments AS d 
	// 			ON r.department_id = $1;`);
	// 			const deptTable = new selectTable(selected.rows, [4,20]);
	// 			deptTable.createTable();
	// 		}
	// 		catch(err){
	// 		console.log('Error in creating table!', err);
	// 		}
	// 	}
}

module.exports = CompanyDB
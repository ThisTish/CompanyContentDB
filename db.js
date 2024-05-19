const Table = require('cli-table3');
const createTable = require('./helper');

const table = new Table()
class CompanyDB{
	constructor(pool){
		this.pool = pool;
	}
	async query(sql, input) {
		try{
			const selected = await this.pool.query(sql, input);
			createTable(selected.rows);
			// console.log(table.toString());
			return JSON.stringify(selected.rows);
		}catch (err){
			console.log('Error during query', err);
			throw err;
		}
	}
		getDepartments(){
			return this.query('SELECT * FROM departments;');
		}
		
		// // todo need to alter with a join.
		// function getRoles(){
		// 	return this.query('SELECT * FROM roles');
		// }
		// // todo need to alter with a join.
		// function getEmployees(){
		// 	return this.query('SELECT * FROM employees');
		// }

		// function addADepartment(){
		// 	return this.query(`INSERT INTO departments(name)
		// 	VALUES ($1);`)
		// }
	
}

module.exports = CompanyDB
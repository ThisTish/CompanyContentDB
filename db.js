// const Table = require('cli-table3');

const selectTable = require("./tables");

class CompanyDB{
	constructor(pool){
		this.pool = pool;
	}
	// async query(sql, input) {
	// 	try{
	// 		const selected = await this.pool.query(sql, input);
	// 		createTable(selected.rows);
	// 	}
	// 	catch (err){
	// 		console.log('Error during query', err);
	// 		throw err;
	// 	}
	// }
		async getDepartments(){
			try{
				const selected = await this.pool.query('SELECT * FROM departments;');
				const deptTable = new selectTable(selected.rows, [4,20]);
				deptTable.createTable();
		}
		catch(err){
			console.log('error in creating table!', err);
		}
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
const { Pool, Query } = require('pg');

const pool = new Pool(
    {
        user: 'postgres',
        password: '1086721La',
        host: 'localhost',
        database: 'company_db'
    },
    console.log('Connected to the Comapny Database')
);


class companyDB{
	constructor(pool){
		this.pool = pool;
	}
	async query(sql, input) {
		try{
			const selected = await this.pool.query(sql, input);
			console.log(`Query returned ${selected}`);
			return selected.rows;
		}catch (err){
			console.log('Error during query', err);
			throw err;
		}

		function getDepartments(){
			return this.query('SELECT * FROM departments');
		}
		// todo need to alter with a join.
		function getRoles(){
			return this.query('SELECT * FROM roles');
		}
		// todo need to alter with a join.
		function getEmployees(){
			return this.query('SELECT * FROM employees');
		}

		function addADepartment(){
			return this.query(`INSERT INTO departments(name)
			VALUES ($1);`)
		}
	}
}
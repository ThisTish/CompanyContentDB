const Table = require('cli-table3');
const pool = require('./index')


class CompanyDB{
	constructor(pool){
		this.pool = pool;
	}
	async makeQuery(sql, val){
		try {
			const selected = await this.pool.query(sql, val)
			return selected
		} catch (error) {
			console.log(`error in getting query:`, error)
		}
	}
}

const db = new CompanyDB(pool);

async function getList(){
	const choices =  await db.makeQuery(`SELECT first_name ||' '|| last_name AS employee
		FROM employees;`)
		console.log(choices.rows)
		const choicesArray = choices.rows.map(row => row.employee)
		console.log(choicesArray)
		return choicesArray	
} 


class SelectTable{
	constructor(data, col){
		this.data = data;
		this.col = col;
	}
	
	createTable(){
		if(this.data.length === 0){
			console.log('None to show');
			return;
		}
		const headers = Object.keys(this.data[0]);
		const table = new Table({
			head: headers.map(header => header),
			colWidths: this.col
		});
		this.data.forEach(row =>{
			table.push(Object.values(row).map(value => String(value)));
		});
		console.log(table.toString())
}

}


module.exports = {CompanyDB, SelectTable}  

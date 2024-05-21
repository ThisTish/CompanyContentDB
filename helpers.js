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


// ! other part of list making
// async  listSelected(choices) {
// 	const choicesArray = await choices.rows.map(row => row.name)
// 	console.log(`ChoicesArray: ${choicesArray}`);
// 	return choicesArray;
// }
// async function getsThings(){
// 	const selected = await pool.query(`SELECT * FROM departments;`)
// 	console.log(selected.rows)
// 	const choicesArray = selected.rows.map(row =>row.name)
// 	console.log(choicesArray)
// 	return choicesArray
// }
// getsThings()

module.exports = {CompanyDB, SelectTable}  

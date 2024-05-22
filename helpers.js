const Table = require('cli-table3');


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
	async getList(sql){
		try{
			const choices =  await this.makeQuery(sql)
			console.log(choices.rows)
			const choicesArray = choices.rows.map(row => row.name)
			console.log(choicesArray)
			return choicesArray
		}catch (error) {
		console.log(`error in getting list:`, error)
		}
	} 
	async getIdByName(sql, input){
		console.log(input)
		try {
			const id = await this.makeQuery(sql, [input])
			if(id.rows.length > 0){
				return id.rows[0]
			}
			else{console.error(`${input} not found`);
			}
		} catch (error) {
			console.log(`Error in getting Id with ${input}`,error )
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


module.exports = {CompanyDB, SelectTable}  

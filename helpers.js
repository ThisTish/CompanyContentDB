const Table = require('cli-table3');

class selectTable{
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
async function listSelected(choices) {
	const choicesArray = await choices.rows.map(row => row.name)
	console.log(`ChoicesArray: ${choicesArray}`);
	return choicesArray;
}

module.exports = selectTable, listSelected

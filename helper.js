const Table = require('cli-table3');

function createTable(data){
	if(data.length === 0){
		console.log('None to show');
		return;
	}
	const headers = Object.keys(data[0]);
	const table = new Table({
		head: headers.map(header => header),
		colWidths: headers.map(header => header.length + 2, 10),
	});
	data.forEach(row =>{
		table.push(Object.values(row).map(value => String(value)));
	});
	console.log(table.toString())
}

module.exports = createTable
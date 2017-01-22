var fs = require('fs');



mkdir = (dir) => {
	try {
		fs.mkdirSync(dir);
	} catch (e) {
		console.log('DIR exists: ' + dir)
	}
}


var times = fs.readFileSync('boat.json');
times = JSON.parse(times);

var out = {};

times.forEach((item) => {
	var city = item.origin[0]
	var district = item.origin[1];
	if (!out[district]) out[district] = {};
	if (!out[district][city]) out[district][city] = [];
	out[district][city].push(item);
});

for (var district in out) {
	mkdir(`../PH/${district}`);
	mkdir(`../PH/${district}/OUT`);
	fs.writeFileSync(`../PH/${district}/OUT/boat.json`, JSON.stringify(out[district]));
}

var _in = {};

times.forEach((item) => {
	var city = item.destination[0]
	var district = item.destination[1];
	if (!_in[district]) _in[district] = {};
	if (!_in[district][city]) _in[district][city] = [];
	_in[district][city].push(item);
});

for (var district in _in) {
	mkdir(`../PH/${district}`);
	mkdir(`../PH/${district}/IN`);
	fs.writeFileSync(`../PH/${district}/IN/boat.json`, JSON.stringify(_in[district]));
}
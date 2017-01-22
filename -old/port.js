// var TREE = {};
// for (var port in )
// 	var treeHTML = '<link rel="stylesheet" type="text/css" href="/style/port.css">';
// for (var region in TREE) {
// 	if (!TREE[P1.region]) TREE[P1.region] = {};
// 	TREE[P1.region][P1.city] = P1.lat + ',' + P1.lon;
// 	treeHTML += `<table><tr> <td rowspan='5'>${makeRegionMap(TREE[region])}</td> <td class='title'><a href='${region}/ports.html'>${region}</a></td>  </tr>`;
// 	var i = 0;
// 	for (var city in TREE[region]) {
// 		treeHTML += `<tr><td><span class='letter'>${String.fromCharCode(65+(i++))}</span><a href='${region}/${city}/port.html'>${city}</a></td></tr>\n`;
// 	}
// 	treeHTML += `</table>`;
// }
// fs.writeFileSync(`PH/ports.html`, treeHTML);



// var REGIONS = {};
// for (var code in PORTS) {
// 	var P = PORTS[code];
// 	if (!REGIONS[P.region]) REGIONS[P.region] = [];
// 	REGIONS[P.region].push(P);
// }
// 	if (!REGIONS[P1.region]) REGIONS[P1.region] = '<link rel="stylesheet" type="text/css" href="../../port.css">';
// 	REGIONS[P1.region] += `<h2>${P1.city}</h2>` + html;


// TREE[region].forEach((city, i) => {
// treeHTML += `<h1><a href='${region}/ports.html'>${region}</a></h1>\n`;
// treeHTML += `<h3><a href='${region}/${city}/port.html'>${city}</a></h3>\n`;


// fs.writeFileSync(`PH/${P1.region}/${P1.city}/port.html`, makePort(times[_from][_to]));


// var times = fs.readFileSync('boat.json');
// times = JSON.parse(times);

// var out = {};

// times.forEach((item) => {
// 	var city = item.origin[0]
// 	var district = item.origin[1];
// 	var target = item.destination.join(',');
// 	if (!out[district]) out[district] = {};
// 	if (!out[district][city]) out[district][city] = {};
// 	if (!out[district][city][target]) out[district][city][target] = [];
// 	out[district][city][target].push(item);
// });

// JSON
// for (var district in out) {
// 	mkdir(`../PH/${district}`);
// 	for (var city in out[district]) {
// 		mkdir(`../PH/${district}/${city}`);
// 		fs.writeFileSync(`../PH/${district}/${city}/port.json`, JSON.stringify(out[district][city]));
// 	}
// }


// HTML
// for (var district in out) {
// 	mkdir(`../PH/${district}`);
// 	for (var city in out[district]) {
// 		mkdir(`../PH/${district}/${city}`);
// 		fs.writeFileSync(`../PH/${district}/${city}/port.html`, makePorts(out[district][city]));
// 	}
// }

// var _in = {};

// times.forEach((item) => {
// 	var city = item.destination[0]
// 	var district = item.destination[1];
// 	if (!_in[district]) _in[district] = {};
// 	if (!_in[district][city]) _in[district][city] = [];
// 	_in[district][city].push(item);
// });

// for (var district in _in) {
// 	mkdir(`../PH/${district}`);
// 	mkdir(`../PH/${district}/IN`);
// 	fs.writeFileSync(`../PH/${district}/IN/boat.json`, JSON.stringify(_in[district]));
// }
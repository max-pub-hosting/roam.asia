var fs = require('fs');
load = file => JSON.parse(fs.readFileSync(file));

var TIMES = load('sea/times.flat.json');
var TIMESTREE = load('sea/times.tree.json');
var PORTS = load('sea/ports.flat.json');
var PORTSTREE = load('sea/ports.tree.json');
var OPERATORS = load('sea/operators.json');



mkdir = (dir) => {
	// console.log("MKDIR", dir);
	try {
		fs.mkdirSync(dir);
	} catch (e) {
		console.log('DIR exists: ' + dir)
	}
}


HTML = {
	iconListItem: (p) => {
		var P1 = PORTS[p.from];
		var P2 = PORTS[p.to];
		return `
			<table class='icon-list-item'>
				<tr>
					<td class='img' rowspan='2'>
						<img src='https://maps.googleapis.com/maps/api/staticmap
							?key=AIzaSyDtx24rTJ_yVIdMFUZrUNO33FOKnbXjovA
							&size=200x140
							&maptype=terrain
							&markers=color:blue|label:A|${P1.lat},${P1.lon}
							&markers=color:green|label:B|${P2.lat},${P2.lon}
							&path=color:0xff0000ff|weight:3|${P1.lat},${P1.lon}|${P2.lat},${P2.lon}
							&style=feature:poi|visibility:off'/>
					</td>
					<td class='title'>
						&odot; ${P1.city}
						&rarr; ${P2.city}
					</td>
				</tr>
				<tr>
					<td colspan='1' class='operators'>
						${p.operators}
					</td>
				</tr>
			</table>
		`;
	},

	operator: (p) => {
		if (!OPERATORS[p.operator]) return '';
		return `
			<tr>
				<td class='operator'>
					${OPERATORS[p.operator].name}
				</td>
				<td class='price'>
					${p.price} PHP
				</td>
			</tr>
			<tr>
				<td colspan='1' class='times'>
					${p.times}
				</td>
				<td class='duration'>
					${p.duration} min
				</td>
			</tr>
		`;
	}
}


makePort = (port) => {
	port[0].operators = '';
	port.forEach((operator) => {
		port[0].operators += HTML.operator(operator);
	});
	port[0].operators = `<table>${port[0].operators}</table>`;

	return HTML.iconListItem(port[0]);
}


var basePath = '../PH/';
var styleLink = '<link rel="stylesheet" type="text/css" href="/style/port.css">';

// ---------------------------
// COUNTRY/REGION/CITY/PORT.html
// ---------------------------
var CITIES = {};
for (var _from in TIMESTREE) {
	var P1 = PORTS[_from];
	mkdir(basePath + `${P1.region}`);
	mkdir(basePath + `${P1.region}/${P1.city}`);

	CITIES[_from] = '';
	for (var _to in TIMESTREE[_from])
		CITIES[_from] += makePort(TIMESTREE[_from][_to]);

	fs.writeFileSync(basePath + `${P1.region}/${P1.city}/port.html`, styleLink + CITIES[_from]);
}



// ---------------------------
// COUNTRY/REGION/PORTS.html
// ---------------------------

var REGIONS = {};
for (var region in PORTSTREE) {
	REGIONS[region] = styleLink;
	for (var city in PORTSTREE[region])
		REGIONS[region] += CITIES[PORTSTREE[region][city].code];
	fs.writeFileSync(basePath + `${region}/ports.html`, REGIONS[region]);
}



// ---------------------------
// COUNTRY/PORTS.html
// ---------------------------

makeRegionMap = (region) => {
	var html = `
	<img src='https://maps.googleapis.com/maps/api/staticmap
							?key=AIzaSyDtx24rTJ_yVIdMFUZrUNO33FOKnbXjovA
							&size=300x200
							&maptype=terrain`;
	var i = 0;
	for (var city in region) {
		html += `&markers=color:green|label:${String.fromCharCode(65+(i++))}|${region[city].lat},${region[city].lon}`;
	}
	html += `&style=feature:poi|visibility:off'/>`;
	return html;
}

var COUNTRY = styleLink;
for (var region in PORTSTREE) {
	COUNTRY += `<table><tr> <td rowspan='10'>${makeRegionMap(PORTSTREE[region])}</td> <td class='title'><a href='${region}/ports.html'>${region}</a></td>  </tr>`;
	var i = 0;
	for (var city in PORTSTREE[region]) {
		COUNTRY += `<tr><td><span class='letter'>${String.fromCharCode(65+(i++))}</span><a href='${region}/${city}/port.html'>${city}</a></td></tr>\n`;
	}
	COUNTRY += `</table>`;
}
fs.writeFileSync(basePath + `ports.html`, COUNTRY);



// --
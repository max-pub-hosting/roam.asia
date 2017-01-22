var fetch = require('node-fetch');
var fs = require('fs');


fetch('http://api.max.pub/google/sheet/?doc=1ECowHw9wDaUt0AevWPutQnk3enmoB551st7VjXxzsl8&colNames&colNamesCC')
	.then((response) => response.json())
	.then((json) => {
		fs.writeFileSync(`boat.times.json`, JSON.stringify(json));
	});

fetch('http://api.max.pub/google/sheet/?doc=1ECowHw9wDaUt0AevWPutQnk3enmoB551st7VjXxzsl8&gid=575777383&colNames&rowNames&colNamesCC')
	.then((response) => response.json())
	.then((json) => {
		fs.writeFileSync(`boat.ports.json`, JSON.stringify(json));
	});

fetch('http://api.max.pub/google/sheet/?doc=1ECowHw9wDaUt0AevWPutQnk3enmoB551st7VjXxzsl8&gid=666296596&colNames&rowNames&colNamesCC')
	.then((response) => response.json())
	.then((json) => {
		fs.writeFileSync(`boat.operators.json`, JSON.stringify(json));
	});

// fetch('http://api.max.pub/google/sheet/?doc=1ECowHw9wDaUt0AevWPutQnk3enmoB551st7VjXxzsl8')
// 	.then((response) => response.json())
// 	.then((times) => {
// 		var out = [];
// 		times.forEach((item) => {
// 			out.push({
// 				origin: item.FROM.split(',').map((x) => x.trim()),
// 				destination: item.TO.split(',').map((x) => x.trim()),
// 				duration: item.DURATION * 1,
// 				price: item.PRICE * 1,
// 				times: item.TIMES.split(',').map((x) => x.trim())
// 			});
// 		});
// 		fs.writeFileSync(`boat.json`, JSON.stringify(out));
// 	});
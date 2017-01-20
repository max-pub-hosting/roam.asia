class Ports {
	constructor(map) {
		this.map = map;
		this.A = '';
		this.B = '';
		this.markers = {};
		this.map.addListener('click', () => this.reset());
		this.load();
		this.Adom = document.querySelector('#from');
		this.Bdom = document.querySelector('#to');
		this.TTdom = document.querySelector('#times');
	}


	load() {
		fetch('data/sea/ports.json')
			.then((response) => response.json())
			.then((ports) => {
				this.ports = ports;
				this.addMarkers();
			});

		fetch('data/sea/times.json')
			.then((response) => response.json())
			.then((times) => {
				this.times = times;
			});

	}


	addMarkers() {
		for (var portCode in this.ports) {
			var p = this.ports[portCode];
			this.markers[portCode] = MARKER.add(p.lat, p.lon);
			this.markerAction(portCode);
		}
	}

	setIcon(portCode, label, color, size) {
		this.markers[portCode].setIcon(MARKER.circle(color, size));
		if (label)
			this.markers[portCode].setLabel({
				text: label,
				color: '#fff'
			});
		else
			this.markers[portCode].setLabel(null);
	}
	markerAction(portCode) {
		this.markers[portCode].addListener('click', () => {
			if (this.A)
				if (this.ports[this.A].destinations.includes(portCode)) // valid target
					return this.setStop(portCode);
			this.setStart(portCode);
		});
	}

	pathDOM(portCode, icon) {
		return `<td class='icon'>&${icon};</td> 
				<td class='city'>${this.ports[portCode].city}</td> 
				<td class='region'>${this.ports[portCode].region}</td> 
				<td class='close'>&times;</td>`;
	}
	timesDOM(portCode) {
		var HTML = '';
		this.times[this.A][this.B].forEach(operator => {
			HTML += `<table>
					<h4>${operator.operator}</h4>
					<div>
						<span class='duration'>${operator.duration} min</span>
						<span class='price'>${operator.price} PHP</span>
					</div>
					<ul>
					`;
			operator.times.forEach(time => {
				var t = time.split(':');
				HTML += `<li onclick='sendMail("${operator.operator}","${time}");'>${t[0]*1}<sup>${t[1]}</sup></li>`;
			});
			HTML += '</ul></div>';
		})
		return HTML;
	}

	setStart(portCode) {
		console.log("setStartPort ", portCode);
		this.reset('#aaa', 5)

		this.B = '';
		this.Bdom.innerHTML = '';
		this.TTdom.innerHTML = '';

		this.Adom.innerHTML = this.pathDOM(portCode, 'odot');
		this.setIcon(portCode, 'A', '#f00', 9);
		this.A = portCode;

		for (var P in this.times[portCode]) // possible targets
			this.setIcon(P, null, '#f00', 5);
	}


	setStop(portCode) {
		console.log("setStopPort ", portCode);
		if (this.B)
			this.setIcon(this.B, null, '#f00', 5);
		this.Bdom.innerHTML = this.pathDOM(portCode, 'rarr');
		this.setIcon(portCode, 'B', '#f00', 9);
		this.B = portCode;
		this.TTdom.innerHTML = this.timesDOM();
	}

	reset(color, size) {
		console.log('reset markers');
		this.A = '';
		this.B = '';
		this.Adom.innerHTML = '';
		this.Bdom.innerHTML = '';
		this.TTdom.innerHTML = '';
		for (var P in this.markers)
			this.setIcon(P, null, color, size);
	}

}



// clearB() {
// 	this.markers[this.B].setLabel(null);
// 	this.B = '';
// 	this.Bdom.innerHTML = '';
// }


// console.log('marker click a:', this.A, 'click:', portCode, this.A ? 'y' : 'n');
// if (this.times[this.A]) // valid source
// 	if (this.times[this.A][portCode]) // valid target
// 		return this.setStop(portCode);
// else // no target... new start
// this.setStart(portCode);
// else this.setStart(portCode);
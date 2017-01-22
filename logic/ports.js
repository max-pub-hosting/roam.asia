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
		this.Ddom = document.querySelector('#dates');
		this.Tdom = document.querySelector('#times');
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

	setPathHTML(path) {
		this[path + 'dom'].innerHTML = `<tr>
				<td class='icon'>&${path=='A'?'odot':'rarr'};</td> 
				<td>
					<span class='city'>${this.ports[this[path]].city}</span> 
					<span class='region'>${this.ports[this[path]].region}</span> 
				</td>
				<td class='close' onclick="${path=='A'?'PORTS.reset()':'PORTS.setStart(PORTS.A)'}"">&times;</td>
				</tr>`;
	}
	setDatesHTML() {
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		var HTML = '';
		for (var i = 0; i < 30; i++) {
			var d = new Date(new Date().getTime() + 86400000 * i);
			HTML += `<div>
						<span class='day'>${days[d.getDay()]}</span>
						<span class='date'>${d.getDate()}</span>
						<span class='month'>${months[d.getMonth()]}</span>
					</div>`;
		}
		this.Ddom.innerHTML = HTML;
	}

	setTimeTableHTML() {
		var HTML = '';
		this.times[this.A][this.B][0].times.forEach(time => {
			var t = time.split(':');
			HTML += `<a onclick='sendMail("","${time}");'>
						${t[0]*1}
						<sup>${t[1]}</sup>
						<span class='duration'>+60min</span>
					</a>`;
		});
		this.Tdom.innerHTML = HTML;
		// return HTML;
	}

	setStart(portCode) {
		console.log("setStartPort ", portCode);
		this.reset('#aaa', 5)

		this.B = '';
		this.Bdom.innerHTML = '';
		this.Ddom.innerHTML = '';
		this.Tdom.innerHTML = '';

		this.A = portCode;
		this.setIcon(portCode, 'A', '#f00', 9);
		this.setPathHTML('A');

		for (var P in this.times[portCode]) // possible targets
			this.setIcon(P, null, '#f00', 5);
	}


	setStop(portCode) {
		console.log("setStopPort ", portCode);
		if (this.B)
			this.setIcon(this.B, null, '#f00', 5);

		this.B = portCode;
		this.setIcon(portCode, 'B', '#f00', 9);
		this.setPathHTML('B');

		this.setDatesHTML();
		this.setTimeTableHTML();
	}

	reset(color, size) {
		console.log('reset markers');
		this.A = '';
		this.B = '';
		this.Adom.innerHTML = '';
		this.Bdom.innerHTML = '';
		this.Ddom.innerHTML = '';
		this.Tdom.innerHTML = '';
		for (var P in this.markers)
			this.setIcon(P, null, color, size);
	}

}



// setTimeTableHTML() {
// 	var HTML = '';
// 	this.times[this.A][this.B].forEach(operator => {
// 		HTML += `<table>
// 				<tr><td class='operator' colspan='2'>${operator.operator}</td></tr>
// 				<tr><td class='meta'>
// 					<div class='duration'>${operator.duration} min</div>
// 					<div class='price'>${operator.price} php</div>
// 				</td>
// 				<td class='timetable'>
// 				`;
// 		operator.times.forEach(time => {
// 			var t = time.split(':');
// 			HTML += `<a onclick='sendMail("${operator.operator}","${time}");'>${t[0]*1}<sup>${t[1]}</sup></a>`;
// 		});
// 		HTML += '</td></tr></table>';
// 	});
// 	this.Tdom.innerHTML = HTML;
// 	// return HTML;
// }

// clearB() {
// 	this.markers[this.B].setLabel(null);
// 	this.B = '';
// 	this.Bdom.innerHTML = '';
// }

// #times 
// 	table
// 		width: 100%
// 	.operator
// 		font-size: 22px

// 	.meta
// 		text-align: right
// 		color: gray
// 		width: 70px

// 		.duration
// 			font-size: 18px

// 		.price
// 			font-size: 18px

// 	.timetable
// 		margin: 0
// 		a
// 			color: silver
// 			font-size: 18px
// 			display: inline-block
// 			width: 50px
// 			text-align: right
// 			cursor: pointer
// 			sup
// 				font-size: 12px

// console.log('marker click a:', this.A, 'click:', portCode, this.A ? 'y' : 'n');
// if (this.times[this.A]) // valid source
// 	if (this.times[this.A][portCode]) // valid target
// 		return this.setStop(portCode);
// else // no target... new start
// this.setStart(portCode);
// else this.setStart(portCode);
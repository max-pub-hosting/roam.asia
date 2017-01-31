class Ports {
	constructor(map) {
		this.map = map;

		this.markers = {};
		this.origin = '';
		this.destination = '';

		this.map.addListener('click', () => HASH.clear());

		// fetch('data/sea/ports.json')
		// 	.then(response => response.json())
		// 	.then(ports => {
		// 		BOAT.ports = ports;
		// 		this.addMarkers();
		// 	});
		this.addMarkers();
	}

	// onOriginChange(f) {
	// 	this._originChange = f;
	// }

	// onDestinationChange(f) {
	// 	this._destinationChange = f;
	// }

	addMarkers() {
		for (var portCode in BOAT.ports) {
			var p = BOAT.ports[portCode];
			this.markers[portCode] = new Marker(this.map, p.lat, p.lon);
			this.markerAction(portCode);
		}
	}

	markerAction(portCode) {
		// console.log('addAction', portCode);
		// this.markers[portCode].addListener('click', () => {
		this.markers[portCode].onTap(() => {
			// console.log('action', this.origin);
			if (HASH.origin)
				if (BOAT.ports[HASH.origin].destinations.includes(portCode)) // valid target
					return HASH.destination = portCode;
			HASH.origin = portCode;
			// HASH.setOrigin(portCode);
		});
	}

	draw() {
		for (var portCode in this.markers) {
			var P = this.markers[portCode];
			if (portCode == HASH.origin) P.set('origin');
			else if (portCode == HASH.destination) P.set('destination');
			else if (BOAT.ports[portCode].destinations.includes(HASH.origin)) P.set('directConnection');
			else P.set('default');
		}
	}


	// setOrigin(portCode) {
	// 	console.log("setOrigin ", portCode);
	// 	this.reset()

	// 	this.origin = portCode;
	// 	this.markers[portCode].set('origin');

	// 	BOAT.ports[portCode].destinations.forEach(P => {
	// 		console.log("possible", P);
	// 		this.markers[P].set('directConnection');
	// 	});

	// 	// for (var P in BOAT.ports[portCode].destinations) // possible targets
	// 	// console.log("possible", P);
	// 	// if (this.markers[P])
	// 	// this.markers[P].set('directConnections')

	// 	HASH.setOrigin(portCode);
	// 	// this._originChange(portCode);
	// }


	// setDestination(portCode) {
	// 	console.log("setDestination ", portCode);
	// 	if (this.destination) // reset last selection
	// 		this.markers[this.destination].set('directConnection');

	// 	this.destination = portCode;
	// 	this.markers[this.destination].set('destination');

	// 	HASH.setDestination(portCode);
	// 	// this._destinationChange(portCode);
	// }


	// reset(color, size) {
	// 	console.log('reset all');

	// 	// this.origin = '';
	// 	// this.destination = '';

	// 	for (var P in this.markers)
	// 		this.markers[P].set('default');

	// 	HASH.truncate(0);
	// 	// this._originChange(null);
	// 	// this._destinationChange(null);
	// }

}
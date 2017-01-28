class Ports {
	constructor(map) {
		this.map = map;

		this.markers = {};
		this.origin = '';
		this.destination = '';

		this.map.addListener('click', () => this.reset());

		fetch('data/sea/ports.json')
			.then(response => response.json())
			.then(ports => {
				this.ports = ports;
				this.addMarkers();
			});
	}

	onOriginChange(f) {
		this._originChange = f;
	}

	onDestinationChange(f) {
		this._destinationChange = f;
	}

	addMarkers() {
		for (var portCode in this.ports) {
			var p = this.ports[portCode];
			this.markers[portCode] = new Marker(this.map, p.lat, p.lon);
			this.markerAction(portCode);
		}
	}

	markerAction(portCode) {
		// console.log('addAction', portCode);
		// this.markers[portCode].addListener('click', () => {
		this.markers[portCode].onTap(() => {
			// console.log('action', this.origin);
			if (this.origin)
				if (this.ports[this.origin].destinations.includes(portCode)) // valid target
					return this.setDestination(portCode);
			this.setOrigin(portCode);
		});
	}



	setOrigin(portCode) {
		console.log("setOrigin ", portCode);
		this.reset()

		this.origin = portCode;
		this.markers[portCode].set('origin');

		this.ports[portCode].destinations.forEach(P => {
			console.log("possible", P);
			this.markers[P].set('directConnection');
		});

		// for (var P in this.ports[portCode].destinations) // possible targets
		// console.log("possible", P);
		// if (this.markers[P])
		// this.markers[P].set('directConnections')

		this._originChange(portCode);
	}


	setDestination(portCode) {
		console.log("setDestination ", portCode);
		if (this.destination) // reset last selection
			this.markers[this.destination].set('directConnection');

		this.destination = portCode;
		this.markers[this.destination].set('destination');

		this._destinationChange(portCode);
	}


	reset(color, size) {
		console.log('reset all');

		this.origin = '';
		this.destination = '';

		for (var P in this.markers)
			this.markers[P].set('default');

		this._originChange(null);
		this._destinationChange(null);
	}

}
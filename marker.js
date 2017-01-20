class Marker {

	constructor(map) {
		this.map = map;
	}

	circle(color = '#FFD700', size = 5) {
		return {
			strokeColor: '#fff',
			strokeOpacity: 1.0,
			strokeWeight: 2,
			fillColor: color,
			fillOpacity: 1.0,
			path: google.maps.SymbolPath.CIRCLE,
			scale: size,
			anchor: new google.maps.Point(0, 0)
		}
	}

	add(lat, lon) {
		return new google.maps.Marker({
			map: this.map,
			position: new google.maps.LatLng(lat, lon),
			// title: portCode,
			icon: this.circle()
		});
	}

}
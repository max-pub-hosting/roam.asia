class Marker {

	constructor(map, lat, lon) {
		this.marker = new google.maps.Marker({
			map: map,
			position: new google.maps.LatLng(lat, lon),
			// title: portCode,
			// icon: this.icon('default')
		});
		this.set('default');
	}

	set(name) {
		// console.log('setIcon', name);
		var icon = MapIcon[name];
		if (!icon) return;
		if (!icon.path) icon.path = google.maps.SymbolPath[icon.icon.toUpperCase()];
		if (!icon.anchor) icon.anchor = new google.maps.Point(0, 0);
		this.marker.setIcon(icon);
		if (icon.text)
			this.marker.setLabel({
				text: icon.text,
				color: icon.textColor
			});
		else
			this.marker.setLabel(null);
	}

	onTap(f) {
		this.marker.addListener('click', () => f());
	}
}



// icon(name) {
// 	var icon = MapIcon[name];
// 	if (!icon.path) icon.path = google.maps.SymbolPath[icon.icon.toUpperCase()];
// 	if (!icon.anchor) icon.anchor = new google.maps.Point(0, 0);
// 	this.marker.setIcon(icon);
// }

// label(text, color) {
// 	if (text)
// 		this.marker.setLabel({
// 			text: text,
// 			color: color ? color : '#fff';
// 		});
// 	else
// 		this.marker.setLabel(null);
// }


// setIcon(portCode, name) {
// 	var icon = MARKER.icon(name);
// 	this.markers[portCode].setIcon(icon);
// 	if (icon.text)
// 		this.markers[portCode].setLabel({
// 			text: icon.text,
// 			color: icon.textColor
// 		});
// 	else
// 		this.markers[portCode].setLabel(null);
// }


// circle(color = '#FFD700', size = 5) {
// 	return {
// 		strokeColor: '#fff',
// 		strokeOpacity: 1.0,
// 		strokeWeight: 2,
// 		fillColor: color,
// 		fillOpacity: 1.0,
// 		path: google.maps.SymbolPath.CIRCLE,
// 		scale: size,
// 		anchor: new google.maps.Point(0, 0)
// 	}
// }

// add(lat, lon) {
// 	return new google.maps.Marker({
// 		map: this.map,
// 		position: new google.maps.LatLng(lat, lon),
// 		// title: portCode,
// 		icon: this.icon('default')
// 	});
// }
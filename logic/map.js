initMap = () => {
	fetch('style/map.dark.json')
		.then((response) => response.json())
		.then((mapStyle) => {
			IFRAME = document.querySelector('iframe');
			// IFRAME.hidden = true;

			MAP = new google.maps.Map(document.getElementById('map'), {
				center: { // philippines
					lat: 10,
					lng: 121
				},
				zoom: 8,
				disableDefaultUI: true,
				zoomControl: true,
				styles: mapStyle
			});

			MARKER = new Marker(MAP);
			PORTS = new Ports(MAP);
		});
}

sendMail = (operator, time) => {
	// alert(operator + time);
	var A = PORTS.ports[PORTS.A].city;
	var B = PORTS.ports[PORTS.B].city;
	document.location = `mailto:book@roam.asia?subject=boat&body=Dear roam.asia,%0A%0AI'd like to book a ferry %0A%0Afrom ${A} to ${B} %0A%0Awith ${operator} %0Aat ${time}`;
}

// showFrame = (url) => {
//   IFRAME.hidden = false;
//   IFRAME.setAttribute('src', url);
// }
// hideFrame = () => {
//   IFRAME.hidden = true;
// }
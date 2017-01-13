addMarker = (map, lat, lon, url, icon) => {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lon),
    map: map,
    icon: `icons/${icon}.png`
  });
  marker.addListener('click', function() {
    // map.setZoom(8);
    // map.setCenter(marker.getPosition());
    showFrame(url);
  });

}

showFrame = (url) => {
  IFRAME.hidden = false;
  IFRAME.setAttribute('src', url);
}
hideFrame = () => {
  IFRAME.hidden = true;
}

initMap = () => {
  fetch('map.dark.json')
    .then((response) => response.json())
    .then((mapStyle) => {
      IFRAME = document.querySelector('iframe');
      // IFRAME.hidden = true;

      var map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 10,
          lng: 121
        },
        zoom: 8,
        disableDefaultUI: true,
        zoomControl: true,
        styles: mapStyle
      });

      fetch('loc.json')
        .then((response) => response.json())
        .then((places) => {
          places.forEach((p) => {
            addMarker(map, p.lat, p.lon, p.url, p.ico);
          });
        });

    });
}



// addMarker(map, 11.181448, 119.386825, '/PH/Bantayan', 'sport');
// addMarker(map, 9.463144, 123.380028, '//lit.max.pub/EN/', 'sport');
// addMarker(map, 11.153562, 123.809435, '//lit.max.pub/FR/', 'beach');
// addMarker(map, 9.1999, 123.5952, '//lit.max.pub/FR/', 'beach');
// addMarker(map, 9.1999, 123.5952, '//lit.max.pub/FR/', 'beach');
// addMarker(map, 10.3107, 123.9802, '//lit.max.pub/FR/', 'air-port');
// addMarker(map, 10.2933, 123.9070, '/PH/Bantayan', 'sea-port');

// // bantayan
// addMarker(map, 11.156796, 123.787647, '/PH/Bantayan', 'air-port');
// addMarker(map, 11.156796, 123.787647, '/PH/Bantayan', 'sea-port');
// addMarker(map, 11.156796, 123.787647, '/PH/Bantayan', 'sea-port');
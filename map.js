addMarker = (map, lat, lon, url, color) => {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lon),
    map: map,
    icon: `dot/${color}.12.png`
  });
  marker.addListener('click', function() {
    map.setZoom(8);
    map.setCenter(marker.getPosition());
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

      addMarker(map, 11.181448, 119.386825, '//lit.max.pub/DE/', 'red');
      addMarker(map, 9.463144, 123.380028, '//lit.max.pub/EN/', 'red');
      addMarker(map, 11.153562, 123.809435, '//lit.max.pub/FR/', 'yellow');

    });
}
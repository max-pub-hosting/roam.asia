initMap = () => {
  fetch('map.dark.json')
    .then((response) => response.json())
    .then((mapStyle) => {
      IFRAME = document.querySelector('iframe');
      IFRAME.hidden = true;

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

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(11.2097, 119.4623),
        map: map,
        icon: '//max.pub/lib/flags/DE.png'
      });

      marker.addListener('click', function() {
        map.setZoom(8);
        map.setCenter(marker.getPosition());
        IFRAME
      });

    });
}
var map;
const apiKey = "AIzaSyChs4wyhn9M-1Nl7QJkEInXTOy0p4347Jo"
    function initMap() {
        const maparea = document.getElementById("map");
        map = new google.maps.Map(maparea, {
        zoom: 4,
        center: {lat: 39.5, lng: -98.35},
        mapTypeId: 'terrain'
      })
    };
    function getMarkets(zip){
      $.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${apiKey}`)
      .then(({results})=> {
        const {lat,lng} = results[0].geometry.location;   
        $.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?name=grocery&location=${lat},${lng}&radius=3000&key=${apiKey}`)
        .then(data=> {
        for (var i = 0; i < data.results.length; i++){
          console.log(data.results.length);
          var lat = data.results[i].geometry.location.lat;
          var lng = data.results[i].geometry.location.lng;
          var latLng = new google.maps.LatLng(lat, lng);
          var marker = new google.maps.Marker({
          position: latLng,
          center: latLng,
          map: map,
          title: data.results[i].name,
          content: ["stores", "candy"]
          });
          var infowindow = new google.maps.InfoWindow({
          content: ""
          });
          marker.addListener('click', function(event) {

          var myLat = event.latLng.lat();
          var myLng = event.latLng.lng();
          var mylatLng = new google.maps.LatLng(myLat, myLng);
          infowindow.open(map, marker);
          infowindow.setContent("<h3>"+this.title+"</h3>");
          infowindow.setPosition(mylatLng);
          });
          marker.setMap(map);
        }
      })   
      })
    };

    getMarkets(98105)
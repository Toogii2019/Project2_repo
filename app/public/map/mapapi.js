var map;
const apiKey = "AIzaSyChs4wyhn9M-1Nl7QJkEInXTOy0p4347Jo";

// Map
function initMap() {
    const maparea = document.getElementById("map");
    map = new google.maps.Map(maparea, {
    zoom: 10,
    maxZoom: 15,
    center: {lat: 47.606, lng: -122.332},
    mapTypeId: 'roadmap'
  })
};

//Zipcode Input
const input = document.getElementById("pac-input");
input.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
      getMarkets(event);
  }
});

// Search Zipcode
function getMarkets(event){
const zip = event.target.value;
const bounds  = new google.maps.LatLngBounds();
  //API call maps
  $.get(`https://mighty-bayou-53278.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${apiKey}`)
  .then(({results})=> {
    console.log(results);
    const {lat,lng} = results[0].geometry.location;
    // API call places   
    $.get(`https://mighty-bayou-53278.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?name=grocery&location=${lat},${lng}&radius=3000&key=${apiKey}`)
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

      // Set Market to Bounds
      loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
      bounds.extend(loc);
      
      var infowindow = new google.maps.InfoWindow({
        content: ""
      });
      
      marker.addListener('click', function(event) {
        document.getElementById("store").textContent = this.title;
        var myLat = event.latLng.lat();
        var myLng = event.latLng.lng();
        var mylatLng = new google.maps.LatLng(myLat, myLng);
        infowindow.open(map, marker);
        infowindow.setContent("<h3>"+this.title+"</h3>");
        infowindow.setPosition(mylatLng);
      });
      marker.setMap(map);
    }
    map.fitBounds(bounds);
  })   
})
};


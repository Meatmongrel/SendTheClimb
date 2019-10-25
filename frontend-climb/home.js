const ul = document.querySelector('.list')


var markers = []
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.769021, lng: -104.974148},
        zoom: 11
    });
}



function addMarkerWithTimeout(position, timeout, climb) {
  window.setTimeout(function() {
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: `${climb.name} | ${climb.type} ${climb.rating}`,
        animation: google.maps.Animation.DROP
    });
    var infowindow = new google.maps.InfoWindow({
        content: `<div class='info-window'><h3><a href='${climb.url}' target='_blank' class='info-title'>${climb.name}</a></h3>`+
        `<p class='sub-info'>Type:${climb.type} - Rated:${climb.rating}</p>`+
        `<img src="${climb.imgSmall}" class='info-image'>`+
        `</div>`
    });
    marker.addListener('dblclick', function() {
            infowindow.open(map, marker);
      });
    marker.addListener('click', function() {
        infowindow.close();
    });
    markers.push(marker)
  }, timeout);
}


function addPosition(position, climb){
  addMarkerWithTimeout(position, 200, climb)
}




function climbCards(climbs){
    const contain = document.createElement("div")
    contain.className = "climbs"
    ul.innerHTML = ""
    climbs.routes.forEach(climb => {
        const div = document.createElement("div")
        div.className = "climb"
        div.innerHTML = `<li><a href='${climb.url}' target='_blank'><h2 class='card-title'>${climb.name}</h2></a>
            <img src='${climb.imgSmallMed}' class='card-image' alt='climb image'>
            <p>${climb.type}</p>
            <p>${climb.rating}</p>
            <p>${climb.stars} <i class="fas fa-star"></i></p>
            <p>${climb.latitude} lat</p>
            <p>${climb.longitude} long</p></li>`
        const pos = {lat: climb.latitude, lng: climb.longitude}
        contain.appendChild(div)
        addPosition(pos, climb)
    })
    ul.append(contain)
}


(function fetchClimbs10Miles(){
    fetch(`https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=39.782535&lon=-105.040149&maxDistance=10&minDiff=5.6&maxDiff=5.9&key=200623134-66e13f1b56aa2f8a645b22aebe20b6f7`)
        .then(response => response.json())
        .then(climbCards)
})();

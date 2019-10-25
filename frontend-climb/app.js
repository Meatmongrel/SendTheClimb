// API KEY FOR GOOGLE MAPS: AIzaSyB2zzNlBqtD-ApeZ7E4-jNV2kQUhYJXQBM

const ul = document.querySelector(".climb-list")
const form = document.querySelector("form")
const results = document.querySelector(".results")



form.addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(form)
    const distance = formData.get("distance")
    results.textContent = `Here are climbs within ${distance} miles of you:`
    if(distance <= 11){
      map.setZoom(11)
    }else if(distance <= 20){
      map.setZoom(10)
    }else if(distance <= 31){
      map.setZoom(9)
    }else if(distance >= 42){
      map.setZoom(8.5)
    }
    deleteMarkers()
    
    fetch(`https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=39.769021&lon=-104.974148&maxDistance=${distance}&minDiff=${formData.get("min-diff")}&maxDiff=${formData.get("difficulty")}&key=200623134-66e13f1b56aa2f8a645b22aebe20b6f7`)
        .then(response => response.json())
        .then(climbCards)

})
var markers = []
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.769021, lng: -104.974148},
        zoom: 9,
        styles: [
          {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
          }
        ]
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

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}

// function grabInfo(climbs){

//     // console.log(climbs)
// }

function climbCards(climbs){
    const contain = document.createElement("div")
    contain.className = "climbs"
    ul.innerHTML = ""
    let posArr = []
    climbs.routes.forEach(climb => {
        const div = document.createElement("div")
        div.className = "climb"
        div.innerHTML = `<li><a href='${climb.url}'><h2 class='card-title'>${climb.name}</h2></a>
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
    ul.append(results, contain)
    form.style.marginBottom = "5vh"
}




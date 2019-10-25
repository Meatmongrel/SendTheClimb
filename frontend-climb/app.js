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
      map.setZoom(12)
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
        zoom: 9
    });
}

function addMarkerWithTimeout(position, timeout, climb) {
  window.setTimeout(function() {
    markers.push(new google.maps.Marker({
      position: position,
      map: map,
      title: `${climb.name} | ${climb.type} ${climb.rating}`,
      animation: google.maps.Animation.DROP
    }));
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




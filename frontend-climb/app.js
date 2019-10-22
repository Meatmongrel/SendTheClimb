// API KEY FOR GOOGLE MAPS: AIzaSyB2zzNlBqtD-ApeZ7E4-jNV2kQUhYJXQBM

const form = document.querySelector("form")

form.addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(form)


    fetch(`https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=39.782535&lon=-105.040149&maxDistance=${formData.get("distance")}&minDiff=5.6&maxDiff=${formData.get("difficulty")}&key=200623134-66e13f1b56aa2f8a645b22aebe20b6f7`)
        .then(response => response.json())
        .then(grabInfo)
})

function grabInfo(climbs){
    climbs.routes.forEach(climb => {
        let arr = []
        arr.push(climb.name, climb.type, climb.rating)
        console.log(arr)
    })
    // console.log(climbs)
}




/* NAV BAR STUFF */
var nav = document.querySelector("nav");
var burger = document.querySelector("i");
var navHidden = true;

burger.addEventListener("click", decide);

function decide(){
    if(navHidden == true){
        nav.style.display = "inline-block";
        navHidden = false;
    }else if(navHidden == false){
        nav.style.display = "none";
        navHidden = true;
    }
}

/* LEAFLET MAPBOX STUFF */
var map = L.map('mapid').setView([0, 0], 1.5);
var coordsText = document.getElementById('coords-text');
var issIcon = L.icon({
    iconUrl: 'images/iss.png',
    iconSize: [36, 35]
});

L.tileLayer('https://api.mapbox.com/styles/v1/mtff/ckdqhm7jq007c19s3ta59sj96/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibXRmZiIsImEiOiJja2RxaGh3M3QxNWxrMnNtaDN4NDQyOW1pIn0.HQVv1FYf0YPtA49kz60qHQ', {
   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
}).addTo(map);

function updatePos(){
fetch('https://api.wheretheiss.at/v1/satellites/25544')
    .then(res => res.json())
    .then(data => {
        var coords = [data.latitude, data.longitude];
        coordsText.innerHTML = "Lat: "+ data.latitude+" | " +"Long: "+ data.longitude;
        var marker = L.marker([data.latitude, data.longitude], {icon:issIcon}).addTo(map);
        setInterval(function(){map.removeLayer(marker)}, 1000)
    });
}
setInterval(updatePos, 1000);




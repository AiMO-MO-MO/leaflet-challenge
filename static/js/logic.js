//initial map
let myMap = L.map("map", {
    center: [0,0],
    zoom: 2
});


//add map layers to intial map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);



//call data to populate map
let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(geoData).then(function(data) {
    data.features.forEach(function(feature) {
        let long = feature.geometry.coordinates[0];
        let lat = feature.geometry.coordinates[1];
        let depth = feature.geometry.coordinates[2];
        let mag = feature.properties.mag;
        let location = feature.properties.place;
    

        
        let marker = L.circleMarker([lat, long], {
            radius: Math.sqrt(Math.abs(mag)) * 5,
            fillColor: getColor(depth),
            fillOpacity: 0.7,
            color: "green",
            weight: 0.5
        });

        marker.bindPopup("<h3>Magnitude: " + mag + "</h3><h3>Depth: " + 
        depth + "</h3>" + "<h3>Location: " + location + "</h3>").addTo(myMap);
        
        legend.addTo(myMap);
    });
});

function getColor(depth)  {
    return depth > 90 ? "darkred":
        depth > 70 ? "orangered":
        depth > 50 ? "orange":
        depth > 30 ? "yellow":
        depth > 10 ? "lightgreen":
                    "green";

        

}
let legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'info legend');
    let depths = [10, 30, 50, 70, 90];
    let labels = ["lightgreen", "yellow","orange", "orangered","darkred"];
    let legend_color =["#90EE90","#FFFF00","#FFA500","#FF4500","#8B0000"]
    
    for (let i = 0; i < depths.length; i++) {
        div.innerHTML +=
            '<i style="background:' + legend_color[i] + '"></i> ' +
            depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
    }
    return div;
    
};






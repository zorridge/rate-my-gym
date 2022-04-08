mapboxgl.accessToken = mapboxToken;
const coordinates = JSON.parse(gymCoordinates).coordinates;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    center: coordinates, // starting position [lng, lat]
    zoom: 5 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(coordinates)
    .addTo(map);
mapboxgl.accessToken = mapboxToken;
const coordinates = JSON.parse(gymCoordinates).coordinates;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: coordinates, // starting position [lng, lat]
    zoom: 14 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(coordinates)
    .setPopup(
        new mapboxgl.Popup()
            .setHTML(`
            <p class='m-0 fw-bold'>${gymTitle}</p>
            <hr class='mx-0 my-1'>
            <p class='m-0'>${gymLocation}</p>
            `)
    )
    .addTo(map);

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');
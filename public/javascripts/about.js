mapboxgl.accessToken = 'pk.eyJ1IjoidG9iaWxvYmFkZSIsImEiOiJjbG02Zm5vdmE0cWVtM2pwdnNtcGVpMW5iIn0.h1wpg2t9Sl0LI0mFvlP02w';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/standard', 
    center: [-74.5, 40],
    zoom: 1 ,
    attributionControl: false 
});

const customAttribution = document.createElement('div');
customAttribution.innerHTML = 'Powered by ZikFinance maps'; 
customAttribution.className = 'mapboxgl-ctrl mapboxgl-ctrl-attrib';
customAttribution.style="text-align:center; margin:10px auto;"
document.getElementById('map').appendChild(customAttribution);

// Add search functionality
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: 'Search for a location'
});
document.getElementById('search').appendChild(geocoder.onAdd(map));

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', handleSearch);

function handleSearch() {
    const searchText = searchInput.value;
    const apiKey = 'sk.eyJ1IjoidG9iaWxvYmFkZSIsImEiOiJjbHV0eWR6OXYwNGlpMmtuMXhkaHJ6c2p1In0.8B2qqYL9JRsgtkktYvjgqw'; // Replace this with your Mapbox API key
    const apiUrl = `https://api.mapbox.com/search/v1/mapbox.places/${searchText}.json?access_token=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Process the response data and display suggestions to the user
            console.log(data); // Example: Log the response data to the console
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
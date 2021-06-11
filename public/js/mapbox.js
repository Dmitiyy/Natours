/* eslint-disable */
 
export const displayMap = (locations) => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZGFwdGVsbHVtIiwiYSI6ImNrcG5xbGQ1eTA0Y28yb2tjMW4wcTYwMG0ifQ.evoaXspT6YvsgIMXWHO9Ww';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/daptellum/ckpnr7vt90r1p18lfmer0apsf',
    
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(item => {
    const elem = document.createElement('div');
    elem.classList.add('marker');
    new mapboxgl.Marker({
      element: elem,
      anchor: 'bottom'
    }).setLngLat(item.coordinates).addTo(map);
    new mapboxgl.Popup({offset: 30})
    .setLngLat(item.coordinates)
    .setHTML(`<p>Day ${item.day}: ${item.description}</p>`)
    .addTo(map);
    bounds.extend(item.coordinates);
  })

  map.fitBounds(bounds, {padding: {
    top: 200,
    bottom: 200,
    left: 100,
    right: 100
  }});
}
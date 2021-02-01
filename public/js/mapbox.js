export const displayMap = (locations) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZmVzdDUiLCJhIjoiY2trZWh2eDR1MDAyMjJ1cnB6ZHFmeXkybSJ9.04hNfeLuBJtUDxVistC5vQ';

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/fest5/ckken0lhx1ex417sbv13zdfic',
        scrollZoom: false,
        /* center: [-118.153584, 34.080467],
        zoom: 6 */
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {
        // Create a marker
        const el = document.createElement('div')
        el.className= 'marker'

        // Add marker
        const marker = new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        })
        .setLngLat(loc.coordinates)
        .setPopup(new mapboxgl.Popup({
            offset: 30,
            closeOnMove: false
        })
        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)).addTo(map)

        /* marker.togglePopup() */

        // Extends map bounds to include current location
        bounds.extend(loc.coordinates)
    })

    map.fitBounds(bounds,  {
        padding:   {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    } )
}


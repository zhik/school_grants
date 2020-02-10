<script>
  import { onMount } from 'svelte'
  export let data
  let container
  let layer
  let map
  let zoom = 14

  onMount(() => {
    map = L.map(container, { zoomControl: false }).setView([40.73, -74], zoom)
    L.tileLayer(
      'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}{r}.png'
    ).addTo(map)
  })

  $: if (data.features.length && map) {
    if (layer) map.removeLayer(layer)
    layer = L.geoJSON(data, {
      onEachFeature: (feature, layer) => {
        const table = Object.keys(feature.properties)
          .map(function(key) {
            return `<p><b>${key}</b>: ${feature.properties[key]}</p>`
          })
          .join('')
        layer.bindPopup(table)
      }
    }).addTo(map)
    const group = new L.featureGroup([layer])
    map.fitBounds(group.getBounds())
    map.setZoom(zoom)
  }
</script>

<div id="map" bind:this="{container}"></div>

<style>
  #map {
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  :global(.leaflet-popup-content) {
    overflow: auto;
    max-height: 10em;
    word-wrap: break-word;
    line-height: 0em;
  }
  :global(.leaflet-popup-content p) {
    line-height: 1.2em;
    margin: 3px 0 !important;
  }
</style>

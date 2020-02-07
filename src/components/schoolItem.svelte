<script>
  import Table from '../components/table.svelte'
  import Map from '../components/map.svelte'
  import { format } from 'd3'

  export let item

  let isActive = true
  let { dbn, label } = item
  let dbn_table = {
    columns: [],
    rows: []
  }

  let bbl_table = {
    columns: [],
    rows: []
  }
  $: dbn_geojson = {
    type: 'FeatureCollection',
    features: item.dbn_projects.map(project => ({
      type: 'Feature',
      properties: project,
      geometry: {
        type: 'Point',
        coordinates: [project.lng, project.lat]
      }
    }))
  }

  function toggleActive() {
    isActive = !isActive
  }

  let showAllBBLProjects = false

  $: {
    //format projects to columns and rows
    if (item.dbn_projects && item.dbn_projects.length > 0) {
      dbn_table = {
        columns: [
          { name: 'Project Title', key: 'project_title' },
          { name: 'Year', key: 'year', format: year => +year },
          {
            name: 'Funding',
            key: 'funding_c',
            format: amt => {
              return '$' + format(',')(amt)
            }
          }
        ],
        rows: item.dbn_projects
      }
    }

    if (item.bbl_projects && item.bbl_projects.length > 0) {
      bbl_table = {
        columns: [
          { name: 'Project Title', key: 'project_title' },
          { name: 'Year', key: 'year', format: year => +year },
          {
            name: 'Funding',
            key: 'funding_c',
            format: amt => {
              return '$' + format(',')(amt)
            }
          },
          { name: 'Name', key: 'organization_name' },
          { name: 'DBN', key: 'dbn' }
        ],
        //filter for duplicates from the dbn projects table
        rows: showAllBBLProjects
          ? item.bbl_projects
          : item.bbl_projects.filter(
              project => !item.dbn_projects.map(p => p.id).includes(project.id)
            )
      }
    }
  }
</script>
<article class="message">
  <div class="message-header">
    <span>{label}</span>
    <button
      class="toggle {isActive ? 'isActive' : ''}"
      aria-label="toggle"
      on:click="{toggleActive}"
    ></button>
  </div>
  <div class="message-body  {isActive ? 'isActive' : ''}">
    <div class="content">
      <p class="subtitle is-6">Projects with DBN</p>
      <Table columns="{dbn_table.columns}" rows="{dbn_table.rows}"></Table>

      <div class="columns is-mobile is-centered">
        <div class="column is-four-fifths map">
          <Map data="{dbn_geojson}"></Map>
        </div>
      </div>

      {#if item.bbl_projects && item.bbl_projects.length}
      <p class="subtitle is-6">Other projects in the lastest building</p>
      <label class="checkbox">
        <input type="checkbox" bind:checked="{showAllBBLProjects}" />
        Show all projects
      </label>
      <Table columns="{bbl_table.columns}" rows="{bbl_table.rows}"></Table>
      {/if}
    </div>
  </div>
</article>

<style>
  .map {
    height: 15rem;
  }
  .message {
    max-width: 80vw;
  }

  .toggle {
    user-select: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background-color: rgba(10, 10, 10, 0.2);
    border: none;
    border-radius: 290486px;
    display: inline-block;
    flex-grow: 0;
    flex-shrink: 0;
    margin-left: 0.75em;
    height: 20px;
    width: 20px;
    max-height: 20px;
    max-width: 20px;
    min-height: 20px;
    min-width: 20px;
    outline: none;
    position: relative;
    vertical-align: top;
  }

  .toggle::before {
    color: #fff;
    display: flex;
    left: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    content: '\002B';
    line-height: 0;
    justify-content: center;
    align-items: center;
  }

  .toggle.isActive::before {
    content: '\2212';
  }

  .message-body.isActive {
    display: block;
  }

  .message-body {
    display: none;
  }
</style>

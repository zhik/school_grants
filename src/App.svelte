<script>
  import Router, { link } from 'svelte-spa-router'
  import { routes } from './routes'
  import 'bulma/css/bulma.css'
  import { mbpo_capital, council_capital_edu } from './stores'
  import * as d3 from 'd3'

  d3.csv('data/mbpo_capital.csv').then(data => {
    mbpo_capital.set(data)
  })

  d3.csv('data/council_capital_edu.csv').then(data => {
    //split short_dbn to array of strings
    data.forEach(
      row =>
        (row.short_dbn_array = row.short_dbn
          .split(',')
          .map(i => i.replace(/\s/g, '')))
    )
    council_capital_edu.set(data)
  })
</script>

<div class="app">
  <nav>
    <ul>
      <li>
        <a href="/" use:link>Home</a>
      </li>
      <li>
        <a href="/geographies" use:link>Geographies</a>
      </li>
      <li>
        <a href="/schools" use:link>Schools</a>
      </li>
    </ul>
  </nav>
  <div class="content">
    <Router {routes}></Router>
  </div>
</div>

<style>
  .app {
    display: flex;
    flex-wrap: wrap;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }
  nav {
    margin: 2em;
    display: flex;
    flex-direction: column;
    flex: 1 0;
    position: relative;
  }
  .content {
    margin: 2em;
    flex: 999 1 600px;
    min-height: 600px;
  }
</style>

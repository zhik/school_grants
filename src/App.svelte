<script>
  import { Router, Route, Navigate } from 'svelte-router-spa'
  import { routes } from './routes'
  import 'bulma/css/bulma.css'
  import { mbpo_capital } from './stores'
  import * as d3 from 'd3'

  d3.csv('/data/mbpo_capital.csv').then(data => {
    mbpo_capital.set(data)
  })
</script>

<div class="app">
  <nav>
    <ul>
      <li>
        <Navigate to="/">Home</Navigate>
      </li>
      <li>
        <Navigate to="/geographies">Geographies</Navigate>
      </li>
      <li>
        <Navigate to="/schools">Schools</Navigate>
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

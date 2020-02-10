<script>
  import SearchSchools from '../components/searchSchools.svelte'
  import SchoolItem from '../components/schoolItem.svelte'
  import { school_projects, council_capital_edu } from '../stores'

  let selectedSchools = [
    {
      dbn: '01M019',
      label: 'P.S. 019 Asher Levy (01M019)'
    }
  ]
  let data = []

  $: {
    if (selectedSchools) {
      data = selectedSchools.map(selectedItem => {
        //filter school_projects for all projects with the dbn, sort projects by year
        const dbn_projects = $school_projects
          .filter(project => project.dbn === selectedItem.dbn)
          .sort((a, b) => (a.year < b.year ? 1 : -1))

        //pull bbl of lastest project and filter for school_projects with the bbl
        const bbl_projects = $school_projects
          .filter(project => project.bbl === dbn_projects[0].bbl)
          .sort((a, b) => (a.year < b.year ? 1 : -1))

        //pull short_dbn council funding from all projects of the building
        const uniqueShortDBNs = Array.from(
          new Set(bbl_projects.map(project => project.short_dbn))
        )
        function intersection(setA, setB) {
          let _intersection = new Set()
          for (let elem of setB) {
            if (setA.has(elem)) {
              _intersection.add(elem)
            }
          }
          return _intersection
        }

        const council_projects = $council_capital_edu.filter(project => {
          const projectDBNs = new Set(project.short_dbn_array)
          return intersection(projectDBNs, uniqueShortDBNs).size
        })

        //add all generated variables to return object
        selectedItem.dbn_projects = dbn_projects
        selectedItem.bbl_projects = bbl_projects
        selectedItem.council_projects = council_projects

        return selectedItem
      })
    } else {
      data = []
    }
  }
</script>

<main>
  <h3 class="title is-3">MBPO x BetaNYC</h3>
  <h6 class="subtitle is-6">Funding by Schools and Buildings</h6>
  <div class="container">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-7">
            View and compare schools
          </p>
        </div>
        <div class="level-item">
          <SearchSchools bind:selectedValue="{selectedSchools}"></SearchSchools>
        </div>
      </div>
    </nav>

    <div class="container">
      <div class="columns is-mobile is-multiline is-centered">
        {#each data as item (item.label)}
        <div class="column is-narrow">
          <SchoolItem {item}></SchoolItem>
        </div>
        {/each}
      </div>
    </div>
  </div>
</main>

<style>
  .container {
    margin: 1em;
  }
</style>

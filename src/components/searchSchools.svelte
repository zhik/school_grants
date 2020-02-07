<script>
  import Select from 'svelte-select'
  import { school_projects } from '../stores'

  export let selectedValue = []

  const optionIdentifier = 'dbn'
  const getOptionLabel = option => option.label
  const getSelectionLabel = option => option.label

  function loadOptions(filter) {
    const filter_term = filter.toLowerCase()
    //filter using dbn and school name fields
    const filtered_array = $school_projects
      .filter(({ dbn, organization_name }) => {
        return (
          dbn.toLowerCase().includes(filter_term) ||
          //todo: add fuzzy search
          organization_name
            .replace('.', '')
            .toLowerCase()
            .includes(filter_term)
        )
      })
      .map(({ id, organization_name, dbn }) => ({
        dbn,
        label: `${organization_name} (${dbn})`
      }))

    //remove duplicates
    return filtered_array.reduce((a, i) => {
      if (!a.find(i2 => i.label === i2.label)) {
        a.push(i)
      }
      return a
    }, [])
  }
</script>

<div class="search">
  <Select
    {loadOptions}
    {getOptionLabel}
    {optionIdentifier}
    {getSelectionLabel}
    isMulti="{true}"
    bind:selectedValue
    placeholder="Search by DBN Number or School Name"
  ></Select>
  <p class="subtitle is-7">
    Note: Only schools that are in the MBPO Capital Grant Awards datasets are
    included
  </p>
</div>

<style>
  .search {
    margin-top: 1em;
  }

  .subtitle {
    font-style: italic;
  }
</style>

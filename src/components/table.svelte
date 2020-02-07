<script>
  import Tooltip from './tooltip.svelte'
  export let columns = []
  export let rows = []

  function getMoreText(row) {
    return Object.keys(row)
      .map(key => `<strong>${key}</strong>:${row[key]}`)
      .join('\n')
  }

  function isEven(n) {
   return n % 2 == 0;
}

</script>

<table class="table is-bordered is-narrow">
  <thead>
    <tr>
      {#each columns as column}
      <th>{column.name}</th>
      {/each}
      <th>*</th>
    </tr>
  </thead>
  <tbody>
    {#each rows as row}
    <tr class={isEven(+row.year) ? 'highlight' : ''}>
      {#each columns as column}
      <td>
        {'format' in column ? column.format(row[column.key]) : row[column.key] }
      </td>
      {/each}
      <td><Tooltip text="{getMoreText(row)}">-</Tooltip></td>
    </tr>
    {/each}
  </tbody>
</table>

<style>
.highlight{
  background-color: #eee
}
</style>

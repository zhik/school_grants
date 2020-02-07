import { writable, derived } from 'svelte/store'

export const mbpo_capital = writable([])

export const school_projects = derived(mbpo_capital, $mbpo_capital =>
  $mbpo_capital.filter(project => project.project_type === 'Public School')
)

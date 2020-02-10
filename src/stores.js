import { writable, derived } from 'svelte/store'

export const mbpo_capital = writable([])
export const council_capital_edu = writable([])

export const school_projects = derived(mbpo_capital, $mbpo_capital =>
  $mbpo_capital.filter(project => project.project_type === 'Public School')
)

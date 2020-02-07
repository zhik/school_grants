import Index from './layouts/index.svelte'
import NotFound from './layouts/notFound.svelte'
import Schools from './layouts/schools.svelte'

const routes = { '/': Index, '/schools': Schools, '*': NotFound }

export { routes }

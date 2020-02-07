import Index from './layouts/index.svelte'
import NotFound from './layouts/notFound.svelte'
import Schools from './layouts/schools.svelte'

const routes = [
  { name: '/', component: Index },
  { name: '/schools', component: Schools },
  { name: '404.html', component: NotFound }
]

export { routes }

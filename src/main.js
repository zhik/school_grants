import App from './App.svelte'

//ployfill
import 'promise-polyfill/src/polyfill'
import 'whatwg-fetch'

const app = new App({
  target: document.body
})

export default app

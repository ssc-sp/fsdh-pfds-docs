import { defineClientConfig } from 'vuepress/client'
import { defineCustomElements } from '@gcds-core/components/dist/esm/loader.js'
import Layout from './layouts/DocsLayout.vue'

export default defineClientConfig({
  enhance: () => {
    defineCustomElements() // Initialize the GCDS web components
  },
  layouts: {
    Layout,
  },
})
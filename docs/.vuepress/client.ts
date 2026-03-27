import { defineClientConfig } from 'vuepress/client'
import { defineCustomElements } from '@gcds-core/components/dist/esm/loader.js'
import Layout from './layouts/Layout.vue'

export default defineClientConfig({
  enhance: () => {
    defineCustomElements()
  },
  layouts: {
    Layout,
  },
})
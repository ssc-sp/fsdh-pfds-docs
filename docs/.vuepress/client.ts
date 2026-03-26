import { defineClientConfig } from 'vuepress/client'
import Layout from './layouts/Layout.vue'
import '@gcds-core/components-vue/gcds.css';
import '@gcds-core/css-shortcuts/dist/gcds-css-shortcuts.min.css';

export default defineClientConfig({
  layouts: {
    Layout,
  },
})
import { defineConfig } from "cypress";
import { allURLs as pages } from "./docs/.vuepress/geturls"

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'http://localhost:8080',
    expose: {
      pages: pages,
    },
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});

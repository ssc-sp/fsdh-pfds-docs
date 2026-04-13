<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import '@gcds-core/components/dist/gcds/gcds.css';
import '../styles/style.css'
import '@gcds-core/css-shortcuts/dist/gcds-css-shortcuts.min.css';
import Language from '../components/Language.vue';
import Footer from '../components/Footer.vue';

const route = useRoute()

const showLanguageToggle = computed(() => {
  const path = route.path || ''
  return /^\/(en|fr)(\/|$)/.test(path) // Show the language toggle only on paths that start with /en or /fr
})
</script>

<template>
  <ParentLayout>
    <template #navbar-before>
      <Language v-if="showLanguageToggle" />
    </template>
    <template #page-bottom>
      <Footer />
    </template>
  </ParentLayout>
</template>
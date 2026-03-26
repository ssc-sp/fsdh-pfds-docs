<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import '@gcds-core/components-vue/gcds.css';
import '../styles/style.css'
// import '@gcds-core/css-shortcuts/dist/gcds-css-shortcuts.min.css';
import Language from '../components/Language.vue';
import Footer from '../components/Footer.vue';
</script>

<template>
  <ParentLayout>
    <template #navbar-before>
      <Language />
    </template>
    <template #page-bottom>
      <Footer />
    </template>
  </ParentLayout>
</template>
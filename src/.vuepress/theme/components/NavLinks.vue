<!--
This file has been modified to remove the "locales" dropdown.
The change has been done on the "nav" computed property
-->
<template>
  <nav
    v-if="userLinks.length || repoLink"
    class="nav-links"
  >
    <!-- user links -->
    <div
      v-for="item in userLinks"
      :key="item.link"
      class="nav-item"
    >
      <DropdownLink
        v-if="item.type === 'links'"
        :item="item"
      />
      <NavLink
        v-else
        :item="item"
      />
    </div>

    <!-- repo link -->
    <a
      v-if="repoLink"
      :href="repoLink"
      class="repo-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ repoLabel }}
      <OutboundLink />
    </a>
  </nav>
</template>

<script>
import DropdownLink from '@parent-theme/components/DropdownLink.vue'
import { resolveNavLinkItem } from '@parent-theme/util'
import NavLink from '@parent-theme/components/NavLink.vue'

export default {
  name: 'NavLinks',

  components: {
    NavLink,
    DropdownLink
  },

  computed: {
    userNav () {
      const mappings = [
        {"en": "/", "fr": "/"},
        {"en": "/en/", "fr": "/fr/"},
        {"en": '/en/managing-workspaces-and-users/', "fr": '/fr/gerer-espaces-et-utilisateurs/'},
        {"en": '/en/managing-workspaces-and-users/Preregistration', "fr": '/fr/gerer-espaces-et-utilisateurs/Preregistration'},
        {"en": '/en/managing-workspaces-and-users/Complete-metadata', "fr": '/fr/gerer-espaces-et-utilisateurs/Complete-metadata'},
        {"en": '/en/managing-workspaces-and-users/Request-tools', "fr": '/fr/gerer-espaces-et-utilisateurs/Demande-outils'},
        {"en": '/en/managing-workspaces-and-users/Change-a-user-role', "fr": '/fr/gerer-espaces-et-utilisateurs/Change-a-user-role'},
        {"en": '/en/migration/', "fr": '/fr/migration/'},
        {"en": '/en/migration/Overview', "fr": '/fr/migration/Survol'},
        {"en": '/en/migration/Storage', "fr": '/fr/migration/Stockage'},
        {"en": '/en/migration/Databricks', "fr": '/fr/migration/Databricks'},
        {"en": '/en/migration/PostgreSQL', "fr": '/fr/migration/PostgreSQL'},
        {"en": '/en/migration/WebApp', "fr": '/fr/migration/AppWeb'},
        {"en": '/en/guidance/', "fr": '/fr/guidance/'},
        {"en": '/en/guidance/Account-Management-and-Access-control-of-workspaces', "fr": '/fr/guidance/Gestion-des-comptes-et-controle-de-l\'acces-aux-espaces-de-travail'},
        {"en": '/en/guidance/Backup-and-Recovery', "fr": '/fr/guidance/Sauvegarde-et-recuperation'},
        {"en": '/en/guidance/Components-within-a-workspace', "fr": '/fr/guidance/Composants-dun-espace-de-travail'},
        {"en": '/en/guidance/Personnel-Security-Clearance', "fr": '/fr/guidance/Attestation-de-securite-du-personnel'},
        {"en": '/en/guidance/Code-Source', "fr": '/fr/guidance/Code-source'},
        {"en": '/en/guidance/Usage-Control', "fr": '/fr/guidance/Controle-dusage'},
        {"en": '/en/guidance/Monitoring-and-Auditing-a-Workspace', "fr": '/fr/guidance/Controle-et-audit-dun-espace-de-travail'},
        {"en": '/en/guidance/Github-and-code-repo-management', "fr": '/fr/guidance/Github-et-gestion-des-repos'},
        {"en": '/en/guidance/Incident-Detection-and-Response', "fr": '/fr/guidance/Detection-et-response-aux-incidents'},
        {"en": '/en/guidance/Monitor-Usage', "fr": '/fr/guidance/Monitor-Usage'},
        {"en": '/en/guidance/Monitoring-and-Auditing-a-Workspace', "fr": '/fr/guidance/Controle-et-audit-dun-espace-de-travail'},
        {"en": '/en/guidance/Personnel-security-clearance', "fr": '/fr/guidance/Attestation-de-securite-du-personnel'},
        {"en": '/en/guidance/Roles-within-FSDH-workspace', "fr": '/fr/guidance/Roles-dans-un-espace-de-travail'},
        {"en": '/en/guidance/Source-code', "fr": '/fr/guidance/Source-code'},
        {"en": '/en/storage/', "fr": '/fr/stockage/'},
        {"en": '/en/storage/Datahub-AzureStorage', "fr": '/fr/stockage/Datahub-AzureStorage'},
        {"en": '/en/storage/Import-AWS-Storage', "fr": '/fr/stockage/Importer-le-stockage-AWS'},
        {"en": '/en/storage/Import-Azure-Storage', "fr": '/fr/stockage/Importer-le-stockage-Azure'},
        {"en": '/en/storage/Import-GCP-Storage', "fr": '/fr/stockage/Importer-le-stockage-GCP'},
        {"en": '/en/storage/Import-Storage', "fr": '/fr/stockage/Importer-le-stockage'},
        {"en": '/en/storage/Use-AzCopy', "fr": '/fr/stockage/Utiliser-AzCopy'},
        {"en": '/en/storage/Desktop-Uploader', "fr": '/fr/stockage/Chargeur-de-bureau'},
        {"en": '/en/databricks/', "fr": '/fr/databricks/'},
        {"en": '/en/databricks/Databricks-101', "fr": '/fr/databricks/Databricks-101'},
        {"en": '/en/databricks/Cluster-Policies', "fr": '/fr/databricks/Politiques-des-clusters'},
        {"en": '/en/databricks/Git-Integration', "fr": '/fr/databricks/Intégration-de-Git'},
        {"en": '/en/databricks/vscode_extension', "fr": '/fr/databricks/extension-vscode'},
        {"en": '/en/databricks/Conda-Packages', "fr": '/fr/databricks/Paquets-Conda'},
        {"en": '/en/databricks/Connecting-Google-API', "fr": '/fr/databricks/Connexion-à-l\'API-Google'},
        {"en": '/en/databricks/Dashboarding', "fr": '/fr/databricks/Tableau-de-bord'},
        {"en": '/en/databricks/Dashboarding-Tool-Comparison', "fr": '/fr/databricks/Comparaison-des-outils-de-tableau-de-bord'},
        {"en": '/en/databricks/Experiments-Automl', "fr": '/fr/databricks/Expériences-Automl'},
        {"en": '/en/databricks/Workflows', "fr": '/fr/databricks/Flux-de-travail'},
        {"en": '/en/databricks/Databricks-FAQ', "fr": '/fr/databricks/FAQ-Databricks'},
        {"en": '/en/postgresql/', "fr": '/fr/postgresql/'},
        {"en": '/en/postgresql/Postgres', "fr": '/fr/postgresql/Postgres'},
        {"en": '/en/postgresql/Postgres-Add-User', "fr": '/fr/postgresql/Postgres-Ajouter-Utilisateur'},
        {"en": '/en/postgresql/psql-databricks-comparison', "fr": '/fr/postgresql/Comparaison-des-bases-de-données-psql'},
        {"en": '/en/apps/', "fr": '/fr/apps/'},
        {"en": '/en/apps/WebApps', "fr": '/fr/apps/WebApps'},
      ]

      const currentUrl = this.$page.path.split(".html")[0]
      const lang = currentUrl.split('/')[1] || 'en' // Default to 'en' if no language is found

      if (!['en', 'fr'].includes(lang)) {
        return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || []
      }

      const otherLang = {"en": "fr", "fr": "en"}[lang]
      const url = mappings.find(url => url[lang] === currentUrl)

      if (!url) {
        return [] // Return an empty array if no matching URL is found
      }

      const txt = lang === 'fr' ? "English" : "Français"
      const link = url[otherLang]

      return [{"text": txt, "link": link, "type": "link", "items": []}]
    },

    nav () {
      return this.userNav
    },

    userLinks () {
      return (this.nav || []).map(link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem)
        })
      })
    },

    repoLink () {
      const { repo } = this.$site.themeConfig
      if (repo) {
        return /^https?:/.test(repo)
          ? repo
          : `https://github.com/${repo}`
      }
      return null
    },

    repoLabel () {
      if (!this.repoLink) return
      if (this.$site.themeConfig.repoLabel) {
        return this.$site.themeConfig.repoLabel
      }

      const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0]
      const platforms = ['GitHub', 'GitLab', 'Bitbucket']
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i]
        if (new RegExp(platform, 'i').test(repoHost)) {
          return platform
        }
      }

      return 'Source'
    }
  }
}
</script>

<style lang="stylus">
.nav-links
  display inline-block
  a
    line-height 1.4rem
    color inherit
    &:hover, &.router-link-active
      color $accentColor
  .nav-item
    position relative
    display inline-block
    margin-left 1.5rem
    line-height 2rem
    &:first-child
      margin-left 0
  .repo-link
    margin-left 1.5rem

@media (max-width: $MQMobile)
  .nav-links
    .nav-item, .repo-link
      margin-left 0

@media (min-width: $MQMobile)
  .nav-links a
    &:hover, &.router-link-active
      color $textColor
  .nav-item > a:not(.external)
    &:hover, &.router-link-active
      margin-bottom -2px
      border-bottom 2px solid lighten($accentColor, 8%)
</style>

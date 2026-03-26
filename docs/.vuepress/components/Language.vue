<template>
  <header class="navbar" :lang="currentLang">
    <GcdsLangToggle :key="`${currentLang}:${langToggleHref}`" :href="langToggleHref" />
  </header>
</template>

<script>
import { GcdsLangToggle } from '@gcds-core/components-vue';

export default {
  name: 'Language',

  components: {
    GcdsLangToggle
  },

  computed: {
    currentLang() {
      const currentPath = (this.$route?.path || this.$page.path).split('.html')[0];
      const lang = currentPath.split('/')[1];
      return lang === 'fr' ? 'fr' : 'en';
    },

    langToggleHref() {
      const mappings = [
        {"en": "/", "fr": "/"},
        {"en": "/en/", "fr": "/fr/"},
        {"en": "/en/Terms-And-Conditions", "fr": "/fr/Conditions-generales"},
        {"en": '/en/managing-workspaces-and-users/', "fr": '/fr/gerer-espaces-et-utilisateurs/'},
        {"en": '/en/managing-workspaces-and-users/Preregistration', "fr": '/fr/gerer-espaces-et-utilisateurs/Preregistration'},
        {"en": '/en/managing-workspaces-and-users/Complete-metadata', "fr": '/fr/gerer-espaces-et-utilisateurs/Complete-metadata'},
        {"en": '/en/managing-workspaces-and-users/Request-tools', "fr": '/fr/gerer-espaces-et-utilisateurs/Demande-outils'},
        {"en": '/en/managing-workspaces-and-users/Invite-a-user', "fr": '/fr/gerer-espaces-et-utilisateurs/Invitez-un-utilisateur'},
        {"en": '/en/managing-workspaces-and-users/Change-a-user-role', "fr": '/fr/gerer-espaces-et-utilisateurs/Change-les-roles-dutilisateur'},
        {"en": '/en/managing-workspaces-and-users/CBR-management', "fr": '/fr/gerer-espaces-et-utilisateurs/Gestion-BOI'},
        {"en": '/en/migration/', "fr": '/fr/migration/'},
        {"en": '/en/migration/Overview', "fr": '/fr/migration/Survol'},
        {"en": '/en/migration/Storage', "fr": '/fr/migration/Stockage'},
        {"en": '/en/migration/Databricks', "fr": '/fr/migration/Databricks'},
        {"en": '/en/migration/PostgreSQL', "fr": '/fr/migration/PostgreSQL'},
        {"en": '/en/migration/WebApp', "fr": '/fr/migration/AppWeb'},
        {"en": '/en/guidance/', "fr": '/fr/conseils/'},
        {"en": '/en/guidance/Account-Management-and-Access-control-of-workspaces', "fr": '/fr/conseils/Gestion-des-comptes-et-controle-de-l\'acces-aux-espaces-de-travail'},
        {"en": '/en/guidance/Backup-and-Recovery', "fr": '/fr/conseils/Sauvegarde-et-recuperation'},
        {"en": '/en/guidance/Components-within-a-workspace', "fr": '/fr/conseils/Composants-dun-espace-de-travail'},
        {"en": '/en/guidance/Personnel-Security-Clearance', "fr": '/fr/conseils/Attestation-de-securite-du-personnel'},
        {"en": '/en/guidance/Code-Source', "fr": '/fr/conseils/Code-source'},
        {"en": '/en/guidance/Usage-Control', "fr": '/fr/conseils/Controle-dusage'},
        {"en": '/en/guidance/Monitoring-and-Auditing-a-Workspace', "fr": '/fr/conseils/Controle-et-audit-dun-espace-de-travail'},
        {"en": '/en/guidance/Github-and-code-repo-management', "fr": '/fr/conseils/Github-et-gestion-des-repos'},
        {"en": '/en/guidance/Incident-Detection-and-Response', "fr": '/fr/conseils/Detection-et-response-aux-incidents'},
        {"en": '/en/guidance/Monitor-Usage', "fr": '/fr/conseils/Monitor-Usage'},
        {"en": '/en/guidance/Personnel-security-clearance', "fr": '/fr/conseils/Attestation-de-securite-du-personnel'},
        {"en": '/en/guidance/Roles-within-FSDH-workspace', "fr": '/fr/conseils/Roles-dans-un-espace-de-travail'},
        {"en": '/en/guidance/Source-code', "fr": '/fr/conseils/Source-code'},
        {"en": '/en/guidance/File-Restrictions', "fr": '/fr/conseils/Fichiers-restreints'},
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
      ];

      const currentUrl = (this.$route?.path || this.$page.path).split('.html')[0];
      const otherLang = { en: "fr", fr: "en" }[this.currentLang];
      const urlMapping = mappings.find(mapping => mapping[this.currentLang] === currentUrl);

      return urlMapping ? urlMapping[otherLang] : "#"; // Default to "#" if no mapping is found
    }
  }
}
</script>
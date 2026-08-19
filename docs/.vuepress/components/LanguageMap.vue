<template>
  <header class="navbar" :lang="currentLang">
    <!-- <GcdsLangToggle :key="`${currentLang}:${langToggleHref}`" :href="langToggleHref" /> -->
    <gcds-lang-toggle :href="langToggleHref" :lang="currentLang" />
  </header>
</template>

<script>
export default {
  name: "LanguageMap",

  computed: {
    currentLang() {
      const currentPath = (this.$route?.path || this.$page.path).split(
        ".html",
      )[0];
      const lang = currentPath.split("/")[1];
      return lang === "fr" ? "fr" : "en";
    },

    langToggleHref() {
      const mappings = [
        { en: "/", fr: "/" },
        { en: "/en/", fr: "/fr/" },
        { en: "/en/Terms-And-Conditions", fr: "/fr/Conditions-generales" },
        {
          en: "/en/managing-workspaces-and-users/",
          fr: "/fr/gerer-espaces-et-utilisateurs/",
        },
        {
          en: "/en/managing-workspaces-and-users/Preregistration",
          fr: "/fr/gerer-espaces-et-utilisateurs/Preregistration",
        },
        {
          en: "/en/managing-workspaces-and-users/Complete-metadata",
          fr: "/fr/gerer-espaces-et-utilisateurs/Complete-metadata",
        },
        {
          en: "/en/managing-workspaces-and-users/Request-tools",
          fr: "/fr/gerer-espaces-et-utilisateurs/Demande-outils",
        },
        {
          en: "/en/managing-workspaces-and-users/Invite-a-user",
          fr: "/fr/gerer-espaces-et-utilisateurs/Invitez-un-utilisateur",
        },
        {
          en: "/en/managing-workspaces-and-users/Change-a-user-role",
          fr: "/fr/gerer-espaces-et-utilisateurs/Change-les-roles-dutilisateur",
        },
        {
          en: "/en/managing-workspaces-and-users/CBR-management",
          fr: "/fr/gerer-espaces-et-utilisateurs/Gestion-BOI",
        },
        { en: "/en/migration/", fr: "/fr/migration/" },
        { en: "/en/migration/Overview", fr: "/fr/migration/Survol" },
        { en: "/en/migration/Storage", fr: "/fr/migration/Stockage" },
        { en: "/en/migration/Databricks", fr: "/fr/migration/Databricks" },
        { en: "/en/migration/PostgreSQL", fr: "/fr/migration/PostgreSQL" },
        { en: "/en/migration/WebApp", fr: "/fr/migration/AppWeb" },
        { en: "/en/guidance/", fr: "/fr/conseils/" },
        {
          en: "/en/guidance/Account-Management-and-Access-control-of-workspaces",
          fr: "/fr/conseils/Gestion-des-comptes-et-controle-de-lacces-aux-espaces-de-travail",
        },
        {
          en: "/en/guidance/Backup-and-Recovery",
          fr: "/fr/conseils/Sauvegarde-et-recuperation",
        },
        {
          en: "/en/guidance/Code-Management",
          fr: "/fr/conseils/Gestion-de-code",
        },
        {
          en: "/en/guidance/Workspace-Monitoring",
          fr: "/fr/conseils/Controle-despace-de-travail",
        },
        {
          en: "/en/guidance/File-Restrictions",
          fr: "/fr/conseils/Fichiers-restreints",
        },
        { en: "/en/storage/", fr: "/fr/stockage/" },
        {
          en: "/en/storage/Datahub-AzureStorage",
          fr: "/fr/stockage/Datahub-AzureStorage",
        },
        {
          en: "/en/storage/Import-AWS-Storage",
          fr: "/fr/stockage/Importer-le-stockage-AWS",
        },
        {
          en: "/en/storage/Import-Azure-Storage",
          fr: "/fr/stockage/Importer-le-stockage-Azure",
        },
        {
          en: "/en/storage/Import-GCP-Storage",
          fr: "/fr/stockage/Importer-le-stockage-GCP",
        },
        {
          en: "/en/storage/Import-Storage",
          fr: "/fr/stockage/Importer-le-stockage",
        },
        {
          en: "/en/storage/Storage-Tiers",
          fr: "/fr/stockage/Niveaux-de-stockage",
        },
        { en: "/en/storage/Use-AzCopy", fr: "/fr/stockage/Utiliser-AzCopy" },
        {
          en: "/en/storage/Desktop-Uploader",
          fr: "/fr/stockage/Chargeur-de-bureau",
        },
        { en: "/en/databricks/", fr: "/fr/databricks/" },
        {
          en: "/en/databricks/Databricks-101",
          fr: "/fr/databricks/Databricks-101",
        },
        {
          en: "/en/databricks/Cluster-Policies",
          fr: "/fr/databricks/Politiques-des-clusters",
        },
        {
          en: "/en/databricks/Git-Integration",
          fr: "/fr/databricks/Integration-de-Git",
        },
        {
          en: "/en/databricks/vscode_extension",
          fr: "/fr/databricks/extension-vscode",
        },
        {
          en: "/en/databricks/Conda-Packages",
          fr: "/fr/databricks/Paquets-Conda",
        },
        {
          en: "/en/databricks/Connecting-Google-API",
          fr: "/fr/databricks/Connexion-a-lAPI-Google",
        },
        {
          en: "/en/databricks/Dashboarding",
          fr: "/fr/databricks/Tableau-de-bord",
        },
        {
          en: "/en/databricks/Dashboarding-Tool-Comparison",
          fr: "/fr/databricks/Comparaison-des-outils-de-tableau-de-bord",
        },
        {
          en: "/en/databricks/Experiments-Automl",
          fr: "/fr/databricks/Experiences-Automl",
        },
        {
          en: "/en/databricks/Workflows",
          fr: "/fr/databricks/Flux-de-travail",
        },
        {
          en: "/en/databricks/Databricks-FAQ",
          fr: "/fr/databricks/FAQ-Databricks",
        },
        { en: "/en/postgresql/", fr: "/fr/postgresql/" },
        { en: "/en/postgresql/Postgres", fr: "/fr/postgresql/Postgres" },
        {
          en: "/en/postgresql/Postgres-Add-User",
          fr: "/fr/postgresql/Postgres-Ajouter-Utilisateur",
        },
        {
          en: "/en/postgresql/psql-databricks-comparison",
          fr: "/fr/postgresql/Comparaison-des-bases-de-donnees-psql",
        },
        { en: "/en/apps/", fr: "/fr/apps/" },
        { en: "/en/apps/WebApps", fr: "/fr/apps/WebApps" },
        { en: "/en/storage/Storage-PowerBI", fr: "/fr/stockage/Stockage-PowerBI" },
        { en: "/en/postgresql/Postgres-PowerBI", fr: "/fr/postgresql/Postgres-PowerBI" },
        { en: "/en/apps/Django", fr: "/fr/apps/Django" },
      ];

      const currentUrl = (this.$route?.path || this.$page.path).split(
        ".html",
      )[0];
      const otherLang = { en: "fr", fr: "en" }[this.currentLang];
      const urlMapping = mappings.find(
        (mapping) => mapping[this.currentLang] === currentUrl,
      );

      return urlMapping ? urlMapping[otherLang] : "#"; // Default to "#" if no mapping is found
    },
  },
};
</script>

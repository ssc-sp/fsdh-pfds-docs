import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";

const sidebar = {
  "/en/": [
    "/en/",
    {
      text: "Managing Workspaces and Users",
      collapsible: true,
      children: [
        {
          text: "Getting a workspace (only available on the GC network)",
          link: "https://gcxgce.sharepoint.com/teams/10002160/SitePages/Getting-a-workspace.aspx",
        },
        {
          text: "Estimate costs (only available on the GC network)",
          link: "https://gcxgce.sharepoint.com/teams/10002160/SitePages/Usage-costs-and-examples.aspx",
        },
        "/en/managing-workspaces-and-users/Preregistration",
        "/en/managing-workspaces-and-users/Request-tools",
        "/en/managing-workspaces-and-users/Invite-a-user",
        "/en/managing-workspaces-and-users/Change-a-user-role",
        "/en/managing-workspaces-and-users/CBR-management",
      ],
    },
    {
      text: "Storage",
      collapsible: true,
      children: [
        "/en/storage/Datahub-AzureStorage",
        {
          "text": "Bring Your Own Storage",
          collapsible: true,
          children: [
            "/en/storage/Import-AWS-Storage",
            "/en/storage/Import-Azure-Storage",
            "/en/storage/Import-GCP-Storage",
          ],
        },
        "/en/storage/Storage-Tiers",
        "/en/storage/Import-Storage",
        "/en/storage/Storage-PowerBI",
        "/en/storage/Use-AzCopy",
      ],
    },
    {
      text: "Databricks",
      collapsible: true,
      children: [
        "/en/databricks/Databricks-101",
        "/en/databricks/Cluster-Policies",
        "/en/databricks/Experiments-Automl",
        "/en/databricks/Workflows",
        {
          text: "Dashboarding",
          collapsible: true,
          children: [
            "/en/databricks/Dashboarding",
            "/en/databricks/Dashboarding-Tool-Comparison",
          ]
        },
        {
          text: "External Extensions",
          collapsible: true,
          children: [
            "/en/databricks/Git-Integration",
            "/en/databricks/vscode_extension",
            "/en/databricks/Conda-Packages",
            "/en/databricks/Connecting-Google-API",
          ]
        },
      ],
    },
    {
      text: "PostgreSQL",
      collapsible: true,
      children: [
        "/en/postgresql/Postgres",
        "/en/postgresql/Postgres-Add-User",
        "/en/postgresql/Postgres-PowerBI",
        "/en/postgresql/psql-databricks-comparison",
      ],
    },
    {
      text: "Web Applications",
      collapsible: true,
      children: [
        "/en/apps/WebApps",
        {
          text: "Demo Apps",
          collapsible: true,
          children: [
            {
              text: "Django (Python)",
              link: "https://github.com/ssc-sp/fsdh-demo-app-django"
            },
            "/en/apps/Django",
            {
              text: "Dash (Python)",
              link: "https://github.com/ssc-sp/fsdh-demo-app-dash"
            },
            {
              text: "Flask (Python)",
              link: "https://github.com/ssc-sp/fsdh-demo-app-flask"
            },
            {
              text: "Shiny (R)",
              link: "https://github.com/ssc-sp/datahub-demos/tree/main/shiny-app"
            },
            {
              text: "Streamlit (Python)",
              link: "https://github.com/ssc-sp/fsdh-demo-app-streamlit"
            },
          ]
        }
      ],
    },
    {
      text: "Migrating to Production",
      collapsible: true,
      children: [
        "/en/migration/Storage",
        "/en/migration/Databricks",
        "/en/migration/PostgreSQL",
        "/en/migration/WebApp",
      ],
    },
    {
      text: "User Guidance",
      collapsible: true,
      children: [
        "/en/guidance/Account-Management-and-Access-control-of-workspaces",
        "/en/guidance/Backup-and-Recovery",
        "/en/guidance/Code-Management",
        "/en/guidance/File-Restrictions",
        "/en/guidance/Workspace-Monitoring",
      ],
    },
    "/en/Terms-And-Conditions",
  ],
  "/fr/": [
    "/fr/",
    {
      text: "Gérer les espaces de travail et les utilisateurs",
      collapsible: true,
      children: [
        {
          text: "Obtenir un espace de travail (uniquement disponible sur le réseau GC)",
          link: "https://gcxgce.sharepoint.com/teams/10002160/SitePages/fr/Getting-a-workspace.aspx",
        },
        {
          text: "Estimer les coûts (uniquement disponible sur le réseau GC)",
          link: "https://gcxgce.sharepoint.com/teams/10002160/SitePages/fr/Usage-costs-and-examples.aspx",
        },
        "/fr/gerer-espaces-et-utilisateurs/Preregistration",
        "/fr/gerer-espaces-et-utilisateurs/Demande-outils",
        "/fr/gerer-espaces-et-utilisateurs/Invitez-un-utilisateur",
        "/fr/gerer-espaces-et-utilisateurs/Change-les-roles-dutilisateur",
        "/fr/gerer-espaces-et-utilisateurs/Gestion-BOI",
      ],
    },
    {
      text: "Stockage",
      collapsible: true,
      children: [
        "/fr/stockage/Datahub-AzureStorage",
        {
          "text": "Apporter votre propre stockage",
          collapsible: true,
          children: [
            "/fr/stockage/Importer-le-stockage-AWS",
            "/fr/stockage/Importer-le-stockage-Azure",
            "/fr/stockage/Importer-le-stockage-GCP",
          ],
        },
        "/fr/stockage/Niveaux-de-stockage",
        "/fr/stockage/Importer-le-stockage",
        "/fr/stockage/Stockage-PowerBI",
        "/fr/stockage/Utiliser-AzCopy",
      ],
    },
    {
      text: "Databricks",
      collapsible: true,
      children: [
        "/fr/databricks/Databricks-101",
        "/fr/databricks/Politiques-des-clusters",
        "/fr/databricks/Experiences-Automl",
        "/fr/databricks/Flux-de-travail",
        {
          text: "Tableau de bord",
          collapsible: true,
          children: [
            "/fr/databricks/Tableau-de-bord",
            "/fr/databricks/Comparaison-des-outils-de-tableau-de-bord",
          ]
        },
        {
          text: "Extensions externes",
          collapsible: true,
          children: [
            "/fr/databricks/Integration-de-Git",
            "/fr/databricks/extension-vscode",
            "/fr/databricks/Paquets-Conda",
            "/fr/databricks/Connexion-a-lAPI-Google",
          ]
        },
      ],
    },
    {
      text: "PostgreSQL",
      collapsible: true,
      children: [
        "/fr/postgresql/Postgres",
        "/fr/postgresql/Postgres-Ajouter-Utilisateur",
        "/fr/postgresql/Postgres-PowerBI",
        "/fr/postgresql/Comparaison-des-bases-de-donnees-psql",
      ],
    },
    {
      text: "Applications Web",
      collapsible: true,
      children: [
        "/fr/apps/WebApps",
        {
          text: "Exemples d'applications",
          collapsible: true,
          children: [
            {
              text: "Django (Python)",
              link: "https://github.com/ssc-sp/fsdh-demo-app-django"
            },
            "/fr/apps/Django",
            {
              text: "Dash (Python)",
              link: "https://github.com/ssc-sp/fsdh-demo-app-dash"
            },
            {
              text: "Flask (Python)",
              link: "https://github.com/ssc-sp/fsdh-demo-app-flask"
            },
            {
              text: "Shiny (R)",
              link: "https://github.com/ssc-sp/datahub-demos/tree/main/shiny-app"
            },
            {
              text: "Streamlit (Python)",
              link: "https://github.com/ssc-sp/fsdh-demo-app-streamlit"
            },
          ]
        }
      ],
    },
    {
      text: "Migration vers production",
      collapsible: true,
      children: [
        "/fr/migration/Stockage",
        "/fr/migration/Databricks",
        "/fr/migration/PostgreSQL",
        "/fr/migration/AppWeb",
      ],
    },
    {
      text: "Conseils aux utilisateurs",
      collapsible: true,
      children: [
        "/fr/conseils/Gestion-des-comptes-et-controle-de-lacces-aux-espaces-de-travail",
        "/fr/conseils/Sauvegarde-et-recuperation",
        "/fr/conseils/Gestion-de-code",
        "/fr/conseils/Fichiers-restreints",
        "/fr/conseils/Controle-despace-de-travail",
      ],
    },
    "/fr/Conditions-generales",
  ],
};
export { sidebar };

export default defineUserConfig({
  head: [
    // Import the GCDS stylesheet and javascript files from the node_modules directory
    ['link', { rel: 'stylesheet', href: '/node_modules/@gcds-core/components/dist/gcds/gcds.css' }],
    ['link', { rel: 'stylesheet', href: '/node_modules/@gcds-core/css-shortcuts/dist/gcds-css-shortcuts.min.css' }],
    ['script', { src: '/node_modules/@gcds-core/components/dist/gcds/gcds.js' }],
    ["link", { rel: "shortcut icon", href: "https://notification.canada.ca/static/images/favicon.ico",}],
  ],
  lang: "en-CA",
  title: "Federal Science DataHub | Plateforme fédérale de données scientifiques",
  description: "User documentation for the Federal Science DataHub",

  theme: defaultTheme({
    logo: "https://assets.notification.canada.ca/static/gov-canada-en.svg",
    // navbar: ["/", "/get-started"],
    lastUpdated: true,
    contributors: false,
    colorModeSwitch: false,
    docsRepo: "https://github.com/ssc-sp/fsdh-pfds-docs",
    docsBranch: "main",
    docsDir: "docs",
    colorMode: "light",
    sidebarDepth: 0,
    locales: {
      "/en/": {
        home: "/en/",
        selectLanguageName: "English",
        next: "Next",
        prev: "Previous",
        logo: "https://assets.notification.canada.ca/static/gov-canada-en.svg",
        editLinkText: "Edit this page on GitHub",
        lastUpdatedText: "Last Updated",
      },
      "/fr/": {
        home: "/fr/",
        selectLanguageName: "Français",
        next: "Prochain",
        prev: "Précédent",
        logo: "https://assets.notification.canada.ca/static/gov-canada-fr.svg",
        editLinkText: "Modifier cette page sur GitHub",
        lastUpdatedText: "Dernière mise à jour",
      }
    },
    sidebar: sidebar,
  }),

  locales: {
    "/en/": {
      lang: "en-CA",
      title: "Federal Science DataHub",
      description: "User documentation for the Federal Science DataHub",
    },
    "/fr/": {
      lang: "fr-CA",
      title: "Plateforme fédérale de données scientifiques",
      description:
        "Documentation utilisateur pour la Plateforme fédérale de données scientifiques",
    },
  },

  bundler: viteBundler({
    viteOptions: {
      vue: {
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.startsWith('gcds-'),
          },
        },
      },
    },
  }),
});

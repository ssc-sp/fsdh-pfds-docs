let baseURL = null
const publicUrl = process.env.PUBLIC_URL

if (publicUrl) {
  baseURL = publicUrl.endsWith("/") ? publicUrl : publicUrl + "/"
}
module.exports = {
  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { charset: 'utf-8' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: "shortcut icon", href: "https://notification.canada.ca/static/images/favicon.ico" }],
    // Google Tag Manager
    ['script', {}, `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-KRKRZQV');
    `],
    // Google Analytics 4
    ['script', { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-R04KFLQCVQ' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-R04KFLQCVQ', {anonymize_ip: true});
    `],
  ],
  title: "Federal Science DataHub | Plateforme fédérale de données scientifiques",
  base: baseURL || null,
  locales: {
    '/en/': {
      lang: 'en-CA',
      title: "Federal Science DataHub",
      description: 'Learn how to use the FSDH platform'
    },
    '/fr/': {
      lang: 'fr-CA',
      title: 'Plateforme fédérale de données scientifiques',
      description: 'Apprenez à utiliser la plateforme PFDS'
    }
  },
  markdown: {
    anchor: {
      permalink: true,
      permalinkSymbol: '#',
      permalinkAttrs: (slug, state) => ({ 'aria-hidden': 'true', 'tabindex': -1 })
    }
  },
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    logo: 'https://assets.notification.canada.ca/static/gov-canada-en.svg',
    editLinks: true,
    lastUpdated: true,
    nextLinks: true,
    prevLinks: true,
    docsRepo: 'ssc-sp/fsdh-pfds-docs',
    docsDir: 'src',
    docsBranch: 'main',
    smoothScroll: true,
    locales: {
      '/en/': {
        logo: 'https://assets.notification.canada.ca/static/gov-canada-en.svg',
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
        siteSubtitle: 'Documentation',
        backToNotifyLink: 'https://prd.fsdh-dhsf.science.cloud-nuage.canada.ca/',
        backToNotifyText: 'Back to the FSDH',
        editLinkText: 'Edit this page on GitHub (opens in a new tab)',
        lastUpdated: 'Last updated',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        nav: [
          { text: "Français", link: '/fr/' },
        ],
        sidebarDepth: 0,
        sidebar: {
          '/en/': [
            '/en/', 
            {
              title: 'Managing Workspaces and Users',
              path: '/en/managing-workspaces-and-users',
              collapsable: true,
              children: [
                ['https://gcxgce.sharepoint.com/teams/10002160/SitePages/Getting-a-workspace.aspx', 'Getting a workspace (only available on the GC network)'],
                ['https://gcxgce.sharepoint.com/teams/10002160/SitePages/Usage-costs-and-examples.aspx', 'Estimate costs (only available on the GC network)'],
                '/en/managing-workspaces-and-users/Preregistration',
                '/en/managing-workspaces-and-users/Complete-metadata',
                '/en/managing-workspaces-and-users/Request-tools',
                '/en/managing-workspaces-and-users/Change-a-user-role'
              ]
            },
            {
              title: 'Migrating to Production',
              path: '/en/migration',
              collapsable: true,
              children: [
                '/en/migration/Storage',
                '/en/migration/Databricks',
                '/en/migration/PostgreSQL',
                '/en/migration/WebApp'
              ]
            },
            {
              title: 'User Guidance',
              path: '/en/guidance',
              collapsable: true,
              children: [
                '/en/guidance/Account-Management-and-Access-control-of-workspaces',
                '/en/guidance/Backup-and-Recovery',
                '/en/guidance/Components-within-a-workspace',
                '/en/guidance/Github-and-code-repo-management.md',
                '/en/guidance/Incident-Detection-and-Response.md',
                '/en/guidance/Monitor-Usage.md',
                '/en/guidance/Monitoring-and-Auditing-a-Workspace.md',
                '/en/guidance/Personnel-security-clearance.md',
                '/en/guidance/Roles-within-FSDH-workspace.md',
                '/en/guidance/Source-code.md'
              ]
            },
            {
              title: 'Storage',
              path: '/en/storage',
              collapsable: true,
              children: [
                '/en/storage/Datahub-AzureStorage.md',
                '/en/storage/Import-AWS-Storage.md',
                '/en/storage/Import-Azure-Storage.md',
                '/en/storage/Import-GCP-Storage.md',
                '/en/storage/Import-Storage.md',
                '/en/storage/Use-AzCopy.md'
              ]
            },
            {
              title: 'Databricks',
              path: '/en/databricks',
              collapsable: true,
              children: [
                '/en/databricks/Databricks-101',
                '/en/databricks/Cluster-Policies',
                '/en/databricks/Git-Integration',
                '/en/databricks/vscode_extension',
                '/en/databricks/Conda-Packages',
                '/en/databricks/Connecting-Google-API',
                '/en/databricks/Dashboarding',
                '/en/databricks/Dashboarding-Tool-Comparison',
                '/en/databricks/Experiments-Automl',
                '/en/databricks/Workflows',
                '/en/databricks/Databricks-FAQ'
              ]
            },
            {
              title: 'PostgreSQL',
              path: '/en/postgresql',
              collapsable: true,
              children: [
                '/en/postgresql/Postgres',
                '/en/postgresql/Postgres-Add-User',
                '/en/postgresql/psql-databricks-comparison'
              ]
            },
            {
              title: 'Web Applications',
              path: '/en/apps',
              collapsable: true,
              children: [
                '/en/apps/WebApps'
              ]
            },
            '/en/Terms-And-Conditions'
          ]
        }
      },
      '/fr/': {
        logo: 'https://assets.notification.canada.ca/static/gov-canada-fr.svg',
        selectText: 'Langues',
        label: 'Français',
        ariaLabel: 'Langues',
        siteSubtitle: 'Documentation',
        backToNotifyLink: 'https://prd.fsdh-dhsf.science.cloud-nuage.canada.ca/',
        backToNotifyText: 'Retour à la PFDS',
        editLinkText: 'Modifier cette page sur GitHub (ouvre dans un nouvel onglet)',
        lastUpdated: 'Dernière mise à jour ',
        serviceWorker: {
          updatePopup: {
            message: "Du nouveau contenu est disponible.",
            buttonText: "Actualiser"
          }
        },
        nav: [
          { text: "English", link: '/en/' },
        ],
        sidebarDepth: 0,
        sidebar: {
          '/fr/': [
            '/fr/', 
            {
              title: 'Gérer les espaces de travail et les utilisateurs',
              path: '/fr/gerer-espaces-et-utilisateurs',
              collapsable: true,
              children: [
                ['https://gcxgce.sharepoint.com/teams/10002160/SitePages/fr/Getting-a-workspace.aspx', 'Obtenir un espace de travail (uniquement disponible sur le réseau GC)'],
                ['https://gcxgce.sharepoint.com/teams/10002160/SitePages/fr/Usage-costs-and-examples.aspx', 'Estimer les coûts (uniquement disponible sur le réseau GC)'],
                '/fr/gerer-espaces-et-utilisateurs/Preregistration',
                '/fr/gerer-espaces-et-utilisateurs/Complete-metadata',
                '/fr/gerer-espaces-et-utilisateurs/Demande-outils',
                '/fr/gerer-espaces-et-utilisateurs/Change-a-user-role'
              ]
            },
            {
              title: 'Migration vers la production',
              path: '/fr/migration',
              collapsable: true,
              children: [
                '/fr/migration/Stockage',
                '/fr/migration/Databricks',
                '/fr/migration/PostgreSQL',
                '/fr/migration/AppWeb'
              ]
            },
            {
              title: 'Conseils aux utilisateurs',
              path: '/fr/guidance',
              collapsable: true,
              children: [
                '/fr/guidance/Attestation-de-securite-du-personnel',
                '/fr/guidance/Code-source',
                '/fr/guidance/Composants-dun-espace-de-travail',
                '/fr/guidance/Controle-dusage',
                '/fr/guidance/Controle-et-audit-dun-espace-de-travail',
                '/fr/guidance/Detection-et-response-aux-incidents',
                '/fr/guidance/Gestion-des-comptes-et-controle-de-lacces-aux-espaces-de-travail',
                '/fr/guidance/Github-et-gestion-des-repos',
                '/fr/guidance/Roles-dans-un-espace-de-travail',
                '/fr/guidance/Sauvegarde-et-recuperation'
              ]
            },
            {
              title: 'Stockage',
              path: '/fr/stockage',
              collapsable: true,
              children: [
                '/fr/stockage/Datahub-AzureStorage',
                '/fr/stockage/Importer-le-stockage',
                '/fr/stockage/Importer-le-stockage-AWS',
                '/fr/stockage/Importer-Azure-Storage',
                '/fr/stockage/Importer-le-stockage-GCP',
                '/fr/stockage/Utilisez-AzCopy'
              ]
            },
            {
              title: 'Databricks',
              path: '/fr/databricks',
              collapsable: true,
              children: [
                '/fr/databricks/Databricks-101',
                '/fr/databricks/Politiques-des-clusters',
                '/fr/databricks/Intégration-de-Git',
                '/fr/databricks/extension-vscode',
                '/fr/databricks/Paquets-Conda',
                '/fr/databricks/Connexion-à-l\'API-Google',
                '/fr/databricks/Tableau-de-bord',
                '/fr/databricks/Comparaison-des-outils-de-tableau-de-bord',
                '/fr/databricks/Expériences-Automl',
                '/fr/databricks/Flux-de-travail',
                '/fr/databricks/FAQ-Databricks'
              ]
            },
            {
              title: 'PostgreSQL',
              path: '/fr/postgresql',
              collapsable: true,
              children: [
                '/fr/postgresql/Postgres',
                '/fr/postgresql/Postgres-Ajouter-Utilisateur',
                '/fr/postgresql/Comparaison-des-bases-de-données-psql'
              ]
            },
            {
              title: 'Applications Web',
              path: '/fr/apps',
              collapsable: true,
              children: [
                '/fr/apps/WebApps'
              ]
            },
            '/fr/Conditions-generales'
          ]
        }
      },
    },
  },
  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          return new Date(timestamp).toLocaleDateString(lang)
        }
      },
    ],
    '@vuepress/back-to-top',
    ''
  ],
  chainWebpack: (config, isServer) => {
    const jsRule = config.module.rule('js');

    // Clear the existing exclude condition(s)
    jsRule.exclude.clear();

    // Add a new exclude function
    jsRule.exclude.add(filepath => {
      // Transpile .vue.js files (standard VuePress behavior)
      if (/\.vue\.js$/.test(filepath)) {
        return false;
      }

      // Transpile 'swagger-ui-dist' from node_modules
      if (/[\\/]node_modules[\\/]swagger-ui-dist/.test(filepath)) {
        return false; // Do not exclude: transpile this
      }

      // If you were also transpiling swagger-editor, you'd keep its rule:
      // if (/[\\/]node_modules[\\/]swagger-editor/.test(filepath)) {
      //   return false;
      // }

      // Exclude other node_modules
      if (/[\\/]node_modules/.test(filepath)) {
        return true; // Exclude these
      }

      // Do not exclude project source files (or other files not in node_modules)
      return false;
    });

    // If you still need the 'global' definition (e.g., if swagger-ui-dist or another dep needs it)
    // keep this part. If not, you might be able to remove it.
    if (config.plugins.has('vuepress-defines')) {
      config.plugin('vuepress-defines').tap(args => {
        args[0] = typeof args[0] === 'object' && args[0] !== null ? args[0] : {};
        args[0]['global'] = 'window';
        return args;
      });
    }
  }
}

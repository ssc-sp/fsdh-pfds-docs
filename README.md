[*La version française suit*](#documentation-pour-la-plateforme-fédérale-de-données-scientifiques)

<div align="center">

![The Federal Science DataHub](./fsdh-2.jpg)

![MIT Licence](https://img.shields.io/badge/licence-mit-blue) ![GitHub contributors](https://img.shields.io/github/contributors/ssc-sp/fsdh-pfds-docs) ![GitHub Repo stars](https://img.shields.io/github/stars/ssc-sp/fsdh-pfds-docs) ![GitHub Release](https://img.shields.io/github/v/release/ssc-sp/fsdh-pfds-docs) ![GitHub branch status](https://img.shields.io/github/checks-status/ssc-sp/fsdh-pfds-docs/main?label=build)

</div>

# Federal Science DataHub Documentation

The **Federal Science DataHub (FSDH)** is a cloud-based platform tailored to support science, research, and data collaboration within the Government of Canada. It provides secure data storage, analytics, collaboration, and AI capabilities, while ensuring that data ownership remains with federal organizations.

This is the repository holding the user documentation for the FSDH. The documentation is built using [VuePress](https://vuepress.vuejs.org/) and will be hosted online website.

> Note: This repository was originally forked from the [GC Notify Documentation](https://github.com/cds-snc/notification-documentation) repository. Some original content may still reference GC Notify.

## Documentation files
This repository holds documentation in various Markdown files:
- in English in [`src/en`](src/en)
- in French in [`src/fr`](src/fr)

## VuePress theme
The VuePress configuration is in [`src/.vuepress/config.js`](src/.vuepress/config.js). We use the default theme and the associated documentation [can be seen online](https://vuepress.vuejs.org/theme/default-theme-config.html).

## Sidebar
The sidebar is defined in [`src/.vuepress/config.js`](src/.vuepress/config.js). A separate sidebar is defined for each language.

If you want to add pages or groups of pages, you should tweak the `sidebar` object.

Mappings between the English and French paths must be defined in [`src/.vuepress/theme/components/NavLinks.vue`](src/.vuepress/theme/components/NavLinks.vue) to enable switching between languages.

## Local deployment using VuePress
For quick editing and hot reload a light-weight solution is to use VuePress. Listed below are instructions to run a local server for viewing the documentation content. 
1. Download packages and their dependencies
```commandline
npm install
```
2. Run the VuePress
```commandline
npm run dev
```

## Local deployment using Docker
A [`Dockerfile`](Dockerfile) is provided to anyone that wants to leverage Docker for deploying a webserver `nginx` for serving the documentation content.

**Prerequisites**
- Install Docker from https://www.docker.com

**Instructions**
1. Launch a terminal and navigate to the notification-documentation project root directory
2. Build the container with a tag, an example is listed below
```commandline
docker build -t ssc-sp/fsdh-pfds-docs:0.1 .
```
3. Check that the image has been built successfully
```commandline
docker images
```
4. Launch the image on your local machine, the example below serves the pages at port 8000
```commandline
docker run -p 8000:80 ssc-sp/fsdh-pfds-docs:0.1
```
5. Open up a web browser and navigate to http://localhost:8000 to view the content

---

[*English version above*](#federal-science-datahub-documentation)

<div align="center">

![Plateforme fédérale de données scientifiques](./fsdh-fr.png)

![Licence MIT](https://img.shields.io/badge/licence-mit-blue) ![GitHub contributors](https://img.shields.io/github/contributors/ssc-sp/fsdh-pfds-docs?label=contributeurs) ![GitHub Repo stars](https://img.shields.io/github/stars/ssc-sp/fsdh-pfds-docs?label=%C3%89toiles) ![GitHub Release](https://img.shields.io/github/v/release/ssc-sp/fsdh-pfds-docs?label=version) ![GitHub branch status](https://img.shields.io/github/checks-status/ssc-sp/fsdh-pfds-docs/main?label=compilation)

[Documentation](https://github.com/ssc-sp/datahub-docs) | [Consignes pour les développeurs](developer-guidelines.md) | [Contribution](CONTRIBUTING.md) | [Sécurité](SECURITY.md)

</div>

# Documentation pour la Plateforme fédérale de données scientifiques

La **Plateforme fédérale de données scientifiques (PFDS)** est une plateforme basée sur le nuage conçue pour soutenir la science, la recherche et la collaboration en matière de données au sein du gouvernement du Canada. Elle offre un stockage sécurisé des données, des capacités d'analyse, de collaboration et d'IA, tout en garantissant que la propriété des données reste aux organisations fédérales.

Ceci est le dépôt contenant la documentation utilisateur pour la PFDS. La documentation est construite à l'aide de [VuePress](https://vuepress.vuejs.org/) et sera hébergée en ligne.

> Note : Ce dépôt a été initialement forké à partir du dépôt [GC Notify Documentation](https://github.com/cds-snc/notification-documentation). Certains contenus originaux peuvent encore faire référence à GC Notify.

## Fichiers de documentation
Ce dépôt contient la documentation dans divers fichiers Markdown :
- en anglais dans [`src/en`](src/en)
- en français dans [`src/fr`](src/fr)

## Thème VuePress
La configuration de VuePress se trouve dans [`src/.vuepress/config.js`](src/.vuepress/config.js). Nous utilisons le thème par défaut et la documentation associée [peut être consultée en ligne](https://vuepress.vuejs.org/theme/default-theme-config.html).

## Barre latérale
La barre latérale est définie dans [`src/.vuepress/config.js`](src/.vuepress/config.js). Une barre latérale distincte est définie pour chaque langue.

Si vous souhaitez ajouter des pages ou des groupes de pages, vous devez modifier l'objet `sidebar`.

Les correspondances entre les chemins anglais et français doivent être définies dans [`src/.vuepress/theme/components/NavLinks.vue`](src/.vuepress/theme/components/NavLinks.vue) pour permettre le changement de langue.

## Déploiement local à l'aide de VuePress
Pour une édition rapide et un rechargement à chaud, une solution légère consiste à utiliser VuePress. Voici les instructions pour exécuter un serveur local pour visualiser le contenu de la documentation.
1. Téléchargez les packages et leurs dépendances
```commandline
npm install
```
2. Exécutez le VuePress
```commandline
npm run dev
```

## Déploiement local à l'aide de Docker
Un [`Dockerfile`](Dockerfile) est fourni à toute personne souhaitant utiliser Docker pour déployer un serveur web `nginx` pour servir le contenu de la documentation.

**Prérequis**
- Installer Docker depuis https://www.docker.com

**Instructions**
1. Lancez un terminal et naviguez jusqu'au répertoire racine du projet notification-documentation
2. Construisez le conteneur avec une étiquette, un exemple est indiqué ci-dessous
```commandline
docker build -t ssc-sp/fsdh-pfds-docs:0.1 .
```
3. Vérifiez que l'image a été construite avec succès
```commandline
docker images
```
4. Lancez l'image sur votre machine locale, l'exemple ci-dessous sert les pages au port 8000
```commandline
docker run -p 8000:80 ssc-sp/fsdh-pfds-docs:0.1
```
5. Ouvrez un navigateur web et naviguez vers http://localhost:8000 pour voir le contenu
# Différences entre les espaces de travail « Non classifiés » et « Protégé B »

Les espaces de travail « Non classifiés » et « Protégé B » sont soumis à des exigences et des contrôles de sécurité différents. Ce document présente les principales différences entre ces deux types d’espaces de travail.

## Accès externe

L’accès externe est désactivé dans les espaces de travail « Protégé B », tandis qu’il est activé dans les espaces de travail « Non classifiés », en fonction des politiques de l’organisation.

## Stockage

La fonctionnalité pour apporter votre propre stockage est désactivée dans les espaces de travail de type « Protected B », car les solutions de stockage externes peuvent ne pas répondre aux exigences de sécurité strictes.

La génération d’un jeton SAS est désactivée dans les espaces de travail de type « Protected B ».

## Databricks

Une liste complète des fonctionnalités de Databricks indisponibles dans les espaces de travail « Protected B » est disponible dans la [documentation Azure Databricks](https://learn.microsoft.com/fr-ca/azure/databricks/security/privacy/cccs-medium-protected-b#regional-support-for-features).

La principale restriction réside dans le fait que la plupart des fonctionnalités d’IA sont désactivées, notamment la mise à disposition de modèles et certaines fonctionnalités de Genie.

## PostgreSQL

Il n’y a pas de différences majeures entre les fonctionnalités PostgreSQL des espaces de travail « Non classifiés » et « Protégé B ». Certaines configurations de sécurité sont mises en place pour les espaces de travail « Protégé B » afin de garantir la conformité aux normes de sécurité.

## Azure App Service

Il n’y a pas de différences majeures entre les fonctionnalités d’Azure App Service des espaces de travail « Non classifiés » et « Protégé B ». Certaines configurations de sécurité sont mises en place pour les espaces de travail « Protégé B » afin de garantir la conformité aux normes de sécurité.
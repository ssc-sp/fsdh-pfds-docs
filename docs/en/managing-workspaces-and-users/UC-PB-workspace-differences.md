# Differences between Unclassified and Protected B workspaces

Unclassified and Protected B workspaces have different security requirements and controls. This document outlines the key differences between these two types of workspaces.

## External Access

External access is disabled in Protected B workspaces, while it is enabled in Unclassified workspaces depending on the organization's policies.

## Storage

Bring-your-own-storage (BYOS) is disabled in Protected B workspaces since external storage solutions may not meet the stringent security requirements.

Generating a SAS token is disabled in Protected B workspaces.

## Databricks

A complete list of Databricks features that are unavailable in Protected B can be found on the [Azure Databricks documentation](https://learn.microsoft.com/en-ca/azure/databricks/security/privacy/cccs-medium-protected-b#regional-support-for-features).

The primary restriction is that most AI features are disabled, including model serving and some Genie features.

## PostgreSQL

There are no major differences in PostgreSQL features between Unclassified and Protected B workspaces. Certain security configurations are in place for Protected B workspaces to ensure compliance with security standards.

## Azure App Service

There are no major differences in Azure App Service features between Unclassified and Protected B workspaces. Certain security configurations are in place for Protected B workspaces to ensure compliance with security standards.
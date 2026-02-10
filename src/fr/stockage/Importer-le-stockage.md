# Accéder au stockage dans Databricks

Lorsque votre espace de travail Databricks est créé pour votre projet, un compte de stockage Azure a déjà été créé. La Plateforme fédérale de données scientifiques monte également le stockage Blob du compte de stockage avec le cluster Databricks pré-créé (main_cluster). Ce montage est destiné à vous faciliter la tâche et l'accès aux données Blob dépend de votre identité.

## Conditions préalables

* Connaissance de l'API de fichiers en Python ou R
* Accès à Databricks dans un espace de travail

## Point de montage de la PFDS par défaut

Le compte de stockage a été monté dans Databricks sur le cluster par défaut (`main_cluster`) et est accessible dans votre Noteobok comme un dossier normal. Le montage du stockage dans Databricks vous permet d'accéder aux objets dans le stockage d'objets comme s'ils se trouvaient sur le système de fichiers local.

Pour accéder au point de montage dans le cluster par défaut, consultez l'exemple de code ci-dessous

```python
df = spark.read.option("header","true").csv('/mnt/fsdh-dbk-main-mount/sample.csv');
df.show(3);
```

Dans l'exemple ci-dessus, le chemin pré-créé `/mnt/fsdh-dbk-main-mount/` pointe vers le conteneur `datahub` de votre stockage Blob. Le fichier `sample.csv` est à titre d'illustration et vous devez le remplacer par le nom de votre fichier.

Pour accéder au même chemin pré-créé depuis R en utilisant SparkR, consultez l'exemple de code suivant.

```r

library(SparkR)
sparkR.session()
df <- read.df("dbfs:/mnt/fsdh-dbk-main-mount/sample.csv", source = "csv")
head(df, 3)
```

## Autres approches

Au fur et à mesure que vous créez plus de clusters basés sur les politiques de cluster de la PFDS, vous pouvez monter le stockage Blob de votre projet dans votre code.

### Option 1 - Jeton SAS (Recommandé)

Dans votre notebook, référez-vous simplement à votre stockage en utilisant la configuration Spark préconfigurée abfss_uri. Exemple de code :

```python
dbutils.fs.ls(spark.conf.get('abfss_uri'))
```

**Comment cela fonctionne-t-il ?**

Le jeton SAS pour votre compte de stockage a été précréé dans Azure Key Vault et référencé dans la configuration de votre cluster. Le jeton SAS sera périodiquement renouvelé. La configuration du cluster ressemble à ce qui suit. Ces paramètres s'appliquent aux clusters créés en utilisant la politique de cluster FSDH ainsi qu'aux clusters personnels.

```
fs.azure.sas.token.provider.type.yourstorageaccount.dfs.core.windows.net org.apache.hadoop.fs.azurebfs.sas.FixedSASTokenProvider
fs.azure.account.auth.type.yourstorageaccount.dfs.core.windows.net SAS
fs.azure.sas.fixed.token.yourstorageaccount.dfs.core.windows.net {{secrets/datahub/container-sas}}
abfss_uri abfss://datahub@yourstorageaccount.dfs.core.windows.net
```

### Option 2 - Monter avec la clé du compte de stockage

```python
if any(mount.mountPoint == "/mnt/fsdh" for mount in dbutils.fs.mounts()):
         dbutils.fs.unmount("/mnt/fsdh")

dbutils.fs.mount(
   source = "wasbs://datahub@mystorage.blob.core.windows.net",
   mount_point = "/mnt/fsdh",
   extra_configs = {"fs.azure.account.key.mystorage.blob.core.windows.net":dbutils.secrets.get(scope = "datahub", key = "storage-key")})
```

### Option 3 - Monter le conteneur Blob

Monter le conteneur avec le code suivant

```python
configs = {
    "fs.azure.account.auth.type": "CustomAccessToken",
    "fs.azure.account.custom.token.provider.class": spark.conf.get("spark.databricks.passthrough.adls.gen2.tokenProviderClassName")
}

dbutils.fs.mount(
    source = "abfss://container@account.dfs.core.windows.net/",
    mount_point = "/mnt/my-mountpoint",
    extra_configs = configs
)
```

Une fois que vous avez monté un dossier dans /mnt/my-mountpoint, les programmes Python dans Databricks peuvent accéder aux fichiers de ce conteneur de stockage comme s'ils étaient des fichiers locaux.

```python
df = spark.read.option("header","true").csv('/mnt/my-mountpoint/sample.csv')
df.show(3)
```

### Option 4 - Accéder directement aux fichiers individuels

Vous pouvez également accéder directement aux fichiers sans monter d'abord le stockage

```python
spark.read.format("csv").load("abfss://container@account.dfs.core.windows.net/sample.csv").collect()
```

## Références

Voir [la documentation Databricks sur le stockage](https://learn.microsoft.com/fr-ca/azure/databricks/connect/storage/azure-storage) pour plus de détails
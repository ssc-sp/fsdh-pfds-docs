# Accéder au stockage dans Power BI

Vous pouvez vous connecter à votre stockage sur la PFDS à partir de Power BI en suivant ces étapes.

Pour ce faire, vous devez obtenir un jeton SAS pour vos données. Vous devriez également avoir le nom de votre compte de stockage à portée de main, que vous trouverez dans l’explorateur de stockage de la PFDS, à côté de l’en-tête « Conteneur actuel ».

1. Dans Power BI, cliquez sur « Obtenir des données d’une autre source ».
![La page d’accueil de Power BI avec le bouton « Obtenir des données d’une autre source » surlignée en jaune.](./img/1-get-data.png)

2. Recherchez « Stockage Blob » ou « Blob Storage » dans la liste des options.
![La fenêtre contextuelle « Obtenir les données » s’ouvre. « Stockage d’objets blob » est tapé dans la zone de recherche. Le champ « Stockage Blob Azure » est surligné en jaune.](./img/2-blob-storage.png)

3. Copiez le nom de votre compte de stockage sur la PFDS dans le champ.
![La fenêtre contextuelle « Stockage Blob Azure » s’ouvre. Le champ pour saisir le nom ou l’URL du compte est surligné en jaune.](./img/3-input-name.png)

4. Sélectionnez pour utiliser un jeton SAS, copiez votre jeton SAS dans le champ.
![La fenêtre contextuelle « Stockage Blob Azure » s’ouvre. Le bouton de la barre latérale pour la signature de l’accès partagé est sélectionné et surligné en jaune. Le champ pour saisir le jeton est également surligné en jaune.](./img/4-sas-token.png)

5. Vous pouvez ensuite importer vos données. Par défaut, cela importe une liste d’objets blob dans votre conteneur, mais vous pouvez personnaliser les requêtes en conséquence. Des exemples de requêtes sont fournis ci-dessous.
![Un aperçu des données stockées dans le conteneur Stockage Blob s’affiche et est prêt à être chargé.](./img/5-import-data.png)

## Exemples de requêtes

Nous avons quelques exemples de requêtes pour vous aider à charger vos données:

### Charger un fichier CSV

```
let
    fileUrl = "https://<compte_stockage>.blob.core.windows.net/datahub/<piste>.csv?<jeton>",
    source = Csv.Document(Web.Contents(fileUrl),[Delimiter=",", Encoding=1252, QuoteStyle=QuoteStyle.None]),
    file = Table.PromoteHeaders(source)
in
    file
```
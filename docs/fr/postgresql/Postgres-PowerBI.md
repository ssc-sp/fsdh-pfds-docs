# Accéder à PostgreSQL dans Power BI

Vous pouvez vous connecter à votre base de données PostgreSQL sur la PFDS à partir de Power BI en suivant ces étapes.

Assurez-vous que Power BI Desktop est installé et que vous avez ajouté votre ordinateur au pare-feu PostgreSQL, consultez la [documentation PostgreSQL](./Postgres.md) pour savoir comment procéder.

1. Dans Power BI, cliquez sur « Obtenir des données d’une autre source ».
![La page d’accueil de Power BI avec le bouton « Obtenir des données d’une autre source » surlignée en jaune.](./img/powerbi-1-get-data.png)

2. Recherchez « Azure Database for PostgreSQL » dans le champ de recherche, sélectionnez-le puis cliquez sur Connecter.
![La fenêtre contextuelle « Obtenir les données » s’ouvre. « Azure Database » est tapé dans la zone de recherche. Le champ « Azure Database for PostgreSQL » est surligné en jaune.](./img/powerbi-2-search.png)

3. Entrez votre nom d’hôte pour Serveur et « fsdh » pour Base de données (par défaut).
![La fenêtre contextuelle de connexion à la base de données PostgreSQL est ouverte. Les champs « Serveur » et « Base de données » sont surlignés en jaune.](./img/powerbi-3-conninfo.png)

4. Entrez le nom d’utilisateur et le mot de passe pour vous connecter à votre base de données.
![La fenêtre contextuelle de connexion à la base de données PostgreSQL est ouverte. Les champs « Nom d'utilisateur » et « Mot de passe » sont surlignés en jaune.](./img/powerbi-4-user-pass.png)

5. Sélectionnez vos tables et cliquez sur Charger pour charger les données.
![La fenêtre Navigateur est ouverte. Une table de la base de données s’affiche dans l’écran d’aperçu et est prête à être importée.](./img/powerbi-5-import.png)

Vos données sont maintenant accessibles à partir de Power BI.
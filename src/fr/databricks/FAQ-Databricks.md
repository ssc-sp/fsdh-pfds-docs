# Databricks Foire aux questions

## Quels sont les langages de programmation supportés par Databricks ?

Les langages suivants sont pris en charge : Spark SQL, Java, Scala, Python, R et SQL standard. Cela vous offre la possibilité de sélectionner le langage avec lequel vos développeurs sont à l'aise pour votre projet. De plus, Databricks offre la possibilité aux développeurs d'utiliser plusieurs langages dans un seul carnet de notes.

## Mon équipe utilise actuellement Python/R pour l'analyse des données. Est-il facile de passer à l'utilisation de Python pour Spark (PySpark) et de R pour Spark (SparkR) ?

La syntaxe et les méthodologies utilisées par PySpark et SparkR sont axées sur l'idée de plusieurs ordinateurs exécutant le code que vous avez écrit, de sorte que leur syntaxe diffère dans une certaine mesure de celle de Python et de R. Par conséquent, il peut être nécessaire de suivre une formation pour acquérir les compétences nécessaires à l'utilisation de la version Spark des langages. D'une manière générale, la transition vers l'utilisation de PySpark et SparkR n'est pas très compliquée.

## Mon projet de données n'est pas complexe et ne nécessite pas l'utilisation de Spark ou de la puissance de calcul parallèle, puis-je quand même utiliser les Databricks pour ce projet ?

Absolument, oui. Databricks permet d'écrire votre code en utilisant le langage Python ou R ordinaire et d'utiliser pandas et d'autres bibliothèques populaires. Il permet également d'exécuter votre code sur une seule machine virtuelle (un seul cluster), avec un minimum de ressources informatiques requises pour votre projet.

## Comment puis-je télécharger mon propre jeu de données et l'utiliser dans Databricks ?

Vous pouvez télécharger et gérer votre ensemble de données à l'aide du portail de la PFDS. Les données téléchargées seront stockées dans l'infonuagique à l'aide du stockage Azure Blob. Pour accéder au fichier téléchargé par programmation à l'aide de Databricks, vous devrez obtenir le chemin d'accès où le fichier est stocké. Le chemin d'accès de votre fichier téléchargé peut être obtenu à partir de la page de stockage de votre espace de travail. Pour plus d'informations sur l'accès à votre stockage dans Databricks, consultez [Accéder au stockage dans Databricks](../storage/Import-Storage.md) pour obtenir des exemples de code en Python et en R.

## Puis-je créer mon propre Cluster dans Databricks ?

Oui. Par défaut, nous vous fournissons un cluster partagé que vous pouvez utiliser pour votre projet. Cependant, si vous avez des exigences spécifiques pour votre projet qui ne peuvent pas être satisfaites par le cluster partagé, vous pouvez créer votre propre cluster avec sa propre configuration. N'hésitez pas à nous contacter avec vos exigences et nous serons heureux de vous aider à ce sujet.

## L'environnement Databricks est-il certifié pour traiter des informations Protégé B ?

Non, actuellement, l'environnement Databricks pris en charge par le Federal Science DataHub ne prend en charge que les données NON CLASSIFIÉES. Nous travaillons actuellement à une solution pour les données Protégé B.

## Puis-je accéder à l'environnement Databricks à l'aide d'un carnet Jupyter fonctionnant localement ou d'IDE tels que PyCharm, VS Code et Spyder ?

Oui, vous pouvez. Cependant, cela nécessite une certaine configuration à effectuer sur les Databricks. Nous avons une documentation sur [l'utilisation de Databricks avec VS Code](./vscode_extension.md) et pouvons vous fournir le support nécessaire pour configurer la connexion entre votre IDE local et l'environnement Databricks.

## Comment mes données et le code source sont-ils protégés contre les accès non autorisés ?

Les environnements DHSF Analytics suivent le principe de sécurité du "moindre privilège", ce qui signifie que seul l'ensemble minimal de privilèges requis pour effectuer les tâches sera accordé aux utilisateurs. Des contrôles d'accès et des procédures seront mis en place pour garantir que tout code source créé dans votre projet Databricks ne peut être consulté et exécuté que par les utilisateurs autorisés à le faire. De même, les données stockées dans le compte Azure Blog Storage de votre projet seront gérées à l'aide d'un contrôle d'accès au niveau des dossiers afin de garantir que seuls les utilisateurs ayant reçu une autorisation explicite pourront lire et écrire dans les fichiers et les dossiers.

## Qui sera responsable de la configuration des ressources Databricks (dossiers, clusters, groupes d'accès et utilisateurs), du compte de stockage Blob et des contrôles d'accès relatifs à ces composants ?

La configuration des ressources Databricks et du compte de stockage sera gérée par l'équipe DHSF.

## J'ai un projet d'IA/apprentissage machine que je voudrais mettre en œuvre à l'aide de Databricks, comment puis-je commencer ?

Pour le moment, nous n'assumerons pas la responsabilité de la construction des modèles ML, mais nous serons heureux de vous aider en vous fournissant les outils et services techniques nécessaires pour atteindre l'objectif de votre projet.

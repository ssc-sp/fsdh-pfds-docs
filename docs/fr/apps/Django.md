# Configuration Django pour la PFDS

Si votre application web est une application _Django_, ce guide existe pour vous assister dans quelques changements de plus qui seront requis pour que votre application fonctionne bien sur la PFDS.

## Activer la réécriture d'URL

Dans la section de service d'application, sous les paramètres rapides, existe une option nommée "Réécriture d'URL" qui doit être activée. Sans ce changement, il est possible que Django ne reconnaisse pas les URL qui se font accéder.

## Ajouter la PFDS aux configurations `ALLOWED_HOSTS` et `CSRF_TRUSTED_ORIGINS`

Pour que la PFDS montre vos pages web, vous avez besoin d'informer le serveur quels sites sont permis d'être hôte de votre application. Il est probable que vous avez déjà des variables d'environnement qui déterminent ceci, dans ce cas vous devez simplement ajouter `federal-science-datahub.canada.ca`, `plateforme-federale-donnees-scientifiques.canada.ca`, `prd.fsdh-dhsf.science.cloud-nuage.canada.ca` et `fsdh-proj-<nom du projet>-webapp-prd.azurewebsites.net`. Si vous n'avez pas de variables d'environnement pour déterminer ces valeurs, vous pouvez soit les créer ou manuellement ajouter ces valeurs dans votre fichier `settings.py`.

Voici un exemple de quoi ces valeurs pourraient ressembler à l'intérieur de votre `settings.py`. Dans ce cas-ci, les deux sont déterminés par la même variable d'environnement mais cela n'est pas nécessaire.

```python
ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS","127.0.0.1").split(",")
CSRF_TRUSTED_ORIGINS = (f'https://{i}' for i in ALLOWED_HOSTS) # CSRF_TRUSTED_ORIGINS a besoin que la chaîne commence par "https://".
```
## Ajouter le `FORCE_SCRIPT_NAME` dans `settings.py`

Dans le fichier `settings.py` de votre projet, vous auriez besoin de mettre la variable `FORCE_SCRIPT_NAME` pour qu'elle inclue le "URL proxy pour le développement" qui se trouve dans les informations sur l'application web dans la section de gestion d'application de votre espace de travail. Cette valeur devrait ressembler à `/app/<Nom du projet>/`. Une fois que cette modification est appliquée, Django va ajouter le préfixe aux liens internes de vos pages.

Vous aurez aussi besoin de modifier votre déclaration de `STATIC_URL` dans le même fichier et ajouter la même valeur au début. Les changements devraient ressembler au code suivant.

```python
FORCE_SCRIPT_NAME = os.environ.get("SCRIPT_NAME","")
# ... Il y a probablement plus de code entre ces deux lignes.
STATIC_URL = os.path.join(FORCE_SCRIPT_NAME, "static/")
```

Pour que Django applique _vraiment_ le préfixe par compte, il semble qu'il faut que les chaînes dans votre fichier `urls.py` **de base** sont des chaînes formaté:
```python
urlpatterns = [
    path('chemin/ici/', views.page, name="page"), # Incorrecte, pas de chaînes formaté
    path(f'autre/chemin/', views.page, name="page"), # Correcte, une chaîne formate
    path(f'autre/chemin/', include("autres.urls")), # Applique ce changement aussi pour les chaînes qui mènent à d'autres urlpatterns, vous n'avez pas besoin de formatter les chaînes dans ces autres fichiers.
] + static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS)
```

## Récupération correcte de l'URL

Il est possible que certains liens ou références ne marchent pas, si cela est le cas, assurez-vous que vous utilisez le remplacement d'URL de Django et que ces liens ne sont pas codé en dur. Par exemple, dans votre HTML/CSS/JS utilisez `"{% url 'accueil' %}"` à la place de `"/"` ou `"/accueil"`. Dans votre code Python, l'équivalent serait `django.urls.reverse("accueil")`. Assurez-vous aussi que les pages sont bel et bien nommées dans vos fichiers `urls.py` car ce sont ces noms que Django essaie de trouver. Sans ces changements, votre préfixe ne se fait pas appliquer à vos URLs.
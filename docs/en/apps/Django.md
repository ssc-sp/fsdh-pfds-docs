# Django Configuration for FSDH

If your web app is a _Django_ web app, this guide is meant to assist you in a few further changes that you will have to make for your app to properly function on the FSDH.

## Toggle "URL rewrite" On

In the App Service section of your workspace, under "Quick settings" is a switch labeled "URL rewriting" that needs to be turned on. Without this, Django may not recognize the URLs that get accessed.

## Add the FSDH to the `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS`

In order for the FSDH to properly render your web pages, you need to inform the server which sites are allowed to host your app. It is likely that you already have environment variables to determine these, in which case you simply need to add `federal-science-datahub.canada.ca`, `plateforme-federale-donnees-scientifiques.canada.ca`, `prd.fsdh-dhsf.science.cloud-nuage.canada.ca` and `fsdh-proj-<your workspace name>-webapp-prd.azurewebsites.net`. If you do not have environment variables for these, you can either create them or manually set them in your `settings.py`.

Here is an example of what setting these values inside of `settings.py` could look like. In this case, both are set by the same environment variable but that is in no way necessary.

```python
ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS","127.0.0.1").split(",")
CSRF_TRUSTED_ORIGINS = (f'https://{i}' for i in ALLOWED_HOSTS) # CSRF_TRUSTED_ORIGINS requires the strings to contain "https://".
```

## Add the `FORCE_SCRIPT_NAME` in `settings.py`

In the `settings.py` file of your Django project you will need to set the `FORCE_SCRIPT_NAME` variable to include the "Proxy URL for development" from the Web application information section of your workspace's app service. It should resemble something like `/app/<Project Name>/`. Once this is applied, Django will know to prepend your internal links with the FSDH prefix.

You will also need to go to your `STATIC_URL` declaration in the same file and also prepend it with the same value. It should resemble something like the following.

```python
FORCE_SCRIPT_NAME = os.environ.get("SCRIPT_NAME","")
# ... There would probably be more code in between these two lines
STATIC_URL = os.path.join(FORCE_SCRIPT_NAME, "static/")
```

For Django to _actually_ apply the prefix however, it seems that the strings in the **base** `urls.py` must be formatted strings:
```python
urlpatterns = [
    path('path/here/', views.page, name="page"), # Incorrect, not a formatted string
    path(f'path/here/', views.page, name="page"), # Correct, a formatted string
    path(f'other/path/', include("other.urls")), # Also format the strings for paths that lead to other urlpatterns, you do not need to format the strings in the other file however.
] + static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS)
```

## Proper URL Retrieval

It is possible that some links or references might not work, if that is the case make sure that you are using Django's URL replacement features and that they are not hardcoded. For example, in your HTML/CSS/JS you would use `"{% url 'home' %}"` instead of `"/"` or `"/home"`. In you Python code, you would use `django.urls.reverse("home")`. Do also make sure that you give your pages their respective names in the `urls.py` as it is these names that Django looks for. Without this, these URLs won't contain the script name.
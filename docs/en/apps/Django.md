# Hosting (Django) Web Apps on DataHub

If your web app is a _Django_ web app, this guide is meant to assist you in a few further changes that you will have to make.

## Toggle "URL rewrite" on

In the App Service section of your workspace, under "Quick settings" is a switch labeled "URL rewriting" that needs to be turned on. Without this, internal links inside of the website may not function correctly.

## Add the FSDH to the `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS`

In order for the FSDH to properly render your web pages, you need to inform the server which sites are allowed to host your app. It is likely that you already have environment variables to determine these, in which case you simply need to add `poc.fsdh-dhsf.science.cloud-nuage.canada.ca` and `fsdh-proj-<your workspace name>-webapp-poc.azurewebsites.net`. If you do not have environment variables for these, you can either create them or manually set them in your `settings.py`.

## Add the `FORCE_SCRIPT_NAME` in Django

In the `settings.py` file of your Django project you will need to set the `FORCE_SCRIPT_NAME` variable to include the "Proxy URL for development" from the Web application information section of your workspace's app service. It should resemble something like `/app/<Project Name>/`. Once this is applied, it will inform Django to prepend your internal links with the FSDH prefix.

For Django to _actually_ apply the prefix however, it seems that the strings in the **base** `urls.py` must be formatted strings:
```python
urlpatterns = [
    path('path/here/', views.page, name="page"), # Incorrect, not a formatted string
    path(f'path/here/', views.page, name="page"), # Correct, a formatted string
] + static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS)
```

You will also need to go to your `STATIC_URL` declaration in the same file and also prepend it the same value, something like `STATIC_URL = os.path.join(FORCE_SCRIPT_NAME, "static/")`.

## Proper URL Retrieval

It is possible that some links or references might not work, if that is the case make sure that you are using Django's replacement features and not hardcoding the URLs. For example, in your HTML/CSS/JS you would use `"{% url 'home' %}"` instead of `"/"` or `"/home"`. In you Python code, you would use `django.urls.reverse("home")`. Do also make sure that you give your pages their respective names in the `urls.py`. Without this, these URLs won't contain the script name and will break.
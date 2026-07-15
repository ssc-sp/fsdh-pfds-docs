# Deployment

When developing locally on your Ubuntu Terminal (WSL), the website runs directly on your machine. But to make your website accessible to other researchers on the FSDH platform, you need to bundle it into a package that can run reliably on any server.

To do this, we use [Docker](https://www.docker.com/).

***

### [Docker](https://www.docker.com/)

Docker uses a single text file called a `Dockerfile` to copy files, install Python, install libraries, and run commands.

A `Dockerfile` tells Docker how to build a container that contains only the things required to run your application.

***

### Step 1: Declaring our Library Requirements

Before Docker can build your app, it needs to know what Python packages are required. If you haven't already, make sure you made a file in your project folder named `requirements.txt` and list your dependencies. 

The `requirements.txt` file for the Seal Checker 9000:

```text
Flask>=3.0.0
pandas>=2.0.0
numpy<2.0.0
folium>=0.15.0
azure-storage-blob>=12.0.0
```

> Note: Whenever you run `pip install` on your local system, you should add that package name to this list. This tells your server environment what to install during build time.

***

### Step 2: Writing the Dockerfile

In your project's root folder, create a new file named `Dockerfile` (with no file extension) and paste the following commands:

```dockerfile
# 1. Start with an official, lightweight Python operating system image
FROM python:3.10-slim

# 2. Set the default working directory inside the container
WORKDIR /app

# 3. Copy our requirements file inside the container first
COPY requirements.txt .

# 4. Install the required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy all the remaining project files from our local folder into the container
COPY . .

# 6. Inform Docker that our web server will listen on port 80
EXPOSE 80

# 7. Start the application using Python when the container launches
CMD ["python", "app.py"]
```

***

### Step 3: Changing the Port in Your App

If your app is configured to run on on Port 5000 (`localhost:5000`), make sure to change to a port that works for web servers. For the FSDH in the configure section of the web app tool, it lets us know that it will only run on ports 80 and 8080.

Look at the bottom of your `app.py` script:

```python
if __name__ == '__main__':
    # Configured to host on all network interfaces (0.0.0.0) on standard Web Port 80
    app.run(host='0.0.0.0', port=80, debug=True)
```

***

### Step 4: The FSDH SAS Secret (Security)

When deploying on the FSDH workspace, you should **never** save your Storage Access Key (SAS Token) directly into your code files. If your code is public on GitHub, anyone can see your keys and modify your Azure workspace files.

Instead, we load this key from the server's background environment variables using Python's `os` module:

```python
AZURE_SAS_URI = os.environ.get("SAS")
```

When you host your application on your FSDH workspace, the platform provides a settings interface where you can safely paste your storage SAS key under the environment name `SAS`. When your app launches, Python reads this variable without ever writing it into your files.

***

### Step 5: Testing Your Container Locally

To test if your container recipe works before uploading it, you can run it inside your local terminal.

**1: Build the container image** (replace `seal-app` with your project name):
```bash
docker build -t seal-app .
```

**2: Run the container locally** (mapping port 80 inside the container to port 8080 on your web browser):
```bash
docker run -p 8080:80 -e SAS="your_actual_azure_sas_token_here" seal-app
```

Now, open your browser and go to `http://localhost:8080`. Your Flask app should now running inside its own isolated virtual container!

***

### Step 6: Making the workflow for Imaging 

In order to run this on the FSDH, we need to make a docker image (like we did in Step 5) but not locally. The way we do this is with github workflows. There are many workflows avaliable for free on github but it's easy to get lost in the proverbial sauce. 
<gcds-details details-title="So here is the yml file for the workflow.">

``` yml
name: Build and Push Flask App Image to GHCR

on:
  push:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to GitHub Container Registry
        run: echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          # GHCR strictly requires lowercase package tags
          tags: ghcr.io/your-username/project-name:latest

      - name: Logout of GitHub Container Registry
        run: docker logout ghcr.io
```

</gcds-details>

Make sure you put this file in the correct directory on github. 

Github:

![File Directory on Github (Project-Name/.github/workflows/docker-image.yml)](./img/Deployment/7.png)

Visual Studio Code:

![File Directory on Visual Studio Code](./img/Deployment/8.png)

Now with that, we just need to make a docker compose file that references said image. 

***

### Step 7: Making your Docker Compose file

You may have noticed if you've peeked into the configuation section of the web app that it asks for something called a docker compose file. This is what we will be writing right now. The docker composer file has all the commands you would've used to run the container. We give it where to start (`build .`), what to build (`image: ghcr.io/hamsamm/harp-seal-checker:latest`), what port to host it on (`ports: - "80:80"`), and the environment for the files (`environment: - PROXY_PREFIX=/app/FEWSC`).

This is the `docker-compose.yml` file for the Seal Checker 9000:

``` yml
services:
  web:
    build: .
    image: ghcr.io/your-username/project-name:latest
    ports:
      - "80:80"
    environment:
      - PROXY_PREFIX=/app/FEWSC
```

Make sure you put this file in the base of the directory (where requirements.txt is). There are also other things you can put in your docker compose file you can see in the additional information section of the web application configure section.

***

### Step 8: Deploying on FSDH

Once tested, you are ready to upload this container directly to your FSDH dashboard:
1. Push your code repository directly to GitHub.
2. In your FSDH workspace dashboard, navigate to the **Web Apps** tool and click **View Web App Configuration**.

![Click Web Apps then click on View Web App Configuration](./img/Deployment/1.png)

3. Link your GitHub repository and enter docker-compose.yml


![Open Configure](./img/Deployment/2.png)
![Fill out these boxes](./img/Deployment/3.png)

4. Add your system variables under environment settings:
   * **Key:** `SAS`
   * **Value:** *[Your active Azure Storage SAS Token]*

![Click Add Environment Variable](./img/Deployment/4.png)
![Fill in the pop up](./img/Deployment/5.png)
> You can leave the value blank and change it later

![Fill in the pop up](./img/Deployment/6.png)

5. Click **Deploy**.

6. Once you've confirmed it works, make sure to turn off debug mode. 

``` python
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=False)
```

### Known Issues

Do note that whenever you have an issue, consult the logs, the console (f12), then the better logs (call someone who has access to them.) This generally gives you a good idea of what the issue is. 

Also sometimes it just takes a while for your webstie to load. Processing files takes time.

#### CSS and JS not loading
![Image of the console error messages for this error](./img/Deployment/9.png)
This error is the most obvious because your website would look something like this (Lacking any and all css/js)
![Image of website suffering from this error](./img/Deployment/10.png)
Most of the steps so far have been written under the assumption that the base path isn't changed. At the time of writting the web hosting tool changes the base of the url to `/app/workspace-name`. This causes a few problems, it means whenever you referenced in your html file (files not stored on the fsdh), it won't be able to find it. 2 common problems that may occur due to this are the css and js files not running and having page switching not working. 

This is the workaround used in the Seal Checker 9000
``` python
class FSDHProxyPrefixFix:
    def __init__(self, wsgi_app):
        self.wsgi_app = wsgi_app

    def __call__(self, environ, start_response):
        # Force Flask to prefix every url_for() path with /app/FEWSC
        environ["SCRIPT_NAME"] = "/app/FEWSC"
        return self.wsgi_app(environ, start_response)

app.wsgi_app = FSDHProxyPrefixFix(app.wsgi_app)
```

Around March 2027 this shouldn't be a problem anymore. 
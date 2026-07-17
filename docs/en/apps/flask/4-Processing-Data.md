# Processing Data

To move your data from the FSDH, you can use Azure Blob Storage, Postrges, and other tools. Here we be using **Azure Blob Storage**.

### Referencing a File From the FSDH Storage with SAS Token

**Step 1: Getting a Shared Access Signature (SAS) Token**

From the FSDH access your workspace:
![Acess your workspace](./img/Accessing-Files/01.png)

Navigate to the storage page

![On the left hand side of the screen click on storage under the workspace tools section](./img/Accessing-Files/02.png)

This is your Storage Explorer. Here you can manually upload and download files. 

![This is your Storage Explorer](./img/Accessing-Files/03.png)

Now go to the AZCOPY tab

![Click on the AZCOPY Tab beside FILE EXPLORER](./img/Accessing-Files/04.png)

This is where you get your token. Remember, <u>unless someone has provided you with a longer term token, this token will expire in *30* minutes</u> (To get a long term token, submit a support request to the FSDH team). Refresh the page when you want a new 30 minute token.

![The Generate Container Token Button](./img/Accessing-Files/05.png)


**Step 2: Accessing the files**

Now let's try to access these files from your web application. For this we will have to import the pandas library and read the SAS token from the environment variables. 
<gcds-details details-title="The following block of code is a function that imports a file based on the file path in the Azure Blob Storage Explorer.">

``` python
import os
import pandas as pd #Import Panda Library

#Starting Variables
AZURE_SAS_URI = os.environ.get("SAS") # Load SAS token from environment variables for security

#These are some blobs we will retrieve from the storage
#We write them as the file directory from the root of Storage

SEALS_BLOB_NAME = "FSDHstatic/OPENDATA_HarpDietData2017-2021_EN.csv"
NAFO_BLOB_NAME = "FSDHstatic/NAFO-Subdivision-General-Coordinates.csv"
ICON_BLOB_NAME = "FSDHstatic/Seal-Icon.png"

#Functions
#This is the process of appending the token automatically
#This is done so adding new files later on isn't tedious
#This wasn't a problem for me as I only needed 3 files 
def load_df_from_azure(blob_name, encoding='utf-8'):
    full_sas_uri = AZURE_SAS_URI 
    if not full_sas_uri: #Checks if token is valid
        print("[DEBUG] AZURE_SAS_URI is not set.")
        return None
    try:
        # Build file path URL with the SAS token attached
        if "?" in full_sas_uri:
            base_uri, token = full_sas_uri.split("?", 1)
            if not base_uri.endswith("/"):
                base_uri += "/" #splits token
            file_uri = f"{base_uri}{blob_name}?{token}" 
        else:
            file_uri = f"{full_sas_uri}/{blob_name}" if not full_sas_uri.endswith("/") else f"{full_sas_uri}{blob_name}"
        df = pd.read_csv(file_uri, encoding=encoding)
        return df
    except Exception as e: #Error Handling
        print(f"[DEBUG] Error loading {blob_name} from Azure Storage: {e}")
        return None
```

</gcds-details>

> To clarify, 
> ``` python
>SEALS_BLOB_NAME = "FSDHstatic/OPENDATA_HarpDietData2017-2021_EN.csv"
>NAFO_BLOB_NAME = "FSDHstatic/NAFO-Subdivision-General-Coordinates.csv"
>ICON_BLOB_NAME = "FSDHstatic/Seal-Icon.png"
>```
> These are the relative directories of the blobs that we are taking. `FSDHstatic` is a folder in the storage
> ![Root Directory](./img/Accessing-Files/06.png)
> ![FSDHstatic Folder](./img/Accessing-Files/07.png)

<gcds-details details-title="from here we can reference the files like this:">

``` python
df = load_df_from_azure(NAFO_BLOB_NAME)
```

</gcds-details>
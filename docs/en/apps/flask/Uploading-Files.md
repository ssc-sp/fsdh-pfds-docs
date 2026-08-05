# Uploading and Deleting Files

To interact further with your files in the FSDH Storage, we need to use the Azure Blob Storage Library Client. Make sure to add it to your `requirements.txt`:

```requirements.txt
azure-storage-blob>=12.0.0
```

***

### Notes

The SAS URL provides access to the files in your Azure Storage account. Instead of just reading blobs directly with a SAS URL as we were before, we can now, write, edit, and delete blobs. 

To access the storage, we use the SAS URL and add the target blob name. Reference the methods described in [Acessing Files](./Accessing-Files.md).

***

### Saving Blobs to Azure
To save data back to the storage, create a client then simply upload the blob.

``` python
from azure.storage.blob import ContainerClient, BlobClient # Import 
blob_client = BlobClient.from_blob_url(file_uri) # Create Client Blob from SAS URI from before shown of Accessing Files
blob_client.upload_blob(file, overwrite=overwrite) # Upload file to the container
```

This is all you really need to implement. It allows you to create new files and overwrite older files to make edits to it

> Documentation:
>
>[BlobClient](https://learn.microsoft.com/en-us/python/api/azure-storage-blob/azure.storage.blob.blobclient?view=azure-python)
>
>.[from_blob_url](https://learn.microsoft.com/en-us/python/api/azure-storage-blob/azure.storage.blob.blobclient?view=azure-python#azure-storage-blob-blobclient-from-blob-url)
>
>.[upload_blob](https://learn.microsoft.com/en-us/python/api/azure-storage-blob/azure.storage.blob.blobclient?view=azure-python#azure-storage-blob-blobclient-upload-blob)

In the demo project, all files are saved in the root directory but this can by changed by appending the file name to `/folder-name/` like this: `/folder-name/file.ext`. This will either add the file to an existing folder or make a folder with that file in it if it doesn't already exist. 

<gcds-details details-title="Referenced code from flask demo project.">

```python
def save_df_to_azure(df, blob_name, index=False, overwrite=True, encoding='utf-8'): 
    """
    Converts a DataFrame to CSV format and uploads it to Azure Blob Storage using BlobClient.
    """
    if not AZURE_SAS_URI:
        print("[DEBUG] AZURE_SAS_URI is not set.")
        return False
    try:
        if "?" in AZURE_SAS_URI: # Format the SAS URI
            base_uri, token = AZURE_SAS_URI.split("?", 1)
            if not base_uri.endswith("/"):
                base_uri += "/"
            file_uri = f"{base_uri}{blob_name}?{token}"
        else:
            if not AZURE_SAS_URI.endswith("/"):
                file_uri = f"{AZURE_SAS_URI}/{blob_name}"
            else:
                file_uri =  f"{AZURE_SAS_URI}{blob_name}"
        
        blob_client = BlobClient.from_blob_url(file_uri) # Create Client Blob  
        csv_data = df.to_csv(index=index, encoding=encoding) # Convert DataFrame to csv file
        blob_client.upload_blob(csv_data, overwrite=overwrite) # Upload csv file to the container
        # Note: csv_data doesn't have to just be csv files. 
        # It just happens that in my case that's the only file type I need 
        return True # Process completed without problems
    except Exception as e:
        print(f"[DEBUG] Error saving {blob_name} to Azure Storage: {e}")
        return False # There was an issue
```

</gcds-details>

***

### Deleting Blobs
All you need to delete blobs is to set the SAS URL to the specific file you want to delete then use `.delete_blob()` as shown.  

```python
blob_client.delete_blob() # Delete File
```

> Documentation:
>
>[.delete_blob()](https://learn.microsoft.com/en-us/python/api/azure-storage-blob/azure.storage.blob.blobclient?view=azure-python#azure-storage-blob-blobclient-delete-blob)

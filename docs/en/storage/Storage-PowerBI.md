# Access Storage in Power BI

You can connect to your FSDH storage from Power BI by following these steps.

To do this, you must obtain an SAS token for your data. You should also have the name of your storage account ready, which can be found on the FSDH Storage Explorer beside the "Current Container" heading.

1. In Power BI, click "Get data from another source".
![The Power BI landing page with the button "Get data from another source" highlighted in yellow.](./img/1-get-data.png)

2. Search for "Blob Storage" in the list of options.
![The "Get Data" popup is open. "Blob Storage" is typed into the search box. The field "Azure Blob Storage" is highlighted in yellow.](./img/2-blob-storage.png)

3. Copy the name of your FSDH storage account into the field.
![The "Azure Blob Storage" popup is open. The field to input the account name or URL is highlighted in yellow.](./img/3-input-name.png)

4. Select to use a SAS token, copy your SAS token into the field.
![The "Azure Blob Storage" popup is open. The sidebar button for shared access signature (SAS) is selected and highlighted in yellow. The field to input the token is also highlighted in yellow.](./img/4-sas-token.png)

5. You can then import your data. By default, this imports a list of blobs in your container, but you can customize the queries accordingly. Some sample queries are provided below.
![A preview of the data stored in the Blob Storage container is shown and is ready to load.](./img/5-import-data.png)

## Sample Queries

We have some sample queries to help load your data:

### Load a CSV file

```
let
    fileUrl = "https://<storage_account>.blob.core.windows.net/datahub/<file_path>.csv?<token>",
    source = Csv.Document(Web.Contents(fileUrl),[Delimiter=",", Encoding=1252, QuoteStyle=QuoteStyle.None]),
    file = Table.PromoteHeaders(source)
in
    file
```
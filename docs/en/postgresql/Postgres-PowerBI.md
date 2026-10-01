# Access PostgreSQL in Power BI

You can connect to your FSDH PostgreSQL database from Power BI by following these steps.

Ensure that you have Power BI Desktop installed and that you have added your machine to the PostgreSQL firewall, see the [PostgreSQL documentation](./Postgres.md) for how to do this.

1. In Power BI, click "Get data from another source".
![The Power BI landing page with the button "Get data from another source" highlighted in yellow.](./img/powerbi-1-get-data.png)

2. Search for "Azure Database for PostgreSQL" in the search field, select it then click Connect.
![The "Get Data" popup is open. "Azure Database" is typed into the search box. The field "Azure Database for PostgreSQL" is highlighted in yellow.](./img/powerbi-2-search.png)

3. Enter your host name for Server and "fsdh" for Database (by default).
![The PostgreSQL database connection popup is open. The "Server" and "Database" fields are highlighted in yellow.](./img/powerbi-3-conninfo.png)

4. Enter the username and password to connect to your database.
![The PostgreSQL database connection popup is open. The "User name" and "Password" fields are highlighted in yellow.](./img/powerbi-4-user-pass.png)

5. Select your tables and click Load to load the data.
![The Navigator window is open. It shows a table from the database in the preview screen and is ready to import.](./img/powerbi-5-import.png)

Your data is now accessible from Power BI.
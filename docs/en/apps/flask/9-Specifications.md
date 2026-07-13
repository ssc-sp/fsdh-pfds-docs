# General Info 

This section serves as a technical reference guide compiling the core technologies, libraries, and design patterns used to build the Seal Checker 9000 application.

***

## Map

### Folium
* **Purpose:** Folium is used to make maps usnig Leaflet.js.
* **Map Construction:** The map is opened in `app.py` with Newfoundland and Labrador in the center.
* **Markers:** Zones are represented by seals. The size of each seal changes based on the amount of seals that it represents.

***

## Data Visualization

### Chart.js
* **Purpose:** Chart.js is a JavaScript library used to make charts inside HTML `<canvas>` elements.
* **Visualizations Rendered:**
  * **Demographics (Pie Chart):** Displays the population of male, female, and unknown seals in the area.
  * **Age Distribution (Bar Graph):** Displays the seal age groups.
  * **Stomach Contents (Donut Chart):** Displays prey found in stomachs.
* **Memory Management:** Old charts are deleted to save memory:
  ```javascript
  if (ratioChartInstance) { ratioChartInstance.destroy(); }
  ```
* **Custom Legends:** We generate custom HTML legends inside separate layout containers (`<div class="custom-legend">`). Clicking on them changes what data can be seen on the chart:
  ```javascript
  stomachChartInstance.toggleDataVisibility(idx);
  stomachChartInstance.update();
  ```

***

## Data Processing

### Pandas
* **Purpose:** Pandas is utilized on the backend as the primary data manipulation engine. We use it isntead of Python's built-in CSV module because it handles column detection, automatic type conversion, null values, and grouping without extensive manual scripting.
* **Grouping:** Raw diet logs generally record one row per individual prey item (e.g., Capelin, Cod). To prevent duplicate profile listings in the search index, Pandas groups them by the seal’s ID (`groupby('sealid')`).
* **Logic:** 
  * **Coordinates:** We turn the NAFO zone into a pair of coordinates using the NAFO reference coordinate file.
  * **Gender:** Turns different string values into standardized flags (`'M'`, `'F'`, or `'U'`).
  * **Diet:** Loops through a seal's grouped rows to get a list prey. Empty stomachs or default codes (like `'9998'`) are categorized as `"Empty"`.

***

## Stylization 

### General CSS
* **Layout:** The layout uses CSS Flexbox to stack the main layout vertically, align the sidebar next to the map, and wrapping input filters.
* **Grid Formatting:** The index and details panel at the bottom of the page uses a CSS Grid layout to construct a stable 2x2 section. This ensures the filter panel aligns with the search results column on the left, while details are positioned on the right:
  ```css
  .index-section {
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-template-rows: auto 1fr;
      gap: 20px;
  }
  ```
* **Box Styles:** The custom utility class `.wireframe-box` standardizes styling across the header, sidebar, index container, and individual details window. It has a white background, a gray border, a shadow, and rounded corners.

### General JS
* **Backend Bridge:** Processed Python data is passed directly into client-side memory using Jinja2 serialization. This creates a single source of truth for the browser, eliminating the need to make subsequent backend database requests when filtering or updating charts:
  ```html
  const sealsData = {{ seals_data | tojson | safe }};
  ```
* **Functional Architecture:** The frontend codebase is split into modular components for readability and maintenance:
global.js
> Declares global state variables for chart instances and coordinates iframe messaging.
chart.js 
> Contains functions that handle canvas contexts, style datasets, and draw the visual charts.
ui.js
> Synchronizes UI text elements and handles event callbacks for map clicks and seal selections.
app.js
  > Governs the searching, category filtering, and list rendering of the seal index.

### General Python
* **Web Framework:** Flask serves as the web framework, managing file routing and using Jinja2 as its engine. 
* **Data Retrieval:** Data is taken from Azure Blob Storage using `azure-storage-blob` and `pandas`. SAS tokens are stored in environment variables to keep security credentials separated from the code:
  ```python
  AZURE_SAS_URI = os.environ.get("SAS")
  ```
* **Path Corrections:** In the FSDH, we need a custom path. (`FSDHProxyPrefixFix`) overrides environment script paths to guarantee that internal URLs and static assets load relative to the correct proxy prefix directory:
  ```python
  class FSDHProxyPrefixFix:
      def __init__(self, wsgi_app):
          self.wsgi_app = wsgi_app
      def __call__(self, environ, start_response):
          environ["SCRIPT_NAME"] = "/app/FEWSC"
          return self.wsgi_app(environ, start_response)
  ```
  > Note: May not be required in March of 2027 and beyond

***

## Other

### Docker
* **Purpose:** Docker containerizes the Flask web application, packaging code, system libraries, and requirements inside an container to ensure the app works reliably.
* **Build Structure (`Dockerfile`):** Uses the image base `python:3.10-slim` and copys and installs the `requirements.txt`:
* **Execution Parameters (`docker-compose.yml`):** Has all the commands you would've used to run the container.
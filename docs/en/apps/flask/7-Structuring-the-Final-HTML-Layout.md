# Structuring the Final HTML Layout

Now that we have both our data parsed in Python and our CSS styles defined, we need a skeleton to attach them to. This skeleton is our `templates/index.html` file. 

Using Flask's Jinja2 template engine, we can cleanly inject our Folium map and expose our Python data directly to our JavaScript files.

***

### Putting the Wireframe Together

Create your `templates/index.html` and structure it using the CSS grid and flexbox classes we created in the styling section.

Here is the HTML skeleton of our application:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seal Checker 9000</title>
    <!-- Link to our CSS styling -->
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
    <!-- Load Chart.js from a CDN (Content Delivery Network) -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>

    <div class="page-container">
        
        <!-- HEADER BOX -->
        <header class="wireframe-box header-box">
            <h1>Seal Checker 9000</h1>
            <p>Analyzing Harp Seal Diet Data from 2017-2021 | 
                <a href="https://open.canada.ca/" target="_blank">Access Open Data Database</a>
            </p>
        </header>

        <!-- MAP & SIDEBAR SECTION -->
        <section class="map-section">
            
            <!-- Map Container (Left Side) -->
            <div class="map-outer">
                <div class="map-stationary-tab">Interactive NAFO Map</div>
                <div class="map-viewport">
                    <!-- INJECT FOLIUM MAP HERE -->
                    {{ map_html | safe }}
                </div>
            </div>

            <!-- Sidebar Stats Panel (Right Side) -->
            <aside class="wireframe-box sidebar-panel">
                <h3>Zone Profile: <span id="side-zone-title">Select a Zone</span></h3>
                <hr style="margin: 10px 0; border: 1px solid #eee;">
                
                <p><strong>Total Sample Size:</strong> <span id="side-pop">0</span> seals</p>
                <p><strong>Average Age:</strong> <span id="side-age">0</span> years</p>
                
                <!-- Demographic Chart Canvas -->
                <div class="chart-container" style="height: 180px; margin-top: 15px;">
                    <canvas id="ratioChart"></canvas>
                </div>

                <!-- Age Distribution Chart Canvas -->
                <div class="chart-container" style="height: 180px; margin-top: 15px;">
                    <canvas id="ageChart"></canvas>
                </div>

                <!-- Stomach Aggregation Chart Canvas -->
                <div class="chart-container" style="height: 180px; margin-top: 15px;">
                    <canvas id="stomachChart"></canvas>
                </div>
                <!-- Container for our custom interactive legend -->
                <div id="stomach-legend-container" class="custom-legend"></div>
                <p id="stomach-note" style="font-size: 11px; color: #777; margin-top: 5px;"></p>
            </aside>

        </section>

        <!-- INDEX & DETAILS SECTION (CSS Grid 2x2 Layout) -->
        <section class="index-section">
            
            <!-- Grid Header Left -->
            <div class="index-header-left">
                <h2>Seal Search Index</h2>
                <!-- Dynamic Filters Grid -->
                <div class="filter-grid">
                    <input type="text" id="search-id" placeholder="Search by ID (e.g., 10023)...">
                    <select id="filter-gender">
                        <option value="">All Genders</option>
                    </select>
                    <select id="filter-zone">
                        <option value="">All Zones</option>
                    </select>
                    <select id="filter-meal">
                        <option value="">All Primary Meals</option>
                    </select>
                    <select id="filter-age">
                        <option value="">All Ages</option>
                        <option value="young">Young (0-2 yrs)</option>
                        <option value="adult">Adult (3+ yrs)</option>
                        <option value="unknown">Unknown Age</option>
                    </select>
                </div>
            </div>

            <!-- Grid Header Right -->
            <div class="index-header-right">
                <h2>Life Snapshot Details</h2>
            </div>

            <!-- Grid Body Left: Search list container -->
            <div class="index-body-left wireframe-box" style="display: flex; flex-direction: column; height: 400px;">
                <p style="font-size: 12px; color: #666; margin-bottom: 5px;" id="search-results-count">Loading index...</p>
                <div id="index-list-container" class="index-list">
                    <!-- JavaScript dynamically adds items here -->
                </div>
            </div>

            <!-- Grid Body Right: Individual Seal details -->
            <div class="index-body-right wireframe-box" style="height: 400px; display: flex; gap: 20px;">
                <!-- Profile text statistics -->
                <div style="flex: 1;">
                    <p><strong>Seal ID:</strong> <span id="det-id">-</span></p>
                    <p><strong>Gender:</strong> <span id="det-gen">-</span></p>
                    <p><strong>Age:</strong> <span id="det-age">-</span></p>
                    <p><strong>NAFO Zone:</strong> <span id="det-loc">-</span></p>
                    <p><strong>Primary Prey:</strong> <span id="det-meal">-</span></p>
                </div>
                <!-- Profile stomach chart -->
                <div style="flex: 1; display: flex; flex-direction: column; height: 100%;">
                    <div style="flex: 1; min-height: 0;">
                        <canvas id="detailStomachChart"></canvas>
                    </div>
                    <div id="detail-stomach-legend-container" class="custom-legend" style="max-height: 120px; overflow-y: auto;"></div>
                    <p id="detail-stomach-note" style="font-size: 11px; color: #777; margin-top: 5px;"></p>
                </div>
            </div>

        </section>

    </div>

    <!-- BRIDGE AND SCRIPTS INTERACTION -->
    <script>
        // Expose Python aggregated data list as a safe JS object variable
        const sealsData = {{ seals_data | tojson | safe }};
    </script>
    
    <!-- Load our structural Javascript modules -->
    <script src="{{ url_for('static', filename='js/global.js') }}"></script>
    <script src="{{ url_for('static', filename='js/chart.js') }}"></script>
    <script src="{{ url_for('static', filename='js/ui.js') }}"></script>
    <script src="{{ url_for('static', filename='js/app.js') }}"></script>

</body>
</html>
```

***

### Understanding the Elements

*   `{{ map_html | safe }}`: This is a placeholder that tells Flask's layout parser, "Take the HTML map code compiled by Folium in `app.py` and drop it here." The `safe` keyword prevents the browser from changing characters like `<` and `>` into plain text.
*   `<canvas>` Elements: Chart.js cannot draw directly onto raw HTML. It needs a canvas element (like `<canvas id="ratioChart"></canvas>`) to act as its digital drawing board. Our script looks up these specific IDs to render the charts inside them.
*   Custom Legends (`<div class="custom-legend">`): While Chart.js has pre-packaged legends, they do not support advanced scrolling or easy text-formatting. Creating empty divs allows our `chart.js` script to manually build interactive text-lists inside them using standard HTML elements.

Now that our code files are connected, we can package this local web server so it can run securely on the FSDH cloud server.
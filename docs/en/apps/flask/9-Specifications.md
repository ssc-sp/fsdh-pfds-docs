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

    <gcds-details details-title="global.js"> 

    ``` js 
    // Global State Variables
    let ratioChartInstance = null;
    let ageChartInstance = null;
    let stomachChartInstance = null;
    let detailStomachChartInstance = null; // Individual card chart

    // Callback for the Folium map within the iframe (traditional fallback)
    window.selectSealFromMap = function(zoneCode) {
        selectZone(zoneCode);
    };

    window.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'selectZone') {
            selectZone(event.data.zone);
        }
    });

    function getAgeDistribution(sealsList) {
        let maxAge = 0;
        sealsData.forEach(s => {
            if (s.age_num !== null && s.age_num !== undefined && s.age_num > maxAge) {
                maxAge = s.age_num;
            }
        });
        if (maxAge === 0) maxAge = 21;

        const bins = [];
        for (let i = 0; i <= maxAge; i += 3) {
            bins.push({
                label: `${i}-${i+2}`,
                min: i,
                max: i+2,
                count: 0
            });
        }
        const unknownBin = {
            label: 'Unknown',
            count: 0
        };

        sealsList.forEach(s => {
            const age = s.age_num;
            if (age === null || age === undefined) {
                unknownBin.count++;
            } else {
                let placed = false;
                for (let b of bins) {
                    if (age >= b.min && age <= b.max) {
                        b.count++;
                        placed = true;
                        break;
                    }
                }
                if (!placed && bins.length > 0) {
                    bins[bins.length - 1].count++;
                }
            }
        });

        const labels = bins.map(b => b.label).concat([unknownBin.label]);
        const counts = bins.map(b => b.count).concat([unknownBin.count]);

        return { labels, counts };
    }
    ```

    </gcds-details> 

    > Declares global state variables for chart instances and coordinates iframe messaging.
    
    <gcds-details details-title="chart.js"> 

    ``` js
    // Draw gender distribution as a Pie Chart
    function updateDemographicsChart(males, females, unknowns) {
        const ctx = document.getElementById('ratioChart');
        if (!ctx) return;

        if (typeof Chart === 'undefined') {
            return;
        }

        if (ratioChartInstance) {
            ratioChartInstance.destroy();
        }

        ratioChartInstance = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Male', 'Female', 'Unknown'],
                datasets: [{
                    label: 'Seal Count',
                    data: [males, females, unknowns],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(153, 102, 255, 0.6)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                resizeDelay: 150, // Prevents load-time size shifts from snapping animation
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            boxWidth: 10,
                            font: { size: 10 }
                        }
                    }
                }
            }
        });
    }

    // Draw age distribution as a Bar Chart
    function updateAgeChart(labels, counts) {
        const ctx = document.getElementById('ageChart');
        if (!ctx) return;

        if (typeof Chart === 'undefined') {
            return;
        }

        if (ageChartInstance) {
            ageChartInstance.destroy();
        }

        ageChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Seals Count',
                    data: counts,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                resizeDelay: 150,
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0,
                            font: { size: 9 }
                        }
                    },
                    x: {
                        ticks: {
                            font: { size: 9 }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Update stomach content donut chart with changes to legend 
    function updateStomachChart(preyContents, totalPreyItems) {
        const ctx = document.getElementById('stomachChart');
        const noteEl = document.getElementById('stomach-note');
        if (!ctx) return;

        if (typeof Chart === 'undefined') {
            return;
        }

        if (stomachChartInstance) {
            stomachChartInstance.destroy();
        }

        const preyItemsArray = Object.entries(preyContents).map(([label, value]) => ({ label, value }));
        preyItemsArray.sort((a, b) => b.value - a.value);

        const labels = preyItemsArray.map(item => item.label);
        const data = preyItemsArray.map(item => item.value);

        const backgroundColors = labels.map((label, idx) => {
            if (label === 'Empty') return 'rgba(180, 180, 180, 0.5)';
            const colors = [
                'rgba(46, 204, 113, 0.6)',
                'rgba(52, 152, 219, 0.6)',
                'rgba(155, 89, 182, 0.6)',
                'rgba(241, 196, 15, 0.6)',
                'rgba(230, 126, 34, 0.6)',
                'rgba(231, 76, 60, 0.6)'
            ];
            return colors[idx % colors.length];
        });

        const borderColors = labels.map((label, idx) => {
            if (label === 'Empty') return 'rgba(180, 180, 180, 1)';
            const colors = [
                'rgba(46, 204, 113, 1)',
                'rgba(52, 152, 219, 1)',
                'rgba(155, 89, 182, 1)',
                'rgba(241, 196, 15, 1)',
                'rgba(230, 126, 34, 1)',
                'rgba(231, 76, 60, 1)'
            ];
            return colors[idx % colors.length];
        });

        stomachChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                resizeDelay: 150,
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        let legendContainer = document.getElementById('stomach-legend-container');
        if (!legendContainer) {
            legendContainer = document.createElement('div');
            legendContainer.id = 'stomach-legend-container';
            legendContainer.setAttribute('style', 'max-height: 180px; overflow-y: auto; margin-top: 12px; padding: 8px; font-size: 11px; border: 1px dashed #ccc; border-radius: 4px; background: #fafafa;');
            const canvasWrapper = ctx.parentElement;
            canvasWrapper.parentNode.insertBefore(legendContainer, canvasWrapper.nextSibling);
        }

        if (legendContainer) {
            legendContainer.innerHTML = '';
            const legendList = document.createElement('div');
            legendList.style.display = 'flex';
            legendList.style.flexWrap = 'wrap';
            legendList.style.gap = '6px';
            legendList.style.justifyContent = 'flex-start';
            
            labels.forEach((label, idx) => {
                const legendItem = document.createElement('div');
                legendItem.style.display = 'flex';
                legendItem.style.alignItems = 'center';
                legendItem.style.fontSize = '11px';
                legendItem.style.cursor = 'pointer';
                legendItem.style.userSelect = 'none';
                legendItem.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                legendItem.style.padding = '3px 8px';
                legendItem.style.borderRadius = '12px';
                legendItem.style.border = `1px solid ${borderColors[idx]}`;
                legendItem.style.transition = 'all 0.2s ease';
                
                const colorBox = document.createElement('span');
                colorBox.style.display = 'inline-block';
                colorBox.style.width = '8px';
                colorBox.style.height = '8px';
                colorBox.style.borderRadius = '50%';
                colorBox.style.backgroundColor = backgroundColors[idx];
                colorBox.style.marginRight = '6px';
                colorBox.style.flexShrink = '0';
                
                const labelText = document.createElement('span');
                labelText.innerText = `${label} (${data[idx]})`;
                labelText.style.color = '#333';
                labelText.style.fontWeight = '500';
                
                legendItem.appendChild(colorBox);
                legendItem.appendChild(labelText);
                
                legendItem.addEventListener('mouseover', () => {
                    legendItem.style.backgroundColor = 'rgba(0, 0, 0, 0.08)';
                    legendItem.style.transform = 'translateY(-1px)';
                });
                legendItem.addEventListener('mouseout', () => {
                    legendItem.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                    legendItem.style.transform = 'translateY(0)';
                });
                
                legendItem.addEventListener('click', () => {
                    const isVisible = stomachChartInstance.getDataVisibility(idx);
                    stomachChartInstance.toggleDataVisibility(idx);
                    stomachChartInstance.update();
                    
                    if (isVisible) {
                        legendItem.style.opacity = '0.35';
                        legendItem.style.textDecoration = 'line-through';
                        legendItem.style.backgroundColor = 'rgba(0, 0, 0, 0.01)';
                    } else {
                        legendItem.style.opacity = '1';
                        legendItem.style.textDecoration = 'none';
                        legendItem.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                    }
                });
                
                legendList.appendChild(legendItem);
            });
            
            legendContainer.appendChild(legendList);
        }

        if (noteEl) {
            noteEl.innerHTML = `<strong>Note:</strong> ${totalPreyItems} data points analyzed. <br> Click on a prey to remove it from the chart.`;
        }
    }

    // Update individual stomach content donut chart with dynamic HTML legend inside the card
    function updateDetailStomachChart(preyContents, totalPreyItems) {
        const ctx = document.getElementById('detailStomachChart');
        const noteEl = document.getElementById('detail-stomach-note');
        if (!ctx) return;

        if (typeof Chart === 'undefined') {
            return;
        }

        if (detailStomachChartInstance) {
            detailStomachChartInstance.destroy();
        }

        const contents = preyContents || {};
        const preyItemsArray = Object.entries(contents).map(([label, value]) => ({ label, value }));
        preyItemsArray.sort((a, b) => b.value - a.value);

        const labels = preyItemsArray.map(item => item.label);
        const data = preyItemsArray.map(item => item.value);

        const backgroundColors = labels.map((label, idx) => {
            if (label === 'Empty') return 'rgba(180, 180, 180, 0.5)';
            const colors = [
                'rgba(46, 204, 113, 0.6)',
                'rgba(52, 152, 219, 0.6)',
                'rgba(155, 89, 182, 0.6)',
                'rgba(241, 196, 15, 0.6)',
                'rgba(230, 126, 34, 0.6)',
                'rgba(231, 76, 60, 0.6)'
            ];
            return colors[idx % colors.length];
        });

        const borderColors = labels.map((label, idx) => {
            if (label === 'Empty') return 'rgba(180, 180, 180, 1)';
            const colors = [
                'rgba(46, 204, 113, 1)',
                'rgba(52, 152, 219, 1)',
                'rgba(155, 89, 182, 1)',
                'rgba(241, 196, 15, 1)',
                'rgba(230, 126, 34, 1)',
                'rgba(231, 76, 60, 1)'
            ];
            return colors[idx % colors.length];
        });

        detailStomachChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                resizeDelay: 150,
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        let legendContainer = document.getElementById('detail-stomach-legend-container');
        if (!legendContainer) {
            legendContainer = document.createElement('div');
            legendContainer.id = 'detail-stomach-legend-container';
            legendContainer.setAttribute('style', 'max-height: 100px; overflow-y: auto; margin-top: 8px; padding: 6px; font-size: 10px; border: 1px dashed #ccc; border-radius: 4px; background: #fafafa;');
            const canvasWrapper = ctx.parentElement;
            canvasWrapper.parentNode.insertBefore(legendContainer, canvasWrapper.nextSibling);
        }

        if (legendContainer) {
            legendContainer.innerHTML = '';
            const legendList = document.createElement('div');
            legendList.style.display = 'flex';
            legendList.style.flexWrap = 'wrap';
            legendList.style.gap = '4px';
            legendList.style.justifyContent = 'flex-start';
            
            labels.forEach((label, idx) => {
                const legendItem = document.createElement('div');
                legendItem.style.display = 'flex';
                legendItem.style.alignItems = 'center';
                legendItem.style.fontSize = '10px';
                legendItem.style.cursor = 'pointer';
                legendItem.style.userSelect = 'none';
                legendItem.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                legendItem.style.padding = '2px 6px';
                legendItem.style.borderRadius = '10px';
                legendItem.style.border = `1px solid ${borderColors[idx]}`;
                legendItem.style.transition = 'all 0.2s ease';
                
                const colorBox = document.createElement('span');
                colorBox.style.display = 'inline-block';
                colorBox.style.width = '6px';
                colorBox.style.height = '6px';
                colorBox.style.borderRadius = '50%';
                colorBox.style.backgroundColor = backgroundColors[idx];
                colorBox.style.marginRight = '4px';
                colorBox.style.flexShrink = '0';
                
                const labelText = document.createElement('span');
                labelText.innerText = `${label} (${data[idx]})`;
                labelText.style.color = '#333';
                labelText.style.fontWeight = '500';
                
                legendItem.appendChild(colorBox);
                legendItem.appendChild(labelText);
                
                legendItem.addEventListener('mouseover', () => {
                    legendItem.style.backgroundColor = 'rgba(0, 0, 0, 0.08)';
                });
                legendItem.addEventListener('mouseout', () => {
                    legendItem.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                });
                
                legendItem.addEventListener('click', () => {
                    const isVisible = detailStomachChartInstance.getDataVisibility(idx);
                    detailStomachChartInstance.toggleDataVisibility(idx);
                    detailStomachChartInstance.update();
                    
                    if (isVisible) {
                        legendItem.style.opacity = '0.35';
                        legendItem.style.textDecoration = 'line-through';
                        legendItem.style.backgroundColor = 'rgba(0, 0, 0, 0.01)';
                    } else {
                        legendItem.style.opacity = '1';
                        legendItem.style.textDecoration = 'none';
                        legendItem.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
                    }
                });
                
                legendList.appendChild(legendItem);
            });
            
            legendContainer.appendChild(legendList);
        }

        if (noteEl) {
            noteEl.innerHTML = `<strong>Note:</strong> ${totalPreyItems || 0} items recorded. \nClick on a prey to remove it from the chart.`;
        }
    }
    ```

    </gcds-details>

    > Contains functions that handle canvas contexts, style datasets, and draw the visual charts. For more information about chart.js see [this link](https://www.chartjs.org/docs/latest/)

    <gcds-details details-title="ui.js"> 

    ``` js 
    // Populate list index
    function renderInterface() {
        renderInterfaceFiltered(sealsData);
    }

    function renderInterfaceFiltered(filteredList) {
        const listContainer = document.getElementById('index-list-container');
        const resultsCountEl = document.getElementById('search-results-count');
        
        if (resultsCountEl) {
            resultsCountEl.innerText = `${filteredList.length} seals match your filters`;
        }
        
        if (listContainer && typeof sealsData !== 'undefined') {
            listContainer.innerHTML = '';
            filteredList.forEach(seal => {
                const item = document.createElement('div');
                item.className = 'index-list-item';
                item.innerHTML = `<strong>${seal.id}</strong> — Age: ${seal.age}, Area: ${seal.nafo_zone}`;
                item.addEventListener('click', () => selectSeal(seal));
                listContainer.appendChild(item);
            });
        }
    }

    // Populate search filters dynamically based on sealsData
    function populateFilters() {
        const filterGrid = document.querySelector('.filter-grid');
        if (!filterGrid) return;

        const selects = filterGrid.querySelectorAll('select');
        if (selects.length < 4) return;

        const locationSelect = selects[0];
        const genderSelect = selects[1];
        const stomachSelect = selects[2];
        const ageSelect = selects[3];

        locationSelect.innerHTML = '<option value="">All NAFO Zones</option>';
        genderSelect.innerHTML = '<option value="">All Genders</option>';
        stomachSelect.innerHTML = '<option value="">All Last Meals</option>';
        ageSelect.innerHTML = '<option value="">All Ages</option>';

        const locations = new Set();
        const genders = new Set();
        const stomachs = new Set();
        const ages = ['Pups (0-2)', 'Young (3-10)', 'Adults (11+)', 'Unknown Age'];

        sealsData.forEach(seal => {
            if (seal.nafo_zone) locations.add(seal.nafo_zone);
            if (seal.gender) genders.add(seal.gender);
            if (seal.meal) stomachs.add(seal.meal);
        });

        Array.from(locations).sort().forEach(loc => {
            locationSelect.innerHTML += `<option value="${loc}">${loc}</option>`;
        });

        Array.from(genders).sort().forEach(gen => {
            const display = gen === 'M' ? 'Male' : gen === 'F' ? 'Female' : 'Unknown';
            genderSelect.innerHTML += `<option value="${gen}">${display}</option>`;
        });

        Array.from(stomachs).sort().forEach(st => {
            stomachSelect.innerHTML += `<option value="${st}">${st}</option>`;
        });

        ages.forEach(ag => {
            ageSelect.innerHTML += `<option value="${ag}">${ag}</option>`;
        });

        const searchInput = filterGrid.querySelector('input[type="text"]');
        if (searchInput) {
            searchInput.addEventListener('input', applyFilters);
        }
        selects.forEach(select => {
            select.addEventListener('change', applyFilters);
        });
    }

    // Apply selected filters
    function applyFilters() {
        const filterGrid = document.querySelector('.filter-grid');
        const searchInput = filterGrid.querySelector('input[type="text"]');
        const selects = filterGrid.querySelectorAll('select');

        const searchVal = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const locVal = selects[0].value;
        const genderVal = selects[1].value;
        const stomachVal = selects[2].value;
        const ageVal = selects[3].value;

        const filtered = sealsData.filter(seal => {
            if (searchVal && !seal.id.toLowerCase().includes(searchVal)) {
                return false;
            }
            if (locVal && seal.nafo_zone !== locVal) {
                return false;
            }
            if (genderVal && seal.gender !== genderVal) {
                return false;
            }
            if (stomachVal && seal.meal !== stomachVal) {
                return false;
            }
            if (ageVal) {
                const ageNum = seal.age_num;
                if (ageVal === 'Pups (0-2)') {
                    if (ageNum === null || ageNum > 2) return false;
                } else if (ageVal === 'Young (3-10)') {
                    if (ageNum === null || ageNum < 3 || ageNum > 10) return false;
                } else if (ageVal === 'Adults (11+)') {
                    if (ageNum === null || ageNum < 11) return false;
                } else if (ageVal === 'Unknown Age') {
                    if (ageNum !== null) return false;
                }
            }
            return true;
        });

        renderInterfaceFiltered(filtered);
    }
    ```

    </gcds-details>

    > Synchronizes UI text elements and handles event callbacks for map clicks and seal selections.

    <gcds-details details-title="app.js"> 

    ``` js 
    // Update sidebar panel contents and charts with aggregated data for a NAFO Zone (Map Selection)
    function selectZone(zoneCode) {
        if (typeof sealsData === 'undefined' || sealsData.length === 0) return;

        const zoneSeals = sealsData.filter(s => s.nafo_zone === zoneCode);
        if (zoneSeals.length === 0) return;

        const titleEl = document.getElementById('side-title');
        if (titleEl) titleEl.innerText = `${zoneCode} Zone Profile`;
        
        const totalCount = zoneSeals.length;
        
        let males = 0, females = 0, unknowns = 0;
        let ageSum = 0;
        let ageCount = 0;
        let otolithSum = 0;
        let otolithCount = 0;
        
        const aggregatedPrey = {};
        let totalPreyCount = 0;
        
        zoneSeals.forEach(s => {
            if (s.gender === 'M') males++;
            else if (s.gender === 'F') females++;
            else unknowns++;
            
            if (s.age_num !== null && s.age_num !== undefined) {
                ageSum += s.age_num;
                ageCount++;
            }

            if (s.otolith !== null && s.otolith !== undefined) {
                otolithSum += s.otolith;
                otolithCount++;
            }

            if (s.prey_contents) {
                for (const [prey, count] of Object.entries(s.prey_contents)) {
                    aggregatedPrey[prey] = (aggregatedPrey[prey] || 0) + count;
                    totalPreyCount += count;
                }
            }
        });
        
        const avgAge = ageCount > 0 ? (ageSum / ageCount).toFixed(1) : 'N/A';
        
        const popEl = document.getElementById('side-pop');
        if (popEl) popEl.innerText = `${totalCount} Seals`;

        const ageEl = document.getElementById('side-age');
        if (ageEl) ageEl.innerText = `${avgAge} yrs (Average)`;

        updateDemographicsChart(males, females, unknowns);

        const ageData = getAgeDistribution(zoneSeals);
        updateAgeChart(ageData.labels, ageData.counts);

        updateStomachChart(aggregatedPrey, totalPreyCount);
    }

    // Update bottom snapshot details and individual charts for an individual seal (Index Selection)
    function selectSeal(seal) {
        if (!seal) return;

        const detailIdEl = document.getElementById('detail-id');
        if (detailIdEl) detailIdEl.innerText = seal.id;
        
        const detailGenderEl = document.getElementById('detail-gender');
        if (detailGenderEl) {
            const genderDisplay = seal.gender === 'M' ? 'Male' : seal.gender === 'F' ? 'Female' : 'Unknown';
            detailGenderEl.innerText = genderDisplay;
        }

        const detailAgeEl = document.getElementById('detail-age');
        if (detailAgeEl) detailAgeEl.innerText = seal.age;

        const detailLocEl = document.getElementById('detail-location');
        if (detailLocEl) detailLocEl.innerText = seal.area || seal.nafo_zone || '-';

        const detailMealEl = document.getElementById('detail-meal');
        if (detailMealEl) detailMealEl.innerText = seal.meal;

        const preyVisual = document.getElementById('prey-visual');
        if (preyVisual && seal.otolith) {
            const scale = Math.min(Math.max(seal.otolith * 0.4, 0.5), 3.0);
            preyVisual.style.transform = `scale(${scale})`;
        }

        updateDetailStomachChart(seal.prey_contents || {}, seal.total_prey_items || 0);
    }

    // Start application
    function init() {
        renderInterface();
        populateFilters();

        // Auto-select initial elements on load once layout has completely stabilized
        if (typeof sealsData !== 'undefined' && Array.isArray(sealsData) && sealsData.length > 0) {
            setTimeout(() => {
                try {
                    // Determine first available NAFO zone dynamically
                    const zones = [...new Set(sealsData.map(s => s.nafo_zone).filter(Boolean))].sort();
                    if (zones.length > 0) {
                        selectZone(zones[0]);
                    }
                    
                    // Select first individual seal profile 
                    selectSeal(sealsData[0]);
                } catch (err) {
                    console.warn("Auto-selection could not render fully on start:", err);
                }
            }, 150); // Gives ample layout calculation headroom
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    ```

    </gcds-details> 

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
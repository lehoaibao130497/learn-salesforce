# Week 3: Lightning Web Components (Frontend Development)

## Learning Objectives
- [ ] Understand LWC architecture and lifecycle
- [ ] Master @wire service for data binding
- [ ] Implement event handling (bubbling, composition)
- [ ] Call Apex from LWC
- [ ] Integrate third-party libraries (Chart.js)
- [ ] Build responsive and accessible components

## Prerequisites
- [ ] Completed Week 1 & 2
- [ ] Strong JavaScript knowledge
- [ ] Understanding of modern web standards
- [ ] VS Code with Salesforce Extensions

## Trailhead Modules
- [ ] LWC Basics
- [ ] Communicate Between Components
- [ ] Call Apex Methods
- [ ] Create Custom Record Pages
- [ ] Build Components for Different Form Factors

## Project: Revenue Dashboard

### Component Structure
```
revenueDashboard/
├── revenueDashboard.html
├── revenueDashboard.js
├── revenueDashboard.css
└── revenueDashboard.js-meta.xml
```

### Features
1. **Revenue Chart** - Display monthly revenue using Chart.js
2. **Data Filters** - Filter by date range, region, product
3. **Summary Cards** - Total revenue, average, growth rate
4. **Interactive Charts** - Click to drill down
5. **Responsive Design** - Mobile-friendly layout

### Component 1: RevenueDashboard (Main)
**File:** `dashboard-component/revenueDashboard/revenueDashboard.html`

```html
<template>
    <lightning-card title="Revenue Dashboard" icon-name="standard:dashboard">
        <div class="slds-m-around_medium">
            <!-- Filters -->
            <c-dashboard-filters onfilterchange={handleFilterChange}></c-dashboard-filters>
            
            <!-- Summary Cards -->
            <c-summary-cards data={summaryData}></c-summary-cards>
            
            <!-- Revenue Chart -->
            <c-revenue-chart data={chartData} ondataclick={handleDataClick}></c-revenue-chart>
            
            <!-- Detail View -->
            <template if:true={showDetails}>
                <c-revenue-details record-id={selectedRecordId}></c-revenue-details>
            </template>
        </div>
    </lightning-card>
</template>
```

**File:** `dashboard-component/revenueDashboard/revenueDashboard.js`

```javascript
import { LightningElement, wire, track } from 'lwc';
import getRevenueData from '@salesforce/apex/RevenueController.getRevenueData';

export default class RevenueDashboard extends LightningElement {
    @track chartData = [];
    @track summaryData = {};
    @track showDetails = false;
    @track selectedRecordId;

    // Wire service to get revenue data
    @wire(getRevenueData)
    wiredRevenueData({ error, data }) {
        if (data) {
            this.processChartData(data);
            this.calculateSummary(data);
        } else if (error) {
            console.error('Error fetching revenue data:', error);
        }
    }

    processChartData(data) {
        // Transform data for Chart.js
        this.chartData = {
            labels: data.map(item => item.month),
            datasets: [{
                label: 'Revenue',
                data: data.map(item => item.revenue),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        };
    }

    calculateSummary(data) {
        const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
        const avgRevenue = totalRevenue / data.length;
        
        this.summaryData = {
            total: totalRevenue,
            average: avgRevenue,
            count: data.length
        };
    }

    handleFilterChange(event) {
        // Handle filter changes from child component
        const filters = event.detail;
        // Call Apex with new filters
        this.refreshData(filters);
    }

    handleDataClick(event) {
        this.selectedRecordId = event.detail.recordId;
        this.showDetails = true;
    }

    refreshData(filters) {
        // Implement refresh logic with filters
    }
}
```

### Component 2: DashboardFilters
**Purpose:** Filter controls for date range, region, product

**Events:**
- `filterchange` - Fires when filters are modified

### Component 3: SummaryCards
**Purpose:** Display key metrics (Total Revenue, Average, Growth)

**Properties:**
- `data` - Object containing summary metrics

### Component 4: RevenueChart
**Purpose:** Render Chart.js visualization

**Integration:**
- Load Chart.js from static resource or CDN
- Create canvas element
- Initialize chart with data
- Handle user interactions

**File:** `dashboard-component/revenueChart/revenueChart.js`

```javascript
import { LightningElement, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import CHART_JS from '@salesforce/resourceUrl/chartjs';

export default class RevenueChart extends LightningElement {
    @api data;
    chart;
    chartJsLoaded = false;

    renderedCallback() {
        if (this.data && !this.chartJsLoaded) {
            this.loadChartJs();
        }
    }

    async loadChartJs() {
        try {
            await loadScript(this, CHART_JS);
            this.chartJsLoaded = true;
            this.initializeChart();
        } catch (error) {
            console.error('Error loading Chart.js:', error);
        }
    }

    initializeChart() {
        const canvas = this.template.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: this.data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Monthly Revenue'
                    }
                },
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        this.dispatchDataClick(index);
                    }
                }
            }
        });
    }

    dispatchDataClick(index) {
        const selectedData = this.data.labels[index];
        this.dispatchEvent(new CustomEvent('dataclick', {
            detail: { recordId: selectedData }
        }));
    }
}
```

### Component 5: RevenueDetails
**Purpose:** Display detailed view when chart data is clicked

**Properties:**
- `recordId` - Selected record ID from chart

## Apex Controller
**File:** `classes/RevenueController.cls`

```apex
public with sharing class RevenueController {
    
    @AuraEnabled(cacheable=true)
    public static List<RevenueData> getRevenueData() {
        List<RevenueData> result = new List<RevenueData>();
        
        // Query Opportunity data
        List<AggregateResult> opps = [
            SELECT CALENDAR_MONTH(CloseDate) month,
                   SUM(Amount) revenue
            FROM Opportunity
            WHERE StageName = 'Closed Won'
            GROUP BY CALENDAR_MONTH(CloseDate)
            ORDER BY CALENDAR_MONTH(CloseDate)
        ];
        
        for (AggregateResult ar : opps) {
            RevenueData data = new RevenueData();
            data.month = (Integer) ar.get('month');
            data.revenue = (Decimal) ar.get('revenue');
            result.add(data);
        }
        
        return result;
    }
    
    public class RevenueData {
        @AuraEnabled public Integer month;
        @AuraEnabled public Decimal revenue;
    }
}
```

## Daily Progress

### Day 1-2: LWC Basics & @wire
- [ ] Set up LWC development environment
- [ ] Create first LWC component
- [ ] Learn @track, @api decorators
- [ ] Master @wire service for data binding
- [ ] Understand lifecycle hooks

### Day 3-4: Event Handling & Communication
- [ ] Implement custom events
- [ ] Learn event bubbling and composition
- [ ] Parent-child component communication
- [ ] Build filter components
- [ ] Handle user interactions

### Day 5-6: Apex Integration & Chart.js
- [ ] Call Apex from LWC
- [ ] Handle Apex errors gracefully
- [ ] Integrate Chart.js library
- [ ] Create dynamic charts
- [ ] Implement chart interactions

### Day 7: Polish & Deploy
- [ ] Add responsive design
- [ ] Improve accessibility
- [ ] Write unit tests
- [ ] Deploy to Salesforce org
- [ ] Document component usage

## LWC Best Practices

### 1. Use @api for Public Properties
```javascript
@api recordId; // Public property
@api title = 'Default Title'; // Public with default
```

### 2. Use @track for Private Reactive Properties
```javascript
@track privateData = []; // Reactive private property
```

### 3. Leverage @wire for Data Binding
```javascript
@wire(getRecords, { accountId: '$recordId' })
wiredRecords({ error, data }) {
    if (data) {
        this.records = data;
    }
}
```

### 4. Use Lightning Data Service When Possible
```javascript
import { getRecord } from 'lightning/uiRecordApi';

@wire(getRecord, { recordId: '$recordId', fields: FIELDS })
account;
```

### 5. Handle Loading States
```javascript
@track isLoading = true;
@track error;

@wire(getData)
wiredData({ error, data }) {
    this.isLoading = false;
    if (data) {
        this.processData(data);
    } else if (error) {
        this.error = error;
    }
}
```

### 6. Use Immutable Data Patterns
```javascript
// GOOD - Create new array
this.items = [...this.items, newItem];

// AVOID - Direct mutation
this.items.push(newItem);
```

### 7. Leverage Lifecycle Hooks
```javascript
connectedCallback() {
    // Called when component inserted into DOM
}

disconnectedCallback() {
    // Called when component removed from DOM
    // Clean up event listeners, intervals, etc.
}

renderedCallback() {
    // Called after every render
}
```

## Testing LWC

### Jest Test Template
```javascript
import { createElement } from 'lwc';
import RevenueDashboard from 'c/revenueDashboard';

describe('c-revenue-dashboard', () => {
    afterEach(() => {
        // Clean up
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders dashboard correctly', () => {
        const element = createElement('c-revenue-dashboard', {
            is: RevenueDashboard
        });
        document.body.appendChild(element);
        
        // Assertions
        expect(element.shadowRoot).not.toBeNull();
    });

    it('displays chart with data', async () => {
        const element = createElement('c-revenue-dashboard', {
            is: RevenueDashboard
        });
        document.body.appendChild(element);
        
        // Wait for @wire to complete
        await Promise.resolve();
        
        // Assertions
        const chartElement = element.shadowRoot.querySelector('canvas');
        expect(chartElement).not.toBeNull();
    });
});
```

## Resources
- [LWC Recipes GitHub](https://github.com/trailheadapps/lwc-recipes)
- [LWC Developer Guide](https://developer.salesforce.com/docs/component-library/documentation/lwc)
- [LWC Components Library](https://developer.salesforce.com/docs/component-library/)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
- [Lightning Data Service](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_lightning_data_service)

## Notes Template
### Date: [Insert Date]

**Components Created:**
- [ ] [Component 1] - Features: [What it does]
- [ ] [Component 2] - Features: [What it does]

**Topics Covered:**
- [ ] [Topic 1]
- [ ] [Topic 2]

**Key Learnings:**
- [Concept 1] - Code example: [Snippet]
- [Concept 2] - Code example: [Snippet]

**Challenges:**
- [Challenge 1] - Solution: [How solved]
- [Challenge 2] - Solution: [How solved]

**Test Results:**
- Component 1: __ passing / __ failing
- Component 2: __ passing / __ failing

## Week 3 Completion Checklist
- [ ] All Trailhead modules completed
- [ ] RevenueDashboard component created
- [ ] All child components implemented
- [ ] Chart.js integrated successfully
- [ ] Apex controller working with LWC
- [ ] Event handling implemented
- [ ] Responsive design complete
- [ ] Unit tests passing
- [ ] Component deployed to org
- [ ] Documentation complete
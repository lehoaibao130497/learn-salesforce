# Week 3, Day 5-6: Apex Integration & Chart.js

## 📚 Learning Objectives

Sau khi hoàn thành các bài học này, bạn sẽ:
- ✅ Call Apex methods from LWC
- ✅ Use @wire with Apex
- ✅ Implement imperative Apex calls
- ✅ Handle Apex errors gracefully
- ✅ Integrate third-party libraries (Chart.js)
- ✅ Load static resources properly
- ✅ Apply integration best practices

---

## 🎯 Part 1: Calling Apex from LWC

### Why Use Apex with LWC?

**Apex integration** provides:
- **Complex queries** - Beyond Lightning Data Service capabilities
- **Business logic** - Server-side processing
- **DML operations** - Create, update, delete records
- **External API calls** - Integration with third-party systems

### Apex Methods for LWC

**Requirements:**
- Method must be `static`
- Annotate with `@AuraEnabled(cacheable=true)`
- Return type: `void`, `String`, `Integer`, `Boolean`, `sObject`, `List<sObject>`

#### Example Apex Class

```apex
public with sharing class AccountController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [
            SELECT Id, Name, Industry, AnnualRevenue 
            FROM Account 
            LIMIT 10
        ];
    }
    
    @AuraEnabled(cacheable=true)
    public static Account getAccount(Id accountId) {
        return [
            SELECT Id, Name, Industry, AnnualRevenue 
            FROM Account 
            WHERE Id = :accountId
        ];
    }
    
    @AuraEnabled
    public static Account createAccount(String name, String industry) {
        Account acc = new Account(
            Name = name,
            Industry = industry
        );
        insert acc;
        return acc;
    }
}
```

---

## 🔧 Part 2: @wire with Apex

### Using @wire with Apex

**@wire decorator** automatically calls Apex and manages data:

```javascript
import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class AccountList extends LightningElement {
    @track accounts = [];
    @track error;
    
    // Wire to Apex method
    @wire(getAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
        } else if (error) {
            this.error = error;
            console.error('Error fetching accounts:', error);
        }
    }
}
```

### @wire with Parameters

```javascript
import { LightningElement, wire, api } from 'lwc';
import getAccount from '@salesforce/apex/AccountController.getAccount';

export default class AccountDetail extends LightningElement {
    @api recordId;
    
    // Wire with parameter
    @wire(getAccount, { accountId: '$recordId' })
    account;
}
```

**Apex:**
```apex
public with sharing class AccountController {
    
    @AuraEnabled(cacheable=true)
    public static Account getAccount(Id accountId) {
        return [
            SELECT Id, Name, Industry, AnnualRevenue 
            FROM Account 
            WHERE Id = :accountId
        ];
    }
}
```

### @wire with Object Parameters

```javascript
import { LightningElement, wire, track } from 'lwc';
import searchAccounts from '@salesforce/apex/AccountController.searchAccounts';

export default class AccountSearch extends LightningElement {
    @track searchResults = [];
    @track searchKey = '';
    
    // Wire with object parameter
    @wire(searchAccounts, { searchKey: '$searchKey' })
    wiredResults({ error, data }) {
        if (data) {
            this.searchResults = data;
        } else if (error) {
            console.error('Search error:', error);
        }
    }
    
    handleSearch(event) {
        this.searchKey = event.target.value;
    }
}
```

**Apex:**
```apex
public with sharing class AccountController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccounts(String searchKey) {
        String key = '%' + searchKey + '%';
        return [
            SELECT Id, Name, Industry 
            FROM Account 
            WHERE Name LIKE :key
            LIMIT 20
        ];
    }
}
```

---

## 📞 Part 3: Imperative Apex Calls

### When to Use Imperative Calls

**Imperative calls** are useful when:
- Need to call on user action (button click)
- Dynamic parameters based on user input
- Need control over when call happens
- Need to handle multiple operations sequentially

### Imperative Call Syntax

```javascript
import { LightningElement, track } from 'lwc';
import createAccount from '@salesforce/apex/AccountController.createAccount';

export default class CreateAccountForm extends LightningElement {
    @track accountName = '';
    @track industry = 'Technology';
    @track isLoading = false;
    @track error;
    
    handleInputChange(event) {
        if (event.target.label === 'Account Name') {
            this.accountName = event.target.value;
        } else if (event.target.label === 'Industry') {
            this.industry = event.target.value;
        }
    }
    
    async handleSubmit() {
        this.isLoading = true;
        this.error = undefined;
        
        try {
            // Imperative Apex call
            const result = await createAccount({
                name: this.accountName,
                industry: this.industry
            });
            
            // Success - show success message
            this.showToast('Success', 'Account created successfully');
            
            // Reset form
            this.accountName = '';
            
            // Notify parent
            this.dispatchCreateEvent(result);
        } catch (error) {
            // Handle error
            this.error = error;
            this.showToast('Error', 'Failed to create account: ' + error.body.message);
        } finally {
            this.isLoading = false;
        }
    }
    
    showToast(title, message) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: title === 'Success' ? 'success' : 'error'
        });
        this.dispatchEvent(event);
    }
    
    dispatchCreateEvent(account) {
        const event = new CustomEvent('accountcreated', {
            detail: account,
            bubbles: true
        });
        this.dispatchEvent(event);
    }
}
```

### Sequential Apex Calls

```javascript
async handleMultipleOperations() {
    this.isLoading = true;
    
    try {
        // First operation
        const account = await createAccount({
            name: 'Test Account',
            industry: 'Technology'
        });
        
        // Second operation (depends on first)
        const contact = await createContact({
            accountId: account.Id,
            firstName: 'John',
            lastName: 'Doe'
        });
        
        console.log('Both operations successful');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        this.isLoading = false;
    }
}
```

---

## 🎨 Part 4: Integrating Chart.js

### What is Chart.js?

**Chart.js** là popular JavaScript library for:
- **Data visualization** - Charts, graphs, plots
- **Responsive** - Adapts to screen size
- **Interactive** - Hover effects, click events
- **Easy to use** - Simple API

### Loading External Libraries

#### Using Static Resources

**Step 1: Upload Chart.js as Static Resource**
1. Download Chart.js from https://www.chartjs.org/
2. Go to Setup > Static Resources
3. Upload as `chartjs`

**Step 2: Import in Component**

```javascript
import { loadScript } from 'lightning/platformResourceLoader';
import CHART_JS from '@salesforce/resourceUrl/chartjs';

export default class RevenueChart extends LightningElement {
    @api chartData;
    chart;
    chartJsLoaded = false;
    
    renderedCallback() {
        if (this.chartData && !this.chartJsLoaded) {
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
}
```

#### Using CDN (Simpler for Development)

```html
<template>
    <lightning-card title="Revenue Chart" icon-name="standard:dashboard">
        <div class="slds-p-around_medium">
            <canvas lwc:dom="manual" class="chart"></canvas>
        </div>
    </lightning-card>
</template>
```

**.js-meta.xml:**
```xml
<targets>
    <target>lightning__RecordPage</target>
    <target>lightning__AppPage</target>
    <target>lightningCommunity__Page</target>
</targets>
<targetConfigs>
    <targetConfig targets="lightning__RecordPage, lightning__AppPage, lightningCommunity__Page">
        <property name="enableExternalScripts" type="Boolean" default="true"/>
    </targetConfig>
</targetConfigs>
```

### Creating Chart Component

```javascript
import { LightningElement, api } from 'lwc';

export default class RevenueChart extends LightningElement {
    @api chartData;
    chart;
    
    renderedCallback() {
        if (this.chartData && !this.chart) {
            this.initializeChart();
        }
    }
    
    initializeChart() {
        const canvas = this.template.querySelector('canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: this.chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Revenue by Month'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        this.dispatchChartClick(index);
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
    }
    
    dispatchChartClick(index) {
        const selectedData = {
            month: this.chartData.labels[index],
            value: this.chartData.datasets[0].data[index]
        };
        
        const event = new CustomEvent('chartclick', {
            detail: selectedData,
            bubbles: true
        });
        this.dispatchEvent(event);
    }
}
```

**Template:**
```html
<template>
    <lightning-card title="Revenue Chart" icon-name="standard:dashboard">
        <div class="slds-p-around_medium">
            <template if:false={chart}>
                <div class="chart-container">
                    <canvas></canvas>
                </div>
            </template>
            
            <template if:true={chart}>
                <lightning-spinner alternative-text="Loading chart..."></lightning-spinner>
            </template>
        </div>
    </lightning-card>
</template>
```

**CSS:**
```css
.chart-container {
    height: 400px;
    position: relative;
}
```

### Chart Data Format

```javascript
// Prepare data for Chart.js
const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        borderRadius: 5,
        tension: 0.4
    }]
};

// Pass to component
<c-revenue-chart chart-data={chartData}></c-revenue-chart>
```

---

## 🔄 Part 5: Error Handling

### Apex Error Handling

```javascript
import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountManager extends LightningElement {
    @track error;
    @track isLoading = false;
    
    async handleCreate() {
        this.isLoading = true;
        this.error = undefined;
        
        try {
            const result = await createAccount({ name: 'Test' });
            this.showToast('Success', 'Account created');
        } catch (error) {
            // Extract error details
            let message = 'Unknown error';
            let details = error.body;
            
            if (details) {
                if (details.exceptionType === 'System.StringException') {
                    message = 'Name is required';
                } else if (details.message) {
                    message = details.message;
                }
            }
            
            this.error = {
                message: message,
                details: details
            };
            
            this.showToast('Error', message, 'error');
        } finally {
            this.isLoading = false;
        }
    }
    
    showToast(title, message, variant = 'info') {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}
```

### Displaying Errors

```html
<template>
    <template if:true={error}>
        <div class="error-container">
            <lightning-icon icon-name="utility:error" size="small"></lightning-icon>
            <span class="error-message">{error.message}</span>
        </div>
    </template>
    
    <template if:true={isLoading}>
        <lightning-spinner></lightning-spinner>
    </template>
</template>
```

---

## 💡 Part 6: Best Practices

### Apex Integration Best Practices

1. **Use @wire for reactive data**
   - Automatic updates
   - Built-in caching
   - Cleaner code

2. **Use imperative calls for actions**
   - Button clicks, form submissions
   - Dynamic parameters
   - Sequential operations

3. **Handle errors gracefully**
   - Try-catch blocks
   - User-friendly messages
   - Fallback content

4. **Use loading states**
   - Show spinner
   - Disable buttons
   - Provide feedback

5. **Cache appropriately**
   - `cacheable=true` for read-only operations
   - No cache for DML operations
   - Consider data freshness

### Chart.js Best Practices

1. **Load libraries in renderedCallback**
   - Check if already loaded
   - Avoid multiple loads
   - Handle errors gracefully

2. **Make charts responsive**
   - Set responsive: true
   - Control aspect ratio
   - Test on different screen sizes

3. **Handle chart interactions**
   - Dispatch custom events
   - Pass relevant data
   - Update UI accordingly

4. **Format data appropriately**
   - Prepare data before passing
   - Use correct format
   - Handle null/undefined values

---

## 📝 Practice Exercise

**Task:** Create Revenue Chart with Apex Integration

**Requirements:**
1. Apex method to get monthly revenue data
2. LWC component with Chart.js
3. Wire to Apex for data
4. Display bar chart of revenue
5. Handle loading and error states
6. Implement chart click event

**Time Estimate:** 75 minutes

**Apex Class:**
```apex
public with sharing class RevenueController {
    
    @AuraEnabled(cacheable=true)
    public static List<RevenueData> getMonthlyRevenue() {
        List<RevenueData> result = new List<RevenueData>();
        
        List<AggregateResult> opps = [
            SELECT CALENDAR_MONTH(CloseDate) month,
                   SUM(Amount) revenue
            FROM Opportunity
            WHERE StageName = 'Closed Won'
            AND CloseDate = THIS_YEAR
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

**Starter LWC:**
```javascript
import { LightningElement, wire, track } from 'lwc';
import getMonthlyRevenue from '@salesforce/apex/RevenueController.getMonthlyRevenue';

export default class RevenueChartComponent extends LightningElement {
    @track chartData;
    @track isLoading = true;
    @track error;
    
    // Add @wire decorator here
    
    // Add Chart.js initialization here}
```

---

## ✅ Checklist

### Day 5: Apex Integration
- [ ] Created Apex @AuraEnabled methods
- [ ] Used @wire with Apex
- [ ] Implemented imperative Apex calls
- [ ] Handled Apex errors
- [ ] Added loading states
- [ ] Tested Apex integration

### Day 6: Chart.js Integration
- [ ] Loaded Chart.js library
- [ ] Created chart component
- [ ] Displayed data in chart
- [ ] Implemented chart interactions
- [ ] Made chart responsive
- [ ] Applied best practices

---

## 🎓 Trailhead Modules

Complete these modules for deeper understanding:
- [ ] **Call Apex Methods** - https://trailhead.salesforce.com/content/learn/modules/lwc_call_apex
- [ ] **Create Custom Record Pages** - https://trailhead.salesforce.com/content/learn/modules/lwc_custom_record_pages
- [ ] **Adapt Components for Different Form Factors** - https://trailhead.salesforce.com/content/learn/modules/lwc_adapt_form_factors

---

## 📚 Next Steps

Sau khi hoàn thành Days 5-6:
1. ✅ Practice Apex integration patterns
2. ✅ Implement Chart.js visualizations
3. ✅ Handle errors gracefully
4. ✅ Create interactive charts
5. ✅ Prepare for Day 7: Testing & Week 3 Review

---

**Tiếp tục:** [Day 7: Testing & Week 3 Review](./testing-review.md)
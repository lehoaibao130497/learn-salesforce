# Week 3, Day 1-2: LWC Basics & @wire

## 📚 Learning Objectives

Sau khi hoàn thành các bài học này, bạn sẽ:
- ✅ Understand LWC architecture và component structure
- ✅ Master @api, @track, @wire decorators
- ✅ Create your first LWC component
- ✅ Use Lightning Data Service for data binding
- ✅ Understand component lifecycle hooks
- ✅ Apply LWC best practices

---

## 🎯 Part 1: What is LWC?

### Lightning Web Components Overview

**LWC** (Lightning Web Components) là modern framework cho building Lightning components:
- **Web Standards** - Built on standard Web Components
- **Modern JavaScript** - ES6+ support
- **Lightweight** - Fast rendering, better performance
- **Component-based** - Reusable, composable architecture
- **Native** - No third-party dependencies required

### LWC vs Aura Components

| Feature | LWC | Aura Components |
|----------|--------|-----------------|
| **Performance** | Fast, lightweight | Slower, heavier |
| **JavaScript** | Modern ES6+ | Older JavaScript |
| **Web Standards** | Native | Custom framework |
| **Component Communication** | Standard events | Custom events |
| **Development** | Modern tooling | Legacy tooling |

### LWC Architecture

```
┌─────────────────────────────────────┐
│   LWC Component Structure         │
├─────────────────────────────────────┤
│  .html - Template (UI)            │
│  .js - Controller (Logic)           │
│  .css - Styles (Appearance)         │
│  .js-meta.xml - Metadata (Config)   │
└─────────────────────────────────────┘
```

---

## 🏗️ Part 2: Component Structure

### File Structure

Each LWC component has 4 required files:

#### 1. HTML Template (.html)
Defines the component's UI structure:

```html
<template>
    <lightning-card title="My First Component" icon-name="standard:account">
        <div class="slds-m-around_medium">
            <p>Hello, LWC!</p>
        </div>
    </lightning-card>
</template>
```

#### 2. JavaScript Controller (.js)
Contains component logic:

```javascript
import { LightningElement } from 'lwc';

export default class MyFirstComponent extends LightningElement {
    greeting = 'Hello, LWC!';
}
```

#### 3. CSS Styles (.css)
Defines component styling:

```css
.container {
    padding: 1rem;
    background-color: #f8f9fa;
}
```

#### 4. Metadata (.js-meta.xml)
Configures component properties:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>59.0</apiVersion>
    <isExposed>true</isExposed>
    <targets>
        <target>lightning__RecordPage</target>
        <target>lightning__AppPage</target>
        <target>lightning__HomePage</target>
    </targets>
</LightningComponentBundle>
```

### Component Naming Conventions

| Convention | Rule | Example |
|-------------|-------|---------|
| **Folder Name** | camelCase | `myFirstComponent` |
| **Class Name** | PascalCase | `MyFirstComponent` |
| **HTML Template** | kebab-case | `myFirstComponent.html` |
| **CSS File** | kebab-case | `myFirstComponent.css` |
| **Usage** | camel-case tag | `<c-my-first-component>` |

---

## 🔧 Part 3: Decorators

### @api Decorator

Makes property or method public and reactive:

```javascript
import { LightningElement, api } from 'lwc';

export default class ContactCard extends LightningElement {
    // Public property - can be set by parent
    @api recordId;
    
    // Public property with default value
    @api title = 'Contact Information';
    
    // Public method - can be called by parent
    @api
    refresh() {
        console.log('Refresh called');
    }
}
```

**Usage:**
```html
<!-- Parent component -->
<c-contact-card record-id="0032800000" title="Contact Details"></c-contact-card>
```

### @track Decorator

Makes private property reactive:

```javascript
import { LightningElement, track } from 'lwc';

export default class ContactList extends LightningElement {
    // Reactive private property
    @track contacts = [];
    
    // Non-reactive property (won't trigger re-render)
    staticValue = 'Static';
    
    // Updating @track property triggers re-render
    addContact(contact) {
        this.contacts = [...this.contacts, contact];
    }
}
```

**Important:**
- Use `@track` for private reactive properties
- Changes trigger component re-render
- Arrays and objects need special handling

### @wire Decorator

Wires data to component:

```javascript
import { LightningElement, wire, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';

export default class ContactDetail extends LightningElement {
    @api recordId;
    
    // Wire to get record data
    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD, PHONE_FIELD] })
    contact;
    
    // Get specific field value
    get name() {
        return getFieldValue(this.contact.data, NAME_FIELD);
    }
    
    get phone() {
        return getFieldValue(this.contact.data, PHONE_FIELD);
    }
}
```

---

## 🔗 Part 4: Lightning Data Service

### What is Lightning Data Service?

**Lightning Data Service** provides reactive, standardized access to Salesforce data without Apex:

| Feature | Description |
|-----------|-------------|
| **Reactive** | Automatically updates when data changes |
| **Cache** | Built-in caching for performance |
| **Security** | Enforces field-level security |
| **No Apex** | Access data directly from JavaScript |

### Common LDS Functions

| Function | Purpose | Example |
|-----------|---------|---------|
| **getRecord** | Get single record | `getRecord({ recordId, fields })` |
| **getRecords** | Get multiple records | `getRecords({ records, fields })` |
| **getListUi** | Get list view data | `getListUi({ objectApiName, listViewApiName })` |
| **createRecord** | Create new record | `createRecord({ apiName, fields })` |
| **updateRecord** | Update record | `updateRecord({ recordId, fields })` |
| **deleteRecord** | Delete record | `deleteRecord(recordId)` |

### Example: Get Record with LDS

```javascript
import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';

const FIELDS = [NAME_FIELD, INDUSTRY_FIELD, REVENUE_FIELD];

export default class AccountDetail extends LightningElement {
    @api recordId;
    
    // Wire to get account record
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    account;
    
    // Getters for field values
    get name() {
        return getFieldValue(this.account.data, NAME_FIELD);
    }
    
    get industry() {
        return getFieldValue(this.account.data, INDUSTRY_FIELD);
    }
    
    get revenue() {
        return getFieldValue(this.account.data, REVENUE_FIELD);
    }
    
    get formattedRevenue() {
        return this.revenue ? '$' + this.revenue.toLocaleString() : '';
    }
}
```

**Template:**
```html
<template>
    <template if:true={account.data}>
        <lightning-card title={name} icon-name="standard:account">
            <div class="slds-p-around_medium">
                <p><strong>Industry:</strong> {industry}</p>
                <p><strong>Annual Revenue:</strong> {formattedRevenue}</p>
            </div>
        </lightning-card>
    </template>
    
    <template if:true={account.error}>
        <p>Error loading account data</p>
    </template>
</template>
```

---

## 🔄 Part 5: Component Lifecycle Hooks

### Lifecycle Hooks Overview

| Hook | When Called | Use Case |
|-------|-------------|----------|
| **constructor()** | Component instance created | Initialize properties |
| **connectedCallback()** | Component inserted into DOM | Set up event listeners, fetch data |
| **renderedCallback()** | After every render | DOM manipulation, third-party library setup |
| **disconnectedCallback()** | Component removed from DOM | Clean up event listeners |

### Lifecycle Example

```javascript
import { LightningElement } from 'lwc';

export default class LifecycleDemo extends LightningElement {
    constructor() {
        super();
        console.log('1. Constructor called');
    }
    
    connectedCallback() {
        console.log('2. Component connected to DOM');
        // Set up event listeners
        window.addEventListener('resize', this.handleResize);
    }
    
    renderedCallback() {
        console.log('3. Component rendered');
        // DOM manipulation
        const element = this.template.querySelector('.my-element');
        if (element) {
            // Work with DOM element
        }
    }
    
    disconnectedCallback() {
        console.log('4. Component disconnected from DOM');
        // Clean up
        window.removeEventListener('resize', this.handleResize);
    }
    
    handleResize() {
        // Handle window resize
    }
}
```

### Lifecycle Best Practices

1. **Use constructor** for initialization only
2. **Use connectedCallback** for setup operations
3. **Use renderedCallback** for DOM manipulation (check if element exists)
4. **Use disconnectedCallback** for cleanup
5. **Avoid long operations in lifecycle hooks**

---

## 💡 Part 6: Creating Your First LWC Component

### Step 1: Create Component

Use SFDX CLI or Developer Console:

```bash
sfdx force:lightning:component:create --type lwc -n helloWorld -d force-app/main/default/lwc
```

### Step 2: Write Template

**File:** `helloWorld/helloWorld.html`

```html
<template>
    <lightning-card title="Hello World" icon-name="standard:hello">
        <div class="slds-m-around_medium">
            <div class="slds-text-heading_large">
                {greeting}
            </div>
            <lightning-input 
                label="Your Name" 
                value={name}
                onchange={handleNameChange}
                class="slds-m-top_small">
            </lightning-input>
        </div>
    </lightning-card>
</template>
```

### Step 3: Write Controller

**File:** `helloWorld/helloWorld.js`

```javascript
import { LightningElement, track } from 'lwc';

export default class HelloWorld extends LightningElement {
    @track greeting = 'Hello, World!';
    @track name = '';
    
    handleNameChange(event) {
        this.name = event.target.value;
        this.greeting = `Hello, ${this.name}!`;
    }
}
```

### Step 4: Configure Metadata

**File:** `helloWorld/helloWorld.js-meta.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>59.0</apiVersion>
    <isExposed>true</isExposed>
    <targets>
        <target>lightning__RecordPage</target>
        <target>lightning__AppPage</target>
        <target>lightning__HomePage</target>
        <target>lightningCommunity__Page</target>
    </targets>
    <targetConfigs>
        <targetConfig targets="lightning__RecordPage">
            <objects>
                <object>Account</object>
                <object>Contact</object>
            </objects>
        </targetConfig>
    </targetConfigs>
</LightningComponentBundle>
```

### Step 5: Deploy and Test

1. Deploy component to org
2. Add component to Lightning page
3. Test functionality

---

## 🎯 Part 7: Best Practices

### LWC Best Practices

1. **Use @api for public properties**
   - Makes properties accessible to parent
   - Enables component composition
   - Follows Web Components standard

2. **Use @track for reactive private properties**
   - Triggers re-render on change
   - Use sparingly (only when needed)
   - Prefer getters for computed values

3. **Use Lightning Data Service when possible**
   - No Apex required
   - Built-in caching
   - Automatic security

4. **Handle loading and error states**
   - Show loading indicators
   - Display error messages
   - Provide fallback content

5. **Use immutable data patterns**
   - Create new arrays/objects
   - Avoid direct mutation
   - Prevent re-render issues

```javascript
// GOOD - Immutable
this.items = [...this.items, newItem];

// AVOID - Mutable
this.items.push(newItem);
```

6. **Leverage getters for computed values**
   - Computed properties
   - Cleaner code
   - Better performance

```javascript
get fullName() {
    return `${this.firstName} ${this.lastName}`;
}
```

7. **Use lifecycle hooks properly**
   - Constructor for init
   - connectedCallback for setup
   - renderedCallback for DOM
   - disconnectedCallback for cleanup

---

## 📝 Practice Exercise

**Task:** Create ContactCard Component

**Requirements:**
1. Display contact name, title, phone, email
2. Use @api for recordId property
3. Use Lightning Data Service to fetch contact
4. Handle loading and error states
5. Add styling with SLDS

**Time Estimate:** 45 minutes

**Files to Create:**
- `contactCard/contactCard.html`
- `contactCard/contactCard.js`
- `contactCard/contactCard.css`
- `contactCard/contactCard.js-meta.xml`

**Starter Code:**

**HTML:**
```html
<template>
    <lightning-card title="Contact" icon-name="standard:contact">
        <div class="slds-p-around_medium">
            <!-- Add your template here -->
        </div>
    </lightning-card>
</template>
```

**JS:**
```javascript
import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

// Import field references
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

export default class ContactCard extends LightningElement {
    @api recordId;
    
    // Add @wire decorator here
    
    // Add getters for fields
}
```

---

## ✅ Checklist

### Day 1: LWC Fundamentals
- [ ] Created first LWC component
- [ ] Understood component structure
- [ ] Used @api decorator
- [ ] Used @track decorator
- [ ] Tested component in org
- [ ] Reviewed metadata configuration

### Day 2: Lightning Data Service & Lifecycle
- [ ] Used Lightning Data Service functions
- [ ] Implemented @wire with getRecord
- [ ] Handled loading and error states
- [ ] Implemented lifecycle hooks
- [ ] Created computed getters
- [ ] Applied best practices

---

## 🎓 Trailhead Modules

Complete these modules for deeper understanding:
- [ ] **LWC Basics** - https://trailhead.salesforce.com/content/learn/modules/lwc_basics
- [ ] **Create and Use Wire Adapters** - https://trailhead.salesforce.com/content/learn/modules/lwc_create_wire_adapters
- [ ] **Work with Forms** - https://trailhead.salesforce.com/content/learn/modules/lwc_forms
- [ ] **Lightning Data Service** - https://trailhead.salesforce.com/content/learn/modules/lightning_data_service

---

## 📚 Next Steps

Sau khi hoàn thành Days 1-2:
1. ✅ Practice creating multiple LWC components
2. ✅ Master @api, @track, @wire decorators
3. ✅ Understand Lightning Data Service
4. ✅ Implement lifecycle hooks
5. ✅ Prepare for Day 3-4: Event Handling & Communication

---

**Tiếp tục:** [Day 3-4: Events & Communication](./events-communication.md)
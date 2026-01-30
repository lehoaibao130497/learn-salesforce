# Week 3, Day 3-4: Event Handling & Communication

## 📚 Learning Objectives

Sau khi hoàn thành các bài học này, bạn sẽ:
- ✅ Understand custom events in LWC
- ✅ Implement event bubbling và composition
- ✅ Master parent-child component communication
- ✅ Handle user interactions properly
- ✅ Use Lightning layouts effectively
- ✅ Apply communication best practices

---

## 🎯 Part 1: Custom Events

### What are Custom Events?

**Custom Events** cho phép components communicate với nhau:
- **Child to Parent** - Child dispatches event, parent listens
- **Siblings** - Through parent mediator
- **Cross-component** - Through Lightning Message Service

### Creating Custom Events

#### 1. Define Event

```javascript
import { LightningElement, api } from 'lwc';

export default class ChildComponent extends LightningElement {
    @api itemName = 'Default Item';
    
    handleItemClick() {
        // Create custom event
        const event = new CustomEvent('itemclick', {
            detail: {
                itemId: this.itemId,
                itemName: this.itemName
            },
            bubbles: true,
            composed: true
        });
        
        // Dispatch event
        this.dispatchEvent(event);
    }
}
```

#### 2. Listen for Event

```javascript
import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    handleItemClick(event) {
        const detail = event.detail;
        console.log('Item clicked:', detail.itemId);
        console.log('Item name:', detail.itemName);
    }
}
```

#### 3. Handle in Template

```html
<template>
    <c-child-component 
        item-name="Sample Item"
        onitemclick={handleItemClick}>
    </c-child-component>
</template>
```

---

## 🔄 Part 2: Event Bubbling and Composition

### Event Bubbling

**Bubbling** allows events to propagate up the DOM tree:

```javascript
// Child component
const event = new CustomEvent('customevent', {
    detail: { data: 'test' },
    bubbles: true  // Event bubbles up
});

this.dispatchEvent(event);
```

**Event Flow:**
```
Child Component
    ↓ (bubbles)
Parent Component
    ↓ (bubbles)
Grandparent Component
```

### Event Composition

**Composition** allows events to cross shadow boundaries:

```javascript
const event = new CustomEvent('customevent', {
    detail: { data: 'test' },
    composed: true  // Event crosses shadow DOM
});

this.dispatchEvent(event);
```

**When to Use:**
- `bubbles: true` - For parent communication
- `composed: true` - For cross-boundary communication
- Use both for global event propagation

### Example: Bubbling and Composition

```javascript
// Child component
export default class ListItem extends LightningElement {
    @api item;
    
    handleClick() {
        const event = new CustomEvent('itemselected', {
            detail: {
                id: this.item.id,
                name: this.item.name
            },
            bubbles: true,
            composed: true
        });
        
        this.dispatchEvent(event);
    }
}
```

```html
<!-- Parent component -->
<template>
    <div onitemselected={handleItemSelection}>
        <c-list-item item={items[0]}></c-list-item>
        <c-list-item item={items[1]}></c-list-item>
        <c-list-item item={items[2]}></c-list-item>
    </div>
</template>
```

---

## 👥 Part 3: Parent-Child Communication

### Parent to Child (Using @api)

**Parent passes data to child via properties:**

```javascript
// Child component
export default class ChildComponent extends LightningElement {
    @api message = 'Default';
    @api recordId;
    
    @api
    updateMessage(newMessage) {
        this.message = newMessage;
    }
}
```

```html
<!-- Parent template -->
<template>
    <c-child-component 
        message="Hello from Parent"
        record-id="0012800000">
    </c-child-component>
</template>
```

**Calling Child Methods:**

```javascript
// Parent component
export default class ParentComponent extends LightningElement {
    childComponent;
    
    renderedCallback() {
        this.childComponent = this.template.querySelector('c-child-component');
    }
    
    updateChild() {
        if (this.childComponent) {
            this.childComponent.updateMessage('Updated message');
        }
    }
}
```

### Child to Parent (Using Events)

**Child dispatches event to parent:**

```javascript
// Child component
export default class ChildComponent extends LightningElement {
    handleButtonClick() {
        const event = new CustomEvent('notify', {
            detail: {
                message: 'Hello from child',
                timestamp: Date.now()
            },
            bubbles: true,
            composed: true
        });
        
        this.dispatchEvent(event);
    }
}
```

```javascript
// Parent component
export default class ParentComponent extends LightningElement {
    notification;
    
    handleNotify(event) {
        this.notification = event.detail.message;
        console.log('Notification:', event.detail);
    }
}
```

```html
<!-- Parent template -->
<template>
    <c-child-component onnotify={handleNotify}></c-child-component>
    <template if:true={notification}>
        <p>Received: {notification}</p>
    </template>
</template>
```

---

## 📊 Part 4: Lightning Layouts

### Lightning Layout Components

| Component | Purpose | Example |
|-----------|---------|---------|
| **lightning-layout** | Responsive grid layout | Create 2-column layout |
| **lightning-layout-item** | Layout column | Define column content |
| **lightning-card** | Card container | Display content in card |
| **lightning-record-form** | Edit form | Display record edit form |
| **lightning-record-view-form** | Read-only view | Display record details |

### Responsive Layout Example

```html
<template>
    <lightning-card title="Account Details" icon-name="standard:account">
        <div class="slds-p-around_medium">
            <lightning-layout multiple-rows>
                <!-- Row 1: Account Name -->
                <lightning-layout-item size="12" padding="around-small">
                    <p class="slds-text-heading_large">
                        {accountName}
                    </p>
                </lightning-layout-item>
                
                <!-- Row 2: Two Columns -->
                <lightning-layout-item size="6" padding="around-small">
                    <div class="slds-box">
                        <p><strong>Industry:</strong></p>
                        <p>{industry}</p>
                    </div>
                </lightning-layout-item>
                
                <lightning-layout-item size="6" padding="around-small">
                    <div class="slds-box">
                        <p><strong>Revenue:</strong></p>
                        <p>{formattedRevenue}</p>
                    </div>
                </lightning-layout-item>
                
                <!-- Row 3: Actions -->
                <lightning-layout-item size="12" padding="around-small">
                    <lightning-button-group>
                        <lightning-button 
                            label="Edit" 
                            onclick={handleEdit}
                            variant="brand">
                        </lightning-button>
                        <lightning-button 
                            label="Delete" 
                            onclick={handleDelete}
                            variant="destructive">
                        </lightning-button>
                    </lightning-button-group>
                </lightning-layout-item>
            </lightning-layout>
        </div>
    </lightning-card>
</template>
```

**CSS:**
```css
.slds-box {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 1rem;
    min-height: 100px;
}
```

### Layout Best Practices

1. **Use lightning-layout** for responsive design
2. **Set appropriate sizes** based on 12-column grid
3. **Use padding** for proper spacing
4. **Group related elements** in same layout item
5. **Consider mobile** when setting column sizes

---

## 🎯 Part 5: User Interactions

### Handling Form Input

```javascript
export default class ContactForm extends LightningElement {
    @track formData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    };
    
    handleInputChange(event) {
        const field = event.target.dataset.field;
        this.formData = {
            ...this.formData,
            [field]: event.target.value
        };
    }
    
    handleSubmit() {
        console.log('Form submitted:', this.formData);
        // Create record
    }
}
```

```html
<template>
    <lightning-card title="Create Contact" icon-name="standard:contact">
        <div class="slds-p-around_medium">
            <lightning-input
                label="First Name"
                value={formData.firstName}
                data-field="firstName"
                onchange={handleInputChange}
                class="slds-m-bottom_small">
            </lightning-input>
            
            <lightning-input
                label="Last Name"
                value={formData.lastName}
                data-field="lastName"
                onchange={handleInputChange}
                class="slds-m-bottom_small">
            </lightning-input>
            
            <lightning-input
                type="email"
                label="Email"
                value={formData.email}
                data-field="email"
                onchange={handleInputChange}
                class="slds-m-bottom_small">
            </lightning-input>
            
            <lightning-input
                type="phone"
                label="Phone"
                value={formData.phone}
                data-field="phone"
                onchange={handleInputChange}
                class="slds-m-bottom_medium">
            </lightning-input>
            
            <lightning-button
                label="Submit"
                onclick={handleSubmit}
                variant="brand"
                class="slds-width_full">
            </lightning-button>
        </div>
    </lightning-card>
</template>
```

### Handling Button Clicks

```javascript
export default class ActionButtons extends LightningElement {
    handleEdit() {
        console.log('Edit clicked');
        // Dispatch event to parent
        const event = new CustomEvent('edit', {
            detail: { action: 'edit' },
            bubbles: true
        });
        this.dispatchEvent(event);
    }
    
    handleDelete() {
        // Confirm before deleting
        if (confirm('Are you sure you want to delete?')) {
            const event = new CustomEvent('delete', {
                detail: { action: 'delete' },
                bubbles: true
            });
            this.dispatchEvent(event);
        }
    }
    
    handleView() {
        console.log('View clicked');
    }
}
```

```html
<template>
    <lightning-button-group>
        <lightning-button
            label="View"
            onclick={handleView}
            icon-name="standard:visibility">
        </lightning-button>
        
        <lightning-button
            label="Edit"
            onclick={handleEdit}
            icon-name="standard:edit"
            variant="brand">
        </lightning-button>
        
        <lightning-button
            label="Delete"
            onclick={handleDelete}
            icon-name="standard:delete"
            variant="destructive">
        </lightning-button>
    </lightning-button-group>
</template>
```

---

## 💡 Part 6: Best Practices

### Event Communication Best Practices

1. **Use descriptive event names**
   - Use lowercase with event prefix
   - Be specific about event purpose
   - Example: `itemclick`, `contactselected`

2. **Include detail object**
   - Pass all needed data
   - Use clear property names
   - Make it easy to consume

3. **Use bubbles and composed appropriately**
   - `bubbles: true` for parent communication
   - `composed: true` for shadow boundary crossing
   - Avoid overusing both

4. **Clean up event listeners**
   - Remove listeners in disconnectedCallback
   - Prevent memory leaks
   - Handle component lifecycle properly

### Parent-Child Best Practices

1. **Use @api for parent-to-child**
   - Pass data via properties
   - Use default values when appropriate
   - Keep public interface minimal

2. **Use events for child-to-parent**
   - Dispatch custom events
   - Include relevant data in detail
   - Document event contract

3. **Avoid tight coupling**
   - Components should be reusable
   - Use events, not direct references
   - Prefer composition over inheritance

4. **Validate data flow**
   - Check data types
   - Handle null/undefined values
   - Provide fallback content

---

## 📝 Practice Exercise

**Task:** Create Filtered List Component

**Requirements:**
1. Parent component displays list of items
2. Child filter component controls what's displayed
3. Parent listens for filter change events
4. Use lightning-layout for responsive design
5. Handle empty state

**Time Estimate:** 60 minutes

**Components to Create:**

#### FilterControls Component
**Purpose:** Filter controls for list

**Events:**
- `filterchange` - Fires when filters are modified

#### FilteredList Component
**Purpose:** Display filtered list of items

**Features:**
- Accepts filter criteria
- Displays matching items
- Shows empty state when no matches

**Starter Code:**

**FilterControls:**
```javascript
export default class FilterControls extends LightningElement {
    @track filters = {
        searchText: '',
        category: 'All',
        minPrice: 0
    };
    
    handleFilterChange(event) {
        const field = event.target.dataset.field;
        this.filters = {
            ...this.filters,
            [field]: event.target.value
        };
        
        // Dispatch filter change event
        const changeEvent = new CustomEvent('filterchange', {
            detail: this.filters,
            bubbles: true
        });
        this.dispatchEvent(changeEvent);
    }
}
```

**FilteredList:**
```javascript
export default class FilteredList extends LightningElement {
    @track filteredItems = [];
    
    @api
    set items(value) {
        this._items = value;
        this.applyFilters();
    }
    
    get items() {
        return this._items;
    }
    
    @track filters = {
        searchText: '',
        category: 'All',
        minPrice: 0
    };
    
    handleFilterChange(event) {
        this.filters = event.detail;
        this.applyFilters();
    }
    
    applyFilters() {
        if (!this.items) {
            this.filteredItems = [];
            return;
        }
        
        this.filteredItems = this.items.filter(item => {
            const matchesSearch = !this.filters.searchText ||
                item.name.toLowerCase().includes(this.filters.searchText.toLowerCase());
            
            const matchesCategory = this.filters.category === 'All' ||
                item.category === this.filters.category;
            
            const matchesPrice = item.price >= this.filters.minPrice;
            
            return matchesSearch && matchesCategory && matchesPrice;
        });
    }
}
```

---

## ✅ Checklist

### Day 3: Custom Events & Bubbling
- [ ] Created custom event
- [ ] Implemented event bubbling
- [ ] Implemented event composition
- [ ] Dispatched events from child
- [ ] Handled events in parent
- [ ] Tested event propagation

### Day 4: Communication & Layouts
- [ ] Implemented parent-to-child communication
- [ ] Implemented child-to-parent communication
- [ ] Used lightning-layout components
- [ ] Created responsive design
- [ ] Handled user interactions
- [ ] Applied best practices

---

## 🎓 Trailhead Modules

Complete these modules for deeper understanding:
- [ ] **Communicate Between Components** - https://trailhead.salesforce.com/content/learn/modules/lwc_communication
- [ ] **Create and Use Wire Adapters** - https://trailhead.salesforce.com/content/learn/modules/lwc_create_wire_adapters
- [ ] **Adapt Components for Different Form Factors** - https://trailhead.salesforce.com/content/learn/modules/lwc_adapt_form_factors

---

## 📚 Next Steps

Sau khi hoàn thành Days 3-4:
1. ✅ Practice creating custom events
2. ✅ Implement component communication patterns
3. ✅ Build responsive layouts
4. ✅ Handle user interactions
5. ✅ Prepare for Day 5-6: Apex Integration & Chart.js

---

**Tiếp tục:** [Day 5-6: Apex Integration & Chart.js](./apex-integration.md)
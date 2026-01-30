# Week 3, Day 7: Testing & Week 3 Review

## 📚 Learning Objectives

Sau khi hoàn thành các bài học này, bạn sẽ:
- ✅ Understand Jest testing framework for LWC
- ✅ Write unit tests for LWC components
- ✅ Test @wire services and Apex integration
- ✅ Test event handling and user interactions
- ✅ Achieve code coverage for LWC
- ✅ Review Week 3 key concepts

---

## 🎯 Part 1: Jest Testing Overview

### What is Jest?

**Jest** là JavaScript testing framework cho LWC:
- **Fast** - Parallel test execution
- **Integrated** - Built into Salesforce CLI
- **Coverage** - Code coverage reporting
- **Mocking** - Easy mock Apex and LDS

### Why Test LWC?

| Benefit | Description |
|----------|-------------|
| **Quality** | Ensures components work correctly |
| **Regression** | Catches bugs before deployment |
| **Documentation** - Shows how components work |
| **Refactoring** - Safe code changes |
| **Best Practice** - Industry standard |

### Test File Structure

```
force-app/test/lwc/
├── myComponent/
│   └── myComponent.test.js
└── anotherComponent/
    └── anotherComponent.test.js
```

---

## 🔧 Part 2: Basic LWC Testing

### Test File Template

```javascript
import { createElement } from 'lwc';
import MyComponent from 'c/myComponent';

describe('c-my-component', () => {
    afterEach(() => {
        // Clean up DOM after each test
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders component correctly', () => {
        // Create component
        const element = createElement('c-my-component', {
            is: MyComponent
        });
        document.body.appendChild(element);
        
        // Verify component rendered
        expect(element.shadowRoot).not.toBeNull();
    });
});
```

### Testing Component Properties

```javascript
describe('c-contact-card', () => {
    it('displays contact name when set', () => {
        // Create component
        const element = createElement('c-contact-card', {
            is: ContactCard
        });
        
        // Set property
        element.contactName = 'John Doe';
        document.body.appendChild(element);
        
        // Wait for reactive cycle
        return Promise.resolve().then(() => {
            // Verify name is displayed
            const nameElement = element.shadowRoot.querySelector('.contact-name');
            expect(nameElement.textContent).toBe('John Doe');
        });
    });
    
    it('shows default message when contact name is empty', () => {
        const element = createElement('c-contact-card', {
            is: ContactCard
        });
        document.body.appendChild(element);
        
        return Promise.resolve().then(() => {
            const nameElement = element.shadowRoot.querySelector('.contact-name');
            expect(nameElement.textContent).toBe('No contact selected');
        });
    });
});
```

### Testing DOM Elements

```javascript
describe('c-contact-form', () => {
    it('renders input fields', () => {
        const element = createElement('c-contact-form', {
            is: ContactForm
        });
        document.body.appendChild(element);
        
        // Find input elements
        const inputs = element.shadowRoot.querySelectorAll('lightning-input');
        expect(inputs.length).toBe(3); // Name, Email, Phone
        
        // Verify labels
        expect(inputs[0].label).toBe('First Name');
        expect(inputs[1].label).toBe('Email');
        expect(inputs[2].label).toBe('Phone');
    });
    
    it('renders submit button', () => {
        const element = createElement('c-contact-form', {
            is: ContactForm
        });
        document.body.appendChild(element);
        
        const button = element.shadowRoot.querySelector('lightning-button');
        expect(button).not.toBeNull();
        expect(button.label).toBe('Submit');
    });
});
```

---

## 🔄 Part 3: Testing User Interactions

### Testing Button Clicks

```javascript
describe('c-action-buttons', () => {
    it('dispatches edit event when edit button clicked', () => {
        const element = createElement('c-action-buttons', {
            is: ActionButtons
        });
        document.body.appendChild(element);
        
        // Mock event handler
        const handler = jest.fn();
        element.addEventListener('edit', handler);
        
        // Find and click edit button
        const editButton = element.shadowRoot.querySelector('lightning-button[label="Edit"]');
        editButton.click();
        
        // Verify event was dispatched
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler.mock.calls[0][0].detail).toEqual({
            action: 'edit'
        });
    });
});
```

### Testing Form Input

```javascript
describe('c-contact-form', () => {
    it('updates contact name when input changes', () => {
        const element = createElement('c-contact-form', {
            is: ContactForm
        });
        document.body.appendChild(element);
        
        // Find input
        const nameInput = element.shadowRoot.querySelector(
            'lightning-input[data-field="firstName"]'
        );
        
        // Simulate input change
        nameInput.value = 'John';
        nameInput.dispatchEvent(new CustomEvent('change', {
            composed: true,
            bubbles: true,
            detail: { value: 'John' }
        }));
        
        // Wait for reactive cycle
        return Promise.resolve().then(() => {
            // Verify value updated
            expect(element.formData.firstName).toBe('John');
        });
    });
});
```

### Testing Event Dispatching

```javascript
describe('c-item-list', () => {
    it('dispatches itemselected event when item clicked', () => {
        const element = createElement('c-item-list', {
            is: ItemList
        });
        element.items = [
            { id: '1', name: 'Item 1' },
            { id: '2', name: 'Item 2' }
        ];
        document.body.appendChild(element);
        
        // Mock event handler
        const handler = jest.fn();
        element.addEventListener('itemselected', handler);
        
        return Promise.resolve().then(() => {
            // Find and click first item
            const items = element.shadowRoot.querySelectorAll('.item');
            items[0].click();
            
            // Verify event
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail).toEqual({
                id: '1',
                name: 'Item 1'
            });
        });
    });
});
```

---

## 🎯 Part 4: Testing @wire Services

### Mocking Lightning Data Service

```javascript
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

describe('c-account-detail', () => {
    // Mock LDS
    getRecord.error = undefined;
    getRecord.data = undefined;
    
    it('displays account name when data loaded', () => {
        // Mock account data
        const mockGetRecord = require('lightning/uiRecordApi');
        mockGetRecord.getRecord.emit({
            Id: '0012800000',
            Name: 'Test Account',
            Industry: 'Technology'
        });
        
        const element = createElement('c-account-detail', {
            is: AccountDetail
        });
        element.recordId = '0012800000';
        document.body.appendChild(element);
        
        return Promise.resolve().then(() => {
            // Verify data displayed
            const nameElement = element.shadowRoot.querySelector('.account-name');
            expect(nameElement.textContent).toBe('Test Account');
        });
    });
    
    it('shows error when wire fails', () => {
        // Mock error
        const mockGetRecord = require('lightning/uiRecordApi');
        mockGetRecord.getRecord.error = 'Error loading account';
        
        const element = createElement('c-account-detail', {
            is: AccountDetail
        });
        element.recordId = '0012800000';
        document.body.appendChild(element);
        
        return Promise.resolve().then(() => {
            // Verify error message
            const errorElement = element.shadowRoot.querySelector('.error-message');
            expect(errorElement.textContent).toContain('Error');
        });
    });
});
```

### Testing Apex @wire

```javascript
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

describe('c-account-list', () => {
    it('displays accounts when @wire returns data', () => {
        // Mock Apex response
        const mockAccounts = [
            { Id: '0012800000', Name: 'Account 1' },
            { Id: '0012800001', Name: 'Account 2' }
        ];
        
        getAccounts.emit(mockAccounts);
        
        const element = createElement('c-account-list', {
            is: AccountList
        });
        document.body.appendChild(element);
        
        return Promise.resolve().then(() => {
            // Verify accounts displayed
            const accountElements = element.shadowRoot.querySelectorAll('.account-item');
            expect(accountElements.length).toBe(2);
        });
    });
});
```

---

## 📊 Part 5: Testing Apex Integration

### Testing Imperative Apex Calls

```javascript
import createAccount from '@salesforce/apex/AccountController.createAccount';

describe('c-create-account-form', () => {
    afterEach(() => {
        // Reset mocks
        jest.clearAllMocks();
    });
    
    it('calls createAccount Apex method on submit', async () => {
        // Mock Apex
        createAccount.mockResolvedValue({
            Id: '0012800000',
            Name: 'Test Account',
            Industry: 'Technology'
        });
        
        const element = createElement('c-create-account-form', {
            is: CreateAccountForm
        });
        document.body.appendChild(element);
        
        // Set form values
        element.accountName = 'Test Account';
        element.industry = 'Technology';
        
        // Click submit
        const submitButton = element.shadowRoot.querySelector('lightning-button[label="Submit"]');
        submitButton.click();
        
        // Wait for async operation
        await Promise.resolve();
        
        // Verify Apex was called
        expect(createAccount).toHaveBeenCalledTimes(1);
        expect(createAccount).toHaveBeenCalledWith({
            name: 'Test Account',
            industry: 'Technology'
        });
    });
    
    it('displays error when Apex call fails', async () => {
        // Mock error
        const mockError = {
            body: {
                message: 'Name is required'
            }
        };
        createAccount.mockRejectedValue(mockError);
        
        const element = createElement('c-create-account-form', {
            is: CreateAccountForm
        });
        document.body.appendChild(element);
        
        // Click submit
        const submitButton = element.shadowRoot.querySelector('lightning-button[label="Submit"]');
        submitButton.click();
        
        // Wait for async operation
        await Promise.resolve();
        
        // Verify error displayed
        const errorElement = element.shadowRoot.querySelector('.error-message');
        expect(errorElement).not.toBeNull();
        expect(errorElement.textContent).toContain('Name is required');
    });
});
```

---

## 🧪 Part 6: Testing Chart.js Integration

### Testing Chart Initialization

```javascript
describe('c-revenue-chart', () => {
    it('initializes chart when data is provided', () => {
        const chartData = {
            labels: ['Jan', 'Feb', 'Mar'],
            datasets: [{
                label: 'Revenue',
                data: [1000, 2000, 3000]
            }]
        };
        
        const element = createElement('c-revenue-chart', {
            is: RevenueChart
        });
        element.chartData = chartData;
        document.body.appendChild(element);
        
        return Promise.resolve().then(() => {
            // Verify canvas element exists
            const canvas = element.shadowRoot.querySelector('canvas');
            expect(canvas).not.toBeNull();
        });
    });
    
    it('does not initialize chart without data', () => {
        const element = createElement('c-revenue-chart', {
            is: RevenueChart
        });
        document.body.appendChild(element);
        
        return Promise.resolve().then(() => {
            // Verify no canvas
            const canvas = element.shadowRoot.querySelector('canvas');
            expect(canvas).toBeNull();
        });
    });
});
```

### Testing Chart Interactions

```javascript
describe('c-revenue-chart', () => {
    it('dispatches chartclick event when chart is clicked', () => {
        const chartData = {
            labels: ['Jan', 'Feb', 'Mar'],
            datasets: [{
                label: 'Revenue',
                data: [1000, 2000, 3000]
            }]
        };
        
        const element = createElement('c-revenue-chart', {
            is: RevenueChart
        });
        element.chartData = chartData;
        document.body.appendChild(element);
        
        // Mock event handler
        const handler = jest.fn();
        element.addEventListener('chartclick', handler);
        
        return Promise.resolve().then(() => {
            // Simulate chart click
            element.handleChartClick(0);
            
            // Verify event dispatched
            expect(handler).toHaveBeenCalledWith(
                expect.objectContaining({
                    detail: expect.objectContaining({
                        month: 'Jan',
                        value: 1000
                    })
                })
            );
        });
    });
});
```

---

## 🎯 Part 7: Week 3 Review

### Week 3 Key Concepts

#### Day 1-2: LWC Basics & @wire
- LWC architecture and component structure
- Decorators (@api, @track, @wire)
- Lightning Data Service
- Component lifecycle hooks
- Creating first LWC component

#### Day 3-4: Events & Communication
- Custom events
- Event bubbling and composition
- Parent-child communication
- Lightning layouts
- User interactions

#### Day 5-6: Apex Integration & Chart.js
- Calling Apex from LWC
- @wire with Apex
- Imperative Apex calls
- Error handling
- Chart.js integration
- Loading external libraries

#### Day 7: Testing & Review
- Jest testing framework
- Unit testing LWC
- Testing @wire services
- Testing Apex integration
- Code coverage

### Week 3 Practice Scenarios

#### Scenario 1: Complete Revenue Dashboard

Build a complete revenue dashboard with:
1. **RevenueChart Component** - Chart.js visualization
2. **FilterControls Component** - Date range, region filters
3. **SummaryCards Component** - Total, average, growth metrics
4. **RevenueDetails Component** - Detailed view on chart click
5. **Apex Controller** - Get revenue data with aggregates

**Requirements:**
- Use @wire for data fetching
- Implement filter change events
- Handle loading and error states
- Make responsive design
- Write unit tests

#### Scenario 2: Contact Management System

Create a contact management system with:
1. **ContactList Component** - Display contacts with search
2. **ContactForm Component** - Create/edit contact
3. **ContactDetail Component** - View contact details
4. **Apex Controller** - CRUD operations

**Requirements:**
- Implement CRUD operations
- Use imperative Apex calls
- Handle form validation
- Show success/error messages
- Write comprehensive tests

#### Scenario 3: Interactive Data Visualization

Create interactive charts with:
1. **MultiChart Component** - Multiple chart types
2. **ChartConfig Component** - Configure chart options
3. **DataExporter Component** - Export chart data
4. **Apex Controller** - Complex data queries

**Requirements:**
- Support multiple chart types (bar, line, pie)
- Dynamic data loading
- Export functionality
- Responsive design
- Full test coverage

---

## ✅ Week 3 Checklist

### Day 7: Testing & Review
- [ ] Created Jest test files
- [ ] Tested basic component rendering
- [ ] Tested user interactions
- [ ] Tested @wire services
- [ ] Tested Apex integration
- [ ] Achieved 75%+ code coverage
- [ ] Reviewed Week 3 concepts
- [ ] Completed practice scenarios

### Week 3 Overall Progress
- [ ] LWC Basics & @wire (Day 1-2)
- [ ] Events & Communication (Day 3-4)
- [ ] Apex Integration & Chart.js (Day 5-6)
- [ ] Testing & Review (Day 7)
- [ ] Week 3 Review completed

---

## 🎓 Trailhead Modules

Complete these modules for deeper understanding:
- [ ] **Testing Lightning Web Components** - https://trailhead.salesforce.com/content/learn/modules/lwc_jest_testing
- [ ] **Create and Use Wire Adapters** - https://trailhead.salesforce.com/content/learn/modules/lwc_create_wire_adapters
- [ ] **Call Apex Methods** - https://trailhead.salesforce.com/content/learn/modules/lwc_call_apex

---

## 📚 Next Steps

Sau khi hoàn thành Week 3:
1. ✅ Practice LWC development patterns
2. ✅ Build real-world components
3. ✅ Master Apex integration
4. ✅ Write comprehensive tests
5. ✅ Prepare for Week 4: Exam Preparation

---

## 🎉 Week 3 Completion Summary

Congratulations on completing Week 3! You've learned:

**Skills Mastered:**
- ✅ LWC component architecture
- ✅ Component communication patterns
- ✅ Lightning Data Service
- ✅ Apex integration
- ✅ Third-party library integration
- ✅ Unit testing for LWC

**Projects Completed:**
- ✅ Multiple LWC components
- ✅ Custom events and communication
- ✅ Apex integration with @wire and imperative calls
- ✅ Chart.js visualizations
- ✅ Comprehensive test suites

**Ready For:**
- ✅ Platform Developer I exam topics
- ✅ Week 4: Exam preparation
- ✅ Real-world LWC development
- ✅ Building complex applications

---

**Tiếp tục:** [Week 4: Exam Preparation](/learn-salesforce/docs/week4)

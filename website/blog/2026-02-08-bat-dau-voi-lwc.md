---
slug: bat-dau-voi-lwc
title: "Bắt đầu với LWC: Những gì tôi học được trong Tuần 3"
authors: [hoclai]
tags: [tuan-3, lwc, frontend, javascript, bat-dau]
---

Tuần 3 là khi tôi khám phá **Lightning Web Components (LWC)** - công nghệ hiện đại nhất của Salesforce để xây dựng giao diện người dùng. LWC sử dụng web standards (HTML, CSS, JavaScript) và rất khác biệt với các framework cũ như Visualforce hay Aura.

## 🎯 LWC là gì?

LWC (Lightning Web Component) là:
- **Lightweight**: Sử dụng web standards, không cần framework nặng
- **Modern**: Dựa trên các web standards mới nhất
- **Secure**: Theo Salesforce security model
- **Fast**: Tối ưu hiệu năng, load nhanh

### LWC vs Aura vs Visualforce

```
┌─────────────────────────────────────────────────┐
│         Salesforce UI Technologies              │
├─────────────────────────────────────────────────┤
│ Visualforce (2005)                              │
│ - Server-side rendering                         │
│ - VF pages + Apex controllers                  │
│ - Legacy, không khuyến nghị cho projects mới    │
├─────────────────────────────────────────────────┤
│ Aura Components (2014)                         │
│ - Client-side, component-based                  │
│ - Framework riêng của Salesforce               │
│ - Được hỗ trợ nhưng không phải focus           │
├─────────────────────────────────────────────────┤
│ Lightning Web Components (2018) ✅ RECOMMENDED │
│ - Web standards (Custom Elements)              │
│ - Modern JavaScript (ES6+)                     │
│ - Lightning Data Service                        │
│ - Tương thích với Aura                          │
└─────────────────────────────────────────────────┘
```

## 📁 Cấu trúc của một LWC Component

Một LWC component bao gồm 3 files chính:

```
myComponent/
├── myComponent.html       # Template (HTML)
├── myComponent.js         # Controller (JavaScript)
└── myComponent.css        # Styles (CSS - optional)
```

### Ví dụ: Hello World Component

**myComponent.html**
```html
<template>
    <lightning-card title="Hello World" icon-name="standard:account">
        <div class="slds-m-around_medium">
            <p>Xin chào, {greeting}!</p>
            <lightning-button 
                label="Click Me" 
                onclick={handleClick}>
            </lightning-button>
        </div>
    </lightning-card>
</template>
```

**myComponent.js**
```javascript
import { LightningElement, track } from 'lwc';

export default class MyComponent extends LightningElement {
    @track greeting = 'Salesforce Developer';
    
    handleClick() {
        this.greeting = 'Button clicked!';
    }
}
```

**myComponent.css**
```css
p {
    color: #0070d2;
    font-size: 18px;
    font-weight: bold;
}
```

## 🔑 Các khái niệm quan trọng trong LWC

### 1. Reactive Properties

Sử dụng `@track` và `@api` để tạo reactive properties.

```javascript
import { LightningElement, track, api } from 'lwc';

export default class ReactiveExample extends LightningElement {
    // @track: Property tự động re-render khi thay đổi
    @track counter = 0;
    
    // @api: Public property, có thể nhận từ parent
    @api title = 'Default Title';
    
    increment() {
        this.counter++; // Tự động re-render UI
    }
}
```

**Lưu ý**: Trong các version mới của LWC, tất cả properties đều reactive, `@track` không còn cần thiết.

### 2. Lifecycle Hooks

LWC có các lifecycle hooks để quản lý component lifecycle:

```javascript
import { LightningElement } from 'lwc';

export default class LifecycleExample extends LightningElement {
    constructor() {
        super();
        console.log('Constructor called');
    }
    
    connectedCallback() {
        // Chạy khi component được thêm vào DOM
        console.log('Component connected');
        // Tốt cho: Load data, subscribe to events
    }
    
    disconnectedCallback() {
        // Chạy khi component được xóa khỏi DOM
        console.log('Component disconnected');
        // Tốt cho: Cleanup, unsubscribe
    }
    
    renderedCallback() {
        // Chạy mỗi khi component re-renders
        console.log('Component rendered');
        // Cẩn thận: Có thể gây infinite loop nếu không cẩn thận
    }
    
    errorCallback(error, stack) {
        // Chạy khi có error trong component
        console.error('Error:', error);
    }
}
```

### 3. Communication giữa Components

#### Parent to Child (sử dụng properties)

**ParentComponent.html**
```html
<template>
    <c-child-component title="Hello from Parent"></c-child-component>
</template>
```

**ChildComponent.js**
```javascript
import { LightningElement, api } from 'lwc';

export default class ChildComponent extends LightningElement {
    @api title; // Nhận title từ parent
}
```

#### Child to Parent (sử dụng Custom Events)

**ChildComponent.js**
```javascript
import { LightningElement } from 'lwc';

export default class ChildComponent extends LightningElement {
    handleClick() {
        // Create custom event
        const selectedEvent = new CustomEvent('itemselected', {
            detail: { itemId: '123', itemName: 'My Item' }
        });
        
        // Dispatch event
        this.dispatchEvent(selectedEvent);
    }
}
```

**ParentComponent.js**
```javascript
import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    handleItemSelected(event) {
        const itemId = event.detail.itemId;
        const itemName = event.detail.itemName;
        console.log(`Selected: ${itemName} (${itemId})`);
    }
}
```

**ParentComponent.html**
```html
<template>
    <c-child-component onitemselected={handleItemSelected}></c-child-component>
</template>
```

#### Sibling Components (sử dụng Lightning Message Service)

```javascript
// Component A gửi message
import { publish, MessageContext } from 'lightning/messageService';
import myMessageChannel from '@salesforce/messageChannel/MyMessageChannel__c';

export default class ComponentA extends LightningElement {
    @wire(MessageContext) messageContext;
    
    sendMessage() {
        publish(this.messageContext, myMessageChannel, {
            recordId: '001xx000003DGb2AAG',
            message: 'Hello from Component A'
        });
    }
}

// Component B nhận message
import { subscribe, MessageContext, unsubscribe } from 'lightning/messageService';
import myMessageChannel from '@salesforce/messageChannel/MyMessageChannel__c';

export default class ComponentB extends LightningElement {
    @wire(MessageContext) messageContext;
    subscription;
    
    connectedCallback() {
        this.subscribeToMessageChannel();
    }
    
    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            myMessageChannel,
            (message) => this.handleMessage(message)
        );
    }
    
    handleMessage(message) {
        console.log('Received:', message.message);
    }
    
    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}
```

## 📊 Lightning Data Service (LDS)

LDS cho phép bạn truy cập và manipulate Salesforce data mà không cần Apex controller.

### wire service với LDS

```javascript
import { LightningElement, wire, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ACCOUNT_ID from '@salesforce/schema/Account.Id';

const FIELDS = [ACCOUNT_NAME_FIELD, ACCOUNT_INDUSTRY_FIELD];

export default class AccountViewer extends LightningElement {
    @track accountId = '001xx000003DGb2AAG'; // Hardcoded hoặc từ URL
    
    @wire(getRecord, { recordId: '$accountId', fields: FIELDS })
    account;
    
    get name() {
        return getFieldValue(this.account.data, ACCOUNT_NAME_FIELD);
    }
    
    get industry() {
        return getFieldValue(this.account.data, ACCOUNT_INDUSTRY_FIELD);
    }
}
```

**accountViewer.html**
```html
<template>
    <lightning-card title="Account Details">
        <div class="slds-m-around_medium">
            <template if:true={account.data}>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Industry:</strong> {industry}</p>
            </template>
            
            <template if:true={account.error}>
                <p>Error loading account data</p>
            </template>
        </div>
    </lightning-card>
</template>
```

### Imperative LDS methods

```javascript
import { LightningElement, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';

export default class AccountCreator extends LightningElement {
    accountName = '';
    
    handleNameChange(event) {
        this.accountName = event.target.value;
    }
    
    createAccount() {
        const fields = {};
        fields[ACCOUNT_NAME_FIELD.fieldApiName] = this.accountName;
        
        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
        
        createRecord(recordInput)
            .then(account => {
                console.log('Account created:', account.id);
                // Show success message
            })
            .catch(error => {
                console.error('Error creating account:', error);
                // Show error message
            });
    }
}
```

## 🎨 Lightning Design System (SLDS)

Salesforce cung cấp Lightning Design System với các components và styles đã được thiết kế sẵn.

### Sử dụng Lightning Components

```html
<template>
    <!-- Card -->
    <lightning-card title="Account Information">
        <!-- Input fields -->
        <lightning-input 
            label="Account Name" 
            value={accountName}
            onchange={handleNameChange}>
        </lightning-input>
        
        <!-- Button -->
        <lightning-button 
            variant="brand"
            label="Save"
            onclick={handleSave}>
        </lightning-button>
        
        <!-- DataTable -->
        <lightning-datatable
            key-field="id"
            data={data}
            columns={columns}>
        </lightning-datatable>
    </lightning-card>
</template>
```

## 🔗 Integration với Apex

Khi LDS không đủ, bạn có thể gọi Apex methods từ LWC.

### Apex Controller

```apex
public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String industry) {
        return [SELECT Id, Name, Industry, AnnualRevenue 
                FROM Account 
                WHERE Industry = :industry 
                LIMIT 10];
    }
    
    @AuraEnabled
    public static Account createAccount(Account acc) {
        insert acc;
        return acc;
    }
}
```

### LWC Component

```javascript
import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import createAccount from '@salesforce/apex/AccountController.createAccount';

export default class AccountManager extends LightningElement {
    @track industry = 'Technology';
    @track accounts = [];
    @track error;
    
    // Wire service
    @wire(getAccounts, { industry: '$industry' })
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.accounts = undefined;
        }
    }
    
    // Imperative call
    handleCreateAccount() {
        const acc = {
            Name: 'New Account',
            Industry: this.industry
        };
        
        createAccount({ acc: acc })
            .then(result => {
                console.log('Account created:', result.Id);
                // Refresh data
                refreshApex(this.wiredAccounts);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}
```

## 💡 Best Practices tôi học được

### 1. Tách logic khỏi template

```javascript
// ❌ BAD: Logic trong template
<template>
    <p>{account.Industry === 'Technology' ? 'Tech' : 'Other'}</p>
</template>

// ✅ GOOD: Sử dụng getter
<template>
    <p>{industryLabel}</p>
</template>

// Trong .js file
get industryLabel() {
    return this.account.Industry === 'Technology' ? 'Tech' : 'Other';
}
```

### 2. Sử dụng template conditionals thay vì JS conditionals

```html
<template>
    <!-- ✅ GOOD: Sử dụng if:true/if:false -->
    <template if:true={showMessage}>
        <p>This is shown when showMessage is true</p>
    </template>
    
    <template if:false={showMessage}>
        <p>This is shown when showMessage is false</p>
    </template>
</template>
```

### 3. Tránh trực tiếp manipulate DOM

```javascript
// ❌ BAD: Manipulate DOM trực tiếp
handleClick() {
    const element = this.template.querySelector('.my-element');
    element.style.display = 'none';
}

// ✅ GOOD: Sử dụng reactive property
handleClick() {
    this.isVisible = false;
}
```

```html
<template>
    <div class="my-element" if:true={isVisible}>
        Content here
    </div>
</template>
```

### 4. Handle lỗi một cách graceful

```javascript
@wire(getData)
wiredData({ error, data }) {
    if (data) {
        this.data = data;
        this.error = undefined;
    } else if (error) {
        this.data = undefined;
        this.error = error;
        console.error('Error loading data:', error);
    }
}
```

## 🧪 Testing LWC với Jest

```javascript
// accountViewer.test.js
import { createElement } from 'lwc';
import AccountViewer from 'c/accountViewer';

describe('c-account-viewer', () => {
    it('displays account name when data is loaded', () => {
        // Create element
        const element = createElement('c-account-viewer', {
            is: AccountViewer
        });
        document.body.appendChild(element);
        
        // Emit mock data
        const mockGetRecord = require('./data/getAccount.json');
        getRecord.emit(mockGetRecord);
        
        // Return a promise to wait for reactive updates
        return Promise.resolve().then(() => {
            const nameElement = element.shadowRoot.querySelector('p');
            expect(nameElement.textContent).toBe(mockGetRecord.fields.Name.value);
        });
    });
});
```

## 📈 Kết quả Tuần 3

Sau Tuần 3, tôi đã hoàn thành:

- ✅ **8 LWC Components** với chức năng khác nhau
- ✅ **Revenue Dashboard** với Chart.js integration
- ✅ **Lightning Data Service** cho data access
- ✅ **Apex integration** cho complex logic
- ✅ **5 Jest Tests** với 80%+ coverage
- ✅ **Event communication** giữa components
- ✅ **SLDS components** cho UI đẹp

## 💭 Những bài học quan trọng

1. **Think in components**: Chia nhỏ UI thành các components có thể tái sử dụng.
2. **LDS first**: Sử dụng Lightning Data Service trước khi viết Apex.
3. **Reactive programming**: Hiểu rõ khi nào data thay đổi và UI re-renders.
4. **Test your components**: Jest tests giúp đảm bảo quality.
5. **Learn SLDS**: Lightning Design System giúp UI đẹp và consistent.

## 🚀 Chuẩn bị cho Tuần 4

Tuần 4 là giai đoạn quan trọng nhất - **Luyện thi và Intensive Review**. Tôi sẽ:
- Làm 500+ câu hỏi practice
- Học sâu về Governor Limits
- Tạo exam cheat sheets
- Làm 3+ practice exams

---

**Bài viết tiếp theo**: [Xây dựng Dashboard Doanh thu với Chart.js](#) (coming soon)

Bạn có câu hỏi gì về LWC? Hãy để lại bình luận bên dưới! 💬

**Tags**: #Salesforce #PlatformDeveloperI #LWC #Lightning #Frontend #JavaScript
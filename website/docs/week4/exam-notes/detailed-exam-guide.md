# Week 4: Detailed Exam Guide

## 📚 Platform Developer I Certification - Complete Guide

### Exam Overview

| Detail | Value |
|--------|-------|
| **Exam Name** | Salesforce Platform Developer I |
| **Exam Code** | PD-I |
| **Duration** | 105 minutes |
| **Number of Questions** | 60 multiple-choice |
| **Passing Score** | 65% (39 correct answers) |
| **Registration** | Webassessor.com |
| **Cost** | $200 USD |
| **Retake Policy** | Wait 2 weeks after 1st fail, 14 days after 2nd fail |

---

## 📖 Section 1: Salesforce Fundamentals (8%)

### Key Concepts

#### 1.1 Salesforce Platform Overview

**Cloud Service Models:**
- **Sales Cloud:** Sales automation, opportunity management
- **Service Cloud:** Customer service, case management
- **Marketing Cloud:** Marketing campaigns, customer journeys
- **Commerce Cloud:** E-commerce platform
- **Experience Cloud:** Customer/partner portals

**Multi-Tenant Architecture:**
- Shared infrastructure with dedicated org data
- Automatic updates and upgrades
- Governor limits ensure fair resource usage
- No need for server maintenance

**Metadata-Driven Architecture:**
- Metadata describes org configuration
- Customizations stored as metadata
- Metadata API for programmatic access
- Enables deployment across environments

#### 1.2 Application Lifecycle

**Development Environments:**
1. **Developer Org:** Free, full-featured org
2. **Sandbox:** Copy of production org
   - Developer Sandbox: Full metadata, minimal data
   - Developer Pro Sandbox: Full metadata, up to 500MB data
   - Partial Copy Sandbox: Full metadata, up to 5GB data
   - Full Sandbox: Full metadata and data

**Development Tools:**
- **Developer Console:** Built-in IDE for org
- **VS Code with SFDX:** Modern development experience
- **Force.com IDE:** Eclipse-based (legacy)
- **Metadata API:** Programmatic access

**Deployment Methods:**
- **Change Sets:** GUI-based, between connected orgs
- **SFDX CLI:** Command-line, source-based
- **Ant Migration Tool:** XML-based, scriptable
- **Metadata API:** Programmatic, flexible

#### 1.3 Data Model Basics

**Standard Objects:**
- Account, Contact, Opportunity, Case
- Lead, Campaign, Product, Pricebook
- User, Profile, PermissionSet

**Custom Objects:**
- Created by developers
- Can have relationships to standard/custom objects
- Support custom fields, validation rules, automation

**Object Relationships:**
- **Master-Detail:** Parent-child, required parent, cascade delete
- **Lookup:** Optional parent, no cascade delete
- **Many-to-Many:** Junction object with two master-detail relationships
- **Hierarchy:** Self-referential lookup (e.g., Account Parent)

### Common Exam Questions

**Q1:** Which deployment method allows deployment from a non-Salesforce environment?
- A) Change Sets
- B) SFDX CLI
- C) Ant Migration Tool
- D) All of the above

**Answer:** C) Ant Migration Tool
**Reasoning:** Ant Migration Tool works from external systems. Change Sets and SFDX CLI require Salesforce environments.

**Q2:** What is the key benefit of multi-tenant architecture?
- A) Complete isolation of each customer
- B) Shared infrastructure with automatic updates
- C) Unlimited customization without restrictions
- D) No need for governor limits

**Answer:** B) Shared infrastructure with automatic updates
**Reasoning:** Multi-tenant architecture shares resources while isolating data, enabling automatic updates.

### Study Checklist
- [ ] Understand multi-tenant architecture implications
- [ ] Know different sandbox types and use cases
- [ ] Compare deployment methods and when to use each
- [ ] Understand metadata-driven architecture
- [ ] Know standard objects and their relationships

---

## 📊 Section 2: Data Modeling & Management (20%)

### Key Concepts

#### 2.1 Object Relationships

**Master-Detail Relationships:**
```apex
// Master-Detail Example: OpportunityLineItem to Opportunity
// - Cannot exist without parent
// - Inherits sharing from parent
// - Cascade delete enabled
// - Roll-up summary fields available

// Correct usage
Opportunity opp = [SELECT Id FROM Opportunity LIMIT 1];
OpportunityLineItem item = new OpportunityLineItem(
    OpportunityId = opp.Id,  // Required
    Quantity = 5,
    TotalPrice = 100
);
insert item;
```

**Lookup Relationships:**
```apex
// Lookup Example: Contact to Account
// - Can exist without parent (if optional)
// - Does not inherit sharing
// - No cascade delete
// - No roll-up summary

// Correct usage
Contact con = new Contact(
    FirstName = 'John',
    LastName = 'Doe'
    // AccountId is optional
);
insert con;
```

**Junction Object Pattern:**
```apex
// Many-to-Many Example: Student ↔ Course
// Junction Object: Enrollment
// Fields: Student__c (MD to Student), Course__c (MD to Course)

public class EnrollmentService {
    public static void enrollStudent(Id studentId, Id courseId) {
        Enrollment__c enrollment = new Enrollment__c(
            Student__c = studentId,
            Course__c = courseId
        );
        insert enrollment;
    }
}
```

#### 2.2 Field Types

**Standard Field Types:**
- **Text:** Up to 255 characters
- **TextArea:** Up to 255 characters (multi-line)
- **Long TextArea:** Up to 131,072 characters (no filter/sort)
- **RichTextArea:** Formatted text with images
- **Number:** Decimal values
- **Currency:** Number with currency symbol
- **Percent:** Number with percent sign
- **Email:** Valid email format
- **Phone:** Phone number format
- **Date:** Date only
- **DateTime:** Date and time
- **Checkbox:** Boolean (true/false)
- **Picklist:** Predefined values (single select)
- **Multi-Select Picklist:** Multiple predefined values
- **Formula:** Calculated value from other fields

**Complex Field Types:**
- **Geolocation:** Latitude and longitude
- **Encrypted Text:** Encrypted data
- **External Lookup:** Relationship to external data
- **Indirect Lookup:** Relationship to external data without external ID

#### 2.3 Data Integrity

**Validation Rules:**
```apex
// Example: Email must contain @
// Error Condition Formula:
NOT(CONTAINS(Email, "@"))

// Example: Opportunity close date cannot be in past
// Error Condition Formula:
CloseDate < TODAY()

// Example: Account must have industry
// Error Condition Formula:
ISBLANK(Industry)
```

**Field Dependencies:**
- **Controlling Field:** Picklist that controls options
- **Dependent Field:** Picklist with filtered options
- **Example:** Country → State/Province

**Record Types:**
- Different business processes for same object
- Different page layouts
- Different picklist values
- Example: "Business Account" vs "Person Account"

#### 2.4 Data Migration

**Import Tools:**
- **Data Loader:** Bulk data import/export
- **Import Wizard:** Web-based, up to 50,000 records
- **Data Import:** UI-based, simple imports

**Export Tools:**
- **Data Loader:** Bulk export
- **Export All:** Records and relationships
- **Report Export:** Filtered data export

**External IDs:**
- Unique identifier for external systems
- Enables upsert operations
- Improves data loading performance
```apex
// Upsert using External ID
Account acc = new Account(
    External_Id__c = 'EXT123',
    Name = 'Test Account'
);
upsert acc Account.Fields.External_Id__c;
```

### Common Exam Questions

**Q3:** Which relationship type allows roll-up summary fields?
- A) Lookup
- B) Master-Detail
- C) External Lookup
- D) Indirect Lookup

**Answer:** B) Master-Detail
**Reasoning:** Roll-up summary fields are only available on Master-Detail relationships.

**Q4:** What happens when a master record is deleted in a Master-Detail relationship?
- A) Child records are orphaned
- B) Child records are deleted (cascade delete)
- C) Child records are moved to another master
- D) Error is thrown

**Answer:** B) Child records are deleted (cascade delete)
**Reasoning:** Master-Detail relationships have cascade delete enabled by default.

**Q5:** Which field type cannot be used in SOQL WHERE clause?
- A) Long TextArea
- B) RichTextArea
- C) Both A and B
- D) None of the above

**Answer:** C) Both A and B
**Reasoning:** Long TextArea and RichTextArea cannot be used in WHERE, ORDER BY, or GROUP BY clauses.

### Study Checklist
- [ ] Master object relationships and their differences
- [ ] Understand all field types and limitations
- [ ] Know validation rules and field dependencies
- [ ] Understand record types and business processes
- [ ] Know data import/export tools
- [ ] Understand external IDs and upsert operations

---

## 🤖 Section 3: Process Automation & Business Logic (27%)

### Key Concepts

#### 3.1 Workflow Rules vs Process Builder vs Flow

**Feature Comparison:**

| Feature | Workflow Rules | Process Builder | Flow |
|---------|----------------|----------------|------|
| Record Updates | ✅ | ✅ | ✅ |
| Email Alerts | ✅ | ✅ | ✅ |
| Tasks | ✅ | ✅ | ✅ |
| Field Updates | ✅ | ✅ | ✅ |
| Outbound Messages | ✅ | ❌ | ❌ |
| Multiple Actions | ❌ | ✅ | ✅ |
| Complex Logic | ❌ | ✅ | ✅ |
| Loops | ❌ | ❌ | ✅ |
| Callouts | ❌ | ❌ | ✅ |
| Create Records | ❌ | ✅ | ✅ |
| Delete Records | ❌ | ✅ | ✅ |

**When to Use Each:**

**Workflow Rules (Legacy):**
- Simple field updates
- Email alerts
- Tasks
- Outbound messages
- Only on create/update

**Process Builder:**
- Record-triggered (create/update)
- More complex logic
- Multiple actions
- No loops

**Flow:**
- Complex business logic
- Multiple objects
- Loops
- Callouts
- Screen flows (user interaction)
- Schedule-triggered flows
- Record-triggered flows
- Platform event-triggered flows

#### 3.2 Apex Triggers

**Trigger Context Variables:**
```apex
trigger AccountTrigger on Account (before insert, before update) {
    // Trigger.new - List of new records (insert, update, undelete)
    // Trigger.old - List of old records (update, delete)
    // Trigger.newMap - Map of new records
    // Trigger.oldMap - Map of old records
    // Trigger.isInsert - Boolean
    // Trigger.isUpdate - Boolean
    // Trigger.isDelete - Boolean
    // Trigger.isBefore - Boolean
    // Trigger.isAfter - Boolean
    // Trigger.size - Number of records
    // Trigger.operationType - Enum (INSERT, UPDATE, etc.)
}
```

**Trigger Best Practices:**
```apex
// ❌ BAD: Logic in trigger
trigger AccountTrigger on Account (before insert, before update) {
    for (Account acc : Trigger.new) {
        acc.Name = acc.Name.toUpperCase();
    }
}

// ✅ GOOD: Logic in handler class
trigger AccountTrigger on Account (before insert, before update) {
    AccountTriggerHandler.handle(Trigger.new, Trigger.oldMap);
}

public class AccountTriggerHandler {
    public static void handle(List<Account> newAccounts, Map<Id, Account> oldMap) {
        for (Account acc : newAccounts) {
            acc.Name = acc.Name.toUpperCase();
        }
    }
}
```

**Bulkify Triggers:**
```apex
// ❌ BAD: SOQL inside loop
trigger ContactTrigger on Contact (after insert) {
    for (Contact con : Trigger.new) {
        Account acc = [SELECT Id, Name FROM Account WHERE Id = :con.AccountId];
        // Process account...
    }
}

// ✅ GOOD: Bulkified
trigger ContactTrigger on Contact (after insert) {
    Set<Id> accountIds = new Set<Id>();
    for (Contact con : Trigger.new) {
        accountIds.add(con.AccountId);
    }
    
    Map<Id, Account> accounts = new Map<Id, Account>(
        [SELECT Id, Name FROM Account WHERE Id IN :accountIds]
    );
    
    for (Contact con : Trigger.new) {
        Account acc = accounts.get(con.AccountId);
        // Process account...
    }
}
```

#### 3.3 Apex Classes

**Access Modifiers:**
```apex
// public - Accessible from anywhere
public class PublicClass {
    public void publicMethod() {}
}

// private - Accessible only within class
public class PrivateExample {
    private void privateMethod() {}
}

// protected - Accessible within class and subclasses
public class ProtectedExample {
    protected void protectedMethod() {}
}

// global - Accessible from anywhere, including external systems
global class GlobalExample {
    global void globalMethod() {}
}
```

**Sharing Keywords:**
```apex
// with sharing - Enforces sharing rules
public with sharing class SharingClass {
    // Query respects user's record access
    public List<Account> getAccounts() {
        return [SELECT Id, Name FROM Account];
    }
}

// without sharing - Bypasses sharing rules
public without sharing class NoSharingClass {
    // Query ignores user's record access
    public List<Account> getAllAccounts() {
        return [SELECT Id, Name FROM Account];
    }
}

// inherited sharing - Inherits sharing from caller
public inherited sharing class InheritedSharingClass {
    // Query respects caller's sharing context
}
```

#### 3.4 Testing

**Test Class Structure:**
```apex
@isTest
private class AccountTriggerHandlerTest {
    
    @testSetup
    static void setup() {
        // Create test data
        List<Account> accounts = new List<Account>();
        for (Integer i = 0; i < 100; i++) {
            accounts.add(new Account(
                Name = 'Test Account ' + i,
                Industry = 'Technology'
            ));
        }
        insert accounts;
    }
    
    @isTest
    static void testAccountUpdate() {
        // Start test to reset limits
        Test.startTest();
        
        // Get test data
        Account acc = [SELECT Id, Name FROM Account LIMIT 1];
        acc.Name = 'Updated Account';
        update acc;
        
        // Stop test
        Test.stopTest();
        
        // Verify results
        Account updatedAcc = [SELECT Name FROM Account WHERE Id = :acc.Id];
        System.assertEquals('Updated Account', updatedAcc.Name);
    }
    
    @isTest
    static void testBulkUpdate() {
        Test.startTest();
        
        // Bulk update
        List<Account> accounts = [SELECT Id, Name FROM Account LIMIT 50];
        for (Account acc : accounts) {
            acc.Name = acc.Name + ' - Updated';
        }
        update accounts;
        
        Test.stopTest();
        
        // Verify
        Integer updatedCount = [SELECT COUNT() FROM Account WHERE Name LIKE '%Updated%'];
        System.assertEquals(50, updatedCount);
    }
}
```

### Common Exam Questions

**Q6:** Which automation tool should be used for complex logic with loops?
- A) Workflow Rules
- B) Process Builder
- C) Flow
- D) Apex Triggers

**Answer:** C) Flow
**Reasoning:** Flow supports loops and complex business logic. Workflow Rules and Process Builder don't support loops.

**Q7:** What is the purpose of `Test.startTest()` and `Test.stopTest()`?
- A) To measure test execution time
- B) To separate test execution limits
- C) To run test in production
- D) To disable trigger execution

**Answer:** B) To separate test execution limits
**Reasoning:** Test.startTest() and Test.stopTest() reset governor limits and separate test execution.

**Q8:** Which sharing keyword enforces record-level security?
- A) with sharing
- B) without sharing
- C) inherited sharing
- D) All of the above

**Answer:** A) with sharing
**Reasoning:** `with sharing` enforces sharing rules. `without sharing` bypasses them. `inherited sharing` inherits from caller.

### Study Checklist
- [ ] Understand automation tool differences
- [ ] Know when to use each automation tool
- [ ] Master trigger context variables
- [ ] Practice bulkifying triggers
- [ ] Understand sharing keywords
- [ ] Know testing best practices
- [ ] Achieve 75% code coverage

---

## 🎨 Section 4: User Interface (14%)

### Key Concepts

#### 4.1 Lightning App Builder

**Lightning Pages:**
- **Home Page:** Dashboard-style home
- **Record Page:** Single record view
- **App Page:** Custom application page
- **Record Detail:** Standard detail page

**Lightning Components:**
- **Standard Components:** Provided by Salesforce
- **Custom Components:** Built by developers (LWC/Aura)
- **AppExchange Components:** Third-party components

**Page Layouts vs Lightning Pages:**
| Feature | Page Layout | Lightning Page |
|---------|-------------|----------------|
| Fields | ✅ | ✅ |
| Custom Buttons | ✅ | ❌ (use Lightning Actions) |
| Related Lists | ✅ | ✅ |
| Visualforce | ❌ | ✅ |
| Dynamic Forms | ❌ | ✅ |
| Component-based | ❌ | ✅ |

#### 4.2 Lightning Web Components (LWC)

**LWC Basics:**
```javascript
// Component JavaScript
import { LightningElement, api, track } from 'lwc';

export default class MyComponent extends LightningElement {
    @api recordId; // Public property
    @track privateProperty; // Reactive private property
    
    connectedCallback() {
        // Lifecycle: component inserted into DOM
    }
    
    renderedCallback() {
        // Lifecycle: component rendered
    }
    
    handleClick() {
        // Event handler
    }
}
```

**HTML Template:**
```html
<template>
    <lightning-card title="My Card" icon-name="standard:account">
        <div class="slds-p-around_medium">
            <lightning-input 
                label="Name" 
                value={name}
                onchange={handleChange}>
            </lightning-input>
            <lightning-button 
                label="Submit" 
                onclick={handleClick}>
            </lightning-button>
        </div>
    </lightning-card>
</template>
```

**Metadata Configuration:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>58.0</apiVersion>
    <isExposed>true</isExposed>
    <targets>
        <target>lightning__RecordPage</target>
        <target>lightning__AppPage</target>
        <target>lightningCommunity__Page</target>
    </targets>
    <targetConfigs>
        <targetConfig targets="lightning__RecordPage">
            <objects>
                <object>Account</object>
            </objects>
        </targetConfig>
    </targetConfigs>
</LightningComponentBundle>
```

#### 4.3 Aura Components (Legacy)

**Aura Component Structure:**
```apex
<!-- Component -->
<aura:component>
    <aura:attribute name="message" type="String" default="Hello"/>
    <lightning:button label="Click Me" onclick="{!c.handleClick}"/>
</aura:component>

<!-- Controller -->
({
    handleClick : function(component, event, helper) {
        var message = component.get("v.message");
        console.log(message);
    }
})
```

**LWC vs Aura:**
| Feature | LWC | Aura |
|---------|-----|------|
| Performance | ✅ Better | ⚠️ Slower |
| Modern Standards | ✅ ES6+ | ⚠️ Older |
| Simplicity | ✅ Simpler | ⚠️ Complex |
| Components Available | ✅ Growing | ⚠️ Limited |

#### 4.4 Lightning Data Service (LDS)

**LDS Adapters:**
```javascript
// getRecord - Get single record
import { getRecord } from 'lightning/uiRecordApi';

// getRecords - Get multiple records
import { getRecords } from 'lightning/uiRecordApi';

// createRecord - Create record
import { createRecord } from 'lightning/uiRecordApi';

// updateRecord - Update record
import { updateRecord } from 'lightning/uiRecordApi';

// deleteRecord - Delete record
import { deleteRecord } from 'lightning/uiRecordApi';
```

**Example: Get Record with @wire:**
```javascript
import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';

export default class AccountDetail extends LightningElement {
    @api recordId;
    
    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD] })
    account;
    
    get name() {
        return getFieldValue(this.account.data, NAME_FIELD);
    }
}
```

### Common Exam Questions

**Q9:** Which component framework is recommended for new development?
- A) Aura
- B) Lightning Web Components
- C) Visualforce
- D) Classic

**Answer:** B) Lightning Web Components
**Reasoning:** LWC is the modern, recommended framework for new development.

**Q10:** What is the purpose of Lightning Data Service?
- A) To create custom REST APIs
- B) To provide data access without Apex
- C) To style Lightning pages
- D) To create custom objects

**Answer:** B) To provide data access without Apex
**Reasoning:** LDS provides data access to Salesforce data without writing Apex code.

### Study Checklist
- [ ] Understand Lightning App Builder
- [ ] Know Lightning page types
- [ ] Master LWC basics
- [ ] Understand Lightning Data Service
- [ ] Know Aura components (legacy)
- [ ] Understand component lifecycle

---

## 🔒 Section 5: Security (12%)

### Key Concepts

#### 5.1 Object-Level Security

**Profiles:**
- Base level of access control
- One profile per user
- Control object CRUD access
- Control field-level security
- Control system permissions

**Permission Sets:**
- Additional permissions
- Multiple per user
- Used to grant specific access
- Flexible access management

```apex
// Check object access
if (Schema.sObjectType.Account.isAccessible()) {
    // Query Account
    List<Account> accounts = [SELECT Id, Name FROM Account];
}

// Check field access
if (Schema.sObjectType.Account.fields.Name.isAccessible()) {
    // Query Account.Name
    List<Account> accounts = [SELECT Id, Name FROM Account];
}

// Check CRUD access
if (Schema.sObjectType.Account.isUpdateable()) {
    // Update Account
    Account acc = new Account(Id = '001xx000003DGb2');
    acc.Name = 'Updated';
    update acc;
}
```

#### 5.2 Field-Level Security (FLS)

**FLS Enforcement:**
```apex
// Check field accessibility
public class AccountService {
    public static void updateAccountName(Id accountId, String name) {
        if (Schema.sObjectType.Account.fields.Name.isUpdateable()) {
            Account acc = new Account(Id = accountId, Name = name);
            update acc;
        } else {
            throw new SecurityException('No access to update Account.Name');
        }
    }
}
```

**FLS in LWC:**
```javascript
// FLS is automatically enforced by Lightning Data Service
// No manual checks needed for LDS operations
```

#### 5.3 Record-Level Security

**Organization-Wide Defaults (OWD):**
- Default sharing for entire org
- Can be: Private, Public Read Only, Public Read/Write
- Most restrictive baseline

**Sharing Rules:**
- Expand access (never restrict)
- Based on criteria or ownership
- Public Groups, Roles, Roles & Subordinates

**Manual Sharing:**
- Manual record sharing
- Using Apex or UI
- `Share` object in Apex

```apex
// Manual sharing example
AccountShare share = new AccountShare();
share.AccountId = '001xx000003DGb2';
share.UserOrGroupId = '005xx0000012';
share.AccountAccessLevel = 'Read';
share.RowCause = Schema.AccountShare.RowCause.Manual;
insert share;
```

**Apex Sharing Considerations:**
```apex
// with sharing enforces sharing
public with sharing class AccountService {
    public List<Account> getAccounts() {
        // Respects OWD and sharing rules
        return [SELECT Id, Name FROM Account];
    }
}

// without sharing bypasses sharing
public without sharing class AccountServiceAdmin {
    public List<Account> getAllAccounts() {
        // Ignores OWD and sharing rules
        return [SELECT Id, Name FROM Account];
    }
}
```

#### 5.4 User Security

**Login Flows:**
- Control post-login behavior
- Implement multi-factor authentication
- Redirect users based on criteria

**Session Settings:**
- Session timeout
- Session persistence
- Lockout periods

**Two-Factor Authentication:**
- SMS Authenticator
- Authenticator App
- Security Keys

### Common Exam Questions

**Q11:** What is the most restrictive baseline for record-level security?
- A) Sharing Rules
- B) Organization-Wide Defaults
- C) Manual Sharing
- D) Permission Sets

**Answer:** B) Organization-Wide Defaults
**Reasoning:** OWD is the baseline, most restrictive level. Sharing rules expand access, never restrict.

**Q12:** Which keyword in Apex enforces sharing rules?
- A) without sharing
- B) with sharing
- C) inherited sharing
- D) All keywords enforce sharing

**Answer:** B) with sharing
**Reasoning:** `with sharing` enforces sharing rules. `without sharing` bypasses them.

### Study Checklist
- [ ] Understand profiles and permission sets
- [ ] Know object-level security
- [ ] Master field-level security
- [ ] Understand record-level security
- [ ] Know sharing rules and manual sharing
- [ ] Understand Apex sharing keywords

---

## 🐛 Section 6: Debugging & Deployment (8%)

### Key Concepts

#### 6.1 Debugging

**Developer Console:**
- Execute anonymous Apex
- View debug logs
- Check system limits
- Query and edit records

**Debug Levels:**
- **DB:** Database operations
- **WF:** Workflow and processes
- **VALIDATION:** Validation rules
- **CALLOUT:** HTTP callouts
- **APEX_CODE:** Apex execution
- **APEX_PROFILING:** Code execution time

**System.debug()**
```apex
// Debug logging
System.debug('Starting process');
System.debug('Account name: ' + acc.Name);
System.debug('Debug levels: ' + Limits.getLimitQueries());
System.debug('Queries used: ' + Limits.getQueries());
```

**Debug Log Analysis:**
- Identify performance bottlenecks
- Check governor limit usage
- Trace code execution
- Identify errors

#### 6.2 Deployment

**Change Sets:**
- GUI-based deployment
- Between connected orgs
- Components only (no data)
- Simple and intuitive

**SFDX CLI:**
```bash
# Authorize org
sfdx force:auth:web:login -s

# Create project
sfdx force:project:create

# Retrieve metadata
sfdx force:source:retrieve -m "CustomObject:Account"

# Deploy metadata
sfdx force:source:deploy -p force-app

# Deploy to specific org
sfdx force:source:deploy -u orgAlias -p force-app

# Run tests during deployment
sfdx force:source:deploy -p force-app -l RunLocalTests
```

**Ant Migration Tool:**
```xml
<!-- build.xml -->
<project name="Salesforce Ant Migration Tool" default="deploy" basedir=".">
    <property environment="env"/>
    <property name="sf.username" value="${env.SF_USERNAME}"/>
    <property name="sf.password" value="${env.SF_PASSWORD}"/>
    <property name="sf.serverurl" value="${env.SF_SERVERURL}"/>
    
    <target name="deploy">
        <sf:deploy 
            username="${sf.username}" 
            password="${sf.password}" 
            serverurl="${sf.serverurl}"
            deployRoot="src">
        </sf:deploy>
    </target>
</project>
```

**Deployment Requirements:**
- **75% Code Coverage:** For Apex classes and triggers
- **All Tests Pass:** No test failures
- **Validation Rules:** Must not block deployment
- **Field Dependencies:** Must be valid

#### 6.3 Version Control

**Git Workflow:**
```bash
# Initialize repository
git init

# Add files
git add .

# Commit changes
git commit -m "Initial commit"

# Create branch
git checkout -b feature/new-component

# Merge branch
git checkout main
git merge feature/new-component

# Push to remote
git push origin main
```

**.forceignore File:**
```
# Ignore specific metadata
**/aura/**/test/**
**/objects/**/fieldTranslations/**
**/flexipages/**/flexiPageRegionWidths/**

# Ignore all metadata in folder
**/staticresources/**

# Ignore specific file
**/classes/MyTestClass.cls
```

### Common Exam Questions

**Q13:** What is the minimum code coverage required for deployment?
- A) 50%
- B) 65%
- C) 75%
- D) 100%

**Answer:** C) 75%
**Reasoning:** 75% code coverage is required for Apex classes and triggers to deploy to production.

**Q14:** Which deployment method requires a connected org?
- A) Change Sets
- B) SFDX CLI
- C) Ant Migration Tool
- D) Metadata API

**Answer:** A) Change Sets
**Reasoning:** Change Sets require a connected org. Other methods can work independently.

### Study Checklist
- [ ] Understand Developer Console
- [ ] Know debug levels and logging
- [ ] Master deployment methods
- [ ] Understand deployment requirements
- [ ] Know version control basics

---

## 🔗 Section 7: Integration (11%)

### Key Concepts

#### 7.1 REST API

**REST Principles:**
- **GET:** Retrieve data
- **POST:** Create data
- **PUT/PATCH:** Update data
- **DELETE:** Delete data

**Callouts from Apex:**
```apex
public class ExternalApiService {
    
    public static void makeCallout() {
        // Define endpoint
        String endpoint = 'https://api.example.com/data';
        
        // Create HTTP request
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('GET');
        req.setHeader('Content-Type', 'application/json');
        
        // Add authentication
        String username = 'user';
        String password = 'pass';
        Blob headerValue = Blob.valueOf(username + ':' + password);
        String authorizationHeader = 'BASIC ' + EncodingUtil.base64Encode(headerValue);
        req.setHeader('Authorization', authorizationHeader);
        
        // Send request
        Http http = new Http();
        HttpResponse res = http.send(req);
        
        // Process response
        if (res.getStatusCode() == 200) {
            String responseBody = res.getBody();
            System.debug('Response: ' + responseBody);
        }
    }
}
```

**Async Callouts:**
```apex
// Using @future
public with sharing class AsyncCalloutService {
    
    @future(callout=true)
    public static void makeAsyncCallout(String endpoint) {
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('GET');
        HttpResponse res = http.send(req);
    }
}

// Using Queueable
public with sharing class QueueableCallout implements Queueable {
    
    public void execute(QueueableContext context) {
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.example.com/data');
        req.setMethod('GET');
        HttpResponse res = http.send(req);
    }
}

// Execute queueable
System.enqueueJob(new QueueableCallout());
```

#### 7.2 SOAP API

**SOAP vs REST:**
| Feature | SOAP | REST |
|---------|------|------|
| Format | XML | JSON/XML |
| Protocol | HTTP only | HTTP only |
| WSDL | Required | Not required |
| Complexity | Higher | Lower |
| Performance | Slower | Faster |

#### 7.3 Connected Apps

**OAuth Flows:**
- **Web Server Flow:** Server-side applications
- **User-Agent Flow:** Client-side applications
- **JWT Bearer Flow:** Server-to-server
- **SAML Bearer Flow:** SSO scenarios

**Connected App Setup:**
1. Create Connected App in Setup
2. Enable OAuth settings
3. Configure callback URL
4. Define scopes
5. Save and get Consumer Key/Secret

#### 7.4 External Objects

**External Objects:**
- Data stored outside Salesforce
- Accessible through Salesforce UI
- Use external data source

**External Data Sources:**
- **OData:** REST-based protocol
- **Custom:** Using Apex adapters

```apex
// Query external object
List<External_Product__x> products = [
    SELECT Name, Price__c 
    FROM External_Product__x
];
```

### Common Exam Questions

**Q15:** Which annotation enables callouts in Apex?
- A) @RemoteAction
- B) @AuraEnabled
- C) @future(callout=true)
- D) @RestResource

**Answer:** C) @future(callout=true)
**Reasoning:** @future(callout=true) allows asynchronous callouts from Apex.

**Q16:** What is the maximum number of callouts per transaction?
- A) 10
- B) 50
- C) 100
- D) 200

**Answer:** C) 100
**Reasoning:** Governor limit allows 100 callouts per transaction.

### Study Checklist
- [ ] Understand REST API
- [ ] Master callouts from Apex
- [ ] Know async callout methods
- [ ] Understand Connected Apps
- [ ] Know OAuth flows
- [ ] Understand external objects

---

## 🎯 Final Exam Preparation

### Exam Day Checklist

**Before Exam:**
- [ ] Get good sleep (7-8 hours)
- [ ] Eat a light, healthy meal
- [ ] Arrive 15 minutes early
- [ ] Bring valid photo ID
- [ ] Clear web browser cache
- [ ] Test webcam/microphone (if online)

**During Exam:**
- [ ] Read questions carefully
- [ ] Manage time (1.75 min/question)
- [ ] Answer easy questions first
- [ ] Mark for review if unsure
- [ ] Never leave questions unanswered
- [ ] Trust your first instinct

**After Exam:**
- [ ] Wait for results (immediate)
- [ ] Update LinkedIn profile
- [ ] Share achievement
- [ ] Plan next certification

### Key Topics to Memorize

**Governor Limits (Must Know):**
- SOQL Queries: 100
- SOQL Rows: 50,000
- DML Statements: 150
- DML Rows: 10,000
- Heap Size: 6 MB (sync), 12 MB (async)
- CPU Time: 10,000 ms (sync), 60,000 (async)
- Future Calls: 50
- Callouts: 100

**Key Acronyms:**
- OWD: Organization-Wide Defaults
- FLS: Field-Level Security
- CRUD: Create, Read, Update, Delete
- LWC: Lightning Web Component
- LDS: Lightning Data Service
- API: Application Programming Interface

### Practice Question Patterns

**Pattern 1: "Best Approach"**
- Look for scalability
- Consider long-term maintenance
- Follow best practices
- Avoid quick fixes

**Pattern 2: "Multiple Correct"**
- Choose BEST answers
- Consider complexity
- Evaluate trade-offs
- Think about implications

**Pattern 3: "Code Analysis"**
- Check for governor limits
- Look for common mistakes
- Analyze execution flow
- Consider edge cases

**Pattern 4: "Scenario-based"**
- Read entire scenario
- Identify requirements
- Evaluate each option
- Choose most appropriate

---

## 📚 Resources

### Study Materials
- [Focus on Force](https://focusonforce.com/platform-developer-i/)
- [Trailhead](https://trailhead.salesforce.com/credentials/salesforcecertifiedplatformdeveloperi)
- [Salesforce Developer Documentation](https://developer.salesforce.com/docs)

### Practice Exams
- Focus on Force Practice Exams
- Salesforce Trailhead Playground
- Mock exams online

### Communities
- Salesforce Developer Forums
- Stack Overflow (salesforce tag)
- Reddit r/salesforce
- LinkedIn Salesforce Groups

---

**Success Formula:** Study + Practice + Review + Confidence = CERTIFICATION! 🎉
# Quick Reference Guide - Salesforce Platform Developer I

## 🎯 Exam Quick Facts

| Item | Details |
|------|---------|
| **Exam Name** | Platform Developer I |
| **Duration** | 105 minutes |
| **Questions** | 60 multiple-choice |
| **Passing Score** | 65% (39/60) |
| **Cost** | $200 USD |
| **Registration** | Webassessor.com |

## 📊 Exam Content Breakdown

- **Salesforce Fundamentals**: 8%
- **Data Modeling & Management**: 20%
- **Process Automation & Business Logic**: 27%
- **User Interface**: 14%
- **Security**: 12%
- **Debugging & Deployment**: 8%
- **Integration**: 11%

## 🔢 Governor Limits (Memorize These!)

| Limit | Value | Context |
|-------|-------|---------|
| SOQL Queries | 100 | Per transaction |
| SOQL Rows | 50,000 | Per transaction |
| SOSL Queries | 20 | Per transaction |
| DML Statements | 150 | Per transaction |
| DML Rows | 10,000 | Per transaction |
| Heap Size | 6 MB (sync), 12 MB (async) | Per transaction |
| CPU Time | 10,000 ms (sync), 60,000 (async) | Per transaction |
| Future Calls | 50 | Per transaction |
| Callouts | 100 | Per transaction |
| Batch Size | 200 | Per batch execution |

## 💻 Apex Quick Reference

### Data Types
```apex
// Primitive
Integer i = 100;
Double d = 3.14;
Boolean b = true;
String s = 'Hello';
Date dt = Date.today();
Datetime dtm = Datetime.now();

// Collections
List<String> names = new List<String>{'John', 'Jane'};
Set<Integer> numbers = new Set<Integer>{1, 2, 3};
Map<Id, Account> accMap = new Map<Id, Account>();
```

### Trigger Context Variables
```apex
Trigger.new        // List of new versions of records
Trigger.old        // List of old versions of records
Trigger.newMap     // Map of ID to new versions
Trigger.oldMap     // Map of ID to old versions
Trigger.isBefore   // True if before trigger
Trigger.isAfter    // True if after trigger
Trigger.isInsert   // True if insert operation
Trigger.isUpdate   // True if update operation
Trigger.isDelete   // True if delete operation
Trigger.isUndelete // True if undelete operation
```

### Common Apex Methods
```apex
// String methods
String s = 'Hello World';
s.toUpperCase();      // 'HELLO WORLD'
s.toLowerCase();      // 'hello world'
s.substring(0, 5);    // 'Hello'
s.contains('World');   // true

// List methods
List<Account> accs = [SELECT Id FROM Account LIMIT 10];
accs.size();         // 10
accs.add(new Account(Name='Test'));
accs.remove(0);

// Map methods
Map<Id, Account> accMap = new Map<Id, Account>(accs);
accMap.keySet();      // Returns Set of IDs
accMap.values();     // Returns List of Accounts
accMap.get(accId);   // Returns Account or null
```

## 🔍 SOQL Quick Reference

### Basic Query
```soql
SELECT Id, Name, Industry FROM Account WHERE Industry = 'Technology'
```

### Parent-to-Child Query
```soql
SELECT Id, Name, (SELECT Id, Name, Email FROM Contacts) FROM Account
```

### Child-to-Parent Query
```soql
SELECT Id, Name, Account.Name, Account.Industry FROM Contact
```

### Aggregate Query
```soql
SELECT AccountId, COUNT(Id) FROM Contact GROUP BY AccountId
```

### Query with LIMIT and ORDER BY
```soql
SELECT Id, Name FROM Account LIMIT 10 ORDER BY CreatedDate DESC
```

### Query with Multiple Conditions
```soql
SELECT Id, Name FROM Account 
WHERE Industry = 'Technology' 
AND AnnualRevenue > 1000000
LIMIT 100
```

## ⚡ LWC Quick Reference

### Decorators
```javascript
@api recordId;              // Public property
@api title = 'Default';     // Public with default
@track data = [];           // Private reactive property
wire(getRecord, { recordId: '$recordId' }) account;  // Wire service
```

### Lifecycle Hooks
```javascript
connectedCallback() {
    // Called when component inserted into DOM
}

disconnectedCallback() {
    // Called when component removed from DOM
}

renderedCallback() {
    // Called after every render
}
```

### Import Examples
```javascript
// Import Wire Service
import { LightningElement, wire, api } from 'lwc';

// Import Lightning Data Service
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

// Import Apex method
import getAccountData from '@salesforce/apex/AccountController.getAccountData';

// Import static resource
import CHART_JS from '@salesforce/resourceUrl/chartjs';

// Import platform resource loader
import { loadScript } from 'lightning/platformResourceLoader';
```

### Event Handling
```javascript
// Dispatch event
this.dispatchEvent(new CustomEvent('myevent', {
    detail: { value: 'some value' }
}));

// Handle event (in parent)
<template>
    <c-child-component onmyevent={handleEvent}></c-child-component>
</template>
```

## 🔒 Security Quick Reference

### Profiles vs Permission Sets
| Feature | Profile | Permission Set |
|---------|----------|----------------|
| Number per user | 1 | Multiple |
| Purpose | Base access | Additional access |
| Can be mass-assigned | No | Yes |

### OWD (Organization-Wide Defaults)
- **Private**: Users only see their own records
- **Public Read Only**: Users can see all records but only edit their own
- **Public Read/Write**: Users can see and edit all records

### Sharing Rules
- **Purpose**: Expand access, never restrict
- **Types**: Owner-based, Criteria-based
- **Priority**: Higher than OWD, lower than manual sharing

## 🤖 Automation Tools Comparison

| Tool | Best For | Complexity |
|------|----------|------------|
| **Workflow Rules** | Simple field updates | Low |
| **Process Builder** | Record updates, email alerts | Medium |
| **Flow Builder** | Complex logic, multiple objects | High |
| **Apex Trigger** | Complex calculations, callouts | Very High |

## 🧪 Testing Quick Reference

### Test Class Structure
```apex
@isTest
private class MyTestClass {
    
    @testSetup
    static void setup() {
        // Create test data
        Account acc = new Account(Name = 'Test Account');
        insert acc;
    }
    
    @isTest
    static void testMethod() {
        Test.startTest();
        // Test logic here
        Test.stopTest();
        
        // Assertions
        System.assertEquals(expected, actual);
    }
}
```

### Common Test Methods
```apex
System.assertEquals(expected, actual);           // Check equality
System.assertNotEquals(notExpected, actual);      // Check inequality
System.assert(condition);                        // Check if true
System.assertNotEquals(false, condition);         // Check if false
System.assertEquals(expectedList.size(), actualList.size());
```

### Coverage Requirements
- **Minimum**: 75% for deployment
- **Best Practice**: 90%+ for production
- **Run tests**: All tests must pass before deployment

## 📦 Deployment Methods

### Change Sets
- Use between connected orgs
- Good for metadata deployment
- No version control

### Salesforce CLI
```bash
# Deploy
sfdx force:source:deploy -p force-app

# Deploy with tests
sfdx force:source:deploy -p force-app --testlevel RunLocalTests

# Validate deployment
sfdx force:source:deploy -p force-app --dryrun
```

### Metadata API
- Programmatic deployment
- Complex scenarios
- CI/CD integration

## 🎯 Common Exam Traps

### Trap 1: SOQL in Loops ❌
```apex
// WRONG
for (Account acc : accounts) {
    List<Contact> contacts = [SELECT Id FROM Contact WHERE AccountId = :acc.Id];
}

// CORRECT ✅
Set<Id> accountIds = new Set<Id>();
for (Account acc : accounts) {
    accountIds.add(acc.Id);
}
List<Contact> contacts = [SELECT Id FROM Contact WHERE AccountId IN :accountIds];
```

### Trap 2: DML in Loops ❌
```apex
// WRONG
for (Account acc : accounts) {
    insert acc;
}

// CORRECT ✅
insert accounts;
```

### Trap 3: Not Using LIMIT ❌
```apex
// WRONG - Could return 50,000+ rows
List<Account> accounts = [SELECT Id FROM Account];

// CORRECT ✅
List<Account> accounts = [SELECT Id FROM Account LIMIT 100];
```

## 📝 Code Best Practices

### Naming Conventions
- **Classes**: PascalCase (e.g., `AccountController`)
- **Methods**: camelCase (e.g., `getAccountData`)
- **Variables**: camelCase (e.g., `accountId`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)
- **Triggers**: `ObjectNameTrigger` (e.g., `AccountTrigger`)

### Bulkification Pattern
```apex
// Always bulkify for bulk operations
public with sharing class AccountService {
    public static void updateRelatedContacts(List<Account> accounts) {
        Set<Id> accountIds = new Set<Id>();
        for (Account acc : accounts) {
            accountIds.add(acc.Id);
        }
        
        List<Contact> contacts = [
            SELECT Id, AccountId 
            FROM Contact 
            WHERE AccountId IN :accountIds
        ];
        
        for (Contact con : contacts) {
            // Update logic
        }
        
        update contacts;
    }
}
```

## 🔧 Debugging Tips

### Apex Debugging
```apex
// Add debug statements
System.debug('Current account: ' + acc);
System.debug('Account Name: ' + acc.Name);

// Check debug logs in Setup > Debug Logs
```

### LWC Debugging
```javascript
// Use console.log
console.log('Data received:', this.data);
console.error('Error:', error);

// Use browser DevTools
// F12 → Console tab
```

### Enable Debug Logs
1. Go to Setup
2. Search "Debug Logs"
3. Add user to Monitor Debug Logs
4. Set debug level to "Finest"
5. Run your code
6. View logs in Debug Logs section

## 🎓 Study Tips

### Memorization Techniques
1. **Flashcards**: Use Anki for Governor Limits
2. **Spaced Repetition**: Review regularly, not just once
3. **Practice Tests**: Take multiple to identify weak areas
4. **Teach Others**: Explain concepts to reinforce learning
5. **Code Along**: Always practice what you learn

### Time Management During Exam
- Total: 105 minutes for 60 questions
- Average: 1.75 minutes per question
- **Strategy**: 
  - Answer easy questions first
  - Mark difficult ones for review
  - Never leave a question blank
  - Trust your first instinct

---

**Last Updated**: January 2026

**Remember**: This is a quick reference guide. For detailed information, always refer to the official Salesforce documentation and the weekly README files.
# Week 2: Apex & SOQL (Backend Development)

## Learning Objectives
- [ ] Understand Apex syntax and structure
- [ ] Master Triggers and their execution context
- [ ] Write Apex Classes and methods
- [ ] Learn SOQL and SOSL queries
- [ ] Understand Governor Limits
- [ ] Write unit tests with test coverage

## Prerequisites
- [ ] Completed Week 1 (Admin & Flow)
- [ ] Basic Java-like syntax understanding
- [ ] Developer Edition with API access

## Trailhead Modules
- [ ] Apex Basics & Database
- [ ] Apex Triggers
- [ ] Apex Testing
- [ ] SOQL & SOSL Queries
- [ ] Governor Limits & Debugging

## Project: Account-Contact Protection

### Main Trigger: Prevent Account Deletion
**Trigger Name:** `AccountDeletionPreventer`

**Logic:**
1. Check if Account has related Contacts before deletion
2. If Contacts exist, prevent deletion with error message
3. Allow deletion if no Contacts exist

**File:** `triggers/AccountDeletionPreventer.trigger`

```apex
trigger AccountDeletionPreventer on Account (before delete) {
    // Implementation will be added during the week
}
```

### Utility Classes
1. **ContactService.cls**
   - Method to check if Account has related Contacts
   - Method to get Contact count for Account

2. **AccountTriggerHandler.cls**
   - Trigger handler pattern implementation
   - Separation of business logic from trigger

3. **TriggerFactory.cls**
   - Factory pattern to manage multiple triggers
   - Ensures single trigger per object

### SOQL Examples
Create queries for common scenarios:

1. **Parent-to-Child Query**
```soql
SELECT Id, Name, (SELECT Id, Name, Email FROM Contacts) FROM Account
```

2. **Child-to-Parent Query**
```soql
SELECT Id, Name, Account.Name, Account.Industry FROM Contact
```

3. **Aggregate Query**
```soql
SELECT AccountId, COUNT(Id) FROM Contact GROUP BY AccountId
```

4. **Query with Relationships**
```soql
SELECT Id, Name, Owner.Name, CreatedBy.Name FROM Account
```

## Daily Progress

### Day 1-2: Apex Basics
- [ ] Set up Developer Console / VS Code
- [ ] Learn Apex syntax and data types
- [ ] Create first Apex class (Hello World)
- [ ] Understand variables, methods, classes
- [ ] Learn control structures (if/else, loops)

### Day 3-4: Triggers
- [ ] Learn trigger context variables
- [ ] Create AccountDeletionPreventer trigger
- [ ] Implement Trigger Handler pattern
- [ ] Test trigger functionality
- [ ] Debug using Debug logs

### Day 5-6: SOQL & SOSL
- [ ] Learn SOQL syntax
- [ ] Practice parent-child queries
- [ ] Learn query planning
- [ ] Understand relationship queries
- [ ] Create utility methods for common queries

### Day 7: Testing & Governor Limits
- [ ] Write test classes for trigger
- [ ] Achieve 75%+ code coverage
- [ ] Learn Governor Limits
- [ ] Practice bulkification patterns
- [ ] Review and document

## Coding Standards

### Trigger Best Practices
1. One trigger per object
2. Use Handler pattern
3. Always bulkify
4. Use proper error handling
5. Write comprehensive tests

### SOQL Best Practices
1. Avoid SOQL inside loops
2. Select only required fields
3. Use LIMIT clause when possible
4. Consider indexed fields in WHERE clause
5. Use aggregate queries for calculations

## Governor Limits Reference

### Important Limits to Remember
- **SOQL Queries:** 100 per transaction
- **SOQL Query Rows:** 50,000 per transaction
- **DML Statements:** 150 per transaction
- **DML Rows:** 10,000 per transaction
- **Heap Size:** 6 MB for sync, 12 MB for async
- **CPU Time:** 10,000 ms for sync, 60,000 ms for async

### Common Patterns to Avoid
❌ SOQL inside loop
❌ DML inside loop
❌ Too many queries
❌ Not using LIMIT

### Bulkification Pattern
```apex
// WRONG - SOQL in loop
for (Account acc : Trigger.new) {
    List<Contact> contacts = [SELECT Id FROM Contact WHERE AccountId = :acc.Id];
}

// CORRECT - Bulkified
Set<Id> accountIds = new Set<Id>();
for (Account acc : Trigger.new) {
    accountIds.add(acc.Id);
}
List<Contact> contacts = [SELECT Id FROM Contact WHERE AccountId IN :accountIds];
```

## Test Class Template

```apex
@isTest
private class AccountDeletionPreventerTest {
    
    @testSetup
    static void setup() {
        Account acc = new Account(Name = 'Test Account');
        insert acc;
        
        Contact con = new Contact(
            LastName = 'Test Contact',
            AccountId = acc.Id
        );
        insert con;
    }
    
    @isTest
    static void testPreventDeletionWithContacts() {
        Account acc = [SELECT Id FROM Account LIMIT 1];
        
        Test.startTest();
        try {
            delete acc;
            System.assert(false, 'Should have thrown exception');
        } catch (DmlException e) {
            System.assert(e.getMessage().contains('Cannot delete account with contacts'));
        }
        Test.stopTest();
    }
    
    @isTest
    static void testAllowDeletionWithoutContacts() {
        Account acc = [SELECT Id FROM Account LIMIT 1];
        delete [SELECT Id FROM Contact WHERE AccountId = :acc.Id];
        
        Test.startTest();
        delete acc;
        Test.stopTest();
        
        List<Account> deletedAcc = [SELECT Id FROM Account WHERE Id = :acc.Id];
        System.assertEquals(0, deletedAcc.size(), 'Account should be deleted');
    }
}
```

## Resources
- [Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_dev_guide.htm)
- [SOQL & SOSL Reference](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/)
- [ApexSandbox.io](https://apexsandbox.io/) - Practice platform
- [Governor Limits](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_gov_limits.htm)

## Notes Template
### Date: [Insert Date]

**Topics Covered:**
- [ ] [Topic 1]
- [ ] [Topic 2]

**Code Written:**
- [File 1] - Description: [What it does]
- [File 2] - Description: [What it does]

**Key Learnings:**
- [Concept 1]
- [Concept 2]

**Errors Encountered:**
- [Error 1] - Solution: [How fixed]
- [Error 2] - Solution: [How fixed]

**Test Coverage:**
- [ ] Class 1: __% coverage
- [ ] Class 2: __% coverage

## Week 2 Completion Checklist
- [ ] All Trailhead modules completed
- [ ] AccountDeletionPreventer trigger implemented
- [ ] Trigger Handler pattern used
- [ ] All utility classes created
- [ ] SOQL examples documented
- [ ] Test classes with 75%+ coverage
- [ ] Governor limits understood
- [ ] Code properly bulkified
- [ ] All test scenarios passing
- [ ] Documentation complete
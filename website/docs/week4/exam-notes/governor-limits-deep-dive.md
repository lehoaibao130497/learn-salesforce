# Week 4: Governor Limits Deep Dive

## 📚 Understanding Governor Limits

### What Are Governor Limits?

Governor limits are runtime limits enforced by Salesforce to ensure efficient resource usage in the multi-tenant environment. These limits prevent any single org from consuming too many resources and affecting other orgs.

### Why Do Limits Exist?

1. **Multi-tenant Architecture:** Shared resources require fair allocation
2. **Performance:** Prevent slow operations
3. **Reliability:** Ensure system stability
4. **Scalability:** Support many orgs efficiently

---

## 🔢 Critical Limits (Must Memorize)

### SOQL & SOSL Limits

| Limit | Value | Context | Notes |
|-------|-------|---------|-------|
| **SOQL Queries** | 100 | Per transaction | Synchronous & asynchronous |
| **SOQL Rows Retrieved** | 50,000 | Per transaction | Total rows from all queries |
| **SOSL Queries** | 20 | Per transaction | Text search queries |
| **SOQL Query Locator Rows** | 50,000 | Per transaction | For query locator |
| **SOQL Aggregate Rows** | 5,000 | Per transaction | For aggregate queries |

### DML Limits

| Limit | Value | Context | Notes |
|-------|-------|---------|-------|
| **DML Statements** | 150 | Per transaction | insert, update, delete, etc. |
| **DML Rows** | 10,000 | Per transaction | Total rows affected |
| **Bulk DML Events** | 10,000 | Per transaction | For bulk API |

### System Limits

| Limit | Value | Context | Notes |
|-------|-------|---------|-------|
| **Heap Size** | 6 MB | Synchronous | 12 MB for asynchronous |
| **CPU Time** | 10,000 ms | Synchronous | 60,000 ms asynchronous |
| **Future Calls** | 50 | Per transaction | @future methods |
| **Callouts (HTTP)** | 100 | Per transaction | External API calls |
| **Email Invocations** | 10 | Per transaction | SingleEmailMessage |
| **Queueable Jobs Added** | 50 | Per transaction | System.enqueueJob() |
| **Batch Apex Jobs** | 5 | Rolling 24h | Per org |
| **Future Jobs** | 50 | Rolling 24h | Per org |

### Governor Limit Detection

```apex
// Check limits before operations
if (Limits.getLimitQueries() - Limits.getQueries() < 5) {
    System.debug('Approaching query limit!');
}

// Check heap usage
if (Limits.getLimitHeapSize() - Limits.getHeapSize() < 1024 * 1024) { // 1MB
    System.debug('Heap almost full!');
}

// Check CPU time
if (Limits.getLimitCpuTime() - Limits.getCpuTime() < 1000) { // 1 second
    System.debug('CPU time running low!');
}
```

---

## 🚫 Common Pitfalls & Solutions

### Pitfall 1: SOQL Inside Loops

**Problem:**
```apex
// ❌ BAD - Will exceed 100 query limit with 200+ accounts
List<Account> accounts = [SELECT Id FROM Account];

for (Account acc : accounts) {
    // Query inside loop - BAD!
    List<Contact> contacts = [SELECT Id, FirstName, LastName 
                               FROM Contact 
                               WHERE AccountId = :acc.Id];
    System.debug('Account ' + acc.Name + ' has ' + contacts.size() + ' contacts');
}
```

**Solution - Bulkify:**
```apex
// ✅ GOOD - Single query for all contacts
List<Account> accounts = [SELECT Id FROM Account];

// Collect account IDs
Set<Id> accountIds = new Set<Id>();
for (Account acc : accounts) {
    accountIds.add(acc.Id);
}

// Single query for all contacts
Map<Id, List<Contact>> contactsByAccount = new Map<Id, List<Contact>>();
for (Contact con : [SELECT Id, AccountId, FirstName, LastName 
                     FROM Contact 
                     WHERE AccountId IN :accountIds]) {
    if (!contactsByAccount.containsKey(con.AccountId)) {
        contactsByAccount.put(con.AccountId, new List<Contact>());
    }
    contactsByAccount.get(con.AccountId).add(con);
}

// Process contacts
for (Account acc : accounts) {
    List<Contact> contacts = contactsByAccount.get(acc.Id);
    Integer contactCount = (contacts != null) ? contacts.size() : 0;
    System.debug('Account ' + acc.Name + ' has ' + contactCount + ' contacts');
}
```

**Even Better - Use Parent-Child Query:**
```apex
// ✅ BETTER - Use parent-child subquery
List<Account> accounts = [SELECT Id, Name, 
                                 (SELECT Id, FirstName, LastName 
                                  FROM Contacts) 
                          FROM Account 
                          LIMIT 200];

for (Account acc : accounts) {
    System.debug('Account ' + acc.Name + ' has ' + 
                 acc.Contacts.size() + ' contacts');
}
```

### Pitfall 2: DML Inside Loops

**Problem:**
```apex
// ❌ BAD - Will exceed 150 DML limit
List<Account> accounts = [SELECT Id, Name FROM Account LIMIT 200];

for (Account acc : accounts) {
    // DML inside loop - BAD!
    acc.Name = acc.Name + ' - Updated';
    update acc;
}
```

**Solution - Bulk DML:**
```apex
// ✅ GOOD - Single DML statement
List<Account> accounts = [SELECT Id, Name FROM Account LIMIT 200];
List<Account> accountsToUpdate = new List<Account>();

for (Account acc : accounts) {
    acc.Name = acc.Name + ' - Updated';
    accountsToUpdate.add(acc);
}

// Single DML statement
update accountsToUpdate;
```

### Pitfall 3: Not Using LIMIT Clause

**Problem:**
```apex
// ❌ BAD - Could retrieve 50,000+ rows and exceed heap limit
List<Account> accounts = [SELECT Id, Name, Description 
                          FROM Account 
                          WHERE Industry = 'Technology'];
```

**Solution - Always Use LIMIT:**
```apex
// ✅ GOOD - Limit results
List<Account> accounts = [SELECT Id, Name, Description 
                          FROM Account 
                          WHERE Industry = 'Technology'
                          LIMIT 100];
```

### Pitfall 4: CPU Time Limit Exceeded

**Problem:**
```apex
// ❌ BAD - Complex calculations in loop
List<Account> accounts = [SELECT Id, Name, AnnualRevenue FROM Account];

for (Account acc : accounts) {
    // Complex calculation - could exceed CPU time
    for (Integer i = 0; i < 1000; i++) {
        Decimal revenue = acc.AnnualRevenue * (1 + i * 0.01);
        System.debug(revenue);
    }
}
```

**Solution - Optimize Calculations:**
```apex
// ✅ GOOD - Optimize calculations
List<Account> accounts = [SELECT Id, Name, AnnualRevenue FROM Account];

// Pre-calculate values or use formulas
for (Account acc : accounts) {
    // Simplified calculation
    Decimal growthFactor = 10.0; // Pre-calculated
    Decimal revenue = acc.AnnualRevenue * growthFactor;
    System.debug(revenue);
}

// Or move heavy processing to batchable
```

### Pitfall 5: Heap Size Limit Exceeded

**Problem:**
```apex
// ❌ BAD - Loading too much data into heap
List<Account> accounts = [SELECT Id, Name, Description, BillingStreet, 
                                 BillingCity, BillingState, BillingPostalCode 
                          FROM Account LIMIT 10000]; // Too many fields/rows

// Additional large data
Map<String, Object> largeData = new Map<String, Object>();
for (Account acc : accounts) {
    largeData.put(acc.Id, acc); // Loading entire objects into map
}
```

**Solution - Manage Heap Efficiently:**
```apex
// ✅ GOOD - Select only needed fields
List<Account> accounts = [SELECT Id, Name, AnnualRevenue 
                          FROM Account 
                          LIMIT 100];

// Use only IDs in maps when possible
Set<Id> accountIds = new Set<Id>();
for (Account acc : accounts) {
    accountIds.add(acc.Id);
}

// Clear large objects when done
largeData.clear(); // Free heap space
```

### Pitfall 6: Too Many Callouts

**Problem:**
```apex
// ❌ BAD - Callout inside loop will exceed 100 callout limit
List<Account> accounts = [SELECT Id, Name FROM Account LIMIT 200];

for (Account acc : accounts) {
    // Callout inside loop - BAD!
    ExternalApiService.validateAccount(acc.Name);
}
```

**Solution - Batch or Optimize Callouts:**
```apex
// ✅ GOOD - Batch API calls or use @future
public class AccountValidationService {
    
    @future(callout=true)
    public static void validateAccounts(Set<Id> accountIds) {
        List<Account> accounts = [SELECT Id, Name 
                                  FROM Account 
                                  WHERE Id IN :accountIds];
        
        // Batch validation
        ExternalApiService.validateAccountsBatch(accounts);
    }
}

// Or use Queueable for more control
public class AccountValidationQueueable implements Queueable {
    private Set<Id> accountIds;
    
    public AccountValidationQueueable(Set<Id> accountIds) {
        this.accountIds = accountIds;
    }
    
    public void execute(QueueableContext context) {
        List<Account> accounts = [SELECT Id, Name 
                                  FROM Account 
                                  WHERE Id IN :accountIds LIMIT 100];
        
        // Process in batches
        ExternalApiService.validateAccountsBatch(accounts);
        
        // Enqueue remaining
        if (accountIds.size() > 100) {
            System.enqueueJob(new AccountValidationQueueable(accountIds));
        }
    }
}
```

---

## 📊 Limits by Transaction Type

### Synchronous Transactions

**Trigger/Controller Execution:**
- Heap: 6 MB
- CPU Time: 10,000 ms (10 seconds)
- SOQL Queries: 100
- DML Statements: 150

**Example:**
```apex
public class SyncTransactionService {
    public void processRecords(List<Account> accounts) {
        // All operations count toward sync limits
        List<Contact> contacts = getContacts(accounts); // 1 query
        updateContacts(contacts); // 1 DML
        createOpportunities(accounts); // 1 DML
        
        // Total: 2 queries, 2 DML statements
    }
}
```

### Asynchronous Transactions

**@future, Batchable, Queueable:**
- Heap: 12 MB (double)
- CPU Time: 60,000 ms (60 seconds)
- SOQL Queries: 100 (same)
- DML Statements: 150 (same)

**Example - @future:**
```apex
public with sharing class AsyncService {
    
    @future
    public static void processAsync(List<Id> accountIds) {
        // More heap and CPU time available
        List<Account> accounts = [SELECT Id, Name 
                                   FROM Account 
                                   WHERE Id IN :accountIds];
        
        // Can process more data
        for (Account acc : accounts) {
            // Complex processing allowed
        }
    }
}
```

**Example - Batchable:**
```apex
global class AccountBatchProcessor implements Database.Batchable<sObject> {
    
    global Database.QueryLocator start(Database.BatchableContext context) {
        // Query up to 50 million records
        return Database.getQueryLocator([SELECT Id, Name FROM Account]);
    }
    
    global void execute(Database.BatchableContext context, List<Account> scope) {
        // Process in chunks of 200
        for (Account acc : scope) {
            acc.Name = acc.Name + ' - Processed';
        }
        update scope; // 1 DML per batch
    }
    
    global void finish(Database.BatchableContext context) {
        // Final processing
    }
}
```

---

## 🔍 Checking Limits Programmatically

### Limit Methods

```apex
public class LimitChecker {
    
    public static void checkBeforeOperation() {
        // Query limit
        System.debug('Queries used: ' + Limits.getQueries() + '/' + Limits.getLimitQueries());
        System.debug('Queries remaining: ' + (Limits.getLimitQueries() - Limits.getQueries()));
        
        // SOQL rows limit
        System.debug('SOQL rows used: ' + Limits.getQueryRows() + '/' + Limits.getLimitQueryRows());
        
        // DML limit
        System.debug('DML used: ' + Limits.getDmlStatements() + '/' + Limits.getLimitDmlStatements());
        
        // Heap limit
        System.debug('Heap used: ' + Limits.getHeapSize() + '/' + Limits.getLimitHeapSize());
        
        // CPU time limit
        System.debug('CPU used: ' + Limits.getCpuTime() + '/' + Limits.getLimitCpuTime());
        
        // Future calls limit
        System.debug('Future used: ' + Limits.getFutureCalls() + '/' + Limits.getLimitFutureCalls());
        
        // Callouts limit
        System.debug('Callouts used: ' + Limits.getCallouts() + '/' + Limits.getLimitCallouts());
    }
}
```

### Practical Example - Safe Query Execution

```apex
public with sharing class SafeQueryService {
    
    public static List<Account> getAccountsSafely(Integer batchSize) {
        // Check query limit
        Integer queriesUsed = Limits.getQueries();
        Integer queriesRemaining = Limits.getLimitQueries() - queriesUsed;
        
        if (queriesRemaining < 1) {
            throw new LimitException('No query limit remaining');
        }
        
        // Check row limit
        Integer rowsUsed = Limits.getQueryRows();
        Integer rowsRemaining = Limits.getLimitQueryRows() - rowsUsed;
        
        if (batchSize > rowsRemaining) {
            System.debug('Reducing batch size from ' + batchSize + ' to ' + rowsRemaining);
            batchSize = rowsRemaining;
        }
        
        // Execute query
        return [SELECT Id, Name FROM Account LIMIT :batchSize];
    }
    
    public class LimitException extends Exception {}
}
```

---

## 🎯 Best Practices

### 1. Bulkify All Operations

**Always:**
- Query outside loops
- DML outside loops
- Process records in bulk

**Never:**
- SOQL inside loops
- DML inside loops
- Callouts inside loops

### 2. Select Only Needed Fields

```apex
// ❌ BAD - Selects all fields
List<Account> accounts = [SELECT Id FROM Account]; // Still fetches Name, etc.

// ✅ GOOD - Explicit field list
List<Account> accounts = [SELECT Id, Name FROM Account];
```

### 3. Use Efficient Query Patterns

```apex
// Parent-child subquery
List<Account> accounts = [SELECT Id, Name, 
                                 (SELECT Id, FirstName, LastName FROM Contacts) 
                          FROM Account];

// Relationship query
List<Contact> contacts = [SELECT Id, FirstName, LastName, 
                                 Account.Name 
                          FROM Contact];

// Use bind variables
List<Account> accounts = [SELECT Id, Name 
                          FROM Account 
                          WHERE Industry = :selectedIndustry];
```

### 4. Optimize Loops

```apex
// ❌ BAD - Nested loops O(n²)
for (Account acc1 : accounts1) {
    for (Account acc2 : accounts2) {
        if (acc1.Id == acc2.Id) {
            // Match found
        }
    }
}

// ✅ GOOD - Map-based O(n)
Map<Id, Account> accounts2Map = new Map<Id, Account>(accounts2);
for (Account acc1 : accounts1) {
    if (accounts2Map.containsKey(acc1.Id)) {
        // Match found
    }
}
```

### 5. Use Asynchronous Processing

```apex
// Move heavy processing to async
@future
public static void processHeavyData() {
    // Can use 12 MB heap and 60s CPU time
}

// Use batchable for large volumes
global class DataProcessor implements Database.Batchable<sObject> {
    // Process up to 50M records
}

// Use queueable for chaining
public class ChainProcessor implements Queueable {
    public void execute(QueueableContext context) {
        // Process and chain to next job
        System.enqueueJob(new ChainProcessor());
    }
}
```

### 6. Clear Large Objects

```apex
// Clear large collections when done
List<Account> largeList = [SELECT Id, Name FROM Account LIMIT 10000];

// Process data
processAccounts(largeList);

// Clear to free heap
largeList = null;

// Clear map
Map<Id, Account> largeMap = new Map<Id, Account>(largeList);
// Use map...
largeMap.clear(); // Free heap
```

### 7. Use Efficient Data Structures

```apex
// ❌ BAD - List for lookups O(n)
List<Account> accounts = [SELECT Id, Name FROM Account];
Account searchAccount = [SELECT Id FROM Account LIMIT 1];
Boolean found = false;
for (Account acc : accounts) {
    if (acc.Id == searchAccount.Id) {
        found = true;
        break;
    }
}

// ✅ GOOD - Set/Map for lookups O(1)
Set<Id> accountIds = new Set<Id>();
for (Account acc : accounts) {
    accountIds.add(acc.Id);
}
Boolean found = accountIds.contains(searchAccount.Id);
```

---

## 🧪 Testing Governor Limits

### Test Limits in Test Context

```apex
@isTest
private class LimitTesting {
    
    @isTest
    static void testQueryLimit() {
        Test.startTest();
        
        // In test, limits are higher
        // Test limits are separate from production
        List<Account> accounts = new List<Account>();
        for (Integer i = 0; i < 200; i++) {
            accounts.add(new Account(Name = 'Test ' + i));
        }
        insert accounts;
        
        // Query in test
        List<Account> queried = [SELECT Id FROM Account];
        System.assertEquals(200, queried.size());
        
        Test.stopTest();
    }
}
```

### Using Limits.getLimitQueries()

```apex
@isTest
private class LimitVerification {
    
    @isTest
    static void verifyQueryUsage() {
        Test.startTest();
        
        // Execute code
        List<Account> accounts = [SELECT Id, Name FROM Account LIMIT 10];
        
        // Verify query count
        System.assertEquals(1, Limits.getQueries());
        System.assert(Limits.getQueries() < Limits.getLimitQueries());
        
        Test.stopTest();
    }
}
```

---

## 📋 Quick Reference Cheat Sheet

### Must-Memorize Limits

```apex
SOQL Queries:          100
SOQL Rows:            50,000
SOSL Queries:          20
DML Statements:        150
DML Rows:             10,000
Heap (sync):           6 MB
Heap (async):          12 MB
CPU Time (sync):       10,000 ms
CPU Time (async):      60,000 ms
Future Calls:          50
Callouts:             100
Email Invocations:     10
Queueable Jobs:        50
```

### Limit Checking Methods

```apex
Limits.getQueries()           // Queries used
Limits.getLimitQueries()      // Total queries allowed
Limits.getQueryRows()         // Rows retrieved
Limits.getLimitQueryRows()    // Total rows allowed
Limits.getDmlStatements()     // DML used
Limits.getLimitDmlStatements() // Total DML allowed
Limits.getHeapSize()          // Heap used
Limits.getLimitHeapSize()     // Total heap allowed
Limits.getCpuTime()           // CPU used
Limits.getLimitCpuTime()      // Total CPU allowed
Limits.getFutureCalls()       // Future used
Limits.getLimitFutureCalls()  // Total future allowed
Limits.getCallouts()          // Callouts used
Limits.getLimitCallouts()     // Total callouts allowed
```

### Common Anti-Patterns

```apex
// ❌ SOQL in loop
for (Account acc : accounts) {
    List<Contact> contacts = [SELECT Id FROM Contact WHERE AccountId = :acc.Id];
}

// ❌ DML in loop
for (Account acc : accounts) {
    acc.Name = 'Updated';
    update acc;
}

// ❌ Callout in loop
for (Account acc : accounts) {
    ExternalApi.validate(acc);
}

// ❌ No LIMIT clause
List<Account> accounts = [SELECT Id, Name FROM Account];
```

### Best Patterns

```apex
// ✅ Bulkified queries
Set<Id> accountIds = new Set<Id>();
for (Account acc : accounts) {
    accountIds.add(acc.Id);
}
List<Contact> contacts = [SELECT Id FROM Contact WHERE AccountId IN :accountIds];

// ✅ Bulkified DML
List<Account> accountsToUpdate = new List<Account>();
for (Account acc : accounts) {
    acc.Name = 'Updated';
    accountsToUpdate.add(acc);
}
update accountsToUpdate;

// ✅ Parent-child query
List<Account> accounts = [SELECT Id, (SELECT Id FROM Contacts) FROM Account];

// ✅ Always use LIMIT
List<Account> accounts = [SELECT Id, Name FROM Account LIMIT 100];
```

---

## 🎓 Exam Scenarios

### Scenario 1: Trigger Optimization

**Question:** A trigger needs to update related contacts when an account is updated. What is the best approach to avoid governor limits?

**Answer:**
```apex
trigger AccountTrigger on Account (after update) {
    // Collect account IDs
    Set<Id> accountIds = Trigger.newMap.keySet();
    
    // Bulk query contacts
    List<Contact> contacts = [SELECT Id, AccountId 
                              FROM Contact 
                              WHERE AccountId IN :accountIds];
    
    // Update contacts in bulk
    Map<Id, Account> newAccounts = Trigger.newMap;
    for (Contact con : contacts) {
        Account acc = newAccounts.get(con.AccountId);
        if (acc.Industry == 'Technology') {
            con.Type = 'Prospect';
        }
    }
    
    // Single DML
    update contacts;
}
```

### Scenario 2: CPU Time Optimization

**Question:** A process is hitting CPU time limits with large data sets. How should it be optimized?

**Answer:**
1. Move to asynchronous processing
2. Use batchable for large volumes
3. Optimize loops and calculations
4. Pre-calculate values

```apex
global class LargeDataProcessor implements Database.Batchable<sObject> {
    
    global Database.QueryLocator start(Database.BatchableContext context) {
        return Database.getQueryLocator([SELECT Id, Data__c FROM Large_Object__c]);
    }
    
    global void execute(Database.BatchableContext context, List<Large_Object__c> scope) {
        // Process in chunks (200 records)
        List<Large_Object__c> toUpdate = new List<Large_Object__c>();
        
        // Pre-calculate common values
        Decimal multiplier = 1.15;
        
        for (Large_Object__c obj : scope) {
            // Simple calculation
            obj.Processed_Value__c = obj.Data__c * multiplier;
            toUpdate.add(obj);
        }
        
        // Bulk DML
        update toUpdate;
    }
    
    global void finish(Database.BatchableContext context) {
        // Finalize
    }
}
```

### Scenario 3: Callout Optimization

**Question:** Need to validate 500 accounts against external API. How to avoid callout limit?

**Answer:**
```apex
public class ExternalValidationService {
    
    @future(callout=true)
    public static void validateAccounts(Set<Id> accountIds) {
        // Batch validation - send all IDs in single call
        List<Account> accounts = [SELECT Id, Name 
                                   FROM Account 
                                   WHERE Id IN :accountIds];
        
        // Single callout for validation
        Map<Id, Boolean> validationResults = 
            ExternalAPI.validateAccountsBatch(accounts);
        
        // Update validation status
        List<Account> toUpdate = new List<Account>();
        for (Account acc : accounts) {
            acc.Validated__c = validationResults.get(acc.Id);
            toUpdate.add(acc);
        }
        update toUpdate;
    }
}
```

---

## 📚 Summary

**Key Takeaways:**
1. **Memorize** critical limits (100 queries, 150 DML, 6 MB heap, 10s CPU)
2. **Bulkify** all operations (no queries/DML in loops)
3. **Check** limits before critical operations
4. **Optimize** queries and data structures
5. **Use async** for heavy processing
6. **Test** with realistic data volumes

**Exam Success:**
- Understand when limits are reached
- Know how to avoid common pitfalls
- Be able to optimize code to stay within limits
- Recognize patterns that cause limit exceptions

---

**Next:** [AI Integration Guide](/docs/week4/ai-integration)

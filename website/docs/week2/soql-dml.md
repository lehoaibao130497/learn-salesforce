# Week 2, Day 5-6: SOQL & DML

## 📚 Learning Objectives

Sau khi hoàn thành các bài học này, bạn sẽ:
- ✅ Master SOQL query syntax
- ✅ Write parent-child relationship queries
- ✅ Implement aggregate queries
- ✅ Understand SOQL relationship queries
- ✅ Master DML operations
- ✅ Apply Governor Limits best practices

---

## 🎯 Part 1: SOQL Fundamentals

### What is SOQL?

**SOQL** (Salesforce Object Query Language) là query language cho Salesforce database:
- **SQL-like syntax** - Tương tự SQL nhưng có differences
- **Object-oriented** - Query sObjects và fields
- **Governor limits** - Subject to query limits
- **Relationships** - Native support cho relationships

### SOQL Syntax

```apex
SELECT field1, field2, ...
FROM ObjectName
WHERE condition
ORDER BY field
LIMIT number
```

### Basic SOQL Query

```apex
// Query all accounts
List<Account> accounts = [
    SELECT Id, Name, Industry, AnnualRevenue
    FROM Account
];

// Query with WHERE clause
List<Account> techAccounts = [
    SELECT Id, Name, Industry
    FROM Account
    WHERE Industry = 'Technology'
];

// Query with multiple conditions
List<Account> accounts = [
    SELECT Id, Name, AnnualRevenue
    FROM Account
    WHERE Industry = 'Technology'
    AND AnnualRevenue > 1000000
];

// Query with ORDER BY
List<Account> accounts = [
    SELECT Id, Name, AnnualRevenue
    FROM Account
    ORDER BY AnnualRevenue DESC
];

// Query with LIMIT
List<Account> accounts = [
    SELECT Id, Name, Industry
    FROM Account
    LIMIT 10
];
```

---

## 🔗 Part 2: Relationship Queries

### Parent-to-Child Query

Query parent record và child records trong single query:

```apex
// Query accounts with their contacts
List<Account> accountsWithContacts = [
    SELECT Id, Name,
        (SELECT Id, FirstName, LastName, Email FROM Contacts)
    FROM Account
];

// Process results
for (Account acc : accountsWithContacts) {
    System.debug('Account: ' + acc.Name);
    
    // Access child records
    for (Contact con : acc.Contacts) {
        System.debug('Contact: ' + con.FirstName + ' ' + con.LastName);
    }
}
```

### Child-to-Parent Query

Query child record và parent fields:

```apex
// Query contacts with their account information
List<Contact> contactsWithAccounts = [
    SELECT Id, FirstName, LastName,
        Account.Name,
        Account.Industry,
        Account.AnnualRevenue
    FROM Contact
];

// Process results
for (Contact con : contactsWithAccounts) {
    System.debug('Contact: ' + con.FirstName + ' ' + con.LastName);
    System.debug('Account: ' + con.Account.Name);
    System.debug('Industry: ' + con.Account.Industry);
}
```

### Multiple Level Relationships

```apex
// Query opportunity with account and contacts
List<Opportunity> opportunities = [
    SELECT Id, Name, Amount,
        Account.Name,
        Account.Industry,
        (SELECT Id, FirstName, LastName FROM Account.Contacts)
    FROM Opportunity
];

// Process
for (Opportunity opp : opportunities) {
    System.debug('Opportunity: ' + opp.Name);
    System.debug('Account: ' + opp.Account.Name);
    
    // Access account's contacts
    for (Contact con : opp.Account.Contacts) {
        System.debug('Contact: ' + con.FirstName);
    }
}
```

---

## 📊 Part 3: Aggregate Queries

### Aggregate Functions

| Function | Description | Example |
|-----------|-------------|---------|
| **COUNT()** | Count records | `COUNT(Id)` |
| **SUM()** | Sum numeric values | `SUM(Amount)` |
| **AVG()** | Average numeric values | `AVG(Amount)` |
| **MIN()** | Minimum value | `MIN(Amount)` |
| **MAX()** | Maximum value | `MAX(Amount)` |

### COUNT Query

```apex
// Count all accounts
Integer accountCount = [
    SELECT COUNT()
    FROM Account
];

// Count accounts by industry
List<AggregateResult> results = [
    SELECT Industry, COUNT(Id) count
    FROM Account
    GROUP BY Industry
];

for (AggregateResult ar : results) {
    String industry = (String) ar.get('Industry');
    Integer count = (Integer) ar.get('count');
    System.debug(industry + ': ' + count);
}
```

### SUM and AVG Query

```apex
// Sum and average opportunity amounts
List<AggregateResult> results = [
    SELECT AccountId,
        SUM(Amount) totalAmount,
        AVG(Amount) avgAmount,
        COUNT(Id) count
    FROM Opportunity
    GROUP BY AccountId
];

for (AggregateResult ar : results) {
    Id accountId = (Id) ar.get('AccountId');
    Decimal total = (Decimal) ar.get('totalAmount');
    Decimal avg = (Decimal) ar.get('avgAmount');
    Integer count = (Integer) ar.get('count');
    
    System.debug('Account ID: ' + accountId);
    System.debug('Total: ' + total);
    System.debug('Average: ' + avg);
    System.debug('Count: ' + count);
}
```

### MIN and MAX Query

```apex
// Find min and max opportunity amounts
List<AggregateResult> results = [
    SELECT MIN(Amount) minAmount,
        MAX(Amount) maxAmount,
        AVG(Amount) avgAmount
    FROM Opportunity
    WHERE StageName = 'Closed Won'
];

AggregateResult ar = results[0];
Decimal minAmount = (Decimal) ar.get('minAmount');
Decimal maxAmount = (Decimal) ar.get('maxAmount');
Decimal avgAmount = (Decimal) ar.get('avgAmount');

System.debug('Min Amount: ' + minAmount);
System.debug('Max Amount: ' + maxAmount);
System.debug('Avg Amount: ' + avgAmount);
```

---

## 🎯 Part 4: Advanced SOQL

### LIKE Operator (Pattern Matching)

```apex
// Query accounts with name starting with 'Acme'
List<Account> accounts = [
    SELECT Id, Name
    FROM Account
    WHERE Name LIKE 'Acme%'
];

// Query accounts with 'Tech' anywhere in name
List<Account> techAccounts = [
    SELECT Id, Name
    FROM Account
    WHERE Name LIKE '%Tech%'
];
```

### IN Operator

```apex
// Query accounts in specific industries
Set<String> industries = new Set<String>{'Technology', 'Finance', 'Healthcare'};
List<Account> accounts = [
    SELECT Id, Name, Industry
    FROM Account
    WHERE Industry IN :industries
];
```

### NOT Operator

```apex
// Query accounts not in Technology industry
List<Account> accounts = [
    SELECT Id, Name, Industry
    FROM Account
    WHERE Industry != 'Technology'
];

// Query accounts without contacts
List<Account> accountsWithoutContacts = [
    SELECT Id, Name
    FROM Account
    WHERE Id NOT IN (SELECT AccountId FROM Contact)
];
```

### Date Queries

```apex
// Query accounts created this year
Date startOfYear = Date.today().yearsBetween(Date.newInstance(Date.today().year(), 1, 1));
List<Account> accounts = [
    SELECT Id, Name, CreatedDate
    FROM Account
    WHERE CreatedDate >= :startOfYear
];

// Query opportunities closing in next 30 days
Date thirtyDaysFromNow = Date.today().addDays(30);
List<Opportunity> opportunities = [
    SELECT Id, Name, CloseDate
    FROM Opportunity
    WHERE CloseDate <= :thirtyDaysFromNow
    AND StageName = 'Prospecting'
];
```

---

## 💾 Part 5: DML Operations

### DML Statement Types

| Statement | Description | Example |
|-----------|-------------|---------|
| **insert** | Create new records | `insert accounts` |
| **update** | Modify existing records | `update accounts` |
| **delete** | Remove records | `delete accounts` |
| **upsert** | Insert or update | `upsert accounts Account.Id` |
| **undelete** | Restore from recycle bin | `undelete accounts` |

### Insert Records

```apex
// Single insert
Account acc = new Account(
    Name = 'New Account',
    Industry = 'Technology',
    AnnualRevenue = 1000000
);
insert acc;

// Bulk insert
List<Account> accounts = new List<Account>{
    new Account(Name = 'Account 1', Industry = 'Technology'),
    new Account(Name = 'Account 2', Industry = 'Finance'),
    new Account(Name = 'Account 3', Industry = 'Healthcare')
};
insert accounts;

// Insert with error handling
Database.SaveResult[] results = Database.insert(accounts, false);

for (Database.SaveResult sr : results) {
    if (sr.isSuccess()) {
        System.debug('Success: ' + sr.getId());
    } else {
        for (Database.Error err : sr.getErrors()) {
            System.debug('Error: ' + err.getMessage());
        }
    }
}
```

### Update Records

```apex
// Query and update
Account acc = [SELECT Id, Name, AnnualRevenue FROM Account WHERE Name = 'New Account' LIMIT 1];
if (acc != null) {
    acc.AnnualRevenue = 2000000;
    update acc;
}

// Bulk update
List<Account> accounts = [SELECT Id, AnnualRevenue FROM Account WHERE Industry = 'Technology'];
for (Account acc : accounts) {
    acc.AnnualRevenue *= 1.1; // Increase by 10%
}
update accounts;

// Update with partial success
Database.SaveResult[] results = Database.update(accounts, false);
```

### Delete Records

```apex
// Delete single record
Account acc = [SELECT Id FROM Account WHERE Name = 'Account to Delete' LIMIT 1];
if (acc != null) {
    delete acc;
}

// Bulk delete
List<Account> accounts = [SELECT Id FROM Account WHERE Industry = 'Old Industry'];
delete accounts;

// Delete with error handling
Database.DeleteResult[] results = Database.delete(accounts, false);
```

### Upsert Records

```apex
// Upsert by ID
Account acc = new Account(
    Id = '00128000002RZ2l', // Existing ID
    Name = 'Updated Account',
    AnnualRevenue = 3000000
);
upsert acc Account.Id;

// Upsert by external ID
Account extAcc = new Account(
    External_ID__c = 'EXT123',
    Name = 'External Account',
    Industry = 'Technology'
);
upsert extAcc Account.External_ID__c;
```

---

## ⚠️ Part 6: Governor Limits

### Important SOQL Limits

| Limit | Value | Description |
|--------|--------|-------------|
| **SOQL Queries** | 100 per transaction | Total queries in one execution |
| **SOQL Query Rows** | 50,000 per transaction | Total records retrieved |
| **SOQL Query Locators** | 50,000 per transaction | Records that can be queried using query locator |

### Important DML Limits

| Limit | Value | Description |
|--------|--------|-------------|
| **DML Statements** | 150 per transaction | Total DML operations |
| **DML Rows** | 10,000 per transaction | Total records modified |

### Common Limit Violations

#### Too Many SOQL Queries (101 Exception)

**Bad Code:**
```apex
for (Account acc : Trigger.new) {
    // SOQL in loop - WILL HIT LIMIT!
    List<Contact> contacts = [
        SELECT Id FROM Contact WHERE AccountId = :acc.Id
    ];
}
```

**Good Code (Bulkified):**
```apex
Set<Id> accountIds = new Set<Id>();
for (Account acc : Trigger.new) {
    accountIds.add(acc.Id);
}

// Single query for all accounts
List<Contact> contacts = [
    SELECT Id, AccountId FROM Contact 
    WHERE AccountId IN :accountIds
];
```

#### Too Many DML Statements (151 Exception)

**Bad Code:**
```apex
for (Contact con : contacts) {
    con.Description = 'Updated';
    // DML in loop - WILL HIT LIMIT!
    update con;
}
```

**Good Code (Bulkified):**
```apex
// Update all contacts at once
for (Contact con : contacts) {
    con.Description = 'Updated';
}
update contacts; // Single DML statement
```

---

## 🎯 Part 7: SOQL Best Practices

### Query Optimization

1. **Select only required fields**
   - ✅ `SELECT Id, Name, Industry FROM Account`
   - ❌ `SELECT * FROM Account` (Not supported in SOQL)

2. **Use WHERE clause to filter**
   - ✅ `SELECT Id FROM Account WHERE Industry = 'Technology'`
   - ❌ `SELECT Id FROM Account` then filter in Apex

3. **Use LIMIT when appropriate**
   - ✅ `SELECT Id FROM Account LIMIT 10`
   - ❌ Query all records when only need first 10

4. **Use indexed fields in WHERE**
   - ✅ `WHERE Id = :accountId` or `WHERE Name = :name`
   - ❌ Complex WHERE on non-indexed fields

5. **Avoid SOQL in loops**
   - ✅ Collect IDs, query once
   - ❌ Query for each record in loop

### DML Best Practices

1. **Bulkify DML operations**
   - ✅ `update allAccounts;` (single statement)
   - ❌ `update acc;` in loop

2. **Use Database methods for partial success**
   - ✅ `Database.insert(records, false);`
   - ❌ `insert records;` (all or nothing)

3. **Use upsert instead of insert/update**
   - ✅ `upsert records Account.Id;`
   - ❌ Check if exists, then insert or update

4. **Validate before DML**
   - ✅ Validate in code before DML
   - ❌ Rely on database validation only

---

## 📝 Practice Exercise

**Task:** Create utility class for SOQL queries

**Requirements:**
1. Method to get accounts by industry
2. Method to get contacts by account ID
3. Method to get total opportunity amount by account
4. Method to get accounts created this month

**Time Estimate:** 45 minutes

**Example:**
```apex
public class QueryUtility {
    
    public static List<Account> getAccountsByIndustry(String industry) {
        // Implementation
    }
    
    public static List<Contact> getContactsByAccount(Id accountId) {
        // Implementation
    }
    
    public static Decimal getAccountTotalOpportunity(Id accountId) {
        // Implementation
    }
    
    public static List<Account> getAccountsCreatedThisMonth() {
        // Implementation
    }
}
```

---

## ✅ Checklist

### Day 5: SOQL Queries
- [ ] Written basic SOQL queries
- [ ] Implemented parent-to-child queries
- [ ] Implemented child-to-parent queries
- [ ] Used aggregate functions
- [ ] Tested queries in Developer Console
- [ ] Reviewed query results

### Day 6: DML Operations & Limits
- [ ] Implemented insert operations
- [ ] Implemented update operations
- [ ] Implemented delete operations
- [ ] Used Database methods for error handling
- [ ] Bulkified DML operations
- [ ] Applied Governor Limits best practices

---

## 🎓 Trailhead Modules

Complete these modules for deeper understanding:
- [ ] **SOQL & SOSL Queries** - https://trailhead.salesforce.com/content/learn/modules/soql_sosl
- [ ] **SOQL Queries** - https://trailhead.salesforce.com/content/learn/modules/soql_queries
- [ ] **Apex DML** - https://trailhead.salesforce.com/content/learn/modules/apex_dml
- [ ] **Governor Limits** - https://trailhead.salesforce.com/content/learn/modules/apex_governor_limits

---

## 📚 Next Steps

Sau khi hoàn thành Days 5-6:
1. ✅ Practice SOQL queries with different scenarios
2. ✅ Implement DML operations with error handling
3. ✅ Apply bulkification patterns
4. ✅ Review Governor Limits
5. ✅ Prepare for Day 7: Testing & Review

---

**Tiếp tục:** [Day 7: Testing & Review](./testing-review.md)
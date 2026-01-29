# Week 2, Day 7: Testing & Week 2 Review

## 📚 Learning Objectives

Sau khi hoàn thành các bài học này, bạn sẽ:
- ✅ Understand unit testing fundamentals
- ✅ Write test classes for triggers
- ✅ Use Test.startTest() and Test.stopTest()
- ✅ Implement assertions
- ✅ Achieve 75% code coverage
- ✅ Review Week 2 key concepts

---

## 🎯 Part 1: Unit Testing Fundamentals

### Why Write Tests?

| Benefit | Description |
|----------|-------------|
| **Code Quality** | Ensures code works as expected |
| **Deployment Requirement** | Required for production deployment |
| **Regression Prevention** | Catches bugs before deployment |
| **Documentation** | Shows how code should be used |
| **Refactoring Safety** | Allows safe code changes |

### Test Coverage Requirements

| Requirement | Coverage |
|-------------|-----------|
| **Production Deployment** | 75% minimum |
| **Apex Triggers** | 100% recommended |
| **Controllers** | 75% minimum |
| **Utility Classes** | 100% recommended |

### Test Class Structure

```apex
@isTest
private class AccountTriggerTest {
    
    @isTest
    static void testAccountTrigger() {
        // Test implementation
    }
}
```

---

## 🔧 Part 2: Test Methods

### @isTest Annotation

```apex
@isTest
private class AccountTriggerTest {
    
    @isTest
    static void testAccountInsert() {
        // This is a test method
    }
    
    @testSetup
    static void setupData() {
        // This runs once before all test methods
    }
}
```

### Test.startTest() and Test.stopTest()

```apex
@isTest
static void testAccountUpdate() {
    // Prepare test data
    Account acc = new Account(Name = 'Test Account');
    insert acc;
    
    // Start test - resets governor limits
    Test.startTest();
    
    // Perform operation to test
    acc.Industry = 'Technology';
    update acc;
    
    // Stop test - processes asynchronous code
    Test.stopTest();
    
    // Verify results
    Account result = [SELECT Industry FROM Account WHERE Id = :acc.Id];
    System.assertEquals('Technology', result.Industry);
}
```

### Assertions

| Method | Description | Example |
|--------|-------------|---------|
| **assertEquals()** | Verify values are equal | `assertEquals('A', actual)` |
| **assertNotEquals()** | Verify values are not equal | `assertNotEquals('A', actual)` |
| **assertTrue()** | Verify condition is true | `assertTrue(condition)` |
| **assertFalse()** | Verify condition is false | `assertFalse(condition)` |
| **assertNull()** | Verify value is null | `assertNull(actual)` |
| **assertNotNull()** | Verify value is not null | `assertNotNull(actual)` |

---

## 🏗️ Part 3: Testing Triggers

### Test for AccountTrigger

```apex
@isTest
private class AccountTriggerTest {
    
    @isTest
    static void testAccountInsertWithDefaultValues() {
        // Create test account
        Account acc = new Account(
            Name = 'Test Account'
            // Industry and AnnualRevenue not set
        );
        
        // Start test
        Test.startTest();
        insert acc;
        Test.stopTest();
        
        // Query and verify defaults were set by trigger
        Account result = [
            SELECT Industry, AnnualRevenue 
            FROM Account 
            WHERE Id = :acc.Id
        ];
        
        System.assertEquals('Technology', result.Industry);
        System.assertEquals(0, result.AnnualRevenue);
    }
    
    @isTest
    static void testAccountUpdateWithValues() {
        // Create test account
        Account acc = new Account(
            Name = 'Test Account',
            Industry = 'Finance',
            AnnualRevenue = 1000000
        );
        insert acc;
        
        // Update account
        Test.startTest();
        acc.Industry = 'Healthcare';
        update acc;
        Test.stopTest();
        
        // Verify update
        Account result = [
            SELECT Industry 
            FROM Account 
            WHERE Id = :acc.Id
        ];
        System.assertEquals('Healthcare', result.Industry);
    }
}
```

### Test for AccountDeletionPreventer

```apex
@isTest
private class AccountDeletionPreventerTest {
    
    @isTest
    static void testDeleteAccountWithContacts() {
        // Create test account with contact
        Account acc = new Account(Name = 'Test Account');
        insert acc;
        
        Contact con = new Contact(
            FirstName = 'John',
            LastName = 'Doe',
            AccountId = acc.Id
        );
        insert con;
        
        // Try to delete account - should fail
        Test.startTest();
        try {
            delete acc;
            System.assert(false, 'Expected exception not thrown');
        } catch (DmlException e) {
            System.assert(e.getMessage().contains('Cannot delete account with related contacts'));
        }
        Test.stopTest();
    }
    
    @isTest
    static void testDeleteAccountWithoutContacts() {
        // Create test account without contacts
        Account acc = new Account(Name = 'Test Account');
        insert acc;
        
        // Delete account - should succeed
        Test.startTest();
        delete acc;
        Test.stopTest();
        
        // Verify account was deleted
        List<Account> accounts = [
            SELECT Id 
            FROM Account 
            WHERE Id = :acc.Id
        ];
        System.assertEquals(0, accounts.size());
    }
}
```

---

## 📊 Part 4: Bulk Testing

### Testing with Multiple Records

```apex
@isTest
static void testBulkAccountInsert() {
    // Create multiple test accounts
    List<Account> accounts = new List<Account>();
    for (Integer i = 0; i < 200; i++) {
        accounts.add(new Account(Name = 'Test Account ' + i));
    }
    
    // Bulk insert
    Test.startTest();
    insert accounts;
    Test.stopTest();
    
    // Verify all accounts were created
    List<Account> results = [
        SELECT Id, Industry, AnnualRevenue 
        FROM Account 
        WHERE Name LIKE 'Test Account %'
    ];
    
    System.assertEquals(200, results.size());
    
    // Verify defaults for all accounts
    for (Account acc : results) {
        System.assertEquals('Technology', acc.Industry);
        System.assertEquals(0, acc.AnnualRevenue);
    }
}
```

---

## 🔍 Part 5: Testing with Limits

### Using Limits Class

```apex
@isTest
static void testGovernorLimits() {
    // Start test to reset limits
    Test.startTest();
    
    // Perform operations
    List<Account> accounts = new List<Account>();
    for (Integer i = 0; i < 50; i++) {
        accounts.add(new Account(Name = 'Account ' + i));
    }
    insert accounts;
    
    // Check SOQL queries used
    System.debug('SOQL queries: ' + Limits.getQueries());
    System.debug('SOQL queries allowed: ' + Limits.getLimitQueries());
    
    // Check DML statements
    System.debug('DML statements: ' + Limits.getDmlStatements());
    System.debug('DML statements allowed: ' + Limits.getLimitDmlStatements());
    
    Test.stopTest();
    
    // Verify operations
    System.assertEquals(1, Limits.getQueries());
    System.assertEquals(1, Limits.getDmlStatements());
}
```

---

## 🎯 Part 6: Best Practices

### Testing Best Practices

1. **Use @testSetup for common data**
   - Create test data once
   - Share across test methods
   - Faster test execution

2. **Use Test.startTest() and Test.stopTest()**
   - Reset governor limits
   - Process async code
   - Isolate test logic

3. **Test positive and negative scenarios**
   - Test happy path
   - Test error conditions
   - Test edge cases

4. **Use descriptive test method names**
   - `testAccountInsertWithDefaultValues`
   - Not `test1` or `testMethod`

5. **Assert expected results**
   - Don't just execute code
   - Verify actual = expected
   - Use appropriate assertions

6. **Test with realistic data**
   - Use meaningful field values
   - Test with multiple records
   - Test with edge cases

7. **Avoid hardcoded IDs**
   - Create test data
   - Don't use production IDs
   - Make tests portable

---

## 📝 Part 7: Week 2 Review

### Week 2 Key Concepts

#### Day 1-2: Apex Basics
- Apex syntax and data types
- Collections (List, Set, Map)
- Control structures
- Classes and methods
- Best practices

#### Day 3-4: Triggers
- Trigger context variables
- Before/after triggers
- Trigger Handler pattern
- Bulkification
- AccountDeletionPreventer trigger

#### Day 5-6: SOQL & DML
- SOQL query syntax
- Relationship queries
- Aggregate functions
- DML operations
- Governor limits

#### Day 7: Testing
- Unit testing fundamentals
- Test annotations
- Assertions
- Code coverage
- Test best practices

### Week 2 Practice Scenarios

#### Scenario 1: Complete Trigger Implementation

Create a ContactTrigger that:
- Validates email format on insert/update
- Creates a default task when contact is created
- Prevents deletion if contact has open tasks

#### Scenario 2: SOQL Query Optimization

Given 10,000 accounts, create a query that:
- Returns accounts with opportunities
- Includes total opportunity amount per account
- Filters by opportunity stage
- Limits results to top 100 by amount

#### Scenario 3: Test Coverage

Write test class for:
- AccountTrigger (80% coverage)
- AccountDeletionPreventer (100% coverage)
- QueryUtility class (90% coverage)

---

## ✅ Week 2 Checklist

### Day 7: Testing & Review
- [ ] Created test class for AccountTrigger
- [ ] Created test class for AccountDeletionPreventer
- [ ] Used Test.startTest() and Test.stopTest()
- [ ] Implemented assertions
- [ ] Achieved 75%+ code coverage
- [ ] Tested with bulk data
- [ ] Reviewed Week 2 concepts
- [ ] Completed practice scenarios

### Week 2 Overall Progress
- [ ] Apex Basics (Day 1-2)
- [ ] Triggers (Day 3-4)
- [ ] SOQL & DML (Day 5-6)
- [ ] Testing (Day 7)
- [ ] Week 2 Review completed

---

## 🎓 Trailhead Modules

Complete these modules for deeper understanding:
- [ ] Apex Testing - https://trailhead.salesforce.com/content/learn/modules/apex_testing
- [ ] Apex Testing Best Practices - https://trailhead.salesforce.com/content/learn/modules/apex_testing_best_practices
- [ ] Apex Testing Advanced - https://trailhead.salesforce.com/content/learn/modules/apex_testing_advanced

---

## 📚 Next Steps

Sau khi hoàn thành Week 2:
1. ✅ Review all Week 2 concepts
2. ✅ Practice writing test classes
3. ✅ Achieve 75%+ code coverage
4. ✅ Complete Week 2 practice scenarios
5. ✅ Prepare for Week 3: LWC

---

## 🎉 Week 2 Completion Summary

Congratulations on completing Week 2! You've learned:

**Skills Mastered:**
- ✅ Apex programming fundamentals
- ✅ Trigger development and best practices
- ✅ SOQL queries and DML operations
- ✅ Unit testing and code coverage
- ✅ Governor limits and bulkification

**Projects Completed:**
- ✅ Multiple utility classes
- ✅ AccountTrigger with handler pattern
- ✅ AccountDeletionPreventer trigger
- ✅ QueryUtility class
- ✅ Comprehensive test classes

**Ready For:**
- ✅ Platform Developer I exam topics
- ✅ Week 3: LWC development
- ✅ Real-world Salesforce development

---

**Tiếp tục:** [Week 3: LWC](/learn-salesforce/docs/week3/README)
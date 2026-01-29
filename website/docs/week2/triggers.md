# Week 2, Day 3-4: Apex Triggers

## 📚 Learning Objectives

Sau khi hoàn thành các bài học này, bạn sẽ:
- ✅ Hiểu trigger context variables
- ✅ Master before/after trigger execution
- ✅ Implement Trigger Handler pattern
- ✅ Write bulkified triggers
- ✅ Debug và test triggers
- ✅ Implement AccountDeletionPreventer trigger

---

## 🎯 Part 1: Trigger Fundamentals

### What is a Trigger?

Trigger là đoạn Apex code executes trước hoặc sau specific database operations.

### Trigger Events

| Event | Description | When it Fires |
|--------|-------------|---------------|
| before insert | Before record is created | Insert operation |
| after insert | After record is created | Insert operation |
| before update | Before record is updated | Update operation |
| after update | After record is updated | Update operation |
| before delete | Before record is deleted | Delete operation |
| after delete | After record is deleted | Delete operation |
| after undelete | After record is restored | Undelete operation |

### Before vs After Triggers

| Aspect | Before Trigger | After Trigger |
|---------|---------------|---------------|
| Record ID | Not assigned yet | Assigned |
| Record Values | Can modify | Read-only |
| Related Records | Cannot access | Can access |
| Use Cases | Validation, field updates | Related records, external systems |

### Trigger Context Variables

| Variable | Type | Description | Available In |
|-----------|-------|-------------|---------------|
| Trigger.new | List | New versions of records for insert and update | Insert, Update |
| Trigger.old | List | Old versions of records for update, delete, and undelete | Update, Delete, Undelete |
| Trigger.newMap | Map | Map of new record IDs to new records | Insert, Update |
| Trigger.oldMap | Map | Map of old record IDs to old records | Update, Delete, Undelete |
| Trigger.isInsert | Boolean | True if trigger is insert | Insert |
| Trigger.isUpdate | Boolean | True if trigger is update | Update |
| Trigger.isDelete | Boolean | True if trigger is delete | Delete |
| Trigger.isBefore | Boolean | True if trigger is before | Before insert, update, delete |
| Trigger.isAfter | Boolean | True if trigger is after | After insert, update, delete, undelete |
| Trigger.size | Integer | Number of records in trigger | All events |

---

## 🔧 Part 2: Creating Your First Trigger

### Simple Trigger Example

```apex
trigger AccountTrigger on Account (before insert, before update) {
    
    // Loop through all accounts in trigger
    for (Account acc : Trigger.new) {
        
        // Set Industry to Technology if not specified
        if (acc.Industry == null) {
            acc.Industry = 'Technology';
        }
        
        // Set Annual Revenue to 0 if not specified
        if (acc.AnnualRevenue == null) {
            acc.AnnualRevenue = 0;
        }
    }
}
```

### After Trigger Example

```apex
trigger AccountAfterTrigger on Account (after insert, after update) {
    
    List<Contact> contactsToCreate = new List<Contact>();
    
    // Create default contact for each new account
    for (Account acc : Trigger.new) {
        Contact con = new Contact(
            FirstName = 'Default',
            LastName = 'Contact',
            AccountId = acc.Id,
            Email = 'default@' + acc.Name + '.com'
        );
        contactsToCreate.add(con);
    }
    
    // Insert all contacts in one DML operation
    if (!contactsToCreate.isEmpty()) {
        insert contactsToCreate;
    }
}
```

---

## 🏗️ Part 3: Trigger Handler Pattern

### Why Use Handler Pattern?

- One trigger per object
- Centralized logic
- Easy to test
- Clean architecture

### Trigger Implementation

```apex
trigger AccountTrigger on Account (
    before insert, 
    before update, 
    before delete, 
    after insert, 
    after update, 
    after delete
) {
    // Call handler
    AccountTriggerHandler handler = new AccountTriggerHandler();
    
    if (Trigger.isBefore) {
        if (Trigger.isInsert) {
            handler.beforeInsert(Trigger.new);
        } else if (Trigger.isUpdate) {
            handler.beforeUpdate(Trigger.new, Trigger.oldMap);
        } else if (Trigger.isDelete) {
            handler.beforeDelete(Trigger.old, Trigger.oldMap);
        }
    } else if (Trigger.isAfter) {
        if (Trigger.isInsert) {
            handler.afterInsert(Trigger.new, Trigger.newMap);
        } else if (Trigger.isUpdate) {
            handler.afterUpdate(Trigger.new, Trigger.newMap, Trigger.oldMap);
        } else if (Trigger.isDelete) {
            handler.afterDelete(Trigger.old, Trigger.oldMap);
        }
    }
}
```

---

## 🚫 Part 4: AccountDeletionPreventer Trigger

### Project Requirement

Prevent deletion of Account if it has related Contacts.

### Implementation

```apex
trigger AccountDeletionPreventer on Account (before delete) {
    
    // Get all Account IDs from trigger
    Set<Id> accountIds = new Set<Id>();
    for (Account acc : Trigger.old) {
        accountIds.add(acc.Id);
    }
    
    // Query for Contacts related to these Accounts
    List<Contact> relatedContacts = [
        SELECT Id, AccountId 
        FROM Contact 
        WHERE AccountId IN :accountIds
    ];
    
    // Check if any contacts exist
    if (!relatedContacts.isEmpty()) {
        // Create error to prevent deletion
        Trigger.old[0].addError(
            'Cannot delete account with related contacts'
        );
    }
}
```

### Helper Class

```apex
public class AccountDeletionPreventerHelper {
    
    public static void preventAccountDeletion(List<Account> accounts) {
        
        // Get all Account IDs
        Set<Id> accountIds = new Set<Id>();
        for (Account acc : accounts) {
            accountIds.add(acc.Id);
        }
        
        // Query for related contacts
        List<Contact> relatedContacts = [
            SELECT Id, AccountId 
            FROM Contact 
            WHERE AccountId IN :accountIds
        ];
        
        // Map contacts to accounts
        Map<Id, List<Contact>> accountContactsMap = new Map<Id, List<Contact>>();
        for (Contact con : relatedContacts) {
            if (!accountContactsMap.containsKey(con.AccountId)) {
                accountContactsMap.put(con.AccountId, new List<Contact>());
            }
            accountContactsMap.get(con.AccountId).add(con);
        }
        
        // Add errors to accounts with contacts
        for (Account acc : accounts) {
            if (accountContactsMap.containsKey(acc.Id) && 
                !accountContactsMap.get(acc.Id).isEmpty()) {
                
                Integer contactCount = accountContactsMap.get(acc.Id).size();
                acc.addError(
                    'Cannot delete account ' + acc.Name + 
                    ' because it has ' + contactCount + ' related contacts'
                );
            }
        }
    }
}
```

---

## 🔄 Part 5: Bulkification

### What is Bulkification?

Bulkification là practice of writing code that handles multiple records efficiently to avoid governor limits.

### Non-Bulkified Code (BAD)

```apex
trigger BadTrigger on Account (after update) {
    
    // BAD: SOQL inside loop - Will hit governor limits!
    for (Account acc : Trigger.new) {
        
        // Query for contacts for each account
        List<Contact> contacts = [
            SELECT Id, FirstName, LastName 
            FROM Contact 
            WHERE AccountId = :acc.Id
        ];
        
        // Update contacts
        for (Contact con : contacts) {
            con.Description = 'Account updated';
        }
        
        // BAD: DML inside loop - Will hit governor limits!
        update contacts;
    }
}
```

### Bulkified Code (GOOD)

```apex
trigger GoodTrigger on Account (after update) {
    
    // GOOD: Collect all account IDs first
    Set<Id> accountIds = new Set<Id>();
    for (Account acc : Trigger.new) {
        accountIds.add(acc.Id);
    }
    
    // GOOD: Single SOQL query for all accounts
    List<Contact> allContacts = [
        SELECT Id, FirstName, LastName, AccountId 
        FROM Contact 
        WHERE AccountId IN :accountIds
    ];
    
    // Update contacts
    for (Contact con : allContacts) {
        con.Description = 'Account updated';
    }
    
    // GOOD: Single DML operation for all contacts
    update allContacts;
}
```

---

## 🐛 Part 6: Debugging Triggers

### Using Debug Logs

Steps:
1. Setup -> Debug Logs -> New
2. Set Debug Level (default is fine for now)
3. Save and Monitor
4. Perform action that triggers trigger
5. Open debug log from monitoring page

### System.debug() Examples

```apex
trigger DebugTrigger on Account (before insert) {
    
    // Debug message with string
    System.debug('Trigger started');
    
    // Debug with variable
    System.debug('Trigger size: ' + Trigger.size);
    
    // Debug with object
    System.debug('New accounts: ' + Trigger.new);
    
    // Debug with specific field
    for (Account acc : Trigger.new) {
        System.debug('Account Name: ' + acc.Name);
    }
    
    // Debug with log level
    System.debug(LoggingLevel.INFO, 'Information message');
    System.debug(LoggingLevel.WARN, 'Warning message');
    System.debug(LoggingLevel.ERROR, 'Error message');
}
```

---

## 💡 Part 7: Best Practices

### Trigger Best Practices

1. One trigger per object
   - Use handler pattern
   - Avoid multiple triggers on same object

2. Always bulkify
   - Handle multiple records
   - Don't assume single record

3. Use handler pattern
   - Separate logic from trigger
   - Don't put all logic in trigger

4. Avoid SOQL/DML in loops
   - Query once, process many
   - Don't query many times

5. Add error handling
   - Use addError() for validation
   - Don't have silent failures

6. Document triggers
   - Add comments explaining logic
   - Don't have mysterious code

7. Test thoroughly
   - Test with single and bulk records
   - Don't test only with single record

---

## 📝 Practice Exercise

Task: Create ContactTrigger with validation

Requirements:
1. Prevent contact creation without email
2. Prevent email update to invalid format
3. Create ContactTriggerHandler class
4. Implement before insert and before update handlers
5. Use helper methods for validation

Time Estimate: 45 minutes

Validation Rules:
- Email cannot be null or blank
- Email must contain @ symbol
- Email must contain domain (.)

---

## ✅ Checklist

### Day 3: Trigger Fundamentals
- [ ] Created first simple trigger
- [ ] Understood trigger context variables
- [ ] Implemented before insert trigger
- [ ] Implemented after insert trigger
- [ ] Tested triggers in Developer Console
- [ ] Reviewed debug logs

### Day 4: Handler Pattern & Bulkification
- [ ] Implemented Trigger Handler pattern
- [ ] Created AccountDeletionPreventer trigger
- [ ] Bulkified trigger logic
- [ ] Added error handling
- [ ] Tested with multiple records
- [ ] Documented trigger behavior

---

## 🎓 Trailhead Modules

Complete these modules for deeper understanding:
- [ ] Apex Triggers - https://trailhead.salesforce.com/content/learn/modules/apex_triggers
- [ ] Apex Triggers & SOQL - https://trailhead.salesforce.com/content/learn/modules/apex_triggers_soql
- [ ] Apex Bulkification - https://trailhead.salesforce.com/content/learn/modules/apex_bulkification

---

## 📚 Next Steps

Sau khi hoàn thành Days 3-4:
1. ✅ Practice trigger handler pattern
2. ✅ Implement AccountDeletionPreventer trigger
3. ✅ Test triggers with bulk data
4. ✅ Review bulkification patterns
5. ✅ Prepare for Day 5-6: SOQL & DML

---

Tiếp tục: [Day 5-6: SOQL & DML](./soql-dml.md)
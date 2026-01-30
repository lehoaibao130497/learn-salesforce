---
slug: apex-cho-nguoi-moi-bat-dau
title: "Apex cho người mới bắt đầu: Hướng dẫn hoàn chỉnh"
authors: [hoclai]
tags: [tuan-2, apex, lap-trinh, backend, bat-dau]
---

Tuần 2 là khi tôi thực sự bước vào thế giới lập trình Salesforce với **Apex**. Đây là ngôn ngữ backend chính thức của Salesforce, rất giống Java. Trong bài viết này, tôi sẽ chia sẻ những gì tôi học được về Apex từ con số không.

## 🎯 Apex là gì?

Apex là một ngôn ngữ lập trình:
- Strongly-typed (kiểm tra kiểu dữ liệu nghiêm ngặt)
- Object-oriented (hướng đối tượng)
- Runs on Salesforce servers (server-side)
- Resembles Java syntax

### Khi nào dùng Apex?

```
✅ Dùng Apex khi:
- Business logic quá phức tạp cho Flow
- Cần xử lý hàng ngàn records (bulk operations)
- Cần call external APIs
- Cần custom validation logic phức tạp
- Cần integration với các hệ thống khác

❌ KHÔNG dùng Apex khi:
- Flow có thể làm được (Flow dễ maintain hơn)
- Nhiệm vụ đơn giản (Formula field đủ)
- Chỉ cần CRUD operations (standard features)
```

## 📚 Cấu trúc cơ bản của Apex

### 1. Variables & Data Types

```apex
// Primitive Types
Integer i = 10;
Decimal d = 10.5;
Boolean isActive = true;
String name = 'Salesforce';
Date todayDate = Date.today();
DateTime now = DateTime.now();
ID accountId = '001xx000003DGb2AAG';

// Collections
List<String> names = new List<String>{'John', 'Jane', 'Bob'};
Set<Integer> uniqueNumbers = new Set<Integer>{1, 2, 3, 3}; // {1, 2, 3}
Map<String, Integer> scores = new Map<String, Integer>();
scores.put('John', 95);
scores.put('Jane', 87);

// SOQL Query Results
List<Account> accounts = [SELECT Id, Name FROM Account LIMIT 10];

// sObjects (Salesforce Objects)
Account acc = new Account();
acc.Name = 'Test Account';
acc.BillingCity = 'Ho Chi Minh City';
```

### 2. Control Flow

```apex
// If-Else
Integer score = 85;
if (score >= 90) {
    System.debug('Grade: A');
} else if (score >= 80) {
    System.debug('Grade: B');
} else {
    System.debug('Grade: C or lower');
}

// For Loop
List<Account> accounts = [SELECT Id, Name FROM Account LIMIT 10];
for (Account acc : accounts) {
    System.debug('Account: ' + acc.Name);
}

// For Loop với index
for (Integer i = 0; i < accounts.size(); i++) {
    System.debug('Account ' + i + ': ' + accounts[i].Name);
}

// While Loop
Integer count = 0;
while (count < 5) {
    System.debug('Count: ' + count);
    count++;
}

// Do-While Loop
do {
    System.debug('At least once');
} while (false);
```

### 3. Classes & Methods

```apex
public class AccountManager {
    // Instance variable
    private String currentUserId;
    
    // Constructor
    public AccountManager() {
        this.currentUserId = UserInfo.getUserId();
    }
    
    // Public method
    public List<Account> getActiveAccounts() {
        List<Account> accounts = [SELECT Id, Name 
                                    FROM Account 
                                    WHERE Active__c = true];
        return accounts;
    }
    
    // Private method
    private void validateAccount(Account acc) {
        if (String.isBlank(acc.Name)) {
            throw new IllegalArgumentException('Account name is required');
        }
    }
    
    // Static method
    public static Account createAccount(String name, String industry) {
        Account acc = new Account(
            Name = name,
            Industry = industry
        );
        return acc;
    }
}

// Sử dụng class
AccountManager manager = new AccountManager();
List<Account> accounts = manager.getActiveAccounts();

Account newAcc = AccountManager.createAccount(
    'New Account', 
    'Technology'
);
```

## 🔥 SOQL: Salesforce Object Query Language

SOQL tương tự SQL nhưng được thiết kế cho Salesforce data.

### Cơ bản về SOQL

```apex
// SELECT basics
List<Account> accounts = [SELECT Id, Name, Industry 
                            FROM Account 
                            WHERE Industry = 'Technology'];

// SELECT với LIMIT
List<Account> topAccounts = [SELECT Id, Name 
                              FROM Account 
                              ORDER BY CreatedDate DESC 
                              LIMIT 5];

// SELECT với AND/OR
List<Account> accounts = [SELECT Id, Name 
                            FROM Account 
                            WHERE (Industry = 'Technology' 
                                   OR Industry = 'Finance')
                            AND BillingState = 'CA'];

// SELECT với relationship fields
List<Contact> contacts = [SELECT Id, Name, Account.Name, Account.Industry 
                          FROM Contact 
                          WHERE Account.Industry = 'Technology'];

// SELECT với LIKE
List<Account> accounts = [SELECT Id, Name 
                            FROM Account 
                            WHERE Name LIKE '%Inc%'];

// SELECT với child relationships (subqueries)
List<Account> accounts = [SELECT Id, Name, 
                                  (SELECT Id, FirstName, LastName 
                                   FROM Contacts 
                                   ORDER BY LastName)
                            FROM Account 
                            WHERE Id = :accountId];
```

### DML Operations

```apex
// INSERT
Account newAccount = new Account(
    Name = 'Test Account',
    Industry = 'Technology'
);
insert newAccount;
System.debug('New Account ID: ' + newAccount.Id);

// UPDATE
Account acc = [SELECT Id, Name, Industry 
               FROM Account 
               WHERE Name = 'Test Account' 
               LIMIT 1];
acc.Industry = 'Finance';
update acc;

// DELETE
Account accToDelete = [SELECT Id FROM Account WHERE Name = 'Test Account' LIMIT 1];
delete accToDelete;

// UPSERT (Update hoặc Insert)
Account acc = new Account(
    Name = 'Unique Account Name',
    External_Id__c = 'UNIQUE123'
);
upsert acc External_Id__c;

// Bulk Operations
List<Account> accountsToInsert = new List<Account>();
for (Integer i = 0; i < 100; i++) {
    accountsToInsert.add(new Account(Name = 'Account ' + i));
}
insert accountsToInsert; // Chỉ 1 DML statement!
```

## 🎯 Apex Triggers

Triggers tự động chạy khi record được tạo, cập nhật, hoặc xóa.

### Cấu trúc Trigger

```apex
trigger AccountTrigger on Account (
    before insert, 
    before update, 
    after insert, 
    after update, 
    before delete, 
    after delete
) {
    // Logic ở đây
}
```

### Ví dụ thực tế: Prevent Account Deletion

```apex
trigger AccountDeletionPreventer on Account (before delete) {
    for (Account acc : Trigger.old) {
        // Prevent deletion if account has opportunities
        List<Opportunity> opps = [SELECT Id 
                                   FROM Opportunity 
                                   WHERE AccountId = :acc.Id 
                                   LIMIT 1];
        if (!opps.isEmpty()) {
            acc.addError('Không thể xóa Account có Opportunities liên quan');
        }
    }
}
```

### Ví dụ: Auto-populate fields

```apex
trigger AccountAutoUpdate on Account (before insert, before update) {
    for (Account acc : Trigger.new) {
        // Set default industry if not specified
        if (acc.Industry == null) {
            acc.Industry = 'Other';
        }
        
        // Auto-populate description
        if (String.isBlank(acc.Description)) {
            acc.Description = 'Created on ' + Date.today().format();
        }
    }
}
```

### Best Practices cho Triggers

```apex
// ❌ BAD: Logic trong trigger
trigger AccountTrigger on Account (before insert) {
    for (Account acc : Trigger.new) {
        // 100+ dòng logic ở đây = KHÔNG TỐT
    }
}

// ✅ GOOD: Gọi handler class
trigger AccountTrigger on Account (before insert, before update) {
    AccountTriggerHandler handler = new AccountTriggerHandler();
    if (Trigger.isInsert) {
        handler.onBeforeInsert(Trigger.new);
    } else if (Trigger.isUpdate) {
        handler.onBeforeUpdate(Trigger.old, Trigger.new);
    }
}
```

## 🧪 Apex Testing

Salesforce yêu cầu **75% code coverage** để deploy code lên production.

### Cấu trúc Test Class

```apex
@isTest
private class AccountManagerTest {
    
    // Test setup method (chạy trước mỗi test method)
    @testSetup
    static void setupData() {
        List<Account> accounts = new List<Account>();
        for (Integer i = 0; i < 10; i++) {
            accounts.add(new Account(
                Name = 'Test Account ' + i,
                Industry = 'Technology'
            ));
        }
        insert accounts;
    }
    
    @isTest
    static void testGetActiveAccounts() {
        // Test logic ở đây
        AccountManager manager = new AccountManager();
        List<Account> accounts = manager.getActiveAccounts();
        
        // Assertions
        System.assertEquals(10, accounts.size(), 'Should return 10 accounts');
    }
    
    @isTest
    static void testCreateAccount() {
        Test.startTest();
        Account acc = AccountManager.createAccount('Test', 'Finance');
        Test.stopTest();
        
        System.assertNotEquals(null, acc.Id, 'Account should be created');
        System.assertEquals('Finance', acc.Industry, 'Industry should be Finance');
    }
}
```

### Test Triggers

```apex
@isTest
private class AccountTriggerTest {
    
    @isTest
    static void testPreventAccountDeletionWithOpportunities() {
        // Setup
        Account acc = new Account(Name = 'Test Account');
        insert acc;
        
        Opportunity opp = new Opportunity(
            Name = 'Test Opportunity',
            AccountId = acc.Id,
            StageName = 'Prospecting',
            CloseDate = Date.today().addDays(30)
        );
        insert opp;
        
        // Test
        Test.startTest();
        try {
            delete acc;
            System.assert(false, 'Should have thrown exception');
        } catch (DmlException e) {
            System.assert(e.getMessage().contains('Không thể xóa Account'));
        }
        Test.stopTest();
    }
    
    @isTest
    static void testAutoPopulateFields() {
        Account acc = new Account(Name = 'Test Account');
        insert acc;
        
        // Query để verify
        Account insertedAcc = [SELECT Industry, Description 
                               FROM Account 
                               WHERE Id = :acc.Id 
                               LIMIT 1];
        
        System.assertEquals('Other', insertedAcc.Industry);
        System.assert(insertedAcc.Description.contains(Date.today().format()));
    }
}
```

## 💡 Best Practices tôi học được

### 1. Tránh SOQL trong vòng lặp

```apex
// ❌ BAD: 101 SOQL queries
List<Account> accounts = [SELECT Id, Name FROM Account LIMIT 100];
for (Account acc : accounts) {
    List<Contact> contacts = [SELECT Id, Name FROM Contact WHERE AccountId = :acc.Id];
    // Xử lý contacts
}

// ✅ GOOD: 1 SOQL query
List<Account> accounts = [SELECT Id, Name, 
                                 (SELECT Id, Name FROM Contacts)
                          FROM Account 
                          LIMIT 100];
for (Account acc : accounts) {
    List<Contact> contacts = acc.Contacts;
    // Xử lý contacts
}
```

### 2. Tránh DML trong vòng lặp

```apex
// ❌ BAD: 150 DML operations
List<Account> accounts = new List<Account>();
for (Integer i = 0; i < 100; i++) {
    Account acc = new Account(Name = 'Account ' + i);
    insert acc; // ❌ BAD
}

// ✅ GOOD: 1 DML operation
List<Account> accounts = new List<Account>();
for (Integer i = 0; i < 100; i++) {
    accounts.add(new Account(Name = 'Account ' + i));
}
insert accounts; // ✅ GOOD - bulkified
```

### 3. Luôn kiểm tra null

```apex
// ❌ BAD: Có thể gây NullPointerException
String name = acc.Name;
System.debug(name.length());

// ✅ GOOD: Kiểm tra null trước
if (acc != null && acc.Name != null) {
    System.debug(acc.Name.length());
}

// ✅ EVEN BETTER: Dùng safe navigation operator
System.debug(acc?.Name?.length());
```

### 4. Sử dụng Describe khi cần

```apex
// Check nếu field tồn tại
if (Schema.sObjectType.Account.fields.Name.isAccessible()) {
    Account acc = [SELECT Name FROM Account LIMIT 1];
}

// Get picklist values
List<Schema.PicklistEntry> industries = 
    Account.Industry.getDescribe().getPicklistValues();
```

## 🐛 Debugging Apex

### Sử dụng System.debug()

```apex
Account acc = [SELECT Id, Name FROM Account LIMIT 1];

// Debug đơn giản
System.debug('Account: ' + acc.Name);

// Debug với label
System.debug('Account Name: ' + acc.Name);

// Debug collection
List<Account> accounts = [SELECT Id, Name FROM Account LIMIT 10];
for (Account a : accounts) {
    System.debug('Account: ' + a.Name);
}

// Debug với JSON (rất hữu ích)
System.debug(JSON.serializePretty(acc));
```

### Debug Logs trong Setup

1. Vào **Setup** → **Debug Logs**
2. Thêm **User** để monitor
3. Thực hiện action
4. Xem log trong **Debug Logs**

## 📈 Kết quả Tuần 2

Sau Tuần 2, tôi đã hoàn thành:

- ✅ **5 Apex Classes** với các methods khác nhau
- ✅ **3 Apex Triggers** cho business logic
- ✅ **10 Test Classes** với 85%+ coverage
- ✅ **20+ SOQL queries** tối ưu
- ✅ **Hiểu rõ** Governor Limits
- ✅ **Debug skills** tốt hơn

## 💭 Những bài học quan trọng

1. **Bulkify everything**: Luôn nghĩ về xử lý hàng ngàn records.
2. **Test your code**: Đừng deploy nếu không có test.
3. **Follow best practices**: Đừng viết code "just to make it work".
4. **Debug early**: Debug sớm hơn là debug sau.
5. **Learn from examples**: LWC Recipes và Apex Recipes rất hữu ích.

## 🚀 Chuẩn bị cho Tuần 3

Tuần 3 sẽ tập trung vào **Lightning Web Components (LWC)** - lập trình frontend. Tôi rất hào hứng vì đây là phần hiện đại nhất của Salesforce!

---

**Bài viết tiếp theo**: [SOQL Queries từ Cơ bản đến Nâng cao](#) (coming soon)

Bạn có câu hỏi gì về Apex? Hãy để lại bình luận bên dưới! 💬

**Tags**: #Salesforce #PlatformDeveloperI #Apex #SOQL #Programming #Backend
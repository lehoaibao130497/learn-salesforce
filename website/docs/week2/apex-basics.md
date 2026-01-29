# Week 2, Day 1-2: Apex Basics

## 📚 Learning Objectives

Sau khi hoàn thành các bài học này, bạn sẽ:
- ✅ Hiểu Apex syntax và structure
- ✅ Master variables, data types, và operators
- ✅ Viết Apex classes và methods
- ✅ Sử dụng control structures (if/else, loops)
- ✅ Hiểu class constructors và access modifiers
- ✅ Setup development environment

---

## 🎯 Part 1: Apex Overview

### What is Apex?

**Apex** là strongly-typed, object-oriented programming language cho Salesforce:
- **Java-like syntax** - Cú pháp tương tự Java
- **Runs on Salesforce** - Execute trên Salesforce servers
- **Database integration** - Native SOQL và DML support
- **Governor limits** - Multi-tenant architecture limits

### When to Use Apex?

| Scenario | Use Apex? | Alternative |
|-----------|------------|-------------|
| Simple field updates | ❌ No | Flow Builder |
| Email notifications | ❌ No | Flow Builder |
| Complex business logic | ✅ Yes | - |
| External API integration | ✅ Yes | - |
| Complex calculations | ✅ Yes | - |
| Bulk data processing | ✅ Yes | - |

### Apex vs Flow

| Aspect | Apex | Flow |
|--------|-------|-------|
| **Learning Curve** | Steeper | Easier |
| **Development Time** | Longer | Shorter |
| **Complexity** | Handles complex | Limited |
| **Performance** | Better for bulk | Slower for bulk |
| **Testing** | Required | Optional |
| **Maintenance** | Code review needed | Visual |

---

## 🔧 Part 2: Setting Up Development Environment

### Option 1: Developer Console (Quick Start)

**Path:** Setup → Developer Console

**Pros:**
- ✅ No installation needed
- ✅ Built-in debugging
- ✅ Quick testing

**Cons:**
- ❌ Limited features
- ❌ No code completion
- ❌ Difficult for large projects

### Option 2: VS Code (Recommended)

**Installation:**
1. Download [VS Code](https://code.visualstudio.com/)
2. Install [Salesforce Extension Pack](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode)
3. Install [Apex PMD](https://marketplace.visualstudio.com/items?itemName=VSierraV.apex-pmd)

**Setup:**
```bash
# Authorize your org
SFDX: Authorize an Org
Select: Salesforce org
Open browser and authorize
```

**Pros:**
- ✅ Full-featured IDE
- ✅ Code completion
- ✅ Git integration
- ✅ Linting and formatting
- ✅ Test runner

**Cons:**
- ❌ Requires installation
- ❌ Initial setup time

---

## 🏗️ Part 3: Apex Syntax Basics

### 1. Variables and Data Types

**Primitive Types:**

```apex
// String
String name = 'John Doe';
String message = 'Hello, ' + name;

// Integer
Integer count = 10;
Integer total = count + 5;

// Decimal
Decimal price = 99.99;
Decimal tax = price * 0.1;

// Boolean
Boolean isValid = true;
Boolean isComplete = false;

// Date
Date today = Date.today();
Date future = Date.today().addDays(7);

// DateTime
DateTime now = DateTime.now();

// ID
Id accountId = '00128000002RZ2l';
Id recordId = '00128000002RZ2l'; // Automatically casts
```

**Collections:**

```apex
// List - Ordered collection, allows duplicates
List<String> names = new List<String>();
names.add('Alice');
names.add('Bob');
names.add('Charlie');

// Initialize with values
List<Integer> numbers = new List<Integer>{1, 2, 3, 4, 5};

// Access by index
String firstName = names.get(0); // 'Alice'
Integer firstNumber = numbers[0]; // 1

// Size
Integer size = names.size(); // 3

// Loop through list
for (String name : names) {
    System.debug('Name: ' + name);
}
```

```apex
// Set - Unordered, no duplicates
Set<String> uniqueNames = new Set<String>();
uniqueNames.add('Alice');
uniqueNames.add('Bob');
uniqueNames.add('Alice'); // Won't add - duplicate

// Contains
Boolean hasAlice = uniqueNames.contains('Alice'); // true

// Remove
uniqueNames.remove('Bob');

// Size
Integer setSize = uniqueNames.size(); // 1
```

```apex
// Map - Key-value pairs
Map<Id, Account> accountMap = new Map<Id, Account>();

// Put
Account acc1 = new Account(Name = 'Account 1');
accountMap.put(acc1.Id, acc1);

Account acc2 = new Account(Name = 'Account 2');
accountMap.put(acc2.Id, acc2);

// Get
Account retrievedAcc = accountMap.get(acc1.Id);

// Check key exists
Boolean hasKey = accountMap.containsKey(acc1.Id);

// Get all keys
Set<Id> allIds = accountMap.keySet();

// Get all values
List<Account> allAccounts = accountMap.values();
```

**sObject Types:**

```apex
// Standard Objects
Account acc = new Account();
acc.Name = 'New Account';
acc.Industry = 'Technology';
acc.AnnualRevenue = 1000000;

// Custom Objects
Project__c proj = new Project__c();
proj.Name = 'New Project';
proj.Status__c = 'Planning';
proj.Priority__c = 'High';

// Query and update
Account queriedAcc = [SELECT Id, Name FROM Account WHERE Name = 'New Account' LIMIT 1];
if (queriedAcc != null) {
    queriedAcc.Industry = 'Finance';
    update queriedAcc;
}
```

### 2. Operators

```apex
// Arithmetic
Integer a = 10, b = 3;
Integer sum = a + b;        // 13
Integer diff = a - b;       // 7
Integer product = a * b;    // 30
Integer quotient = a / b;    // 3 (integer division)
Integer remainder = a % b;   // 1

// Comparison
Boolean isEqual = (a == b);     // false
Boolean isNotEqual = (a != b);  // true
Boolean isGreater = (a > b);    // true
Boolean isLess = (a < b);       // false

// Logical
Boolean x = true, y = false;
Boolean andResult = x && y;     // false
Boolean orResult = x || y;      // true
Boolean notResult = !x;         // false

// Assignment
Integer value = 10;
value += 5;   // 15
value -= 3;   // 12
value *= 2;   // 24
value /= 4;   // 6
```

### 3. Control Structures

**If-Else:**

```apex
Integer score = 85;

if (score >= 90) {
    System.debug('Grade: A');
} else if (score >= 80) {
    System.debug('Grade: B');
} else if (score >= 70) {
    System.debug('Grade: C');
} else {
    System.debug('Grade: F');
}
```

**Switch:**

```apex
String status = 'Completed';

switch on status {
    when 'Planning' {
        System.debug('Project is in planning phase');
    }
    when 'In Progress' {
        System.debug('Project is in progress');
    }
    when 'Completed' {
        System.debug('Project is completed');
    }
    when else {
        System.debug('Unknown status');
    }
}
```

**For Loop:**

```apex
// Traditional for loop
List<Integer> numbers = new List<Integer>{1, 2, 3, 4, 5};
for (Integer i = 0; i < numbers.size(); i++) {
    System.debug('Number: ' + numbers[i]);
}

// Enhanced for loop (for-each)
for (Integer num : numbers) {
    System.debug('Number: ' + num);
}

// Range-based for loop
for (Integer i = 0; i < 10; i++) {
    System.debug('Iteration: ' + i);
}
```

**While Loop:**

```apex
Integer counter = 0;
while (counter < 5) {
    System.debug('Counter: ' + counter);
    counter++;
}
```

**Do-While Loop:**

```apex
Integer counter = 0;
do {
    System.debug('Counter: ' + counter);
    counter++;
} while (counter < 5);
```

---

## 📦 Part 4: Apex Classes and Methods

### Class Structure

```apex
public class Calculator {
    
    // Class-level variables
    private Double result;
    
    // Constructor
    public Calculator() {
        this.result = 0.0;
    }
    
    // Method with parameters
    public Double add(Double a, Double b) {
        result = a + b;
        System.debug(a + ' + ' + b + ' = ' + result);
        return result;
    }
    
    // Overloaded method
    public Double add(List<Double> numbers) {
        result = 0.0;
        for (Double num : numbers) {
            result += num;
        }
        return result;
    }
    
    // Method without return value
    public void clear() {
        result = 0.0;
        System.debug('Calculator cleared');
    }
    
    // Getter method
    public Double getResult() {
        return result;
    }
}
```

### Access Modifiers

| Modifier | Description | Access Level |
|----------|-------------|--------------|
| **public** | Accessible everywhere | Anywhere |
| **private** | Accessible only within class | Class only |
| **protected** | Accessible within class and subclasses | Class + subclasses |
| **global** | Accessible anywhere (managed packages) | Anywhere |

```apex
public class ExampleClass {
    
    // Public variable - accessible from anywhere
    public String publicVar = 'Public';
    
    // Private variable - only within this class
    private String privateVar = 'Private';
    
    // Public method
    public void publicMethod() {
        System.debug('Public method');
    }
    
    // Private method
    private void privateMethod() {
        System.debug('Private method');
    }
    
    // Helper method (no modifier = private)
    void helperMethod() {
        System.debug('Helper method');
    }
}
```

### Static Methods and Variables

```apex
public class Utility {
    
    // Static variable - shared across all instances
    private static Integer counter = 0;
    
    // Static method - can be called without instance
    public static String generateId() {
        counter++;
        return 'ID-' + counter;
    }
    
    // Instance method
    public void instanceMethod() {
        System.debug('Instance method');
    }
}

// Usage
String id1 = Utility.generateId(); // ID-1
String id2 = Utility.generateId(); // ID-2
String id3 = Utility.generateId(); // ID-3
```

---

## 🧪 Part 5: First Apex Class - Hello World

### Simple Hello World

```apex
public class HelloWorld {
    
    public static void sayHello() {
        System.debug('Hello, Salesforce!');
    }
    
    public static void sayHello(String name) {
        System.debug('Hello, ' + name + '!');
    }
    
    public static void greet(String name, String greeting) {
        System.debug(greeting + ', ' + name + '!');
    }
}
```

### Execute in Developer Console

1. Open Developer Console
2. Debug → Open Execute Anonymous Window
3. Enter code:
```apex
HelloWorld.sayHello();
HelloWorld.sayHello('John');
HelloWorld.greet('Jane', 'Good morning');
```
4. Click **Execute**
5. Check **Debug Only** checkbox in logs

---

## 🎯 Part 6: Practical Examples

### Example 1: Calculate Project Budget

```apex
public class ProjectCalculator {
    
    public static Decimal calculateBudgetVariance(Decimal budget, Decimal actualCost) {
        Decimal variance = budget - actualCost;
        
        if (variance > 0) {
            System.debug('Under budget by: $' + variance);
        } else if (variance < 0) {
            System.debug('Over budget by: $' + Math.abs(variance));
        } else {
            System.debug('On budget');
        }
        
        return variance;
    }
    
    public static Boolean isProjectOnTrack(Decimal budget, Decimal actualCost) {
        Decimal variance = calculateBudgetVariance(budget, actualCost);
        
        // Consider on track if within 10% variance
        Decimal tolerance = budget * 0.1;
        
        return Math.abs(variance) <= tolerance;
    }
}
```

### Example 2: Task Priority Calculator

```apex
public class TaskPriorityCalculator {
    
    public static String calculatePriority(Date dueDate, Decimal hoursEstimated) {
        Date today = Date.today();
        Integer daysUntilDue = dueDate.daysBetween(today);
        
        // Calculate priority based on due date and estimated hours
        if (daysUntilDue < 0) {
            return 'Critical'; // Overdue
        } else if (daysUntilDue <= 2 && hoursEstimated > 8) {
            return 'Critical'; // Due soon and large task
        } else if (daysUntilDue <= 3) {
            return 'High';
        } else if (daysUntilDue <= 7) {
            return 'Medium';
        } else {
            return 'Low';
        }
    }
}
```

### Example 3: Contact Formatter

```apex
public class ContactFormatter {
    
    public static String formatFullName(String firstName, String lastName) {
        return firstName + ' ' + lastName;
    }
    
    public static String formatEmail(String firstName, String lastName, String domain) {
        String cleanFirst = firstName.toLowerCase().trim();
        String cleanLast = lastName.toLowerCase().trim();
        return cleanFirst + '.' + cleanLast + '@' + domain;
    }
    
    public static String formatPhoneNumber(String phone) {
        // Remove non-numeric characters
        String cleanPhone = phone.replaceAll('[^0-9]', '');
        
        // Format as (XXX) XXX-XXXX
        if (cleanPhone.length() == 10) {
            String areaCode = cleanPhone.substring(0, 3);
            String prefix = cleanPhone.substring(3, 6);
            String lineNumber = cleanPhone.substring(6, 10);
            return '(' + areaCode + ') ' + prefix + '-' + lineNumber;
        }
        
        return phone; // Return original if not 10 digits
    }
}
```

---

## 💡 Part 7: Best Practices

### Naming Conventions

| Type | Convention | Example |
|------|-------------|---------|
| **Class** | PascalCase | `AccountService` |
| **Method** | camelCase | `calculateTotal` |
| **Variable** | camelCase | `accountName` |
| **Constant** | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| **Test Class** | + `Test` | `AccountServiceTest` |

### Code Organization

```apex
public class ExampleClass {
    
    // 1. Constants
    private static final Integer MAX_SIZE = 100;
    
    // 2. Class-level variables
    private String propertyName;
    
    // 3. Constructor
    public ExampleClass(String name) {
        this.propertyName = name;
    }
    
    // 4. Public methods
    public void publicMethod() {
        // Implementation
    }
    
    // 5. Private helper methods
    private void privateHelper() {
        // Implementation
    }
    
    // 6. Static methods
    public static void staticMethod() {
        // Implementation
    }
}
```

### Comments and Documentation

```apex
/**
 * Utility class for Project calculations
 * 
 * @author Your Name
 * @version 1.0
 */
public class ProjectCalculator {
    
    /**
     * Calculates budget variance
     * 
     * @param budget The planned budget
     * @param actualCost The actual cost incurred
     * @return The variance (positive = under budget, negative = over budget)
     */
    public static Decimal calculateBudgetVariance(Decimal budget, Decimal actualCost) {
        return budget - actualCost;
    }
}
```

---

## 📝 Practice Exercise

**Task:** Create `TaskManager` utility class

**Requirements:**
1. Method to check if task is overdue
2. Method to calculate task completion percentage
3. Method to get task priority based on due date
4. Method to format task description (truncate to 100 chars)

**Time Estimate:** 30 minutes

**Example Usage:**
```apex
TaskManager.isOverdue(task.Due_Date__c);
TaskManager.calculateProgress(task.Hours_Estimated__c, task.Hours_Actual__c);
TaskManager.getTaskPriority(task.Due_Date__c, task.Priority__c);
TaskManager.formatDescription(task.Description__c);
```

---

## ✅ Checklist

### Day 1: Setup & Basics
- [ ] Developer Console opened and explored
- [ ] VS Code installed with Salesforce Extension Pack
- [ ] Authorize org in VS Code
- [ ] Created first Hello World class
- [ ] Executed code in Developer Console
- [ ] Reviewed debug logs

### Day 2: Data Types & Control Flow
- [ ] Practiced all primitive types
- [ ] Created and manipulated Lists, Sets, and Maps
- [ ] Implemented if-else and switch statements
- [ ] Created for, while, and do-while loops
- [ ] Created utility class with methods
- [ ] Tested all methods

---

## 🎓 Trailhead Modules

Complete these modules for deeper understanding:
- [ ] **Apex Basics & Database** - https://trailhead.salesforce.com/content/learn/modules/apex_basics
- [ ] **Apex Variables & Data Types** - https://trailhead.salesforce.com/content/learn/modules/apex_variable_types
- [ ] **Apex Execution** - https://trailhead.salesforce.com/content/learn/modules/apex_execution

---

## 📚 Next Steps

Sau khi hoàn thành Days 1-2:
1. ✅ Practice with Developer Console and VS Code
2. ✅ Create utility classes for common operations
3. ✅ Review Apex syntax rules
4. ✅ Prepare for Day 3-4: Triggers

---

**Tiếp tục:** [Day 3-4: Apex Triggers](./triggers.md)
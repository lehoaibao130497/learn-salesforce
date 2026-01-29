# Week 1, Day 1-2: Objects & Application

## 📚 Learning Objectives

Sau khi hoàn thành các bài học này, bạn sẽ:
- ✅ Hiểu về Salesforce Objects (Standard & Custom)
- ✅ Tạo custom objects với proper field types
- ✅ Thiết lập Master-Detail relationships
- ✅ Xây dựng custom app với tabs
- ✅ Tạo và configure page layouts

---

## 🎯 Part 1: Understanding Salesforce Objects

### Standard Objects vs Custom Objects

**Standard Objects:**
- Account, Contact, Opportunity, Case, Lead, etc.
- Pre-built by Salesforce
- Cannot delete
- Can add custom fields

**Custom Objects:**
- Created by admin/developer
- Start with `__c` suffix (API name)
- Full control over fields, relationships
- Can be deleted

### Object Relationships

| Type | Description | Example | Delete Rule |
|------|-------------|----------|-------------|
| **Lookup** | Weak relationship | Task → Project | No impact |
| **Master-Detail** | Strong relationship | Task → Project | Cascade delete |
| **Many-to-Many** | Junction object | Project ↔ Contact | Custom handling |

---

## 🏗️ Part 2: Building Project Management App

### Step 1: Create Project Custom Object

**Path:** Setup → Object Manager → Create → Custom Object

**Object Settings:**
```
Label: Project
Plural Label: Projects
Object Name: Project
API Name: Project__c
Description: Tracks project information and tasks
Enable: Reports, Activities, Field History Tracking
```

**Custom Fields:**

| Field Label | API Name | Type | Required? | Description |
|-------------|-----------|------|------------|-------------|
| Name | Name | Auto Number | ✓ | Auto: PROJ-00000 |
| Description | Description__c | Long Text Area | ✗ | Max 32,000 chars |
| Start Date | Start_Date__c | Date | ✓ | Project start |
| End Date | End_Date__c | Date | ✓ | Project end |
| Status | Status__c | Picklist | ✓ | Planning, In Progress, Completed, On Hold |
| Priority | Priority__c | Picklist | ✓ | Low, Medium, High, Critical |
| Budget | Budget__c | Currency | ✗ | Project budget |
| Actual Cost | Actual_Cost__c | Currency | ✗ | Actual spent |
| Owner | OwnerId | Lookup (User) | ✓ | Project owner |

### Step 2: Create Task Custom Object

**Path:** Setup → Object Manager → Create → Custom Object

**Object Settings:**
```
Label: Task
Plural Label: Tasks
Object Name: Task
API Name: Task__c
Description: Individual tasks within projects
Enable: Reports, Activities, Field History Tracking
```

**Custom Fields:**

| Field Label | API Name | Type | Required? | Description |
|-------------|-----------|------|------------|-------------|
| Name | Name | Auto Number | ✓ | Auto: TASK-00000 |
| Description | Description__c | Long Text Area | ✗ | Task details |
| Due Date | Due_Date__c | Date | ✓ | Task deadline |
| Status | Status__c | Picklist | ✓ | Not Started, In Progress, Completed |
| Priority | Priority__c | Picklist | ✓ | Low, Medium, High |
| Hours Estimated | Hours_Estimated__c | Number | ✗ | Decimal(2) |
| Hours Actual | Hours_Actual__c | Number | ✗ | Decimal(2) |

### Step 3: Create Master-Detail Relationship

**Path:** Setup → Object Manager → Task__c → Fields & Relationships → New

**Relationship Settings:**
```
Related To: Project
Field Name: Project
Child Relationship Name: Tasks
Field Label: Project
API Name: Project__c
Access: Read/Write
```

**Why Master-Detail?**
- ✅ Task inherits Project's sharing settings
- ✅ Cascading delete (delete Project → delete all Tasks)
- ✅ Roll-up summary fields (e.g., total hours per project)

### Step 4: Create Roll-up Summary Fields

**On Project Object:**

| Field Label | API Name | Type | Calculation |
|-------------|-----------|------|-------------|
| Total Tasks | Total_Tasks__c | Number | COUNT Tasks |
| Completed Tasks | Completed_Tasks__c | Number | COUNT Tasks where Status = Completed |
| Total Hours | Total_Hours__c | Number | SUM Tasks.Hours_Estimated__c |
| Actual Hours | Actual_Hours__c | Number | SUM Tasks.Hours_Actual__c |
| Budget Variance | Budget_Variance__c | Formula | Budget__c - Actual_Cost__c |

### Step 5: Create Page Layouts

**Path:** Setup → Object Manager → Project__c → Page Layouts

**Project Page Layout:**
```
Top:
  - Name, Status, Priority, Owner
  - Start Date, End Date
  - Budget, Actual Cost, Budget Variance (highlight negative)
  
Middle:
  - Description (Long Text Area)
  - Related Lists (Tasks, Activities)
  
Buttons:
  - New Task
  - View Hierarchy
  - PrintableView
```

**Task Page Layout:**
```
Top:
  - Name, Status, Priority
  - Due Date, Project (Master-Detail)
  - Hours Estimated, Hours Actual
  
Middle:
  - Description
  - Related Lists (Activities, Notes & Attachments)
  
Buttons:
  - Mark Complete
  - Edit Owner
```

### Step 6: Build Custom App

**Path:** Setup → App Manager → New Lightning App

**App Settings:**
```
App Name: Project Manager
App Name (Unique): Project_Manager
Description: Manage projects and tasks
Logo: Choose custom logo (optional)
```

**Navigation Items (Add in order):**
1. Projects (Custom Tab)
2. Tasks (Custom Tab)
3. Reports
4. Dashboards
5. Home

**Utility Items:**
- Recent Items
- Notes
- Record Detail

**Profile Access:** Select "Default On" for all profiles

---

## 🔧 Best Practices

### Object Design
- ✅ Use descriptive API names (e.g., `Start_Date__c` not `SDate__c`)
- ✅ Set proper field-level security
- ✅ Enable field history tracking for audit
- ✅ Use picklists for controlled values
- ✅ Add description fields for clarity

### Relationships
- ✅ Use Master-Detail for parent-child dependencies
- ✅ Use Lookup for loose relationships
- ✅ Consider sharing implications
- ✅ Plan for roll-up summary fields early

### Page Layouts
- ✅ Group related fields together
- ✅ Use sections for organization
- ✅ Configure related lists properly
- ✅ Test with different user permissions

---

## 📝 Practice Exercise

**Scenario:** Create a "Client" object to track project clients.

**Requirements:**
1. Custom object: Client__c
2. Fields: Name, Industry (Picklist), Email, Phone
3. Relationship: Project → Client (Lookup)
4. Page Layout with proper sections
5. Add Client tab to Project Manager app

**Time Estimate:** 30 minutes

---

## ✅ Checklist

### Day 1: Object Creation
- [ ] Create Project custom object
- [ ] Add all custom fields to Project
- [ ] Create Task custom object
- [ ] Add all custom fields to Task
- [ ] Create Master-Detail relationship (Task → Project)
- [ ] Test relationship in UI

### Day 2: App & Layouts
- [ ] Create roll-up summary fields on Project
- [ ] Create Project page layout
- [ ] Create Task page layout
- [ ] Assign layouts to profiles
- [ ] Create Project Manager app
- [ ] Test app navigation

---

## 🎓 Trailhead Modules

Complete these modules for deeper understanding:
- [ ] **Data Modeling** - https://trailhead.salesforce.com/content/learn/modules/data_modeling
- [ ] **Object Manager** - https://trailhead.salesforce.com/content/learn/modules/object_manager
- [ ] **Custom Objects** - https://trailhead.salesforce.com/content/learn/modules/custom_objects

---

## 📚 Next Steps

Sau khi hoàn thành Days 1-2:
1. ✅ Verify all objects and fields work correctly
2. ✅ Test creating sample Project and Task records
3. ✅ Check roll-up summary calculations
4. ✅ Prepare for Day 3-4: Security

---

**Tiếp tục:** [Day 3-4: Security Setup](./security.md)
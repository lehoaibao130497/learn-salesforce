# Week 1: Admin & Flow Foundation

## Learning Objectives
- [ ] Understand Salesforce Objects (Standard & Custom)
- [ ] Master Security: Profiles, Permission Sets, Role Hierarchy
- [ ] Build Flows in Flow Builder
- [ ] Create Page Layouts
- [ ] Understand Salesforce App architecture

## Trailhead Modules
- [ ] Admin Beginner
- [ ] Lightning App Builder
- [ ] Flow Builder Fundamentals
- [ ] Data Security

## Project: Project Management App

### Custom Objects to Create
1. **Project**
   - Name (Text)
   - Description (Long Text Area)
   - Start Date (Date)
   - End Date (Date)
   - Status (Picklist: Planning, In Progress, Completed, On Hold)
   - Priority (Picklist: Low, Medium, High, Critical)
   - Owner (Lookup to User)

2. **Task**
   - Name (Text)
   - Description (Long Text Area)
   - Due Date (Date)
   - Status (Picklist: Not Started, In Progress, Completed)
   - Project (Master-Detail to Project)
   - Assigned To (Lookup to User)
   - Priority (Picklist: Low, Medium, High)

### Flow Automation
**Flow Name:** Task Completion Email Notification

**Trigger:** When Task Status changes to "Completed"

**Actions:**
1. Get Project Manager information
2. Get Task details
3. Send email to Project Manager with:
   - Task name
   - Completed date
   - Project name
   - Assigned to

### Security Setup
- [ ] Create Profile: "Project Manager"
- [ ] Create Permission Set: "Project Admin"
- [ ] Set up Role Hierarchy
- [ ] Configure Field Level Security

## Daily Progress

### Day 1-2: Objects & App
- [ ] Create Project custom object
- [ ] Create Task custom object
- [ ] Set up Master-Detail relationship
- [ ] Create Page Layouts
- [ ] Build custom App "Project Manager"

### Day 3-4: Security
- [ ] Create Profiles
- [ ] Create Permission Sets
- [ ] Configure OWD (Organization-Wide Defaults)
- [ ] Set up Role Hierarchy
- [ ] Test sharing rules

### Day 5-6: Flow Builder
- [ ] Design Flow diagram
- [ ] Create Trigger-based Flow
- [ ] Add email alert action
- [ ] Test Flow functionality
- [ ] Debug and fix issues

### Day 7: Review & Practice
- [ ] Review all Trailhead modules
- [ ] Practice Flow scenarios
- [ ] Document learnings
- [ ] Prepare for Week 2

## Resources
- [Trailhead Admin Beginner](https://trailhead.salesforce.com/content/learn/modules/admin_basics)
- [Flow Builder Guide](https://help.salesforce.com/s/articleView?id=sf.flow_concepts.htm)
- [Custom Objects Trailhead](https://trailhead.salesforce.com/content/learn/modules/data_modeling)

## Notes Template
### Date: [Insert Date]

**Completed:**
- [ ] [Task 1]
- [ ] [Task 2]

**Learnings:**
- [Key concept 1]
- [Key concept 2]

**Challenges:**
- [Challenge 1] - Solution: [How solved]
- [Challenge 2] - Solution: [How solved]

**Questions:**
- [Question 1]
- [Question 2]

## Checklist for Week 1 Completion
- [ ] All Trailhead modules completed
- [ ] Project Management App created
- [ ] All custom objects configured
- [ ] Page layouts created and tested
- [ ] Security model implemented
- [ ] Flow automation working
- [ ] All test cases passed
- [ ] Documented all learnings
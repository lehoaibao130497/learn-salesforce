# Week 1, Day 7: Review & Practice

## 📚 Learning Objectives

Sau khi hoàn thành Day 7, bạn sẽ:
- ✅ Review tất cả concepts đã học trong Week 1
- ✅ Practice với real-world scenarios
- ✅ Document learnings và challenges
- ✅ Prepare cho Week 2 (Apex & SOQL)

---

## 🎯 Week 1 Summary

### Topics Covered

| Day | Topic | Key Skills |
|------|--------|-----------|
| **Day 1-2** | Objects & Application | Custom objects, Master-Detail relationships, Page layouts, Apps |
| **Day 3-4** | Security Model | OWD, Profiles, Permission Sets, Role Hierarchy, FLS |
| **Day 5-6** | Flow Builder | Record-triggered flows, Email automation, Debugging |

### Key Concepts

#### 1. Salesforce Objects
- **Standard Objects**: Pre-built objects (Account, Contact, Opportunity)
- **Custom Objects**: User-created objects with `__c` suffix
- **Relationships**: Lookup (weak), Master-Detail (strong), Many-to-Many (junction)
- **Roll-up Summary**: Aggregate data from child to parent

#### 2. Security Model
- **OWD**: Baseline access level (most restrictive)
- **Profiles**: User access permissions
- **Permission Sets**: Additional permissions without changing profile
- **Role Hierarchy**: Record access based on organizational structure
- **FLS**: Field-level security (most granular)
- **Sharing Rules**: Open up access beyond OWD

#### 3. Flow Automation
- **Flow Types**: Screen, Record-Triggered, Schedule-Triggered, Platform Event
- **Flow Elements**: Get Records, Create Records, Update Records, Send Email, Decision
- **Debugging**: Step-by-step execution, variable inspection
- **Best Practices**: Keep simple, document, test thoroughly

---

## 🧪 Practice Scenarios

### Scenario 1: Enhance Project Management App

**Task:** Add Milestone object to track project milestones

**Requirements:**
1. Create Milestone__c custom object
2. Fields: Name, Description, Due Date, Status, Priority
3. Relationship: Milestone → Project (Master-Detail)
4. Roll-up: Count milestones per project
5. Page layout with proper sections
6. Add Milestone tab to Project Manager app

**Time Estimate:** 45 minutes

**Bonus:**
- Create flow to notify when milestone is completed
- Add security for Milestone object

---

### Scenario 2: Implement Sharing for Project Team

**Task:** Allow team members to see each other's projects

**Requirements:**
1. Create "Project Team" public group
2. Add project team members to group
3. Create sharing rule to share projects with group
4. Test access with different team members
5. Document sharing model

**Time Estimate:** 30 minutes

**Questions to Answer:**
- Does the sharing rule work as expected?
- Are there any security implications?
- How would you handle external contractors?

---

### Scenario 3: Advanced Flow - Project Dashboard Update

**Task:** Create flow to update dashboard metrics

**Requirements:**
1. Create "Project Metrics" custom object
2. Fields: Project, Total Tasks, Completed Tasks, On Track
3. Flow triggers when Task is updated
4. Update Project Metrics with latest counts
5. Calculate On Track status based on completed/total ratio

**Time Estimate:** 60 minutes

**Hint:** Use Assignment element for calculations

---

### Scenario 4: Security Audit

**Task:** Review and improve security model

**Requirements:**
1. Review OWD for all custom objects
2. Check if any fields should be read-only
3. Verify profiles have appropriate access
4. Test with different user types:
   - Project Manager
   - Team Member
   - Guest user
5. Document any security gaps

**Time Estimate:** 45 minutes

**Deliverable:** Security audit report with recommendations

---

## 📋 Week 1 Final Checklist

### Objects & Application (Day 1-2)
- [ ] Project custom object created with all fields
- [ ] Task custom object created with all fields
- [ ] Master-Detail relationship configured
- [ ] Roll-up summary fields working
- [ ] Page layouts created and assigned
- [ ] Project Manager app built with proper navigation
- [ ] All objects tested with sample data

### Security Model (Day 3-4)
- [ ] OWD configured for Project and Task
- [ ] Project Manager profile created
- [ ] Object permissions set correctly
- [ ] Field-level security configured
- [ ] Project Admin permission set created
- [ ] Role hierarchy implemented
- [ ] Sharing rules configured
- [ ] Security tested with different users

### Flow Builder (Day 5-6)
- [ ] Task Completion Email flow created
- [ ] Email template configured
- [ ] Flow tested in Debug mode
- [ ] Flow activated in production
- [ ] Project Auto-Update flow created
- [ ] Decision logic working
- [ ] Flows tested with real data
- [ ] Documentation created

### Review & Practice (Day 7)
- [ ] All Week 1 concepts reviewed
- [ ] Practice scenarios completed
- [ ] Challenges documented
- [ ] Solutions recorded
- [ ] Weak areas identified
- [ ] Prepare for Week 2

---

## 📝 Week 1 Reflections

### What I Learned Well
- [ ] Understanding Salesforce objects and relationships
- [ ] Building custom objects and fields
- [ ] Configuring security model
- [ ] Creating flows for automation
- [ ] Debugging and testing

### Areas for Improvement
- [ ] More practice with complex relationships
- [ ] Better understanding of sharing rules
- [ ] More experience with Flow elements
- [ ] Documentation habits
- [ ] Testing strategies

### Challenges Faced

**Challenge 1:** [Describe]
- Solution: [How solved]
- Time spent: [Hours]

**Challenge 2:** [Describe]
- Solution: [How solved]
- Time spent: [Hours]

**Challenge 3:** [Describe]
- Solution: [How solved]
- Time spent: [Hours]

### Questions Still Unanswered

1. [Question]
   - [Follow-up needed?]

2. [Question]
   - [Follow-up needed?]

3. [Question]
   - [Follow-up needed?]

---

## 🎓 Trailhead Review

### Complete These Modules (if not done)

**Data Modeling:**
- [ ] Data Modeling - https://trailhead.salesforce.com/content/learn/modules/data_modeling
- [ ] Custom Objects - https://trailhead.salesforce.com/content/learn/modules/custom_objects
- [ ] Object Manager - https://trailhead.salesforce.com/content/learn/modules/object_manager

**Security:**
- [ ] Data Security - https://trailhead.salesforce.com/content/learn/modules/data_security
- [ ] Object-Level Security - https://trailhead.salesforce.com/content/learn/modules/object_level_security
- [ ] Field-Level Security - https://trailhead.salesforce.com/content/learn/modules/field_level_security

**Flow Builder:**
- [ ] Flow Builder Fundamentals - https://trailhead.salesforce.com/content/learn/modules/flow_builder_fundamentals
- [ ] Flow Logic - https://trailhead.salesforce.com/content/learn/modules/flow_logic
- [ ] Flow Actions - https://trailhead.salesforce.com/content/learn/modules/flow_actions

---

## 🚀 Preparing for Week 2: Apex & SOQL

### What's Coming

Week 2 sẽ tập trung vào:
- **Apex Basics**: Variables, data types, control flow
- **Apex Classes**: Methods, constructors, interfaces
- **Triggers**: Before/after triggers, context variables
- **SOQL**: Query syntax, relationships, aggregates
- **Testing**: Unit tests, assertions, coverage

### Preparation Tips

1. **Refresh Java Knowledge**
   - Apex is Java-like
   - Object-oriented concepts
   - Variable types and methods

2. **Review SQL Basics**
   - SOQL is similar to SQL
   - SELECT, FROM, WHERE syntax
   - JOIN concepts

3. **Set Up Development Environment**
   - Install VS Code
   - Install Salesforce Extension Pack
   - Configure Dev Hub

4. **Review Week 1 Notes**
   - Object relationships
   - Security model
   - Flow concepts (will help understand Apex)

---

## 💡 Week 1 Takeaways

### Key Learnings

1. **Objects are the Foundation**
   - Everything in Salesforce is an object
   - Relationships connect data
   - Security is object-based

2. **Security is Multi-Layered**
   - OWD → Profiles → Permission Sets → Role Hierarchy → Sharing Rules → FLS
   - Each layer adds more restrictions
   - Always follow principle of least privilege

3. **No-Code is Powerful**
   - Flow can handle complex logic
   - Faster to develop than code
   - Easier to maintain

4. **Testing is Critical**
   - Test with different users
   - Test edge cases
   - Debug thoroughly

### Best Practices Established

1. **Naming Conventions**
   - API names: `Field__c` suffix
   - Descriptive labels
   - Consistent formatting

2. **Documentation**
   - Document security decisions
   - Comment complex flows
   - Keep records of changes

3. **Incremental Development**
   - Build in small steps
   - Test each step
   - Iterate and improve

---

## 🎯 Week 1 Achievement Badge

Complete all items to earn Week 1 Badge:

- [ ] All 7 days completed
- [ ] Project Management App built
- [ ] Security model implemented
- [ ] Flows created and tested
- [ ] Practice scenarios completed
- [ ] Trailhead modules finished
- [ ] Week 1 reflection completed

**Badge Earned:** [ ] Yes / [ ] No
**Date:** [Insert Date]

---

## 📚 Resources Review

### Documentation Used
- [ ] Salesforce Help Articles
- [ ] Trailhead Modules
- [ ] Developer Documentation
- [ ] Flow Builder Guide
- [ ] Security Implementation Guide

### Helpful Resources
- [Object Reference](https://developer.salesforce.com/docs/atlas.en-us.objectReference.meta/objectReference/)
- [Flow Builder Guide](https://help.salesforce.com/s/articleView?id=sf.flow_concepts.htm)
- [Security Implementation Guide](https://help.salesforce.com/s/articleView?id=sf.security_impl_guide.htm)

---

## ✅ Week 1 Complete!

Congratulations on completing Week 1: Admin & Flow Foundation!

### What You Can Now Do

✅ Create custom objects with proper relationships
✅ Implement comprehensive security model
✅ Build automated workflows with Flow Builder
✅ Debug and test administrative solutions
✅ Understand Salesforce platform fundamentals

### Ready for Week 2

You're now prepared to dive into Apex programming and SOQL queries. Week 2 will challenge you to think like a developer and write code to solve business problems.

---

## 📚 Next Steps

Before starting Week 2:
1. ✅ Review all Week 1 notes
2. ✅ Complete any pending Trailhead modules
3. ✅ Document learnings and challenges
4. ✅ Rest and recharge!
5. ✅ Prepare development environment for Apex

---

**Chúc mừng! Bạn đã hoàn thành Week 1!** 🎉

**Tiếp tục:** [Week 2: Apex & SOQL](/docs/week2/)

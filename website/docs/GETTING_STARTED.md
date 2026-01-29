# Getting Started Guide - Salesforce Platform Developer I

## 🎯 Quick Start

This guide will help you get started with your 4-week Salesforce Platform Developer I learning journey.

---

## 📋 Prerequisites Checklist

Before you begin, make sure you have:

- [ ] **Salesforce Developer Edition Account** (Free)
  - Sign up at: https://developer.salesforce.com/signup
  - Save your username and password securely

- [ ] **VS Code Editor**
  - Download: https://code.visualstudio.com/
  - Recommended for Salesforce development

- [ ] **Salesforce CLI**
  - Install: https://developer.salesforce.com/tools/sfdxcli
  - Verify installation: `sfdx --version`

- [ ] **Salesforce Extensions for VS Code**
  - Install from VS Code marketplace
  - Search: "Salesforce Extensions Pack"

- [ ] **Focus on Force Study Materials**
  - Purchase: https://focusonforce.com/platform-developer-i/
  - This is essential for exam preparation

- [ ] **Node.js** (for LWC development in Week 3)
  - Download: https://nodejs.org/
  - LTS version recommended

---

## 🚀 Setup Instructions

### Step 1: Set Up Salesforce Developer Edition

1. Go to https://developer.salesforce.com/signup
2. Fill in your details
3. Choose username carefully (can't be changed)
4. Check your email for verification
5. Log in to your new Developer Edition org

### Step 2: Install and Configure Salesforce CLI

**macOS/Linux:**
```bash
npm install -g sfdx-cli
```

**Windows:**
```bash
npm install -g sfdx-cli
```

**Verify Installation:**
```bash
sfdx --version
```

### Step 3: Authorize Your Developer Org

```bash
sfdx auth:web:login -d -a DevHub
```

Follow the prompts to log in to your Developer Edition.

### Step 4: Install VS Code Extensions

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Salesforce Extensions Pack"
4. Click "Install"

### Step 5: Set Up Project Structure

Your project structure is already created! Here's what you have:

```
learn_salesforce/
├── README.md                    # Main project overview
├── GETTING_STARTED.md          # This file
├── task.md                     # Original task description
├── DAILY_SCHEDULE_TEMPLATE.md  # Daily tracking template
├── RESOURCES.md                # Comprehensive resource list
├── .gitignore                  # Git ignore rules
│
├── week1-admin-flow/           # Week 1 materials
│   ├── README.md              # Week 1 guide
│   ├── notes/                 # Your notes
│   ├── project-management-app/ # Week 1 project
│   └── flow-examples/         # Flow examples
│
├── week2-apex-soql/           # Week 2 materials
│   ├── README.md              # Week 2 guide
│   ├── notes/                 # Your notes
│   ├── triggers/              # Apex triggers
│   ├── classes/               # Apex classes
│   └── soql-examples/         # SOQL examples
│
├── week3-lwc/                 # Week 3 materials
│   ├── README.md              # Week 3 guide
│   ├── notes/                 # Your notes
│   ├── dashboard-component/    # LWC dashboard project
│   └── integration-examples/  # Integration examples
│
└── week4-exam-prep/           # Week 4 materials
    ├── README.md              # Week 4 guide
    ├── notes/                 # Your notes
    ├── practice-questions/    # Practice questions tracker
    ├── ai-prompts/            # Prompt Builder examples
    └── exam-notes/            # Exam cheat sheets
```

---

## 📅 Week 1: Admin & Flow (Days 1-7)

### Day 1: Orientation & Setup
- [ ] Review this Getting Started guide
- [ ] Set up all prerequisites
- [ ] Read Week 1 README
- [ ] Create first daily schedule from DAILY_SCHEDULE_TEMPLATE.md

### Day 2-7: Admin & Flow
- [ ] Complete Trailhead Admin Beginner module
- [ ] Create Project Management App
- [ ] Build Flow automation
- [ ] Track progress in daily schedule

**Daily Routine:**
- **Morning (8:00-12:00):** Trailhead modules
- **Afternoon (13:00-18:00):** Build Project Management App
- **Evening (20:00-22:00):** Review notes, prepare for tomorrow

---

## 💻 Week 2: Apex & SOQL (Days 8-14)

### Day 8-14: Backend Development
- [ ] Learn Apex syntax and structure
- [ ] Create AccountDeletionPreventer trigger
- [ ] Write utility classes
- [ ] Practice SOQL queries
- [ ] Write test classes

**Key Resources:**
- Week 2 README.md
- Apex Developer Guide
- ApexSandbox.io for practice

---

## ⚡ Week 3: LWC (Days 15-21)

### Day 15-21: Frontend Development
- [ ] Learn LWC basics
- [ ] Build Revenue Dashboard
- [ ] Integrate Chart.js
- [ ] Connect to Apex controllers
- [ ] Write Jest tests

**Key Resources:**
- Week 3 README.md
- LWC Recipes on GitHub
- Chart.js documentation

---

## 🎯 Week 4: Exam Prep (Days 22-28)

### Day 22-27: Intensive Study
- [ ] Complete 500+ Focus on Force questions
- [ ] Take 3+ practice exams
- [ ] Master Governor Limits
- [ ] Learn Prompt Builder
- [ ] Create exam cheat sheet

### Day 28: Exam Day!
- [ ] Take certification exam
- [ ] Celebrate! 🎉

---

## 📊 Daily Workflow Template

Copy this template for each day:

```markdown
# Week X - Day Y

## Morning (8:00-12:00) - Trailhead
- [ ] Module: [Name]
- [ ] Units: X/Y completed

## Afternoon (13:00-18:00) - Coding
- [ ] Task: [Description]
- [ ] Files: [List files created/modified]

## Evening (20:00-22:00) - Practice
- [ ] Questions: X/Y completed
- [ ] Score: Z%

## Notes:
[Your notes here]
```

---

## 🛠️ Useful Commands

### Salesforce CLI Commands

```bash
# Authorize org
sfdx auth:web:login -a my-org

# Create scratch org
sfdx force:org:create -f config/project-scratch-def.json -a scratch-org

# Deploy metadata
sfdx force:source:deploy -p force-app

# Pull source from org
sfdx force:source:pull

# Push source to org
sfdx force:source:push

# Run Apex tests
sfdx force:apex:test:run

# Open org in browser
sfdx force:org:open
```

### VS Code Shortcuts

- `Ctrl/Cmd + Shift + P` - Command Palette
- `Ctrl/Cmd + P` - Quick Open File
- `Alt/Option + Click` - Multi-cursor
- `Ctrl/Cmd + /` - Toggle comment

---

## 📚 Learning Resources Quick Access

### Trailhead
- [Home](https://trailhead.salesforce.com/)
- [Profile](https://trailhead.salesforce.com/me)

### Documentation
- [Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_dev_guide.htm)
- [LWC Developer Guide](https://developer.salesforce.com/docs/component-library/documentation/lwc)
- [SOQL Reference](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/)

### Practice
- [Focus on Force](https://focusonforce.com/platform-developer-i/)
- [ApexSandbox.io](https://apexsandbox.io/)
- [Stack Exchange](https://salesforce.stackexchange.com/)

---

## 🎯 Tips for Success

### Study Strategy
1. **Be Consistent** - Study every day, even if just 2-3 hours
2. **Hands-On Practice** - Always code along with tutorials
3. **Take Notes** - Document what you learn in the `notes/` folders
4. **Review Regularly** - Go back to previous weeks' material
5. **Ask Questions** - Use Salesforce Stack Exchange when stuck

### Time Management
- **Morning**: Fresh mind for theory (Trailhead)
- **Afternoon**: Peak energy for coding practice
- **Evening**: Review and lighter practice questions

### Exam Preparation
- Start practicing questions early (Week 1-2)
- Focus on weak areas identified in practice tests
- Memorize Governor Limits
- Understand common exam traps
- Take multiple practice exams

---

## 🆘 Getting Help

### When You're Stuck:
1. **Check documentation** - Official docs are your best friend
2. **Search Stack Exchange** - Most common issues already answered
3. **Review examples** - LWC Recipes and Apex Recipes have great examples
4. **Ask community** - Salesforce Developer Forums are very helpful

### Debugging Tips
1. **Use Debug Logs** - Enable in Salesforce Setup
2. **Console.log** - For JavaScript/LWC
3. **System.debug()** - For Apex
4. **Breakpoints** - Use VS Code debugger

---

## 📈 Tracking Progress

### Weekly Checkpoints
- [ ] **End of Week 1**: Project Management App created, Flows working
- [ ] **End of Week 2**: Apex trigger working, test coverage 75%+
- [ ] **End of Week 3**: LWC dashboard deployed to org
- [ ] **End of Week 4**: 500+ questions completed, exam passed!

### Milestones to Celebrate 🎉
- First Trailhead badge earned
- First Apex class deployed
- First LWC component created
- First Flow automation working
- First practice exam passed (65%+)
- **CERTIFICATION EARNED!**

---

## 📞 Need More Help?

### Official Resources
- [Salesforce Help](https://help.salesforce.com/)
- [Developer Forums](https://developer.salesforce.com/forums)
- [Trailblazer Community](https://trailblazercommunity.salesforce.com/)

### Quick Links
- **Project Overview**: See README.md
- **All Resources**: See RESOURCES.md
- **Daily Template**: See DAILY_SCHEDULE_TEMPLATE.md
- **Week Guides**: See each week's README.md

---

## 🚀 You're Ready to Start!

**Next Steps:**
1. ✅ Complete the Prerequisites Checklist above
2. 📖 Read Week 1 README (week1-admin-flow/README.md)
3. 📋 Create your first daily schedule from DAILY_SCHEDULE_TEMPLATE.md
4. 🎯 Start with Day 1 of Week 1

**Remember:** The journey of a thousand miles begins with a single step. You've got this! 💪

---

**Happy Learning!** 📚✨

*Last Updated: January 2026*
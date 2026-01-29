# Project Structure - Salesforce Platform Developer I Learning Journey

## 📁 Complete Directory Structure

```
learn_salesforce/
│
├── 📄 README.md                          # Main project overview and navigation
├── 📄 GETTING_STARTED.md                # Step-by-step setup guide
├── 📄 QUICK_REFERENCE.md                 # Quick reference for exam and coding
├── 📄 RESOURCES.md                      # Comprehensive resource collection
├── 📄 DAILY_SCHEDULE_TEMPLATE.md        # Daily tracking template
├── 📄 task.md                           # Original task requirements
├── 📄 .gitignore                        # Git ignore rules
├── 📄 PROJECT_STRUCTURE.md               # This file - project structure overview
│
├── 📁 week1-admin-flow/                 # Week 1: Admin & Flow
│   ├── 📄 README.md                     # Week 1 detailed guide
│   ├── 📁 notes/                        # Personal learning notes
│   ├── 📁 project-management-app/        # Week 1 project files
│   │   ├── 📁 objects/                  # Custom object definitions
│   │   ├── 📁 flows/                    # Flow definitions
│   │   └── 📁 pages/                    # Page layouts
│   └── 📁 flow-examples/                # Flow examples and documentation
│
├── 📁 week2-apex-soql/                 # Week 2: Apex & SOQL
│   ├── 📄 README.md                     # Week 2 detailed guide
│   ├── 📁 notes/                        # Personal learning notes
│   ├── 📁 triggers/                     # Apex triggers
│   │   ├── AccountDeletionPreventer.trigger
│   │   └── [Additional triggers]
│   ├── 📁 classes/                      # Apex classes
│   │   ├── AccountTriggerHandler.cls
│   │   ├── ContactService.cls
│   │   ├── TriggerFactory.cls
│   │   └── [Additional classes]
│   └── 📁 soql-examples/                # SOQL query examples
│       ├── basic-queries.md
│       ├── parent-child-queries.md
│       ├── aggregate-queries.md
│       └── [More examples]
│
├── 📁 week3-lwc/                       # Week 3: Lightning Web Components
│   ├── 📄 README.md                     # Week 3 detailed guide
│   ├── 📁 notes/                        # Personal learning notes
│   ├── 📁 dashboard-component/           # LWC Revenue Dashboard project
│   │   ├── revenueDashboard/
│   │   │   ├── revenueDashboard.html
│   │   │   ├── revenueDashboard.js
│   │   │   ├── revenueDashboard.css
│   │   │   └── revenueDashboard.js-meta.xml
│   │   ├── dashboardFilters/
│   │   │   ├── dashboardFilters.html
│   │   │   ├── dashboardFilters.js
│   │   │   └── dashboardFilters.js-meta.xml
│   │   ├── summaryCards/
│   │   ├── revenueChart/
│   │   └── revenueDetails/
│   └── 📁 integration-examples/          # Third-party library integrations
│       ├── chartjs-integration.md
│       └── [More integrations]
│
└── 📁 week4-exam-prep/                 # Week 4: Exam Preparation
    ├── 📄 README.md                     # Week 4 detailed guide
    ├── 📁 notes/                        # Exam review notes
    ├── 📁 practice-questions/            # Focus on Force questions tracker
    │   ├── section1-fundamentals.md
    │   ├── section2-data-modeling.md
    │   ├── section3-automation.md
    │   ├── section4-ui.md
    │   ├── section5-security.md
    │   ├── section6-debugging.md
    │   ├── section7-integration.md
    │   └── practice-exams.md
    ├── 📁 ai-prompts/                   # Prompt Builder examples
    │   ├── email-generator.md
    │   ├── summary-generator.md
    │   └── [More AI examples]
    └── 📁 exam-notes/                   # Cheat sheets and quick references
        ├── governor-limits.md
        ├── data-model.md
        ├── security.md
        └── [More cheat sheets]
```

## 📋 File Descriptions

### Root Level Files

| File | Purpose | When to Use |
|------|---------|--------------|
| **README.md** | Project overview, weekly summaries, key resources | Start here for project understanding |
| **GETTING_STARTED.md** | Step-by-step setup guide | Before starting Week 1 |
| **QUICK_REFERENCE.md** | Exam facts, code snippets, quick lookup | During study and exam prep |
| **RESOURCES.md** | Complete resource collection | Looking for documentation, tools, community |
| **DAILY_SCHEDULE_TEMPLATE.md** | Daily tracking template | Every day - copy and fill out |
| **task.md** | Original task requirements | Reference original requirements |
| **.gitignore** | Git ignore rules | Setting up version control |
| **PROJECT_STRUCTURE.md** | This file - structure overview | Understanding project organization |

### Weekly README Files

Each week has a comprehensive README.md with:
- Learning objectives
- Trailhead modules
- Project specifications
- Daily progress trackers
- Resources and links
- Completion checklists

**Files:**
- `week1-admin-flow/README.md`
- `week2-apex-soql/README.md`
- `week3-lwc/README.md`
- `week4-exam-prep/README.md`

## 🎯 How to Navigate This Project

### For Beginners

1. **Start Here:** `README.md` - Get an overview
2. **Setup:** `GETTING_STARTED.md` - Set up your environment
3. **Week 1:** `week1-admin-flow/README.md` - Begin learning journey

### For Experienced Developers

1. **Quick Reference:** `QUICK_REFERENCE.md` - Look up code and exam facts
2. **Resources:** `RESOURCES.md` - Find specific documentation
3. **Weekly Guides:** Jump to specific week's README

### During Exam Preparation

1. **Week 4 Focus:** `week4-exam-prep/README.md`
2. **Quick Facts:** `QUICK_REFERENCE.md` - Governor limits, code patterns
3. **Practice:** Use `week4-exam-prep/practice-questions/` trackers

## 📊 File Relationships

```
README.md (Main Hub)
    ├── GETTING_STARTED.md (Setup)
    ├── QUICK_REFERENCE.md (Quick Lookup)
    ├── RESOURCES.md (Detailed Resources)
    ├── DAILY_SCHEDULE_TEMPLATE.md (Daily Tracking)
    │
    └── Week 1 (week1-admin-flow/README.md)
            ├── notes/ (Your notes)
            ├── project-management-app/ (Project files)
            └── flow-examples/ (Examples)
    │
    └── Week 2 (week2-apex-soql/README.md)
            ├── notes/ (Your notes)
            ├── triggers/ (Apex triggers)
            ├── classes/ (Apex classes)
            └── soql-examples/ (SOQL examples)
    │
    └── Week 3 (week3-lwc/README.md)
            ├── notes/ (Your notes)
            ├── dashboard-component/ (LWC project)
            └── integration-examples/ (Integrations)
    │
    └── Week 4 (week4-exam-prep/README.md)
            ├── notes/ (Review notes)
            ├── practice-questions/ (Question trackers)
            ├── ai-prompts/ (AI examples)
            └── exam-notes/ (Cheat sheets)
```

## 🔄 Workflow Examples

### Daily Learning Workflow

1. **Morning:**
   - Open `week[X]-[topic]/README.md`
   - Check Trailhead modules
   - Work on tasks
   - Take notes in `week[X]/notes/`

2. **Afternoon:**
   - Work on project files in appropriate folder
   - Code and test
   - Document progress

3. **Evening:**
   - Copy `DAILY_SCHEDULE_TEMPLATE.md`
   - Fill out daily progress
   - Review weak areas

### Week Progress Workflow

1. **Start of Week:**
   - Read week's README.md
   - Review objectives
   - Set up project folders

2. **During Week:**
   - Update daily schedules
   - Save code examples
   - Track practice questions

3. **End of Week:**
   - Complete week's checklist
   - Review notes
   - Prepare for next week

### Exam Prep Workflow

1. **Week 4:**
   - Use `week4-exam-prep/practice-questions/`
   - Track question progress
   - Identify weak areas

2. **Before Exam:**
   - Review `QUICK_REFERENCE.md`
   - Study `week4-exam-prep/exam-notes/`
   - Take practice exams

## 📝 File Naming Conventions

### Documentation Files
- `README.md` - Main guide for each folder
- `notes/*.md` - Personal notes (date them: `2026-01-29-topic.md`)
- `examples/*.md` - Code examples and patterns
- `cheat-sheet.md` - Quick reference for topics

### Code Files
- Apex Classes: `ClassName.cls`
- Triggers: `ObjectNameTrigger.trigger`
- LWC Components: `componentName/` (folder with .html, .js, .css, .js-meta.xml)
- SOQL Files: `query-name.md` or `query-name.soql`

### Practice Files
- Question trackers: `section[1-7]-topic.md`
- Practice exams: `practice-exam-[1-3].md`
- AI examples: `feature-name.md`

## 🎨 Visual Organization

### Color Coding (in VS Code)
- 📘 Blue: Documentation (README.md, guides)
- 🟢 Green: Code files (.cls, .trigger, .js, .html)
- 🟡 Yellow: Notes and templates
- 🟠 Orange: Resources and references
- 🟣 Purple: Practice questions and exams

### Folder Icons (recommended VS Code extension)
- 📁 Notes folder: 📝
- 📁 Code folder: 💻
- 📁 Project folder: 🎯
- 📁 Examples folder: 💡
- 📁 Resources folder: 📚

## 🔍 Quick Navigation Tips

### VS Code Tips
- `Ctrl/Cmd + P` - Quick file search
- `Ctrl/Cmd + Shift + F` - Search in files
- `Ctrl/Cmd + B` - Toggle sidebar
- Bookmarks - Mark important sections

### Finding Files Quickly
- Looking for a specific week? Search `week[X]`
- Looking for Apex code? Search `*.cls`
- Looking for LWC? Search `*.js`
- Looking for notes? Search `notes/`

## 📈 Progress Tracking Files

### Daily
- Copy `DAILY_SCHEDULE_TEMPLATE.md`
- Save as `week[X]/notes/day-Y.md`
- Fill out daily progress

### Weekly
- Use week's README.md checklist
- Update project files
- Review completion

### Overall
- Track badges in Trailhead profile
- Track practice questions in Week 4
- Track exam readiness

## 🚀 Getting Started Checklist

Use this checklist to ensure you're ready to begin:

- [ ] Read `README.md` (project overview)
- [ ] Read `GETTING_STARTED.md` (setup guide)
- [ ] Complete all prerequisites
- [ ] Set up development environment
- [ ] Create first daily schedule from template
- [ ] Read Week 1 README
- [ ] Start Week 1, Day 1

## 📞 File Organization Support

If you're confused about file organization:

1. **Main Hub:** `README.md` - Everything starts here
2. **Setup:** `GETTING_STARTED.md` - Before starting
3. **Weekly Guides:** Each `week[X]/README.md` - Weekly focus
4. **Quick Lookup:** `QUICK_REFERENCE.md` - Fast answers
5. **Resources:** `RESOURCES.md` - Comprehensive links
6. **Daily Tracking:** `DAILY_SCHEDULE_TEMPLATE.md` - Every day

## 💡 Pro Tips

1. **Bookmark Key Files:** Add README, QUICK_REFERENCE to browser bookmarks
2. **Use Daily Template:** Copy it every morning
3. **Take Notes:** Document in `notes/` folders
4. **Track Progress:** Use checklists in weekly READMEs
5. **Review Regularly:** Go back to previous weeks
6. **Stay Organized:** Follow file naming conventions

---

**Last Updated:** January 2026

**Remember:** This structure is designed to support your learning journey. Adapt it as needed, but maintain the core organization for consistency.
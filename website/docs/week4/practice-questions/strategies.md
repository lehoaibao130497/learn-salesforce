# Week 4: Practice Questions Strategy

## 🎯 Question Types & Strategies

### Understanding Question Formats

**Multiple Choice Questions:**
- Single correct answer
- Multiple correct answers (2-4)
- "Select ALL that apply"
- "Choose TWO that apply"

**Scenario-Based Questions:**
- Business scenario provided
- Complex requirements
- Multiple steps involved
- Often 2-3 related questions

**Code Analysis Questions:**
- Code snippet provided
- Analyze execution
- Identify errors
- Predict output

**"Best Approach" Questions:**
- Multiple valid solutions
- Choose BEST option
- Consider scalability
- Think long-term

---

## 📊 Time Management

### Exam Time Breakdown

| Component | Time |
|-----------|-------|
| Total Time | 105 minutes |
| Questions | 60 |
| Average per Question | 1.75 minutes |
| Review Time | 15 minutes |

### Time Allocation Strategy

**Phase 1: Easy Questions (First 40 minutes)**
- Answer obvious questions
- Mark uncertain for review
- Don't spend >1 minute per question
- Target: 35-40 questions completed

**Phase 2: Difficult Questions (Next 40 minutes)**
- Return to marked questions
- Spend 2-3 minutes each
- Use elimination
- Target: Complete all 60 questions

**Phase 3: Review (Final 25 minutes)**
- Review marked questions
- Check for careless mistakes
- Verify answers
- Final scan

---

## 🔍 Question Analysis Techniques

### Technique 1: Read Carefully

**Before Answering:**
1. Read question twice
2. Identify key requirements
3. Note any constraints
4. Look for "NOT" or "EXCEPT"

**Example:**
```
Which of the following is NOT a valid automation tool?

A) Workflow Rules
B) Process Builder
C) Flow
D) Apex Triggers

Analysis: The word "NOT" changes everything.
Focus: Which option is NOT valid?
Answer: All are valid, but this is a trick question.
```

### Technique 2: Elimination Strategy

**Step-by-Step:**
1. Read all options
2. Eliminate obviously wrong answers
3. Focus on remaining options
4. Choose best among viable options

**Example:**
```
Which relationship type allows roll-up summary fields?

A) Lookup
B) Master-Detail
C) External Lookup
D) Indirect Lookup

Elimination:
A) Lookup - No roll-up summary (eliminate)
B) Master-Detail - Allows roll-up summary (keep)
C) External Lookup - No roll-up summary (eliminate)
D) Indirect Lookup - No roll-up summary (eliminate)

Answer: B) Master-Detail
```

### Technique 3: Identify Keywords

**Look for Keywords:**
- "Best" - Choose most optimal
- "First" - Initial step
- "Minimum" - Lowest requirement
- "Maximum" - Highest limit
- "ALL" - Multiple correct
- "EXCEPT" - Choose what doesn't fit

**Keyword Analysis:**
```
Q: What is the MINIMUM code coverage required for deployment?

Options: A) 50% B) 65% C) 75% D) 100%

Keyword: "MINIMUM"
Analysis: What's the lowest acceptable?
Answer: C) 75% (This is the minimum required)
```

### Technique 4: Consider Context

**Context Factors:**
- Multi-tenant architecture
- Governor limits
- Best practices
- Scalability
- Maintainability

**Example:**
```
A developer needs to update 10,000 Account records. What is the best approach?

A) Loop and update each record individually
B) Use a single update statement
C) Use Batch Apex
D) Use @future method

Context Analysis:
- 10,000 records is large volume
- Single update respects limits (200 records at a time)
- Batch Apex handles large volumes efficiently
- @future is for asynchronous, not bulk

Answer: C) Batch Apex (Best for large volume)
```

---

## 🧠 Common Question Patterns

### Pattern 1: Governor Limits

**Question Types:**
- What is the limit for X?
- Will this code exceed limits?
- How to avoid limit exceptions?

**Strategy:**
1. Memorize critical limits
2. Recognize limit-exceeding patterns
3. Know optimization techniques

**Example:**
```
How many SOQL queries can be executed in a single transaction?

A) 50
B) 100
C) 150
D) 200

Memorized Fact: SOQL limit = 100
Answer: B) 100
```

### Pattern 2: "Best Approach" Questions

**Question Types:**
- What is the best solution?
- Which approach should be used?
- What is the recommended method?

**Strategy:**
1. Evaluate all options
2. Consider scalability
3. Think long-term
4. Follow best practices

**Example:**
```
A developer needs to send an email when an Opportunity is created. What is the best approach?

A) Workflow Rule
B) Process Builder
C) Flow
D) Apex Trigger

Evaluation:
A) Workflow - Simple, but no complex logic
B) Process Builder - More flexible, but Flow is newer
C) Flow - Best practice, most flexible
D) Apex Trigger - Overkill for simple email

Answer: C) Flow (Recommended best practice)
```

### Pattern 3: Code Analysis

**Question Types:**
- What will this code do?
- What is wrong with this code?
- What will be the output?

**Strategy:**
1. Read code line by line
2. Trace execution
3. Check for common mistakes
4. Consider limits

**Example:**
```
What is the issue with this code?

for (Account acc : accounts) {
    List<Contact> contacts = [SELECT Id FROM Contact WHERE AccountId = :acc.Id];
}

Options:
A) Will cause compilation error
B) Will exceed SOQL limit
C) Will exceed DML limit
D) No issue

Analysis:
- SOQL inside loop
- With 200+ accounts, will exceed 100 query limit
- Common anti-pattern

Answer: B) Will exceed SOQL limit
```

### Pattern 4: Scenario-Based

**Question Types:**
- Given scenario X, what should you do?
- A company needs to accomplish Y. What is the best approach?

**Strategy:**
1. Read entire scenario carefully
2. Identify requirements
3. Note constraints
4. Evaluate options against requirements

**Example:**
```
A company wants to track customer interactions across multiple channels. They need to:
1. Log all interactions
2. Generate reports
3. Send automated follow-ups
4. Support 10,000+ daily interactions

What solution should be used?

A) Workflow Rules
B) Process Builder
C) Flow
D) Apex Triggers

Requirements Analysis:
- Complex logic needed (not simple rules)
- High volume (batch processing needed)
- Automated follow-ups (automation required)
- Reports (data aggregation)

Answer: D) Apex Triggers (Most flexible for complex scenarios)
```

---

## ⚠️ Common Traps

### Trap 1: "Multiple Correct" Answers

**The Trap:** Multiple options seem correct, but question asks for BEST.

**Strategy:**
- Read question carefully
- Look for "best" or "most appropriate"
- Evaluate trade-offs
- Consider complexity vs. benefits

**Example:**
```
A developer needs to validate Account data. Which TWO approaches should be used?

Options:
A) Validation Rules
B) Workflow Rules
C) Apex Triggers
D) Process Builder

Analysis:
All can validate, but:
- A) Validation Rules - Best for simple validation
- B) Workflow - Not for validation (eliminate)
- C) Apex Triggers - Complex validation, but overkill
- D) Process Builder - Not for validation (eliminate)

Best Two: A) Validation Rules and C) Apex Triggers
```

### Trap 2: "Always" and "Never"

**The Trap:** Absolute words often indicate wrong answers.

**Strategy:**
- Be suspicious of "always"
- Be suspicious of "never"
- Look for conditional words ("may", "can")
- Absolute statements are usually wrong

**Example:**
```
Which statement is true about Master-Detail relationships?

A) Child records are always deleted when parent is deleted
B) Child records are never shared with parent
C) Roll-up summaries are always available
D) Junction objects always use Master-Detail

Analysis:
- A) "Always" - TRUE (cascade delete)
- B) "Never" - FALSE (inherit sharing)
- C) "Always" - FALSE (only on MD relationships)
- D) "Always" - FALSE (can use Lookup)

Correct: A (But "always" makes me suspicious)
Actually: A is correct for MD relationships
```

### Trap 3: Missing Requirements

**The Trap:** Option addresses some but not all requirements.

**Strategy:**
- List all requirements
- Check each option against ALL requirements
- Eliminate options missing any requirement

**Example:**
```
Requirements:
1. Update related records
2. Send email
3. Make callout to external API

Which automation tool should be used?

A) Workflow Rules
B) Process Builder
C) Flow
D) Apex Trigger

Check:
A) Workflow - Update? Yes. Email? Yes. Callout? No. (Eliminate)
B) Process Builder - Update? Yes. Email? Yes. Callout? No. (Eliminate)
C) Flow - Update? Yes. Email? Yes. Callout? Yes. (Keep)
D) Apex Trigger - Update? Yes. Email? No. Callout? Yes. (Eliminate)

Answer: C) Flow
```

### Trap 4: Outdated Knowledge

**The Trap:** Old tools or deprecated features.

**Strategy:**
- Know current best practices
- Avoid legacy solutions
- Prefer modern approaches
- Flow over Process Builder over Workflow

**Example:**
```
What is the recommended tool for record-triggered automation?

A) Workflow Rules
B) Process Builder
C) Flow
D) Visualforce Workflow

Analysis:
- A) Workflow - Legacy, being phased out
- B) Process Builder - Being replaced by Flow
- C) Flow - Current best practice
- D) Visualforce Workflow - Not a real tool

Answer: C) Flow (Current best practice)
```

---

## 🎯 Section-Specific Strategies

### Section 1: Salesforce Fundamentals (8%)

**Focus Areas:**
- Multi-tenant architecture
- Development environments
- Deployment methods
- Data model basics

**Key Memorization:**
- Sandbox types and limits
- Deployment method characteristics
- Standard objects and relationships

**Strategy:**
- Know when to use each deployment method
- Understand multi-tenant implications
- Memorize sandbox data limits

### Section 2: Data Modeling (20%)

**Focus Areas:**
- Object relationships
- Field types and limitations
- Data integrity
- Data migration

**Key Memorization:**
- Relationship types and differences
- Field type limitations (LongTextArea, RichTextArea)
- Validation rule formula syntax

**Strategy:**
- Know when to use MD vs Lookup
- Understand field dependencies
- Know external ID use cases

### Section 3: Automation (27%) - CRITICAL

**Focus Areas:**
- Workflow vs Process Builder vs Flow
- Apex triggers
- Apex classes
- Testing

**Key Memorization:**
- Automation tool feature comparison
- Trigger context variables
- Testing annotations and methods

**Strategy:**
- Know when to use each automation tool
- Understand trigger best practices
- Master bulkification patterns

### Section 4: User Interface (14%)

**Focus Areas:**
- Lightning App Builder
- LWC basics
- Lightning Data Service
- Aura (legacy)

**Key Memorization:**
- LWC decorators (@api, @track, @wire)
- LDS adapter functions
- Component lifecycle hooks

**Strategy:**
- Understand LWC vs Aura
- Know LDS adapters
- Understand component communication

### Section 5: Security (12%)

**Focus Areas:**
- Object-level security
- Field-level security
- Record-level security
- User security

**Key Memorization:**
- OWD hierarchy
- Sharing rules (expand, never restrict)
- Apex sharing keywords

**Strategy:**
- Understand security model layers
- Know when to use sharing keywords
- Understand manual sharing

### Section 6: Debugging & Deployment (8%)

**Focus Areas:**
- Debugging tools
- Deployment methods
- Deployment requirements
- Version control

**Key Memorization:**
- 75% code coverage requirement
- Deployment method characteristics
- Debug levels

**Strategy:**
- Know deployment requirements
- Understand version control basics
- Know debugging techniques

### Section 7: Integration (11%)

**Focus Areas:**
- REST API
- Callouts
- Connected Apps
- External objects

**Key Memorization:**
- HTTP methods (GET, POST, PUT, DELETE)
- Callout limit (100)
- OAuth flows

**Strategy:**
- Understand REST principles
- Know async callout methods
- Understand OAuth flows

---

## 📝 Practice Strategy

### Phase 1: Learn (Week 1)

**Focus:**
- Study each section
- Understand concepts
- Memorize key facts
- Complete practice questions

**Daily Schedule:**
- 2 hours study
- 50 practice questions
- Review wrong answers

### Phase 2: Practice (Week 2)

**Focus:**
- Timed practice tests
- Identify weak areas
- Focus on difficult topics
- Build endurance

**Daily Schedule:**
- 2 practice tests (120 questions)
- Review all answers
- Create study notes for weak areas

### Phase 3: Refine (Week 3)

**Focus:**
- Full-length mock exams
- Time management practice
- Final review
- Confidence building

**Daily Schedule:**
- 1 full mock exam (60 questions)
- Detailed review
- Focus on remaining weak areas

### Phase 4: Final Prep (Week 4)

**Focus:**
- Light review
- Cheat sheet review
- Rest and relaxation
- Mental preparation

**Daily Schedule:**
- 1 hour review
- Cheat sheet review
- No new material
- Get good sleep

---

## 🎓 Exam Day Strategy

### Before Exam

**1-2 Days Before:**
- Light review only
- No new material
- Review cheat sheet
- Get good sleep (7-8 hours)

**Day of Exam:**
- Eat light, healthy meal
- Arrive 15 minutes early
- Bring photo ID
- Clear browser cache

### During Exam

**First 10 Minutes:**
- Answer 10-15 easy questions
- Build confidence
- Don't mark for review yet

**Middle 80 Minutes:**
- Answer remaining questions
- Mark uncertain ones
- Manage time (1.75 min/question)
- Don't spend >3 minutes on any question

**Final 15 Minutes:**
- Review marked questions
- Check for careless mistakes
- Verify all 60 answered
- Trust first instinct

### Exam Tips

**General:**
- Read questions carefully
- Look for keywords (NOT, EXCEPT, ALL)
- Use elimination
- Never leave blank
- Trust your first instinct

**Time Management:**
- Watch the clock
- Don't get stuck
- Move on if unsure
- Return to marked questions

**Answer Strategy:**
- Eliminate obviously wrong answers
- Focus on remaining options
- Choose best option
- Don't overthink

---

## 🧪 Mock Exam Simulation

### Simulation 1: Easy Practice

**Purpose:** Build confidence, identify gaps

**Format:**
- 30 questions
- 45 minutes
- No time pressure
- Open notes allowed

**After Exam:**
- Review all answers
- Identify weak areas
- Create study plan

### Simulation 2: Timed Practice

**Purpose:** Practice time management

**Format:**
- 60 questions
- 105 minutes
- Real exam conditions
- Closed notes

**After Exam:**
- Analyze time spent per question
- Identify time-wasting patterns
- Adjust strategy

### Simulation 3: Full Mock

**Purpose:** Final preparation

**Format:**
- 60 questions
- 105 minutes
- Real exam conditions
- No breaks

**After Exam:**
- Final score analysis
- Confidence check
- Final review plan

---

## 📊 Tracking Progress

### Question Tracker Template

```
Section 1: Salesforce Fundamentals (50 questions)
Date: _____
Total Attempted: _____ / 50
Correct: _____ / _____
Percentage: _____%
Questions to Review: [List IDs]

Weak Topics:
- [Topic 1] - Questions: [IDs]
- [Topic 2] - Questions: [IDs]

Study Plan:
- [ ] Review [Topic 1]
- [ ] Practice more [Topic 2]
- [ ] Re-attempt wrong answers
```

### Score Tracker Template

```
Practice Exam Results:

Exam #1:
Date: _____
Score: _____ / 60 (_____%)
Time: __:__
Weak Areas: [Topics]
Improvement Plan: [Actions]

Exam #2:
Date: _____
Score: _____ / 60 (_____%)
Time: __:__
Weak Areas: [Topics]
Improvement Plan: [Actions]

Exam #3:
Date: _____
Score: _____ / 60 (_____%)
Time: __:__
Weak Areas: [Topics]
Ready for Exam: Yes/No

Final Exam:
Date: _____
Score: _____ / 60 (_____%)
Time: __:__
PASSED! 🎉
```

---

## 🎯 Key Facts to Memorize

### Governor Limits (Must Know)
```
SOQL Queries:          100
SOQL Rows:            50,000
DML Statements:        150
DML Rows:             10,000
Heap (sync):           6 MB
Heap (async):          12 MB
CPU Time (sync):       10,000 ms
CPU Time (async):      60,000 ms
Future Calls:          50
Callouts:             100
Email Invocations:     10
```

### Exam Requirements
```
Passing Score:         65% (39/60)
Time Allowed:          105 minutes
Questions:            60
Code Coverage:         75%
```

### Key Concepts
```
OWD:                   Organization-Wide Defaults
FLS:                   Field-Level Security
CRUD:                  Create, Read, Update, Delete
LWC:                   Lightning Web Component
LDS:                   Lightning Data Service
```

---

## ✅ Final Checklist

### Preparation
- [ ] Completed all study materials
- [ ] Memorized governor limits
- [ ] Practiced 500+ questions
- [ ] Taken 3+ mock exams
- [ ] Scored 70%+ on mocks
- [ ] Identified and addressed weak areas
- [ ] Created and reviewed cheat sheet
- [ ] Registered for exam

### Exam Day
- [ ] Got good sleep (7-8 hours)
- [ ] Ate healthy meal
- [ ] Arrived 15 minutes early
- [ ] Brought valid ID
- [ ] Cleared browser cache
- [ ] Tested webcam/microphone (if online)

### During Exam
- [ ] Read all questions carefully
- [ ] Managed time effectively
- [ ] Answered all 60 questions
- [ ] Reviewed marked questions
- [ ] Stayed calm and focused
- [ ] Trusted first instinct

### After Exam
- [ ] Waited for results
- [ ] Passed! 🎉
- [ ] Updated LinkedIn profile
- [ ] Added certification to resume
- [ ] Shared achievement
- [ ] Planned next certification

---

**Success Formula:** Preparation + Practice + Strategy + Confidence = CERTIFICATION! 🎉

**Next:** [AI Study Prompts](/docs/week4/ai-prompts/study-prompts)

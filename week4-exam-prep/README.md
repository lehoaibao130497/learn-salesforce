# Week 4: Exam Prep & AI Integration

## Learning Objectives
- [ ] Complete 500+ practice questions from Focus on Force
- [ ] Master Governor Limits and their implications
- [ ] Understand AI integration with Prompt Builder
- [ ] Learn platform limitations and constraints
- [ ] Prepare for Platform Developer I certification exam

## Prerequisites
- [ ] Completed Weeks 1-3
- [ ] Purchased Focus on Force study materials
- [ ] Registered for Platform Developer I exam
- [ ] Solid understanding of all previous topics

## Exam Overview

### Platform Developer I Certification Details
- **Duration:** 105 minutes
- **Questions:** 60 multiple-choice questions
- **Passing Score:** 65% (39/60 correct)
- **Format:** Multiple choice (may have multiple correct answers)
- **Registration:** Webassessor.com
- **Cost:** $200 USD

### Exam Content Breakdown
- **Salesforce Fundamentals:** ~8%
- **Data Modeling & Management:** ~20%
- **Process Automation & Business Logic:** ~27%
- **User Interface:** ~14%
- **Security:** ~12%
- **Debugging & Deployment:** ~8%
- **Integration:** ~11%

## Daily Progress

### Day 1-2: Focus on Force - Section 1-3
- [ ] Complete Section 1: Salesforce Fundamentals (50 questions)
- [ ] Complete Section 2: Data Modeling & Management (100 questions)
- [ ] Complete Section 3: Process Automation (120 questions)
- [ ] Review wrong answers and understand explanations
- [ ] Create cheat sheet for weak areas

### Day 3-4: Focus on Force - Section 4-7
- [ ] Complete Section 4: User Interface (70 questions)
- [ ] Complete Section 5: Security (60 questions)
- [ ] Complete Section 6: Debugging & Deployment (50 questions)
- [ ] Complete Section 7: Integration (50 questions)
- [ ] Take first full practice exam

### Day 5-6: Weak Areas & AI Integration
- [ ] Identify weak areas from practice tests
- [ ] Review Governor Limits in detail
- [ ] Learn Prompt Builder basics
- [ ] Practice AI integration scenarios
- [ ] Take second full practice exam
- [ ] Review all exam topics

### Day 7: Final Review & Exam
- [ ] Take final mock exam
- [ ] Review cheat sheet
- [ ] Rest and relax
- [ ] Take certification exam
- [ ] Celebrate! 🎉

## Focus on Force Question Tracker

Create a spreadsheet or tracking file:

```
Section 1: Salesforce Fundamentals (50 questions)
- Total attempted: _____ / 50
- Correct: _____ / _____ attempted
- Questions to review: _____

Section 2: Data Modeling (100 questions)
- Total attempted: _____ / 100
- Correct: _____ / _____ attempted
- Questions to review: _____

[Continue for all sections...]

Overall Progress:
- Total questions: _____ / 500+
- Correct rate: _____%
- Weak areas: [List topics]
```

## Governor Limits Deep Dive

### Critical Limits (Memorize These!)
| Limit | Value | Context |
|-------|-------|---------|
| SOQL Queries | 100 | Per transaction |
| SOQL Rows Retrieved | 50,000 | Per transaction |
| SOSL Queries | 20 | Per transaction |
| DML Statements | 150 | Per transaction |
| DML Rows | 10,000 | Per transaction |
| Heap Size | 6 MB (sync), 12 MB (async) | Per transaction |
| CPU Time | 10,000 ms (sync), 60,000 (async) | Per transaction |
| Future Calls | 50 | Per transaction |
| Callouts | 100 | Per transaction |
| Batch Size | 200 | Per batch execution |

### Common Exam Traps

**Trap 1:** SOQL in Loops
```apex
// ❌ WILL EXCEED LIMITS
for (Account acc : accounts) {
    List<Contact> contacts = [SELECT Id FROM Contact WHERE AccountId = :acc.Id];
}

// ✅ CORRECT APPROACH
Set<Id> accountIds = new Set<Id>();
for (Account acc : accounts) {
    accountIds.add(acc.Id);
}
Map<Id, List<Contact>> contactsByAccount = new Map<Id, List<Contact>>();
for (Contact con : [SELECT Id, AccountId FROM Contact WHERE AccountId IN :accountIds]) {
    if (!contactsByAccount.containsKey(con.AccountId)) {
        contactsByAccount.put(con.AccountId, new List<Contact>());
    }
    contactsByAccount.get(con.AccountId).add(con);
}
```

**Trap 2:** DML in Loops
```apex
// ❌ WILL EXCEED LIMITS
for (Account acc : accounts) {
    insert acc;
}

// ✅ CORRECT APPROACH
List<Account> accountsToInsert = new List<Account>();
for (Account acc : accounts) {
    accountsToInsert.add(acc);
}
insert accountsToInsert;
```

**Trap 3:** Not Using LIMIT
```apex
// ❌ RISKY - Could return 50,000+ rows
List<Account> accounts = [SELECT Id FROM Account WHERE Industry = 'Tech'];

// ✅ CORRECT - Specify LIMIT
List<Account> accounts = [SELECT Id FROM Account WHERE Industry = 'Tech' LIMIT 100];
```

**Trap 4:** CPU Time Limit
- Avoid complex calculations in loops
- Use efficient algorithms
- Consider asynchronous processing for heavy operations

**Trap 5:** Heap Size Limit
- Don't load unnecessary data
- Clean up large objects when done
- Use SOQL field filtering

## AI Integration with Prompt Builder

### What is Prompt Builder?
- Low-code tool for integrating Einstein GPT
- Build natural language prompts for AI interactions
- Use in Flow, Apex, and LWC

### Key Concepts
1. **Prompt Templates:** Reusable prompt structures
2. **Prompt Variables:** Dynamic values in prompts
3. **Prompt Actions:** Execute AI operations
4. **Grounding:** Provide context to AI

### Example: AI-Powered Email Generation

**Use Case:** Auto-generate personalized sales emails based on opportunity data

**Prompt Template:**
```
You are a helpful sales assistant. Generate a personalized email for the following opportunity:

Customer Name: {CustomerName}
Industry: {Industry}
Product Interest: {ProductInterest}
Budget Range: {BudgetRange}

The email should:
- Be professional and concise
- Highlight relevant benefits for their industry
- Include a clear call to action
- Be under 150 words
```

**Integration in Flow:**
1. Get Opportunity details
2. Execute Prompt Builder action with template
3. Store generated email in custom field
4. User reviews and sends

### Integration in Apex

```apex
public with sharing class EmailGeneratorService {
    
    @AuraEnabled(cacheable=true)
    public static String generateEmail(Id opportunityId) {
        Opportunity opp = [
            SELECT Name, Account.Name, Account.Industry, 
                   Amount, StageName 
            FROM Opportunity 
            WHERE Id = :opportunityId
        ];
        
        // Call Einstein GPT via Prompt Builder
        // (This would use the Einstein GPT API)
        String prompt = buildPrompt(opp);
        String generatedEmail = callEinsteinGPT(prompt);
        
        return generatedEmail;
    }
    
    private static String buildPrompt(Opportunity opp) {
        return 'Generate a follow-up email for ' + opp.Account.Name + 
               ' in the ' + opp.Account.Industry + ' industry. ' +
               'They are interested in a deal worth $' + opp.Amount;
    }
    
    private static String callEinsteinGPT(String prompt) {
        // Implementation using Einstein GPT API
        return 'AI generated email content...';
    }
}
```

### Integration in LWC

```javascript
import { LightningElement, api, wire } from 'lwc';
import generateEmail from '@salesforce/apex/EmailGeneratorService.generateEmail';

export default class EmailGenerator extends LightningElement {
    @api recordId;
    @track generatedEmail;
    @track isLoading = false;
    @track error;

    handleGenerateEmail() {
        this.isLoading = true;
        this.error = null;
        
        generateEmail({ opportunityId: this.recordId })
            .then(result => {
                this.generatedEmail = result;
                this.isLoading = false;
            })
            .catch(error => {
                this.error = error.body.message;
                this.isLoading = false;
            });
    }

    handleSendEmail() {
        // Logic to send the generated email
    }
}
```

## Exam Strategy

### Time Management
- Total time: 105 minutes
- Questions: 60
- Average time per question: ~1.75 minutes
- **Strategy:**
  - Answer easy questions first (mark for review if needed)
  - Return to marked questions
  - Never leave a question unanswered
  - Trust your first instinct

### Question Types
1. **Single Answer:** Choose one best answer
2. **Multiple Answer:** Choose all that apply (2-4 correct)
3. **Scenario:** Read scenario then answer questions
4. **Exhibit:** Analyze code/screenshots then answer

### Common Question Patterns

**Pattern 1:** "What is the best approach?"
- Consider best practices
- Choose the most scalable solution
- Think about long-term maintainability

**Pattern 2:** "Which of the following statements are true?"
- Carefully read each statement
- Look for absolute words (always, never) - often wrong
- Look for conditional words (may, can) - often right

**Pattern 3:** "What will this code do?"
- Analyze code execution step by step
- Consider governor limits
- Check for common mistakes

**Pattern 4:** "Which two solutions would you implement?"
- Multiple correct answers possible
- Choose the two BEST solutions
- Consider complexity vs. benefits

### Exam Day Tips

**Before Exam:**
- Get good sleep
- Eat a light meal
- Arrive 15 minutes early
- Bring identification
- Clear web browser cache

**During Exam:**
- Read questions carefully
- Eliminate obviously wrong answers
- Mark questions for review
- Manage time effectively
- Stay calm and focused

**After Each Question:**
- Don't overthink
- Trust your knowledge
- Move to next question if unsure

## Cheat Sheet - Key Concepts

### Data Model
- **Master-Detail:** Child inherits security from parent, cascade delete
- **Lookup:** No security inheritance, no cascade delete
- **Roll-up Summary:** Only on Master-Detail, aggregate child data

### Security
- **Profiles:** Base access control, one per user
- **Permission Sets:** Additional permissions, multiple per user
- **OWD:** Default sharing for entire org
- **Sharing Rules:** Expand access, never restrict

### Automation Tools Comparison
| Tool | When to Use |
|------|-------------|
| Process Builder | Simple record updates, email alerts |
| Flow | Complex logic, multiple objects, loops |
| Apex Trigger | Complex calculations, callouts, bulk operations |
| Workflow Rules | Legacy, simple updates |

### Testing
- **@isTest:** Decorator for test classes
- **Test.startTest() / Test.stopTest():** Separate test execution limits
- **75% Coverage:** Minimum required for deployment
- **testVisible:** Allow testing private methods

### Deployment
- **Change Sets:** Between connected orgs
- **SFDX CLI:** Command-line deployment
- **Ant Migration Tool:** XML-based deployment
- **Metadata API:** Programmatic deployment

## Practice Exams

### Focus on Force Practice Exams
1. Take first practice exam early in the week
2. Score: _____ / 60 (_____ %)
3. Weak areas: [List]
4. Focus improvement on weak areas
5. Take second practice exam mid-week
6. Score: _____ / 60 (_____ %)
7. Take final practice exam before exam day
8. Score: _____ / 60 (_____ %)

### Mock Exam Results Tracker

| Exam | Score | % | Time Taken | Weak Areas |
|------|-------|---|------------|------------|
| Practice 1 | ___/60 | ___% | __:__ | [Areas] |
| Practice 2 | ___/60 | ___% | __:__ | [Areas] |
| Practice 3 | ___/60 | ___% | __:__ | [Areas] |
| Final | ___/60 | ___% | __:__ | [Areas] |

## Resources
- [Focus on Force Study Guide](https://focusonforce.com/platform-developer-i/)
- [Salesforce Certification Guide](https://trailhead.salesforce.com/credentials/salesforcecertifiedplatformdeveloperi)
- [Einstein GPT Documentation](https://developer.salesforce.com/docs/atlas.en-us.einstein_ai.meta/einstein_ai/)
- [Prompt Builder Guide](https://help.salesforce.com/s/articleView?id=sf.einstein_prompt_builder.htm)
- [Webassessor](https://www.webassessor.com/) - Exam registration

## Notes Template
### Date: [Insert Date]

**Exam Topics Covered:**
- [ ] [Topic 1]
- [ ] [Topic 2]

**Questions Completed:**
- Section 1: _____ / 50
- Section 2: _____ / 100
- Total: _____ / 500+

**Correct Rate:** _____%

**Weak Areas:**
- [Weak area 1] - Study plan: [How to improve]
- [Weak area 2] - Study plan: [How to improve]

**AI Concepts Learned:**
- [Concept 1]
- [Concept 2]

**Practice Exam Results:**
- Exam #: __
- Score: ___/60 (___%)
- Time: __:__

**Questions to Review:**
- [Question 1] - Reason: [Why missed]
- [Question 2] - Reason: [Why missed]

## Week 4 Completion Checklist
- [ ] All 500+ practice questions completed
- [ ] All Focus on Force sections finished
- [ ] 3+ practice exams taken
- [ ] Governor limits memorized
- [ ] Weak areas reviewed and strengthened
- [ ] Prompt Builder concepts understood
- [ ] AI integration scenarios practiced
- [ ] Cheat sheet created and reviewed
- [ ] Exam registered
- [ ] Confidence level: High (Ready for exam!)
- [ ] **CERTIFICATION EARNED!** 🎉

## Post-Certification
- [ ] Update LinkedIn profile
- [ ] Add certification to resume
- [ ] Join Salesforce developer communities
- [ ] Consider next certification path
- [ ] Share success story!
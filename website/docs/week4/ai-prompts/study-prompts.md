# Week 4: AI Study Prompts

## 🤖 Using AI for Exam Preparation

### Why Use AI for Studying?

**Benefits:**
- **Personalized** learning paths
- **Instant** explanations
- **Practice** question generation
- **Flashcard** creation
- **Review** summaries

**Tools to Use:**
- ChatGPT (OpenAI)
- Claude (Anthropic)
- Google Bard
- GitHub Copilot
- Einstein GPT (for Salesforce-specific)

---

## 📝 Study Prompt Categories

### Category 1: Concept Explanation

**Purpose:** Get clear explanations of complex topics

**Prompt Templates:**

**Template 1: Basic Explanation**
```
Explain [TOPIC] in Salesforce Platform Developer I certification.

Include:
1. What is [TOPIC]?
2. When is it used?
3. Key concepts and terms
4. Common use cases
5. Important considerations
6. Example scenario

Keep explanation clear and concise, suitable for a developer preparing for certification.
```

**Example Usage:**
```
Explain Governor Limits in Salesforce Platform Developer I certification.

Include:
1. What are Governor Limits?
2. When are they enforced?
3. Key concepts and terms
4. Common use cases
5. Important considerations
6. Example scenario

Keep explanation clear and concise, suitable for a developer preparing for certification.
```

**Template 2: Comparison**
```
Compare [TOPIC A] and [TOPIC B] in Salesforce.

Provide:
1. Definition of each
2. Key differences
3. When to use each
4. Advantages and disadvantages
5. Best practice recommendations
6. Example scenarios

Focus on Platform Developer I exam requirements.
```

**Example Usage:**
```
Compare Workflow Rules and Flow in Salesforce.

Provide:
1. Definition of each
2. Key differences
3. When to use each
4. Advantages and disadvantages
5. Best practice recommendations
6. Example scenarios

Focus on Platform Developer I exam requirements.
```

**Template 3: Deep Dive**
```
Provide an in-depth explanation of [TOPIC] for Salesforce Platform Developer I exam.

Cover:
1. Technical details
2. Implementation approach
3. Best practices
4. Common mistakes
5. Exam-relevant points
6. Code examples (if applicable)

Make it comprehensive but exam-focused.
```

---

### Category 2: Practice Question Generation

**Purpose:** Create practice questions for study

**Prompt Templates:**

**Template 1: Single Question**
```
Create a Platform Developer I exam question about [TOPIC].

Requirements:
1. Multiple choice with 4 options (A, B, C, D)
2. Focus on [SPECIFIC ASPECT]
3. Include scenario if applicable
4. One correct answer
5. Difficultly level: [EASY/MEDIUM/HARD]

After the question, provide:
- Correct answer
- Detailed explanation
- Why other options are incorrect
- Key learning points
```

**Example Usage:**
```
Create a Platform Developer I exam question about Governor Limits.

Requirements:
1. Multiple choice with 4 options (A, B, C, D)
2. Focus on SOQL query limits
3. Include scenario if applicable
4. One correct answer
5. Difficulty level: MEDIUM

After the question, provide:
- Correct answer
- Detailed explanation
- Why other options are incorrect
- Key learning points
```

**Template 2: Question Set**
```
Create a set of 5 Platform Developer I exam questions about [TOPIC].

For each question:
1. Multiple choice with 4 options
2. Varying difficulty (2 easy, 2 medium, 1 hard)
3. Include scenario for complex questions
4. One correct answer per question

After all questions, provide:
- Answer key
- Brief explanation for each
- Overall topic summary
- Study recommendations
```

**Template 3: Scenario-Based Questions**
```
Create a scenario-based Platform Developer I exam question.

Scenario:
A company needs to [BUSINESS REQUIREMENT].

Requirements for automation:
1. [REQUIREMENT 1]
2. [REQUIREMENT 2]
3. [REQUIREMENT 3]
4. [REQUIREMENT 4]

Create 3 questions related to this scenario:
1. Question about automation tool selection
2. Question about implementation approach
3. Question about potential issues/limits

For each question, provide:
- 4 multiple choice options
- Correct answer
- Explanation
```

---

### Category 3: Code Analysis

**Purpose:** Analyze code for exam scenarios

**Prompt Templates:**

**Template 1: Code Review**
```
Review this Apex code and identify issues related to [TOPIC]:

[INSERT CODE HERE]

Analyze:
1. Will this code work? Yes/No
2. What are the issues?
3. What governor limits might be exceeded?
4. How would you fix it?
5. Best practice recommendations
6. Exam-relevant points

Provide corrected code if needed.
```

**Example Usage:**
```
Review this Apex code and identify issues related to Governor Limits:

for (Account acc : accounts) {
    List<Contact> contacts = [SELECT Id, FirstName, LastName 
                               FROM Contact 
                               WHERE AccountId = :acc.Id];
}

Analyze:
1. Will this code work? Yes/No
2. What are the issues?
3. What governor limits might be exceeded?
4. How would you fix it?
5. Best practice recommendations
6. Exam-relevant points

Provide corrected code if needed.
```

**Template 2: Code Explanation**
```
Explain this Apex code step by step:

[INSERT CODE HERE]

For each section:
1. What does this code do?
2. What Salesforce features are used?
3. What are the key concepts?
4. What exam topics are tested?
5. What are potential pitfalls?

Provide a clear, line-by-line explanation.
```

**Template 3: Code Improvement**
```
Review and improve this Apex code for [SPECIFIC GOAL]:

Current code:
[INSERT CODE HERE]

Goal: [SPECIFIC GOAL - e.g., optimize for governor limits]

Provide:
1. Issues with current code
2. Improved code
3. Explanation of improvements
4. Performance benefits
5. Best practices applied
6. Exam-relevant takeaways
```

---

### Category 4: Flashcard Creation

**Purpose:** Create flashcards for memorization

**Prompt Templates:**

**Template 1: Definition Flashcards**
```
Create 10 flashcards for [TOPIC] in Salesforce Platform Developer I.

Format:
FRONT: [Term or Concept]
BACK: [Definition/Explanation]

Focus on:
- Key terms
- Important concepts
- Exam-critical knowledge
- Must-memorize facts

Make flashcards clear, concise, and exam-focused.
```

**Example Usage:**
```
Create 10 flashcards for Governor Limits in Salesforce Platform Developer I.

Format:
FRONT: [Term or Concept]
BACK: [Definition/Explanation]

Focus on:
- Key terms
- Important concepts
- Exam-critical knowledge
- Must-memorize facts

Make flashcards clear, concise, and exam-focused.
```

**Template 2: Scenario Flashcards**
```
Create 10 scenario-based flashcards for [TOPIC].

Format:
FRONT: [Scenario description]
BACK: [Best practice/solution]

Include:
- Real-world scenarios
- Best practice recommendations
- Multiple choice options (optional)
- Exam-relevant situations
```

**Template 3: Limit Flashcards**
```
Create flashcards for Salesforce Governor Limits.

Format:
FRONT: What is the limit for [LIMIT TYPE]?
BACK: [LIMIT VALUE] - [CONTEXT]

Include:
- SOQL limits
- DML limits
- System limits
- Sync vs async differences
- Critical limits (must memorize)
```

---

### Category 5: Study Plan Generation

**Purpose:** Create personalized study plans

**Prompt Templates:**

**Template 1: 4-Week Study Plan**
```
Create a 4-week study plan for Platform Developer I certification.

My situation:
- Time available: [HOURS PER WEEK]
- Current knowledge level: [BEGINNER/INTERMEDIATE/ADVANCED]
- Strongest areas: [LIST TOPICS]
- Weakest areas: [LIST TOPICS]
- Exam date: [DATE IF KNOWN]

Create plan that includes:
1. Weekly schedule
2. Daily breakdown
3. Focus areas by week
4. Practice question targets
5. Review sessions
6. Mock exam schedule

Make it realistic and achievable.
```

**Template 2: Focused Study Plan**
```
Create a focused study plan for [SPECIFIC TOPIC].

My situation:
- Current understanding: [LOW/MEDIUM/HIGH]
- Time available: [HOURS]
- Exam date: [DATE IF KNOWN]

Include:
1. Learning objectives
2. Daily schedule
3. Practice question targets
4. Key points to master
5. Common pitfalls to avoid
6. Review schedule
```

**Template 3: Crash Course Plan**
```
Create a 1-week crash course study plan for Platform Developer I exam.

My situation:
- Time available: 2-3 hours per day
- Focus areas: [LIST WEAK AREAS]
- Exam date: In 1 week

Include:
1. Daily schedule with hourly breakdown
2. Priority topics
3. Practice question requirements
4. Review sessions
5. Exam day preparation
6. Tips for last-minute cramming
```

---

### Category 6: Review & Summary

**Purpose:** Review and summarize study materials

**Prompt Templates:**

**Template 1: Topic Summary**
```
Provide a comprehensive summary of [TOPIC] for Platform Developer I exam review.

Include:
1. Key concepts
2. Important definitions
3. Must-know facts
4. Common exam questions
5. Best practices
6. Code examples (if applicable)

Make it concise and exam-focused.
```

**Template 2: Weak Area Focus**
```
I'm struggling with [TOPIC] for Platform Developer I exam.

Help me understand:
1. Common misconceptions
2. Step-by-step explanation
3. Memory aids/mnemonics
4. Practice questions
5. Tips for remembering
6. How this relates to exam

Be patient and thorough.
```

**Template 3: Exam Day Prep**
```
I'm taking the Platform Developer I exam tomorrow.

Provide:
1. Last-minute review checklist
2. Key facts to memorize
3. Exam day tips
4. Time management strategy
5. Common traps to avoid
6. Confidence-building advice

Focus on practical, actionable advice.
```

---

### Category 7: Code Generation

**Purpose:** Generate code examples for practice

**Prompt Templates:**

**Template 1: Best Practice Code**
```
Write Apex code that demonstrates best practices for [TOPIC].

Requirements:
1. Follow Salesforce coding standards
2. Respect governor limits
3. Include comments
4. Handle errors appropriately
5. Test-ready code
6. Exam-relevant scenario

Provide:
- Complete code
- Explanation of best practices
- Why this approach is recommended
```

**Example Usage:**
```
Write Apex code that demonstrates best practices for Trigger Bulkification.

Requirements:
1. Follow Salesforce coding standards
2. Respect governor limits
3. Include comments
4. Handle errors appropriately
5. Test-ready code
6. Exam-relevant scenario

Provide:
- Complete code
- Explanation of best practices
- Why this approach is recommended
```

**Template 2: Comparison Code**
```
Write two code examples for [TASK]:
1. Poor practice example
2. Best practice example

For each, explain:
- Why it's good or bad
- What problems it causes
- How to improve
- Exam-relevant points

Focus on [SPECIFIC CONCERN - e.g., governor limits, performance].
```

**Template 3: Test Code**
```
Write unit tests for the following Apex class:

[INSERT CLASS CODE]

Requirements:
1. 75%+ code coverage
2. Test positive and negative scenarios
3. Test bulk operations
4. Use Test.startTest() and Test.stopTest()
5. Include assertions
6. Follow testing best practices

Provide complete test class with explanations.
```

---

### Category 8: Mock Exam Simulation

**Purpose:** Simulate exam experience

**Prompt Templates:**

**Template 1: Full Mock Exam**
```
Create a 60-question Platform Developer I mock exam.

Requirements:
1. Match actual exam format (60 questions, 105 minutes)
2. Cover all 7 exam sections proportionally
   - Salesforce Fundamentals: ~8% (5 questions)
   - Data Modeling: ~20% (12 questions)
   - Process Automation: ~27% (16 questions)
   - User Interface: ~14% (8 questions)
   - Security: ~12% (7 questions)
   - Debugging & Deployment: ~8% (5 questions)
   - Integration: ~11% (7 questions)
3. Mix of difficulty levels
4. Include code analysis questions
5. Include scenario-based questions

After the exam:
- Answer key
- Explanation for each question
- Score calculation
- Weak area analysis
- Study recommendations
```

**Template 2: Section-Focused Mock**
```
Create a 10-question mock exam focused on [TOPIC].

Requirements:
1. 10 multiple-choice questions
2. Varying difficulty
3. Include code analysis if applicable
4. Include scenarios
5. Focus on exam-relevant aspects

After the exam:
- Answer key
- Explanations
- Score calculation
- Weak point identification
```

**Template 3: Timed Practice**
```
Simulate a timed practice session for [TOPIC].

Create 20 questions to complete in 35 minutes.
Include:
1. Time limit for each question
2. Progress tracking
3. Immediate feedback (optional)
4. Time management tips

After completion:
- Score calculation
- Time analysis
- Recommendations for improvement
```

---

## 🎯 Specific Topic Prompts

### Governor Limits

```
Explain Governor Limits in Salesforce.

Cover:
1. Why do they exist?
2. Critical limits to memorize
3. How they differ in sync vs async
4. Common ways to exceed limits
5. How to avoid limit exceptions
6. Best practices

Include a table of must-memorize limits.
```

### Automation Tools

```
Compare Workflow Rules, Process Builder, and Flow.

Create a comparison table including:
- Record updates
- Email alerts
- Tasks
- Field updates
- Multiple actions
- Complex logic
- Loops
- Callouts
- Create records
- Delete records

For each feature, indicate which tools support it.
```

### LWC Basics

```
Explain Lightning Web Components (LWC) basics.

Cover:
1. What is LWC?
2. Why use LWC over Aura?
3. Key decorators (@api, @track, @wire)
4. Component lifecycle
5. Lightning Data Service
6. Best practices

Include code examples for each concept.
```

### Triggers

```
Explain Apex Triggers in detail.

Cover:
1. When to use triggers
2. Trigger context variables
3. Trigger events (before insert, after update, etc.)
4. Best practices (bulkification, handler pattern)
5. Common mistakes
6. Testing triggers

Include code examples for good and bad triggers.
```

### Security

```
Explain Salesforce security model.

Cover:
1. Organization-Wide Defaults (OWD)
2. Profiles and Permission Sets
3. Field-Level Security (FLS)
4. Record-Level Security (Sharing)
5. Apex sharing keywords (with/without/inherited)
6. Manual sharing

Include a diagram showing the security layers.
```

---

## 📚 Integration with Einstein GPT

### Salesforce-Specific Prompts

**Prompt 1: Einstein GPT Explanation**
```
Explain Einstein GPT in the context of Salesforce Platform Developer I exam.

Include:
1. What is Einstein GPT?
2. Key components (Prompt Builder, Trust Layer, etc.)
3. How to use Prompt Builder
4. Integration methods (Flow, Apex, LWC)
5. Best practices
6. Security considerations
7. Exam-relevant points

Focus on practical implementation.
```

**Prompt 2: Prompt Builder Examples**
```
Create 3 example prompt templates for different use cases:

1. Sales email generation for opportunities
2. Case summarization for customer service
3. Knowledge article creation from case resolution

For each prompt:
- Define the use case
- Create the prompt template
- Explain grounding strategy
- Show integration approach (Flow/Apex/LWC)
- Provide best practices
```

---

## 🧪 AI Study Workflow

### Step 1: Identify Weak Areas

**Prompt:**
```
I'm studying for Platform Developer I exam and want to identify my weak areas.

Based on these practice results:
[INSERT PRACTICE EXAM SCORES]

Analyze:
1. Which sections need more focus?
2. What are the patterns in my mistakes?
3. Which topics should I prioritize?
4. How should I allocate my study time?

Provide a prioritized list of topics to study.
```

### Step 2: Create Study Plan

**Prompt:**
```
Create a personalized study plan for my Platform Developer I exam preparation.

My situation:
- Exam date: [DATE]
- Study time available: [HOURS PER WEEK]
- Weak areas: [LIST TOPICS]
- Strong areas: [LIST TOPICS]

Create a 4-week plan with:
1. Weekly focus areas
2. Daily study schedule
3. Practice question targets
4. Review sessions
5. Mock exam schedule
6. Progress checkpoints

Make it realistic and achievable.
```

### Step 3: Generate Practice Questions

**Prompt:**
```
Create 20 practice questions for [TOPIC] in Platform Developer I exam.

For each question:
- Multiple choice with 4 options
- Varying difficulty (8 easy, 8 medium, 4 hard)
- Include code analysis questions
- Include scenario-based questions

After all questions:
- Answer key
- Explanations for each answer
- Key learning points
- Additional study recommendations
```

### Step 4: Review and Reinforce

**Prompt:**
```
I've completed practice questions for [TOPIC]. Here are my wrong answers:

[INSERT WRONG ANSWERS AND EXPLANATIONS]

Help me understand:
1. Why I got these wrong
2. What concepts I'm missing
3. How to remember the correct answers
4. What to review

Provide clear explanations and memory aids.
```

---

## 🎓 Best Practices for AI Study Prompts

### 1. Be Specific

**❌ Poor:**
```
Help me study for the exam.
```

**✅ Good:**
```
Create 10 practice questions about Governor Limits for Platform Developer I exam, focusing on SOQL and DML limits.
```

### 2. Provide Context

**❌ Poor:**
```
Explain triggers.
```

**✅ Good:**
```
Explain Apex Triggers for Platform Developer I exam, focusing on bulkification best practices and trigger context variables.
```

### 3. Request Format

**❌ Poor:**
```
Give me some questions.
```

**✅ Good:**
```
Create 10 multiple-choice questions with 4 options each, including code analysis and scenarios, for the topic of Governor Limits.
```

### 4. Ask for Explanations

**❌ Poor:**
```
Here's my wrong answer.
```

**✅ Good:**
```
I answered incorrectly on this question about Master-Detail relationships. Explain why my answer was wrong and help me understand the correct answer.
```

### 5. Iterate and Refine

**Process:**
1. Get initial response from AI
2. Review quality and relevance
3. Ask follow-up questions
4. Refine prompt if needed
5. Request specific clarifications

**Example Follow-up:**
```
That was helpful, but can you provide more code examples for the bulkification concept? Also, include a comparison with non-bulkified code.
```

---

## 📊 Prompt Tracking

### Study Session Log Template

```
Date: _____
Topic: _____
AI Tool Used: _____
Prompt Used:
[PASTE PROMPT]

Quality Rating: _____ / 5
Usefulness Rating: _____ / 5
Notes:
[NOTES]

Follow-up Questions:
[QUESTIONS]

Action Items:
- [ ] [Action 1]
- [ ] [Action 2]
```

### Progress Tracking

```
Week 1 Study Sessions:
Day 1: Topic _____, Questions created _____
Day 2: Topic _____, Questions created _____
Day 3: Topic _____, Questions created _____
Day 4: Topic _____, Questions created _____
Day 5: Topic _____, Questions created _____
Day 6: Review, Mock exam score _____/60
Day 7: Review, Weak areas identified

Total Practice Questions Created: _____
Total Hours Studied: _____
```

---

## 🔒 Important Considerations

### Limitations of AI

**Remember:**
- AI can make mistakes
- Always verify information
- Cross-reference with official documentation
- Use AI as supplement, not replacement
- Focus on Salesforce documentation for accuracy

### Verification

**Always Verify:**
- Governor limit values
- API names and syntax
- Best practice recommendations
- Code examples
- Exam information

**Reliable Sources:**
- Salesforce Developer Documentation
- Trailhead
- Official Exam Guide
- Focus on Force

---

## ✅ AI Study Checklist

### Daily AI Study Session
- [ ] Identify topic for session
- [ ] Create specific prompt
- [ ] Review AI response
- [ ] Verify information
- [ ] Take notes
- [ ] Practice with generated questions
- [ ] Log session details

### Weekly AI Study Review
- [ ] Review all AI sessions
- [ ] Identify most helpful prompts
- [ ] Refine prompt templates
- [ ] Track progress
- [ ] Adjust study plan based on insights
- [ ] Create new prompts for weak areas

### Exam Week AI Preparation
- [ ] Use AI for final review prompts
- [ ] Generate mock exams
- [ ] Create flashcards for memorization
- [ ] Get exam day tips from AI
- [ ] Verify all AI-generated information
- [ ] Focus on official sources for final prep

---

## 📚 Resources

### AI Tools
- ChatGPT: https://chat.openai.com
- Claude: https://claude.ai
- GitHub Copilot: https://github.com/features/copilot

### Salesforce Resources
- Developer Documentation: https://developer.salesforce.com/docs
- Trailhead: https://trailhead.salesforce.com
- Einstein GPT: https://help.salesforce.com/s/articleView?id=sf.einstein_gpt_overview.htm

### Study Resources
- Focus on Force: https://focusonforce.com/platform-developer-i/
- Salesforce Certification: https://trailhead.salesforce.com/credentials/salesforcecertifiedplatformdeveloperi

---

**Success Formula:** AI Assistance + Official Resources + Practice = CERTIFICATION! 🎉
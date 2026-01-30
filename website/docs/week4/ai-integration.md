# Week 4: AI Integration with Prompt Builder

## 🤖 Introduction to Einstein GPT

### What is Einstein GPT?

**Einstein GPT** is Salesforce's generative AI that:
- **Generates** content using natural language
- **Understands** context from Salesforce data
- **Integrates** seamlessly with Salesforce platform
- **Provides** AI-powered assistance across applications

### Key Components

| Component | Description |
|-----------|-------------|
| **Einstein GPT** | Core generative AI engine |
| **Prompt Builder** | Low-code tool for creating prompts |
| **Einstein Trust Layer** | Security and governance for AI |
| **Einstein Studio** | Custom AI model development |

---

## 🎯 Prompt Builder

### What is Prompt Builder?

**Prompt Builder** is a low-code tool that:
- **Creates** reusable prompt templates
- **Defines** prompt variables for dynamic content
- **Integrates** with Flow, Apex, and LWC
- **Provides** grounding for accurate responses

### Accessing Prompt Builder

**Navigation:**
1. Setup → Quick Find → "Prompt Builder"
2. Click "Prompt Builder"
3. Create new prompt template

**Prerequisites:**
- Einstein GPT enabled in org
- Appropriate permissions (Customize Application)
- Data model understanding

---

## 📝 Creating Prompt Templates

### Basic Prompt Structure

```
[Role Definition]

[Context Information]
{{Grounding_Field_1}}
{{Grounding_Field_2}}

[Task Description]

[Output Requirements]
- Format
- Length
- Style

[Examples]
```

### Example 1: Email Generation

**Use Case:** Generate personalized sales follow-up emails

**Prompt Template:**
```
You are a helpful sales assistant specializing in B2B sales.

Generate a personalized follow-up email for the following opportunity:

Customer Name: {{Opportunity.Account.Name}}
Industry: {{Opportunity.Account.Industry}}
Product Interest: {{Opportunity.Product_Family__c}}
Budget Range: {{Opportunity.Amount}}
Current Stage: {{Opportunity.StageName}}
Last Contact Date: {{Opportunity.Last_Contact_Date__c}}

The email should:
- Be professional and friendly
- Highlight benefits relevant to {{Opportunity.Account.Industry}} industry
- Reference their interest in {{Opportunity.Product_Family__c}}
- Be under 150 words
- Include a clear call to action to schedule a demo
- End with professional signature
```

**Variables:**
- `{{Opportunity.Account.Name}}` - Account name
- `{{Opportunity.Account.Industry}}` - Account industry
- `{{Opportunity.Product_Family__c}}` - Product family
- `{{Opportunity.Amount}}` - Opportunity amount
- `{{Opportunity.StageName}}` - Stage
- `{{Opportunity.Last_Contact_Date__c}}` - Last contact date

### Example 2: Case Summary

**Use Case:** Summarize case details for agent review

**Prompt Template:**
```
You are a customer service analyst.

Summarize the following case details:

Case Number: {{Case.CaseNumber}}
Subject: {{Case.Subject}}
Priority: {{Case.Priority}}
Status: {{Case.Status}}
Customer: {{Case.Contact.Name}}
Account: {{Case.Account.Name}}
Description: {{Case.Description}}
Origin: {{Case.Origin}}
Created Date: {{Case.CreatedDate}}

Provide a concise summary that includes:
1. Main issue or request
2. Priority level and urgency
3. Any actions already taken
4. Recommended next steps

Keep the summary under 100 words.
```

### Example 3: Knowledge Article

**Use Case:** Generate knowledge article from case solution

**Prompt Template:**
```
You are a technical writer specializing in Salesforce documentation.

Create a knowledge article based on the following case resolution:

Issue: {{Case.Subject}}
Solution: {{Case.Solution_Description__c}}
Product Area: {{Case.Product_Area__c}}
Error Messages: {{Case.Error_Messages__c}}
Steps Taken: {{Case.Steps_Taken__c}}

The article should include:
- Clear title
- Problem description
- Root cause
- Step-by-step resolution
- Prevention tips

Format in markdown with appropriate headers and bullet points.
```

---

## 🔧 Prompt Builder Configuration

### Template Settings

**Basic Configuration:**
```yaml
Name: Sales Email Generator
Description: Generate personalized sales emails
API Name: Sales_Email_Generator__c
Object: Opportunity
```

**Advanced Configuration:**
```yaml
Model: GPT-4 (or Claude, etc.)
Temperature: 0.7
Max Tokens: 200
Frequency Penalty: 0.5
Presence Penalty: 0.5
```

### Prompt Variables

**Field References:**
- `{{ObjectName.FieldName}}` - Direct field reference
- `{{ObjectName.RelatedObject.FieldName}}` - Related field

**System Variables:**
- `{{$User.FirstName}}` - Current user's first name
- `{{$User.LastName}}` - Current user's last name
- `{{$Organization.Name}}` - Org name

**Example:**
```
Hello {{Opportunity.Account.Name}},

I hope this email finds you well. I'm {{$User.FirstName}} {{$User.LastName}} 
from {{$Organization.Name}}, and I'm following up on your interest 
in {{Opportunity.Product_Family__c}}.
```

### Grounding

**What is Grounding?**
Grounding provides context to AI from Salesforce data, ensuring accurate and relevant responses.

**Grounding Types:**
1. **Record Grounding:** Use data from current record
2. **Related Record Grounding:** Use data from related records
3. **Query Grounding:** Use SOQL queries to fetch data

**Example - Record Grounding:**
```
Generate a summary for this account:
{{Account.Name}}
{{Account.Industry}}
{{Account.AnnualRevenue}}
{{Account.Description}}
```

**Example - Related Record Grounding:**
```
Customer: {{Account.Name}}

Recent Opportunities:
{{LOOP:Account.Opportunities}}
- {{Opportunity.Name}}: {{Opportunity.Amount}} ({{Opportunity.StageName}})
{{ENDLOOP}}

Total Pipeline: {{SUM:Account.Opportunities.Amount}}
```

---

## 🔄 Integration Methods

### 1. Flow Integration

**Flow Action:**
1. Create flow (Record-Triggered or Screen)
2. Add "Prompt Template" action
3. Select prompt template
4. Map flow variables to prompt variables
5. Use generated output

**Example Flow:**
```yaml
Trigger: Opportunity created or updated

Steps:
1. Get Opportunity record
2. Execute "Sales Email Generator" prompt
   - Input: Opportunity.Id
   - Output: GeneratedEmail
3. Create Email Message record
   - Subject = Follow-up: {{Opportunity.Name}}
   - Body = GeneratedEmail
   - ToAddress = {{Opportunity.Account.Primary_Contact__c}}
4. Send email
```

**Flow Configuration:**
```json
{
  "actionName": "GenerateEmail",
  "promptTemplate": "Sales_Email_Generator__c",
  "inputMapping": {
    "recordId": "{!Opportunity.Id}"
  },
  "outputMapping": {
    "generatedEmail": "{!$Flow.FaultMessage}"
  }
}
```

### 2. Apex Integration

**Using Einstein GPT API:**

```apex
public with sharing class EmailGeneratorService {
    
    @AuraEnabled(cacheable=true)
    public static String generateEmail(Id opportunityId) {
        // Get opportunity
        Opportunity opp = [
            SELECT Id, Name, Account.Name, Account.Industry,
                   Amount, StageName
            FROM Opportunity
            WHERE Id = :opportunityId
        ];
        
        // Prepare prompt data
        Map<String, Object> promptData = new Map<String, Object>();
        promptData.put('Opportunity', opp);
        
        // Call Einstein GPT
        String generatedEmail = EinsteinGPTService.generateEmail(promptData);
        
        return generatedEmail;
    }
}
```

**Direct API Call:**

```apex
public with sharing class EinsteinGPTService {
    
    public static String generatePrompt(String prompt, Map<String, Object> variables) {
        // Prepare request
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Einstein_GPT_API/generate');
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        
        // Build request body
        Map<String, Object> requestBody = new Map<String, Object>();
        requestBody.put('prompt', prompt);
        requestBody.put('variables', variables);
        requestBody.put('model', 'gpt-4');
        
        req.setBody(JSON.serialize(requestBody));
        
        // Send request
        Http http = new Http();
        HttpResponse res = http.send(req);
        
        // Parse response
        if (res.getStatusCode() == 200) {
            Map<String, Object> response = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
            return (String) response.get('generated_text');
        }
        
        return null;
    }
    
    public static String generateEmail(Map<String, Object> data) {
        String promptTemplate = 'Generate email for {{Opportunity.Account.Name}}';
        return generatePrompt(promptTemplate, data);
    }
}
```

### 3. Lightning Web Component Integration

**LWC Component:**

```javascript
import { LightningElement, api, track, wire } from 'lwc';
import generateEmail from '@salesforce/apex/EmailGeneratorService.generateEmail';

export default class EmailGenerator extends LightningElement {
    @api recordId;
    @track generatedEmail = '';
    @track isLoading = false;
    @track error = null;

    handleGenerateEmail() {
        this.isLoading = true;
        this.error = null;
        
        generateEmail({ opportunityId: this.recordId })
            .then(result => {
                this.generatedEmail = result;
                this.isLoading = false;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Email generated successfully',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                this.error = error.body.message;
                this.isLoading = false;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Failed to generate email',
                        variant: 'error'
                    })
                );
            });
    }

    handleEditEmail() {
        // Open editor for manual editing
    }

    handleSendEmail() {
        // Send generated email
    }
}
```

**HTML Template:**

```html
<template>
    <lightning-card title="Email Generator" icon-name="standard:email">
        <div class="slds-p-around_medium">
            <lightning-button
                label="Generate Email"
                onclick={handleGenerateEmail}
                variant="brand"
                disabled={isLoading}>
            </lightning-button>

            <template if:true={isLoading}>
                <lightning-spinner alternative-text="Generating email..."></lightning-spinner>
            </template>

            <template if:true={error}>
                <div class="error-message">{error}</div>
            </template>

            <template if:true={generatedEmail}>
                <div class="email-preview">
                    <lightning-input-rich-text
                        value={generatedEmail}
                        onchang={handleEditEmail}>
                    </lightning-input-rich-text>
                </div>

                <div class="actions">
                    <lightning-button
                        label="Send Email"
                        onclick={handleSendEmail}
                        variant="success">
                    </lightning-button>
                </div>
            </template>
        </div>
    </lightning-card>
</template>
```

---

## 🎨 Advanced Prompt Techniques

### Chain of Thought Prompting

**Technique:** Break down complex tasks into steps

```
You are a sales analyst.

Step 1: Analyze the opportunity:
- Opportunity: {{Opportunity.Name}}
- Amount: {{Opportunity.Amount}}
- Stage: {{Opportunity.StageName}}
- Close Date: {{Opportunity.CloseDate}}

Step 2: Identify key factors:
- Industry: {{Opportunity.Account.Industry}}
- Customer Type: {{Opportunity.Account.Type}}
- Previous Wins: {{Opportunity.Account.Number_of_Wins__c}}

Step 3: Determine next best action:
- Probability of closing
- Recommended follow-up
- Potential obstacles

Provide your analysis with reasoning for each step.
```

### Few-Shot Prompting

**Technique:** Provide examples to guide AI

```
You are a customer service assistant.

Example 1:
Input: Customer wants refund for defective product
Output: "I understand your frustration with the defective product. I've processed your refund and you should see it in 3-5 business days. Would you like a replacement sent immediately?"

Example 2:
Input: Customer asking about shipping status
Output: "I checked your order #12345 and it's currently in transit. Expected delivery is Thursday. Here's your tracking link: [Tracking Link]."

Now handle this customer request:
Input: {{Case.Subject}}
Output:
```

### Role-Based Prompting

**Define specific roles for different contexts:**

```
Role 1: Sales Representative
You are an experienced sales rep. Focus on closing deals, building relationships, and understanding customer needs.

Role 2: Customer Success Manager
You are a customer success professional. Focus on customer satisfaction, onboarding, and retention.

Role 3: Product Specialist
You are a product expert. Focus on technical details, features, and solutions.

Current Request: {{Case.Subject}}
Role to use: {{Case.Required_Role__c}}
Context: {{Case.Description}}

Response:
```

---

## 🔒 Security & Governance

### Einstein Trust Layer

**Security Features:**
- **Data Masking:** Sensitive data protection
- **Audit Logging:** Track AI interactions
- **Access Control:** Role-based permissions
- **Content Filtering:** Prevent harmful content

**Data Masking:**

```yaml
Sensitive Fields:
- Social Security Number: {SSN__c}
- Credit Card: {Credit_Card__c}
- Password: {Password__c}

Masking Rule: Replace with asterisks (****-****-****-****)
```

### Permission Setup

**Required Permissions:**
- `Einstein GPT Prompt Builder Access`
- `Einstein GPT Prompt Builder Manage`
- `Customize Application`

**Sharing Considerations:**
- Prompt templates respect org-wide defaults
- Generated content follows sharing rules
- Audit logs for compliance

---

## 🧪 Best Practices

### 1. Clear Instructions

**❌ Poor:**
```
Write an email.
```

**✅ Good:**
```
Write a professional follow-up email for a sales opportunity. The email should:
- Be friendly but professional
- Be under 150 words
- Include a call to action
- Reference the customer's industry
```

### 2. Provide Context

**❌ Poor:**
```
Help this customer: {{Case.Subject}}
```

**✅ Good:**
```
You are helping {{Case.Contact.Name}} from {{Case.Account.Name}}.
Case details:
- Subject: {{Case.Subject}}
- Priority: {{Case.Priority}}
- Description: {{Case.Description}}
- Previous interactions: {{Case.Total_Interactions__c}}

Provide helpful, empathetic assistance.
```

### 3. Use Grounding

**❌ Poor:**
```
Write about this company.
```

**✅ Good:**
```
Write a company summary for:
Name: {{Account.Name}}
Industry: {{Account.Industry}}
Revenue: {{Account.AnnualRevenue}}
Employees: {{Account.NumberOfEmployees}}
Description: {{Account.Description}}

Focus on their market position and key offerings.
```

### 4. Specify Output Format

**❌ Poor:**
```
Generate a report.
```

**✅ Good:**
```
Generate a quarterly sales report with:
1. Executive Summary (2-3 sentences)
2. Key Metrics (bullet points):
   - Total Revenue
   - Growth Rate
   - Top Products
3. Trends Analysis (1 paragraph)
4. Recommendations (3 bullet points)

Format in markdown with headers.
```

### 5. Test and Iterate

**Testing Process:**
1. Create prompt template
2. Test with various inputs
3. Review outputs
4. Refine prompt
5. Repeat until satisfied

**Example Testing:**

```apex
@isTest
private class EmailGeneratorTest {
    
    @isTest
    static void testEmailGeneration() {
        // Create test opportunity
        Opportunity opp = new Opportunity(
            Name = 'Test Opportunity',
            Amount = 100000,
            StageName = 'Prospecting'
        );
        insert opp;
        
        // Generate email
        Test.startTest();
        String email = EmailGeneratorService.generateEmail(opp.Id);
        Test.stopTest();
        
        // Verify
        System.assertNotEquals(null, email);
        System.assert(email.length() < 150);
        System.assert(email.contains(opp.Name));
    }
}
```

---

## 📊 Use Cases

### Use Case 1: Sales Assistance

**Scenario:** Sales reps need quick, personalized follow-up emails

**Solution:**
1. Create "Sales Email Generator" prompt
2. Add to Opportunity record page
3. One-click email generation
4. Manual review and send

**Benefits:**
- Saves time (no writing from scratch)
- Personalization at scale
- Consistent messaging
- Higher response rates

### Use Case 2: Customer Service

**Scenario:** Agents need case summaries and suggested responses

**Solution:**
1. Create "Case Summarizer" prompt
2. Create "Response Suggester" prompt
3. Integrate into Service Console
4. Real-time assistance

**Benefits:**
- Faster case resolution
- Improved agent efficiency
- Consistent quality
- Better customer satisfaction

### Use Case 3: Knowledge Management

**Scenario:** Create knowledge articles from resolved cases

**Solution:**
1. Create "Article Generator" prompt
2. Trigger on case closure
3. Auto-generate draft articles
4. Review and publish

**Benefits:**
- Faster knowledge creation
- Consistent article format
- Better knowledge base coverage
- Reduced duplicate cases

### Use Case 4: Marketing

**Scenario:** Generate personalized marketing copy

**Solution:**
1. Create "Marketing Copy Generator" prompt
2. Use customer segmentation data
3. Generate personalized content
4. A/B test variations

**Benefits:**
- Personalized campaigns
- Faster content creation
- Higher engagement
- Better conversion rates

---

## 🎯 Implementation Steps

### Step 1: Enable Einstein GPT

1. Go to Setup → Einstein GPT Setup
2. Enable Einstein GPT for your org
3. Configure Einstein Trust Layer
4. Set up user permissions

### Step 2: Define Use Cases

1. Identify business needs
2. Map to Salesforce objects
3. Define prompt requirements
4. Plan integration points

### Step 3: Create Prompt Templates

1. Open Prompt Builder
2. Create new template
3. Define prompt structure
4. Add grounding fields
5. Test and refine

### Step 4: Integrate

1. Create Flow actions
2. Build LWC components
3. Create Apex services
4. Configure permissions

### Step 5: Train Users

1. Document prompt usage
2. Provide training
3. Monitor usage
4. Gather feedback
5. Iterate and improve

---

## 🔍 Troubleshooting

### Common Issues

**Issue 1: Generated content is irrelevant**

**Solution:**
- Add more grounding
- Improve prompt clarity
- Provide better context
- Use specific examples

**Issue 2: Content is too generic**

**Solution:**
- Add more Salesforce data fields
- Use specific industry terminology
- Provide custom examples
- Adjust temperature (lower for more focused)

**Issue 3: Content is too long**

**Solution:**
- Explicitly specify length limit
- Use word/character count
- Refine output requirements
- Edit post-generation

**Issue 4: Security concerns**

**Solution:**
- Configure Einstein Trust Layer
- Enable data masking
- Review audit logs
- Set proper permissions

---

## 📚 Resources

### Documentation
- [Einstein GPT Guide](https://help.salesforce.com/s/articleView?id=sf.einstein_gpt_overview.htm)
- [Prompt Builder](https://help.salesforce.com/s/articleView?id=sf.einstein_prompt_builder.htm)
- [Einstein Trust Layer](https://help.salesforce.com/s/articleView?id=sf.einstein_trust_layer.htm)

### Trailhead
- [Einstein GPT Basics](https://trailhead.salesforce.com/content/learn/modules/einstein-gpt-basics)
- [Prompt Builder](https://trailhead.salesforce.com/content/learn/modules/prompt-builder)

### Community
- Salesforce Developer Forums
- Einstein GPT User Group
- AI Integration Best Practices

---

## ✅ Checklist

### Prompt Builder Setup
- [ ] Enable Einstein GPT
- [ ] Configure Trust Layer
- [ ] Set permissions
- [ ] Create first prompt template

### Integration
- [ ] Create Flow action
- [ ] Build LWC component
- [ ] Create Apex service
- [ ] Test integration

### Best Practices
- [ ] Document prompts
- [ ] Train users
- [ ] Monitor usage
- [ ] Gather feedback
- [ ] Iterate improvements

---

**Next:** [Practice Questions Strategy](/docs/week4/practice-questions/strategies)

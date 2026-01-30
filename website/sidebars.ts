/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide navigation & ordered hierarchy for docs

 * See: https://docusaurus.io/docs/sidebar/introduction
 */

import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  sidebar: [
    {
      type: 'category',
      label: '🚀 Getting Started',
      items: [
        'intro',
        'GETTING_STARTED',
        'DAILY_SCHEDULE_TEMPLATE',
      ],
    },
    {
      type: 'category',
      label: '📚 Quick Reference',
      items: [
        'QUICK_REFERENCE',
        'RESOURCES',
        'PROJECT_STRUCTURE',
      ],
    },
    {
      type: 'category',
      label: '📅 Week 1: Admin & Flow',
      items: [
        'week1/README',
        'week1/objects-app',
        'week1/security',
        'week1/flow',
        'week1/review',
      ],
    },
    {
      type: 'category',
      label: '💻 Week 2: Apex & SOQL',
      items: [
        'week2/README',
        'week2/apex-basics',
        'week2/triggers',
        'week2/soql-dml',
        'week2/testing-review',
      ],
    },
    {
      type: 'category',
      label: '⚡ Week 3: LWC',
      items: [
        'week3/README',
        'week3/lwc-basics',
        'week3/events-communication',
        'week3/apex-integration',
        'week3/testing-review',
      ],
    },
    {
      type: 'category',
      label: '🎯 Week 4: Exam Prep',
      items: [
        'week4/README',
        'week4/ai-integration',
        'week4/exam-notes/detailed-exam-guide',
        'week4/exam-notes/governor-limits-deep-dive',
        'week4/practice-questions/strategies',
        'week4/ai-prompts/study-prompts',
      ],
    },
  ],
};

export default sidebars;
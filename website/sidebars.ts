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
        'week1',
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
        'week2',
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
        'week3',
      ],
    },
    {
      type: 'category',
      label: '🎯 Week 4: Exam Prep',
      items: [
        'week4/README',
      ],
    },
  ],
};

export default sidebars;
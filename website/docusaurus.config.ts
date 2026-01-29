import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';

const config: Config = {
  title: 'Salesforce Platform Developer I',
  tagline: '4-week intensive learning path to certification',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://lehoaibao130497.github.io',
  // Set the /<baseUrl>/ to your site's section folder
  baseUrl: '/learn-salesforce/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'lehoaibao130497', // Usually your GitHub org/user name.
  projectName: 'learn-salesforce', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          editUrl: 'https://github.com/lehoaibao130497/learn-salesforce/tree/main/website/docs/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/lehoaibao130497/learn-salesforce/tree/main/website/blog/',
        },
        theme: {
          customCss: ['./src/css/custom.css'],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Salesforce Dev I',
        logo: {
          alt: 'Salesforce Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'sidebar',
            position: 'left',
            label: 'Documentation',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/your-username/learn-salesforce',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {label: 'Getting Started', to: '/docs/getting-started'},
              {label: 'Quick Reference', to: '/docs/quick-reference'},
              {label: 'Resources', to: '/docs/resources'},
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/salesforce',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/salesforcedevs',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/your-username/learn-salesforce',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Salesforce Learning Journey. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['java', 'sql', 'javascript', 'typescript', 'bash'],
      },
    }),
};

export default config;
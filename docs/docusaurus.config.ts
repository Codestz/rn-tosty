import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'rn-tosty',
  tagline:
    'Production-ready React Native toast notifications with advanced theme system, smart queue management, and comprehensive accessibility',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://codestz.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/rn-tosty/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'codestz', // Usually your GitHub org/user name.
  projectName: 'rn-tosty', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
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
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/codestz/rn-tosty/tree/main/docs/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/codestz/rn-tosty/tree/main/docs/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/library-icon.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'rn-tosty',
      logo: {
        alt: 'rn-tosty Logo',
        src: 'img/library-icon.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'html',
          position: 'right',
          value:
            '<div style="width: 1px; height: 20px; background: rgba(255,255,255,0.2); margin: 0 8px;"></div>',
        },
        {
          href: 'https://github.com/codestz/rn-tosty',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.npmjs.com/package/rn-tosty',
          label: 'npm',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'RN-Tosty Logo',
        src: 'img/library-icon.png',
        width: 60,
        height: 60,
      },
      links: [
        {
          title: '🚀 Getting Started',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'Installation',
              to: '/docs/getting-started/installation',
            },
            {
              label: 'Quick Start',
              to: '/docs/getting-started/quick-start',
            },
            {
              label: 'First Toast',
              to: '/docs/getting-started/first-toast',
            },
          ],
        },
        {
          title: '🎨 Features',
          items: [
            {
              label: 'Built-in Themes',
              to: '/docs/theming/built-in-themes',
            },
            {
              label: 'Toast Methods',
              to: '/docs/core-concepts/toast-methods',
            },
            {
              label: 'Configuration',
              to: '/docs/core-concepts/basic-configuration',
            },
            {
              label: 'API Reference',
              to: '/docs/api/overview',
            },
          ],
        },
        {
          title: '📚 Resources',
          items: [
            {
              label: 'Migration Guide',
              to: '/docs/guides/migration-guide',
            },
            {
              label: 'Promise Integration',
              to: '/docs/advanced/promise-integration',
            },
            {
              label: 'Understanding Variants',
              to: '/docs/variants/understanding-variants',
            },
          ],
        },
        {
          title: '🔗 Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/codestz/rn-tosty',
            },
            {
              label: 'npm Package',
              href: 'https://www.npmjs.com/package/rn-tosty',
            },
            {
              label: 'Issues & Support',
              href: 'https://github.com/codestz/rn-tosty/issues',
            },
            {
              label: 'Discussions',
              href: 'https://github.com/codestz/rn-tosty/discussions',
            },
          ],
        },
      ],
      copyright: `
        <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255, 138, 101, 0.2);">
          <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1rem;">
            <span style="color: #ff8a65; font-size: 1.2rem;">🍞</span>
            <span style="font-weight: 600; color: #ff8a65;">rn-tosty</span>
            <span style="color: rgba(255, 255, 255, 0.6);">•</span>
            <span style="color: rgba(255, 255, 255, 0.8);">Beautiful React Native Toasts</span>
          </div>
          <div style="color: rgba(255, 255, 255, 0.6); font-size: 0.9rem;">
            Copyright © ${new Date().getFullYear()} rn-tosty. Made with ❤️ for the React Native community.
          </div>
          <div style="margin-top: 0.5rem; color: rgba(255, 255, 255, 0.5); font-size: 0.8rem;">
            Built with Docusaurus • Open Source MIT License
          </div>
        </div>
      `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['typescript', 'javascript', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

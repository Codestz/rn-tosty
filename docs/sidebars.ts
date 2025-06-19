import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },

    // Getting Started Section
    {
      type: 'category',
      label: '🚀 Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/first-toast',
        'getting-started/why-rn-tosty',
      ],
    },

    // Guides Section
    {
      type: 'category',
      label: '📖 Guides',
      items: ['guides/first-steps', 'guides/migration-guide'],
    },

    // Core Concepts Section
    {
      type: 'category',
      label: '🧠 Core Concepts',
      items: [
        'core-concepts/toast-methods',
        'core-concepts/basic-configuration',
      ],
    },

    // Theming Section
    {
      type: 'category',
      label: '🎨 Theming',
      items: ['theming/overview', 'theming/built-in-themes'],
    },

    // Variants Section
    {
      type: 'category',
      label: '🎭 Variants',
      items: ['variants/understanding-variants'],
    },

    // Advanced Topics Section
    {
      type: 'category',
      label: '🚀 Advanced',
      items: ['advanced/promise-integration'],
    },

    // API Reference Section
    {
      type: 'category',
      label: '📚 API Reference',
      items: ['api/overview'],
    },
  ],
};

export default sidebars;

import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.logoContainer}>
            <img
              src="img/library-icon.png"
              alt="RN-Tosty Mascot"
              className={styles.heroLogo}
            />
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
          </div>

          <p className={styles.heroSubtitle}>
            Beautiful, accessible React Native toast notifications with
            <span className={styles.highlight}> smart theming</span>,
            <span className={styles.highlight}> queue management</span>, and
            <span className={styles.highlight}> zero configuration</span>
          </p>

          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>4</span>
              <span className={styles.statLabel}>Built-in Themes</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>0</span>
              <span className={styles.statLabel}>Setup Required</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>TypeScript</span>
            </div>
          </div>

          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--primary button--lg',
                styles.getStartedButton
              )}
              to="/docs/guides/first-steps"
            >
              🚀 Get Started - 5min
            </Link>
            <Link
              className={clsx(
                'button button--outline button--lg',
                styles.demoButton
              )}
              to="/docs/getting-started/quick-start"
            >
              ⚡ Quick Start
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.codePreview}>
        <div className="container">
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span className={styles.codeTitle}>It's this simple:</span>
              <div className={styles.codeDots}>
                <span />
                <span />
                <span />
              </div>
            </div>
            <pre className={styles.codeContent}>
              {`// 1. Wrap your app
<ToastProvider theme="warmSunset">
  <App />
</ToastProvider>

// 2. Show beautiful toasts anywhere
toast.success('Welcome to RN-Tosty! 🎉');
toast.error('Something went wrong');
toast.info('New update available');`}
            </pre>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Beautiful React Native Toast Notifications"
      description="Production-ready React Native toast notifications with advanced theme system, smart queue management, and comprehensive accessibility support."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

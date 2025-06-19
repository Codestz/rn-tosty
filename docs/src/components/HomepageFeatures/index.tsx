import Heading from '@theme/Heading';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
  highlight?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Zero Configuration',
    icon: '⚡',
    highlight: 'Works out of the box',
    description: (
      <>
        Just wrap your app with <code>ToastProvider</code> and start showing
        beautiful toasts. No complex setup, no configuration files, no
        headaches. It just works.
      </>
    ),
  },
  {
    title: 'Beautiful Themes',
    icon: '🎨',
    highlight: '4 stunning built-in themes',
    description: (
      <>
        Choose from <strong>Default</strong>, <strong>Warm Sunset</strong>,{' '}
        <strong>Ocean Breeze</strong>, or <strong>Forest Glow</strong> themes.
        Each includes light/dark modes and adapts to your app's personality.
      </>
    ),
  },
  {
    title: 'Smart Queue Management',
    icon: '🧠',
    highlight: 'Intelligent toast handling',
    description: (
      <>
        Advanced priority-based queuing ensures important messages are seen
        first. Never overwhelm users with too many notifications at once.
      </>
    ),
  },
  {
    title: 'Accessibility First',
    icon: '♿',
    highlight: 'WCAG compliant',
    description: (
      <>
        Built-in screen reader support, proper focus management, and semantic
        HTML. Your toasts work for everyone, including users with disabilities.
      </>
    ),
  },
  {
    title: 'TypeScript Native',
    icon: '🔷',
    highlight: '100% TypeScript',
    description: (
      <>
        Complete type safety with intelligent auto-completion. Catch errors at
        compile time, not runtime. Built by TypeScript developers, for
        TypeScript developers.
      </>
    ),
  },
  {
    title: 'Promise Integration',
    icon: '🔄',
    highlight: 'Elegant async handling',
    description: (
      <>
        Show loading states, success, and error messages automatically with{' '}
        <code>toast.promise()</code>. Perfect for API calls, file uploads, and
        async operations.
      </>
    ),
  },
];

function Feature({ title, icon, description, highlight }: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>
          <span className={styles.iconEmoji}>{icon}</span>
        </div>
        <div className={styles.featureContent}>
          <Heading as="h3" className={styles.featureTitle}>
            {title}
          </Heading>
          {highlight && (
            <div className={styles.featureHighlight}>{highlight}</div>
          )}
          <p className={styles.featureDescription}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <>
      <section className={styles.features}>
        <div className="container">
          <div className={styles.featuresHeader}>
            <Heading as="h2" className={styles.featuresTitle}>
              Why Choose RN-Tosty?
            </Heading>
            <p className={styles.featuresSubtitle}>
              Built for production apps that need reliable, beautiful, and
              accessible toast notifications
            </p>
          </div>
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.showcase}>
        <div className="container">
          <div className={styles.showcaseContent}>
            <div className={styles.showcaseText}>
              <Heading as="h2" className={styles.showcaseTitle}>
                Ready for Your Next Project
              </Heading>
              <p className={styles.showcaseDescription}>
                RN-Tosty is a fresh, modern take on React Native toast
                notifications. Built with the latest best practices and designed
                for the apps of tomorrow.
              </p>
              <div className={styles.showcaseStats}>
                <div className={styles.showcaseStat}>
                  <span className={styles.showcaseStatNumber}>New</span>
                  <span className={styles.showcaseStatLabel}>& Fresh</span>
                </div>
                <div className={styles.showcaseStat}>
                  <span className={styles.showcaseStatNumber}>2025</span>
                  <span className={styles.showcaseStatLabel}>Built</span>
                </div>
                <div className={styles.showcaseStat}>
                  <span className={styles.showcaseStatNumber}>v1.0</span>
                  <span className={styles.showcaseStatLabel}>Ready</span>
                </div>
              </div>
            </div>
            <div className={styles.showcaseVisual}>
              <div className={styles.showcaseGrid}>
                <div className={styles.showcaseCard + ' ' + styles.cardPrimary}>
                  <div className={styles.cardIcon}>🚀</div>
                  <div className={styles.cardTitle}>Modern Architecture</div>
                  <div className={styles.cardDesc}>
                    Built with latest React Native patterns
                  </div>
                </div>
                <div
                  className={styles.showcaseCard + ' ' + styles.cardSecondary}
                >
                  <div className={styles.cardIcon}>🎯</div>
                  <div className={styles.cardTitle}>Developer Experience</div>
                  <div className={styles.cardDesc}>
                    Intuitive API with great TypeScript support
                  </div>
                </div>
                <div
                  className={styles.showcaseCard + ' ' + styles.cardTertiary}
                >
                  <div className={styles.cardIcon}>🔧</div>
                  <div className={styles.cardTitle}>Future-Proof</div>
                  <div className={styles.cardDesc}>
                    Regular updates and new features
                  </div>
                </div>
                <div
                  className={styles.showcaseCard + ' ' + styles.cardQuaternary}
                >
                  <div className={styles.cardIcon}>📱</div>
                  <div className={styles.cardTitle}>Community Driven</div>
                  <div className={styles.cardDesc}>
                    Open source with active development
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/GETTING_STARTED">
            Get Started Now 🚀
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/QUICK_REFERENCE">
            Quick Reference 📚
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="4-week intensive learning path to become a certified Salesforce Platform Developer I">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <div className="container margin-top--xl">
          <div className="row">
            <div className="col col--12">
              <h2 className="text--center margin-bottom--lg">Learning Path Overview</h2>
            </div>
          </div>
          
          <div className="row">
            <div className="col col--4 margin-bottom--lg">
              <div className="card shadow--md">
                <div className="card__header">
                  <h3>📅 Week 1</h3>
                </div>
                <div className="card__body">
                  <h4>Admin & Flow</h4>
                  <p>Foundation: Understand Salesforce platform capabilities without code.</p>
                  <ul>
                    <li>Objects & Security</li>
                    <li>Flow Builder</li>
                    <li>Project Management App</li>
                  </ul>
                  <Link className="button button--primary" to="/docs/week1">
                    Start Week 1
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col col--4 margin-bottom--lg">
              <div className="card shadow--md">
                <div className="card__header">
                  <h3>💻 Week 2</h3>
                </div>
                <div className="card__body">
                  <h4>Apex & SOQL</h4>
                  <p>Backend: Master Salesforce's Java-like programming language.</p>
                  <ul>
                    <li>Triggers & Classes</li>
                    <li>SOQL Queries</li>
                    <li>Test Coverage</li>
                  </ul>
                  <Link className="button button--primary" to="/docs/week2">
                    Start Week 2
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col col--4 margin-bottom--lg">
              <div className="card shadow--md">
                <div className="card__header">
                  <h3>⚡ Week 3</h3>
                </div>
                <div className="card__body">
                  <h4>Lightning Web Components</h4>
                  <p>Frontend: Build modern web components on Salesforce.</p>
                  <ul>
                    <li>@wire Service</li>
                    <li>Event Handling</li>
                    <li>Revenue Dashboard</li>
                  </ul>
                  <Link className="button button--primary" to="/docs/week3">
                    Start Week 3
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row margin-top--lg">
            <div className="col col--6 col--offset-3">
              <div className="card shadow--lg">
                <div className="card__header">
                  <h3>🎯 Week 4</h3>
                </div>
                <div className="card__body">
                  <h4>Exam Preparation</h4>
                  <p>Intensive study and AI integration for certification.</p>
                  <ul>
                    <li>500+ Practice Questions</li>
                    <li>Governor Limits</li>
                    <li>Prompt Builder</li>
                  </ul>
                  <Link className="button button--primary button--block" to="/docs/week4">
                    Start Week 4
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row margin-top--xl margin-bottom--xl">
            <div className="col col--12 text--center">
              <h2>Daily Schedule</h2>
              <p className="margin-bottom--lg">Disciplined "steel" routine for maximum results</p>
              
              <div className="row">
                <div className="col col--4">
                  <div className="card shadow--sm">
                    <div className="card__header">
                      <h4>🌅 Morning</h4>
                    </div>
                    <div className="card__body">
                      <p><strong>8:00 - 12:00</strong></p>
                      <p>Trailhead Theory</p>
                    </div>
                  </div>
                </div>
                
                <div className="col col--4">
                  <div className="card shadow--sm">
                    <div className="card__header">
                      <h4>☀️ Afternoon</h4>
                    </div>
                    <div className="card__body">
                      <p><strong>13:00 - 18:00</strong></p>
                      <p>Coding Practice</p>
                    </div>
                  </div>
                </div>
                
                <div className="col col--4">
                  <div className="card shadow--sm">
                    <div className="card__header">
                      <h4>🌙 Evening</h4>
                    </div>
                    <div className="card__body">
                      <p><strong>20:00 - 22:00</strong></p>
                      <p>Practice Questions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row margin-top--xl text--center">
            <div className="col col--12">
              <div className="alert alert--success" role="alert">
                <h3>💪 Ready to Start?</h3>
                <p>Begin your 4-week journey to becoming a certified Salesforce Platform Developer I</p>
                <Link className="button button--primary button--lg margin-top--sm" to="/docs/GETTING_STARTED">
                  Start Learning Now 🚀
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
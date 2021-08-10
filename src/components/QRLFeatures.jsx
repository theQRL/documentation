import React from 'react';
import clsx from 'clsx';
import styles from './QRLFeatures.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'The Quantum Resistant Ledger',
    Svg: require('../../static/assets/img/icons/qrl-logo.svg').default,
    description: (
      <>
        Information on the project fundamentals, quantum blockchain security, 
        and the threat Quantum Computers plays in todays cryptosphere.
      </>
    ),
    link: '/docs/Basics',
    linktext: 'QRL Basics',
  },
  {
    title: 'Exploring The QRL',
    Svg: require('../../static/assets/img/icons/tree.svg').default,
    description: (
      <>
        Walk through the various tools and features that make The QRL a full suite quantum resistant blockchain. 
        Quickly get up to speed with the QRL ecosystem 
      </>
    ),
    link: '/docs',
    linktext: 'User Documentation',
  },
  {
    title: 'Build Quantum Resistant Tools',
    Svg: require('../../static/assets/img/icons/qrl-logo__old.svg').default,
    description: (
      <>
        Using the extensive developer documentation, tutorials and our API documentation it's easy to get started building quantum resistant tools.
      </>
    ),
    link: 'https://api.theqrl.org',
    linktext: 'QRL API Docs',
  },
];

function Feature({Svg, title, description, link, linktext}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>

  <a className='button button--secondary button--lg' href={link}>{linktext}</a>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
export default function NotFound() {
  return (
    <>
      <PageMetadata
        title={translate({
          id: 'theme.NotFound.title',
          message: 'Page Not Found',
        })}
      />
      <Layout>
        <main className="container margin-vert--xl">
          <div className="row">
            <div className="col col--6 col--offset-3">
              <h1 className="hero__title">
                <Translate
                  id="theme.NotFound.title"
                  description="The title of the 404 page">
                  404 - Page Not Found
                </Translate>
              </h1>
              <p>
                <Translate
                  id="theme.NotFound.p1"
                  description="The first paragraph of the 404 page">
                 Sorry, this page is both neither here &#39;nor there when observed.
                </Translate>
              </p>
              <p>
                <Translate
                  id="theme.NotFound.p2"
                  description="The second paragraph of the 404 page"> 
                  This digital phenomenon often occurs when states or groups of characters are scattered or interact 
                  in ways such that the quantum state of the web spin independently of the state of the other strings. 
                  Even when the characters are separated by a large distance&#44; a digital state must be described for 
                  the system as a whole.
                </Translate>
              </p>
              <p>
                To restore the fabric of time to when things made sense it&#39;s imperative to return to the 
                <a href="https://www.google.com"> origins of the universe</a> or try your luck in a <a href="https://docs.theqrl.org">superposition</a> 
                - be sure to stretch first and don't forget your towel!
              </p>
              
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}

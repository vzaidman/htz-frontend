import React from 'react';
import withData, { pagePropTypes, } from '../lib/withData';
import MainLayout from '../layouts/MainLayout';
import { registerServiceWorker, } from '../lib/serviceWorker';

if (process.browser) {
  // In Next.js, there isn't really a single client-side app entry point where
  // one can initialize things like this, which is normally where you'd do this.
  // If another page route comes along, we don't want to execute this again in
  // that module, for example. If it's using simple top-level DOM methods, it
  // can also be done directly in a <script> tag in `Document`, but you lose the
  // ability to use any imports, and it's not very pretty. I recommend making a
  // shared entry point module that every page must import in the future.
  // TODO: Provide a way for components to access the Service Worker status,
  // possibly with a simple `recompose` helper.
  registerServiceWorker();
}

export function Page({ url, }) {
  return <MainLayout url={url} />;
}

Page.propTypes = pagePropTypes;

export default withData(Page);

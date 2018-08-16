/** ************************************************************** *
 * THIS IS AN AUTO GENERATED FILE. PLEASE DO NOT EDIT IT DIRECTLY.
 *
 * If you want to change the List's views map, it is generated
 * from the `listViewsFileTemplate.js` file is this directory.
 * *************************************************************** */

/* eslint-disable import/no-unresolved */
import React from 'react';
import dynamic from 'next/dynamic';

const views = new Map([
  [
    'Bender',
    {
      view: () => import('./views/Bender/Bender.view.js'),
      query: () => import('./views/Bender/Bender.query.js'),
    },
  ],
  [
    'Farnsworth',
    {
      view: () => import('./views/Farnsworth/Farnsworth.view.js'),
      query: () => import('./views/Farnsworth/Farnsworth.query.js'),
    },
  ],
  [
    'Fry',
    {
      view: () => import('./views/Fry/Fry.view.js'),
      query: () => import('./views/Fry/Fry.query.js'),
    },
  ],
  [
    'Leela',
    {
      view: () => import('./views/Leela/Leela.view.js'),
      query: () => import('./views/Leela/Leela.query.js'),
    },
  ],
  [
    'Zoidberg',
    {
      view: () => import('./views/Zoidberg/Zoidberg.view.js'),
      query: () => import('./views/Zoidberg/Zoidberg.query.js'),
    },
  ],
]);

// eslint-disable-next-line react/prop-types
const DefaultComponent = ({ view, }) => (
  <p>{`There is no template for ${view} yet`}</p>
);

const getViews = viewType => {
  const { view: viewPath, query: queryPath, } = views.get(viewType) || {
    view: null,
    query: null,
  };

  if (viewPath && queryPath) {
    const promiseView = new Promise((resolve, reject) => {
      dynamic(
        viewPath()
          .then(View => resolve(View))
          .catch(err => reject(err))
      );
    });

    const promiseQuery = new Promise((resolve, reject) => {
      queryPath()
        .then(Query => {
          resolve(Query);
        })
        .catch(err => reject(err));
    });

    return Promise.all([ promiseView, promiseQuery, ]);
  }

  return new Promise(resolve => resolve(DefaultComponent));
};

export default viewType => getViews(viewType) || DefaultComponent;

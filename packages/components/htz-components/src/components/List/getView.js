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
    'Example',
    {
      view: () => import('./views/Example/Example.view.js'),
      query: () => import('./views/Example/Example.query.js'),
    },
  ],
  [
    'Bender',
    {
      view: () => import('./views/Bender'),
      query: () => import('./viewsQueries/bender'),
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

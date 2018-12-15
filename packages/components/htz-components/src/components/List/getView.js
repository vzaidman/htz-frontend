
/* eslint-disable import/no-unresolved */
import React from 'react';
import dynamic from 'next/dynamic';
import Debug from '../Debug/Debug';

const views = new Map([
  [
    'Bender',
    {
      view: () => import('./views/Bender/Bender.view.js'),
      query: () => import('./views/Bender/Bender.query.js'),
    },
  ],
  [
    'Gamal',
    {
      view: () => import('./views/Gamal/Gamal.view.js'),
      query: () => import('./views/Gamal/Gamal.query.js'),
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
    'Mom',
    {
      view: () => import('./views/Mom/Mom.view.js'),
      query: () => import('./views/Mom/Mom.query.js'),
    },
  ],
  [
    'Nibbler',
    {
      view: () => import('./views/Nibbler/Nibbler.view.js'),
      query: () => import('./views/Nibbler/Nibbler.query.js'),
    },
  ],
  [
    'Slim',
    {
      view: () => import('./views/Slim/Slim.view.js'),
      query: () => import('./views/Slim/Slim.query.js'),
    },
  ],
  [
    'Slugs',
    {
      view: () => import('./views/Slugs/Slugs.view.js'),
      query: () => import('./views/Slugs/Slugs.query.js'),
    },
  ],
  [
    'Zoidberg',
    {
      view: () => import('./views/Zoidberg/Zoidberg.view.js'),
      query: () => import('./views/Zoidberg/Zoidberg.query.js'),
    },
  ],
  [
    'Zombie',
    {
      view: () => import('./views/Zombie/Zombie.view.js'),
      query: () => import('./views/Zombie/Zombie.query.js'),
    },
  ],
]);

// eslint-disable-next-line react/prop-types
const DefaultComponent = ({ view, }) => (
  <Debug>{`There is no template for ${view} yet`}</Debug>
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

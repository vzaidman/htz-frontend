import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';

// import _ from 'lodash';
// import Query from '../ApolloBoundary/Query';
// import schemaQuery from './queries/schema';
const propTypes = {
  jsonld: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function PageSchema({ jsonld, }) {
  return (
    <Fragment>
      {jsonld.map(schema => (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: schema,
          }}
        />
      ))}
    </Fragment>
  );
}

PageSchema.propTypes = propTypes;

export default PageSchema;

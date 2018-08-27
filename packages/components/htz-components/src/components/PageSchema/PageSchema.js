import React from 'react';
import _ from 'lodash';
import Query from '../ApolloBoundary/Query';
import schemaQuery from './queries/schema';

function PageSchema() {
  const removeTypeName = schemaObj =>
    Object.keys(schemaObj).forEach(key => {
      if (Array.isArray(schemaObj[key])) {
        mapArray(schemaObj[key]); // eslint-disable-line no-use-before-define
      }
      else if (schemaObj[key] && typeof schemaObj[key] === 'object') {
        removeTypeName(schemaObj[key]);
      }
      else if (key === '__typename') {
        delete schemaObj[key]; // eslint-disable-line no-param-reassign
      }
    });

  const mapArray = schemaArr =>
    schemaArr.map(schemaItem => {
      if (Array.isArray(schemaItem)) {
        mapArray(schemaItem);
      }
      else if (schemaItem && typeof schemaItem === 'object') {
        removeTypeName(schemaItem);
      }
      return null;
    });

  return (
    <Query query={schemaQuery}>
      {({ data: { pageSchema: schema, }, }) => {
        const pageSchema = schema ? _.cloneDeep(schema) : {};
        pageSchema['@context'] = 'http://schema.org';
        removeTypeName(pageSchema);
        return (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(pageSchema, null, 2),
            }}
          />
        );
      }}
    </Query>
  );
}

export default PageSchema;

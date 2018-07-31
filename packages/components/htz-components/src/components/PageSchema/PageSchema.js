import React from 'react';
import _ from 'lodash';
import { Query, } from '../ApolloBoundary/ApolloBoundary';
import schemaQuery from './queries/schema';

function PageSchema() {
  return (
    <Query query={schemaQuery}>
      {({ data: { pageSchema: schema, }, }) => {
        const pageSchema = schema ? _.cloneDeep(schema) : {};
        pageSchema['@context'] = 'http://schema.org';
        return (
          <script type="application/ld+json">
            {JSON.stringify(pageSchema, null, 2)}
          </script>
        );
      }}
    </Query>
  );
}

export default PageSchema;

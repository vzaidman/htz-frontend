import React from 'react';
import { Query, } from 'react-apollo';
import _ from 'lodash';
import schemaQuery from './queries/schema';

function PageSchema() {
  return (
    <Query
      query={schemaQuery}
    >
      {({ data: { pageSchema: schema, }, }) => {
        const pageSchema = _.cloneDeep(schema);
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

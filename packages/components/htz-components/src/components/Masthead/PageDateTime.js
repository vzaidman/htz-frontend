import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import { FelaComponent, } from 'react-fela';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import Query from '../ApolloBoundary/Query';

const getPageDateTimeQuery = gql`
  query PageDateTime {
    pageDateTimeString @client
  }
`;

/**
 * Internal component for page date-time
 * @param {object} param
 * @param {string[]} param.dateParts - array of date-parts strings (week-day, hebrew-date, gregorian-date, hour)
 * @param {object} param.miscStyles - object of CSS styles.
 */
function PageDateTime({ dateParts, miscStyles, }) {
  return dateParts.length === 4 ? (
    <FelaComponent
      style={theme => ({
        color: theme.color('neutral', '-3'),
        extend: [
          theme.type(-3),
          ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
        ],
      })}
      render={({ className, }) => (
        <time className={className} dateTime={`${dateParts[2]} ${dateParts[3]}`}>
          {dateParts.map((part, index) => (
            <FelaComponent
              render="span"
              style={theme => ({
                fontWeight: index % 2 === 0 ? 700 : 400,
                marginInlineEnd: '.5rem',
                unicodeBidi: 'isolate',
              })}
            >
              {part}
            </FelaComponent>
          ))}
        </time>
      )}
    />
  ) : null;
}

PageDateTime.propTypes = {
  /**
   * array of date-parts strings (week-day, hebrew-date, gregorian-date, hour)
   */
  dateParts: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * object of CSS styles.
   */
  miscStyles: stylesPropType,
};

PageDateTime.defaultProps = {
  miscStyles: null,
};

/**
 * Component for page date-time.
 * The page date-time comes from the Apollo store.
 * @param {object} param
 * @param {object} param.miscStyles - object of CSS styles.
 */
export default function PageDateTimeWrapper({ miscStyles, }) {
  return (
    <Query query={getPageDateTimeQuery}>
      {({ loading, error, data, }) => {
        if (loading || error || !(data && data.pageDateTimeString)) {
          return null;
        }
        return <PageDateTime dateParts={data.pageDateTimeString} miscStyles={miscStyles} />;
      }}
    </Query>
  );
}

PageDateTimeWrapper.propTypes = {
  miscStyles: stylesPropType,
};

PageDateTimeWrapper.defaultProps = {
  miscStyles: null,
};

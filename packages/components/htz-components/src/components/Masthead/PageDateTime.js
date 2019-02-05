import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import { FelaComponent, } from 'react-fela';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import Query from '../ApolloBoundary/Query';
import Time from '../Time/Time';

const getPageDateTimeQuery = gql`
  query PageDateTime {
    pageDateTimeString @client
  }
`;

const stylePart = isStrong => ({
  fontWeight: isStrong ? 700 : 400,
  marginInlineEnd: '.5rem',
  unicodeBidi: 'isolate',
});

/**
 * Internal component for page date-time
 * @param {object} param
 * @param {string[]} param.dateParts - array of date-parts strings (week-day, hebrew-date, gregorian-date, hour)
 * @param {object} param.miscStyles - object of CSS styles.
 */
function PageDateTime({ dateParts, miscStyles, }) {
  const ilLocaleString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem', });
  const now = new Date(ilLocaleString).getTime();

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
        <Time
          className={className}
          time={now}
          render={formattedTime => (
            <React.Fragment>
              <FelaComponent render="span" style={stylePart(true)}>
                {dateParts[0]}
              </FelaComponent>
              <FelaComponent render="span" style={stylePart(false)}>
                {dateParts[1]}
              </FelaComponent>
              <FelaComponent
                style={stylePart(true)}
                render={({ className, }) => (
                  <Time tagName="span" format="DD.MM.YYYY" time={now} className={className} />
                )}
              />
              <FelaComponent
                style={stylePart(false)}
                render={({ className, }) => (
                  <Time tagName="span" format="HH:mm" time={now} className={className} />
                )}
              />
            </React.Fragment>
          )}
        />
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

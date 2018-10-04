import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, FelaTheme, } from 'react-fela';

import Kicker from './Kicker';

HeaderText.propTypes = {
  /** Class(es) to be added to the DOM element.
   * Can be passed by manually, or by Fela's createComponent
   */
  className: PropTypes.string,
  /**
   * Kicker of Article. A short, catchy word or phrase over a major headline
   */
  kicker: PropTypes.string,
  /** Headline (title) of an Article */
  title: PropTypes.string.isRequired,
  /** Subtitle of an Article */
  subtitle: PropTypes.string,
};

HeaderText.defaultProps = {
  className: null,
  kicker: null,
  subtitle: null,
};

const titleStyle = theme => ({
  display: 'inline',
  extend: [
    theme.type(3, { untilBp: 'm', }),
    theme.type(4, { fromBp: 'm', untilBp: 'l', }),
    theme.type(5, { fromBp: 'l', untilBp: 'xl', }),
    theme.type(6, { fromBp: 'xl', }),
  ],
});

const subTitleStyle = theme => ({
  fontWeight: 'normal',
  marginTop: '1rem',
  extend: [ theme.type(1), ],
});

function HeaderText({ kicker, title, subtitle, className, }) {
  return (
    <FelaTheme
      render={theme => (
        <div className={className}>
          {kicker ? (
            <Kicker
              isBlock={false}
              fontSize={[
                { until: 'm', value: 3, },
                { from: 'm', until: 'l', value: 4, },
                { from: 'l', until: 'xl', value: 5, },
                { from: 'xl', value: 6, },
              ]}
              text={kicker}
            />
          ) : null}
          <FelaComponent style={titleStyle} render="h1">
            {title}
          </FelaComponent>
          {subtitle ? (
            <FelaComponent
              style={subTitleStyle}
              render={({ className, }) => (
                <p className={className}>{subtitle}</p>
              )}
            />
          ) : null}
        </div>
      )}
    />
  );
}

export default HeaderText;

import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, FelaTheme, } from 'react-fela';

import Kicker from './Kicker';
import H from '../AutoLevels/H';

HeaderText.propTypes = {
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
  kicker: null,
  subtitle: null,
};

const titleStyle = theme => ({
  display: 'inline',
  extend: [
    theme.type(3, { untilBp: 'm', }),
    theme.type(4, { fromBp: 'm', untilBp: 'l', }),
    theme.type(5, { fromBp: 'l', }),
  ],
});

const subTitleStyle = theme => ({
  fontWeight: 'normal',
  marginTop: '2rem',
  extend: [ theme.type(1), ],
});

function HeaderText({ kicker, title, subtitle, }) {
  return (
    <FelaTheme
      render={theme => (
        <div>
          {kicker && (
            <Kicker
              isBlock={false}
              fontSize={[
                { until: 'm', value: 3, },
                { from: 'm', until: 'l', value: 4, },
                { from: 'l', value: 5, },
              ]}
              text={kicker}
            />
          )}
          <FelaComponent style={titleStyle} render="h1">
            {title}
          </FelaComponent>
          {subtitle && (
            <FelaComponent
              style={subTitleStyle}
              render={({ className, }) => (
                <H className={className}>{subtitle}</H>
              )}
            />
          )}
        </div>
      )}
    />
  );
}

export default HeaderText;

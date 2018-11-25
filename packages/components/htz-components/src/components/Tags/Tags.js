import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseStyleProps, } from '@haaretz/htz-css-tools';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import HtzLink from '../HtzLink/HtzLink';
import H from '../AutoLevels/H';

const propTypes = {
  /**
   * An array of tags.
   */
  tagsList: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Tag's url.
       */
      url: PropTypes.string.isRequired,
      /**
       * Tag's name to be displayed.
       */
      contentName: PropTypes.string.isRequired,
    })
  ).isRequired,
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

const defaultProps = {
  miscStyles: null,
};

const wrapperStyle = ({ miscStyles, theme, }) => ({
  ...theme.type(-1),
  display: 'flex',
  extend: [ ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []), ],
});

/*
 * Returns an inline list of the article's related tags.
 */
function Tags({ tagsList, miscStyles, }) {
  return tagsList && tagsList.length > 0 ? (
    <FelaComponent
      miscStyles={miscStyles}
      rule={wrapperStyle}
      render={({ className, theme, }) => (
        <div className={className}>
          <FelaComponent
            style={{
              color: theme.color('secondary'),
              marginEnd: '1rem',
            }}
            render={({ className, }) => (
              <H className={className}>{theme.tagsElementI18n.prefix}</H>
            )}
          />
          <ul>
            {tagsList.map((tag, i) => (
              <FelaComponent
                style={{
                  display: 'inline',
                  ...(tagsList.length !== i + 1 ? { marginEnd: '1rem', } : {}),
                }}
                key={tag.contentName}
                render="li"
              >
                <HtzLink
                  href={tag.url}
                  content={(
                    <FelaComponent
                      style={{
                        color: theme.color('neutral', '-2'),
                        textDecoration: 'underline',
                      }}
                      render="span"
                    >
                      {tag.contentName}
                    </FelaComponent>
)}
                />
              </FelaComponent>
            ))}
          </ul>
        </div>
      )}
    />
  ) : null;
}

Tags.propTypes = propTypes;
Tags.defaultProps = defaultProps;

export default Tags;

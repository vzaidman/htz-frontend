import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
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
};

/*
 * Returns an inline list of the article's related tags.
 */
function Tags({ tagsList, }) {
  return tagsList && tagsList.length > 0 ? (
    <FelaComponent
      style={theme => ({
        ...theme.type(-1),
        display: 'flex',
      })}
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
                  content={
                    <FelaComponent
                      style={{
                        color: theme.color('neutral', '-2'),
                        textDecoration: 'underline',
                      }}
                      render="span"
                    >
                      {tag.contentName}
                    </FelaComponent>
                  }
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

export default Tags;

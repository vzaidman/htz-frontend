import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';

import Image from '../../Image/Image';
import Kicker from '../../ArticleHeader/Kicker';
import Section from '../../AutoLevels/Section';
import H from '../../AutoLevels/H';

const propTypes = {
  /**
   * Article's image to display (image object or image url).
   */
  image: PropTypes.oneOfType([ PropTypes.object, PropTypes.string, ]).isRequired,
  /**
   * Advertiser's name.
   */
  sourceName: PropTypes.string,
  /**
   * Article's title to display.
   */
  title: PropTypes.string.isRequired,
};

const defaultProps = {
  sourceName: null,
};

const imgOptions = {
  transforms: {
    width: '84',
    aspect: 'regular',
    quality: 'auto',
  },
};

function Article({ title, image, sourceName, }) {
  return (
    <FelaComponent
      style={{
        display: 'flex',
        flexWrap: 'nowrap',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
      render={({ className, }) => (
        <Section className={className}>
          {typeof image === 'string' || image.path ? (
            <FelaComponent
              style={theme => ({
                flexShrink: '0',
                flexGrow: '0',
                extend: [
                  parseComponentProp(
                    'width',
                    [
                      { until: 'l', value: '14rem', },
                      { from: 'l', value: '12rem', },
                    ],
                    theme.mq
                  ),
                  parseComponentProp(
                    'height',
                    [
                      { until: 'l', value: '10.5rem', },
                      { from: 'l', value: '9rem', },
                    ],
                    theme.mq
                  ),
                ],
                height: '',
                width: '84px',
              })}
            >
              <img
                alt={image.alt || ''}
                src={image.path || image}
                height="100%"
                width="100%"
              />
            </FelaComponent>
          ) : (
            <Image imgOptions={imgOptions} data={image} hasWrapper={false} />
          )}
          <FelaComponent
            style={theme => ({
              ...theme.type(-2),
              marginStart: '1rem',
              maxHeight: '9rem',
              overflow: 'hidden',
            })}
          >
            {sourceName && (
              <Kicker
                fontSize={-2}
                miscStyles={{
                  fontWeight: '700',
                }}
                text={sourceName}
              />
            )}
            <FelaComponent
              style={theme => ({
                fontWeight: 'bold',
                extend: [ theme.type(-2), ],
              })}
              render={({ className, }) => <H className={className}>{title}</H>}
            />
          </FelaComponent>
        </Section>
      )}
    />
  );
}

Article.propTypes = propTypes;
Article.defaultProps = defaultProps;

export default Article;

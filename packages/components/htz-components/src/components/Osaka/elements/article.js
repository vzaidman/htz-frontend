import React from 'react';
import PropTypes from 'prop-types';
import { withTheme, } from 'react-fela';

import Image from '../../Image/Image';
import Kicker from '../../ArticleHeader/Kicker';
import Title from '../../ArticleHeader/Title';
import StyledGrid from '../../Grid/Grid';
import StyledGridItem from '../../Grid/GridItem';

const propTypes = {
  /**
   * Advertiser's name.
   */
  sourceName: PropTypes.string,
  /**
   * Article's title to display.
   */
  title: PropTypes.string.isRequired,
  /**
   * Article's image to display (image object or image url).
   */
  image: PropTypes.oneOfType([ PropTypes.object, PropTypes.string, ]).isRequired,
  /**
   * Should there be a border after the article.
   */
  border: PropTypes.bool,
};

const defaultProps = {
  sourceName: null,
  border: false,
};

const imgOptions = {
  transforms: {
    width: '84',
    aspect: 'regular',
    quality: 'auto',
  },
};

// eslint-disable-next-line react/prop-types
function Article({ title, image, sourceName, border, theme, }) {
  return (
    <StyledGrid
      gutter={0}
      miscStyles={{
        flexWrap: 'nowrap',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      <StyledGridItem
        width={12}
        rule={
          border && {
            atStart: true,
            color: [ 'neutral', '-4', ],
            miscStyles: { marginStart: -1, },
            width: 1,
          }
        }
        miscStyles={{
          height: '63px',
        }}
      >
        {typeof image === 'string' || image.path ? (
          <img
            alt={image.alt || ''}
            src={image.path || image}
            height="100%"
            width="100%"
          />
        ) : (
          <Image imgOptions={imgOptions} data={image} />
        )}
      </StyledGridItem>
      <StyledGridItem
        miscStyles={{
          ...theme.type(-2),
          marginStart: '1rem',
          maxHeight: '9rem',
          overflow: 'hidden',
        }}
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
        <Title fontSize={-2} level={4} text={title} />
      </StyledGridItem>
    </StyledGrid>
  );
}

Article.propTypes = propTypes;
Article.defaultProps = defaultProps;

export default withTheme(Article);

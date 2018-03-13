import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

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
   * Article's image object to display.
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

const titleWrapperStyle = ({ theme, }) => ({
  ...theme.type(-2),
  marginStart: '1rem',
});
const TitleWrapper = createComponent(titleWrapperStyle, StyledGridItem, props =>
  Object.keys(props)
);

const imgOptions = {
  transforms: {
    width: '84',
    aspect: 'regular',
    quality: 'auto',
  },
};

// eslint-disable-next-line react/prop-types
function Article({ title, image, sourceName, border, }) {
  return (
    <StyledGrid
      gutter={0}
      miscStyles={{
        flexWrap: false,
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
      >
        {typeof image === 'string' ? (
          <img // eslint-disable-line jsx-a11y/alt-text
            src={image}
            width="100%"
          />
        ) : (
          <Image imgOptions={imgOptions} data={image} />
        )}
      </StyledGridItem>
      <TitleWrapper>
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
      </TitleWrapper>
    </StyledGrid>
  );
}

Article.propTypes = propTypes;
Article.defaultProps = defaultProps;

export default Article;

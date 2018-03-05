import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, withTheme, } from 'react-fela';
import { rgba, } from 'polished';

import ArticleImage from '../ArticleImage/ArticleImage';
import Caption from '../Caption/Caption';
import Carousel from '../Carousel/Carousel';

const propTypes = {
  name: PropTypes.string.isRequired,
  showTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  accessibility: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
  showTitle: true,
};

const captionWrapperStyle = ({ theme, }) => ({
  backgroundColor: theme.color('neutral'),
  padding: '1.5rem',
  textAlign: 'start',
});
const CaptionWrapper = createComponent(captionWrapperStyle);

const dotsWrapperStyle = () => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: '3rem',
});
const DotsWrapper = createComponent(dotsWrapperStyle);

const dotStyle = ({ theme, active, }) => ({
  backgroundColor: active ?
    theme.color('quaternary') :
    rgba(theme.color('neutral', '-6'), 0.5),
  borderRadius: '50%',
  display: 'inline-block',
  height: '1.3rem',
  marginEnd: '2rem',
  width: '1.3rem',
});
const Dot = createComponent(dotStyle, 'span');

class ImageGallery extends React.Component {
  state = {
    displayImageNum: 0,
  };

  render() {
    const {
      images,
      theme,
      name,
      showTitle,
      accessibility,
    } = this.props;
    const image = images[this.state.displayImageNum];
    return (
      <Fragment>
        <Carousel
          buttonsColor={rgba(theme.color('quaternary'), 0.9)}
          Component={ArticleImage}
          componentAttrs={{
            forceAspect: 'regular',
            showCaption: false,
          }}
          items={images}
          loop
        />
        <CaptionWrapper>
          <Caption
            caption={image.title}
            credit={image.credit}
            color={[ 'neutral', '-10', ]}
            typeStyles={-2}
          />
          <DotsWrapper>
            {images.map((img, i) => (
              <Dot
                active={i === this.state.displayImageNum}
              />
            ))}
          </DotsWrapper>
        </CaptionWrapper>
      </Fragment>
    );
  }
}

ImageGallery.propTypes = propTypes;
ImageGallery.defaultProps = defaultProps;

export default withTheme(ImageGallery);

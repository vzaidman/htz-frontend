import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, withTheme, } from 'react-fela';

import Caption from '../Caption/Caption';
import IconClose from '../Icon/icons/IconClose';
import IconZoomIn from '../Icon/icons/IconZoomIn';
import Image from '../Image/Image';
import Picture from '../Image/Picture';

const articleImagePropTypes = {
  imageType: PropTypes.string.isRequired,
  imgArray: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  title: PropTypes.string,
  credit: PropTypes.string,
};

const articleImageDefaultProps = {
  title: null,
  credit: null,
};

const imagePropTypes = {
  imageType: PropTypes.string.isRequired,
  imgArray: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  isFullScreen: PropTypes.bool,
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const imageDefaultProps = {
  isFullScreen: false,
};

const wrapperStyle = () => ({
  position: 'relative',
});
const Wrapper = createComponent(wrapperStyle);

const imageWrapperStyle = () => ({

});
const ImageWrapper = createComponent(imageWrapperStyle);

const imageCaptionStyle = ({ theme, }) => ({
  position: 'absolute',
  color: theme.color('neutral', '-10'),
});
const ImageCaption = createComponent(imageCaptionStyle, Caption, props => Object.keys(props));

const fullContainerStyle = ({ theme, }) => ({
  position: 'fixed',
  top: '0',
  start: '0',
  width: '100%',
  height: '100%',
  zIndex: '6',
});
const FullScreenContainer = createComponent(fullContainerStyle, Wrapper);

const zoomWrapperStyle = ({ theme, }) => ({
  position: 'absolute',
  top: '1rem',
  end: '1rem',
  zIndex: '1',
  // backgroundColor: theme.color('neutral', '+1'),
  backgroundColor: 'rgba(22, 22, 22, 0.5)',
  padding: '1rem',
  width: '5rem',
  height: '5rem',
  borderRadius: '50%',
  cursor: 'zoom-in',
  ':hover': {
    backgroundColor: theme.color('neutral', '+1'),
  },
});
const ZoomWrapper = createComponent(zoomWrapperStyle, 'span', [ 'onClick', ]);

const closeWrapperStyle = () => ({
  cursor: 'zoom-out',
});
const CloseWrapper = createComponent(closeWrapperStyle, ZoomWrapper, [ 'onClick', ]);

const ImageElement = props => {
  const { imageType, imgArray, isFullScreen, theme, } = props;

  const imgOptions = {
    transforms: {
      width: isFullScreen ? '1920' : '700',
      aspect: isFullScreen ? 'full' : 'regular',
      quality: 'auto',
    },
  };
  const sourceOptions = {
    transforms: {
      width: isFullScreen ? '1920' : '700',
      aspect: 'full',
      quality: 'auto',
    },
  };

  const overrideStyles = {
    miscStyles: {
      position: 'unset',
      ...(isFullScreen && {
        backgroundColor: theme.color('neutral'),
      }),
    },
    attrs: {
      style: {
        width: 'auto',
        ...(isFullScreen && {
          left: '50%',
          transform: 'translateX(-50%)',
        }),
      },
    },
  };

  return imageType === 'image' ?
    (<Image
      {...overrideStyles}
      data={props}
      imgOptions={imgOptions}
    />) :
    (<Picture
      {...overrideStyles}
      defaultImg={{
        data: props,
        sourceOptions,
      }}
      sources={[
        {
          until: 'm',
          data: {
            ...props,
            imgArray: [ imgArray[1], ],
          },
          sourceOptions,
        },
        {
          from: 'm',
          data: {
            ...props,
            imgArray: [ imgArray[0], ],
          },
          sourceOptions,
        },
      ]}
    />);
};

ImageElement.propTypes = imagePropTypes;
ImageElement.defaultProps = imageDefaultProps;

class ArticleImage extends React.Component {
  state = {
    fullScreen: false,
  };

  toggleFullScreen = () => {
    this.setState({
      fullScreen: !this.state.fullScreen,
    });
  };

  render() {
    return (
      <Fragment>
        <Wrapper>
          <ZoomWrapper onClick={this.toggleFullScreen}>
            <IconZoomIn
              color={[ 'neutral', '-10', ]}
              size={2.5}
              miscStyles={{
                display: 'block',
                margin: '0 auto',
                transform: 'translateY(12.5%)',
              }}
            />
          </ZoomWrapper>
          <ImageElement {...this.props} />
        </Wrapper>
        {this.state.fullScreen &&
          <FullScreenContainer>
            <ImageWrapper>
              <CloseWrapper onClick={this.toggleFullScreen}>
                <IconClose
                  color={[ 'neutral', '-10', ]}
                  size={2.5}
                  miscStyles={{
                    display: 'block',
                    margin: '0 auto',
                    transform: 'translateY(12.5%)',
                  }}
                />
              </CloseWrapper>
              <ImageCaption caption={this.props.title} credit={this.props.credit} />
              <ImageElement {...this.props} isFullScreen />
            </ImageWrapper>
          </FullScreenContainer>
        }
      </Fragment>
    );
  }
}

ArticleImage.propTypes = articleImagePropTypes;
ArticleImage.defaultProps = articleImageDefaultProps;

export default withTheme(ArticleImage);

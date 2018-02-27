import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, withTheme, } from 'react-fela';
import { rgba, } from 'polished';

import Caption from '../Caption/Caption';
import IconClose from '../Icon/icons/IconClose';
import IconZoomIn from '../Icon/icons/IconZoomIn';
import IconMailAlert from '../Icon/icons/IconMailAlert';
import IconWhatsapp from '../Icon/icons/IconWhatsapp';
import IconFacebookLogo from '../Icon/icons/IconFacebookLogo';
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
  viewMode: PropTypes.string,
};

const imageDefaultProps = {
  isFullScreen: false,
  viewMode: 'FullColumnWithVerticalImage',
};

const wrapperStyle = () => ({
  position: 'relative',
});
const Wrapper = createComponent(wrapperStyle);

const imageWrapperStyle = () => ({
  position: 'relative',
  height: '100%',
});
const ImageWrapper = createComponent(imageWrapperStyle);

const imageCaptionStyle = ({ theme, }) => ({
  marginStart: '3rem',
  marginEnd: '2rem',
  marginBottom: '10rem',
  textAlign: 'start',
  flexBasis: '50rem',
  alignSelf: 'flex-end',
});
const ImageCaption = createComponent(imageCaptionStyle);

const separatorStyle = ({ theme, }) => ({
  marginBottom: '3rem',
  marginTop: '3rem',
  width: '100%',
  height: '1px',
  backgroundColor: theme.color('neutral', '-4'),
});
const Separator = createComponent(separatorStyle);

const iconsStyle = () => ({

});
const SharingIcons = createComponent(iconsStyle);

const fullContainerStyle = ({ theme, }) => ({
  backgroundColor: theme.color('neutral'),
  position: 'fixed',
  top: '0',
  start: '0',
  width: '100%',
  height: '100%',
  zIndex: '6',
  display: 'flex',
  justifyContent: 'flex-start',
});
const FullScreenContainer = createComponent(fullContainerStyle, Wrapper);

const zoomWrapperStyle = ({ theme, }) => ({
  position: 'absolute',
  top: '1rem',
  end: '1rem',
  zIndex: '1',
  backgroundColor: rgba(theme.color('neutral', '+1'), 0.5),
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

const getAspect = viewMode => {
  switch (viewMode) {
    case 'regularModeBigImage' :
      return 'full';
    case 'OneThirdView' :
      return 'full';
    default :
      return 'full';
  }
};

const ImageElement = props => {
  const { imageType, imgArray, isFullScreen, viewMode, } = props;

  const aspect = getAspect(viewMode);

  const imgOptions = {
    transforms: {
      width: isFullScreen ? '1920' : '700',
      aspect,
      quality: 'auto',
    },
  };
  const sourceOptions = {
    transforms: {
      width: isFullScreen ? '1920' : '700',
      aspect,
      quality: 'auto',
    },
  };

  return imageType === 'image' ?
    (<Image
      hasWrapper={!isFullScreen}
      data={props}
      imgOptions={imgOptions}
      bgcolor={isFullScreen && 'neutral'}
    />) :
    (<Picture
      hasWrapper={!isFullScreen}
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
      bgcolor={isFullScreen && 'neutral'}
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
            <ImageWrapper>
              <ImageElement {...this.props} isFullScreen />
            </ImageWrapper>
            <ImageCaption>
              <Caption
                caption={this.props.title}
                credit={this.props.credit}
                color={[ 'neutral', '-10', ]}
                typeStyles={-1}
              />
              <Separator />
              <SharingIcons>
                <IconFacebookLogo
                  color={[ 'neutral', '-10', ]}
                  size={3}
                  miscStyles={{
                    marginEnd: '6rem',
                  }}
                />
                <IconWhatsapp
                  color={[ 'neutral', '-10', ]}
                  size={3}
                  miscStyles={{
                    marginEnd: '6rem',
                  }}
                />
                <IconMailAlert
                  color={[ 'neutral', '-10', ]}
                  size={5}
                  miscStyles={{
                    marginEnd: '6rem',
                  }}
                />
              </SharingIcons>
            </ImageCaption>
          </FullScreenContainer>
        }
      </Fragment>
    );
  }
}

ArticleImage.propTypes = articleImagePropTypes;
ArticleImage.defaultProps = articleImageDefaultProps;

export default withTheme(ArticleImage);

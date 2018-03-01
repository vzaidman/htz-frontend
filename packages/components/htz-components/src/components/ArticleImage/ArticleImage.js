import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, withTheme, } from 'react-fela';
import { parseComponentProp, createMqFunc, } from '@haaretz/htz-css-tools';
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
  /**
   * Is it a standard image or infographic.
   */
  imageType: PropTypes.string.isRequired,
  /**
   * Image's dada that comes from polopoly.
   */
  imgArray: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  /**
   * The image's selected view mode set by the editor (regular, full or 1/3).
   */
  viewMode: PropTypes.string.isRequired,
  /**
   * Is this image is the last item in the article body (needed for margin bottom).
   */
  lastItem: PropTypes.bool,
  /**
   * Image's title.
   */
  title: PropTypes.string,
  /**
   * Image's credit.
   */
  credit: PropTypes.string,
};

const articleImageDefaultProps = {
  lastItem: false,
  title: null,
  credit: null,
};

const imagePropTypes = {
  /**
   * Is it a standard image or infographic.
   */
  imageType: PropTypes.string.isRequired,
  /**
   * Image's dada that comes from polopoly.
   */
  imgArray: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  /**
   * Should the view switch to full-screen.
   */
  isFullScreen: PropTypes.bool,
  /**
   * The image's selected view mode set by the editor (regular, full or 1/3).
   */
  viewMode: PropTypes.string,
};

const imageDefaultProps = {
  isFullScreen: false,
  viewMode: 'FullColumnWithVerticalImage',
};

const mediaQueryCallback = (prop, value) => ({ [prop]: value, });

const wrapperStyle = ({ viewMode, lastItem, theme, }) => ({
  position: 'relative',
  ...(!lastItem &&
    parseComponentProp(
      'marginBottom',
      theme.articleStyle.body.marginBottom,
      theme.mq,
      mediaQueryCallback,
    )
  ),
  ...(viewMode === 'OneThirdView' && {
    extend: [
      {
        width: 'calc(100%/3)',
        marginStart: '1.5rem',
        marginBottom: '0.75rem',
        float: 'end',
      },
    ],
  }),
});
const Wrapper = createComponent(wrapperStyle, 'figure');

const imageWrapperStyle = () => ({
  position: 'relative',
  height: '100%',
});
const ImageWrapper = createComponent(imageWrapperStyle);

const imageCaptionStyle = ({ theme, }) => {
  const mq = createMqFunc();
  return ({
    marginEnd: '2rem',
    textAlign: 'start',
    alignSelf: 'flex-end',
    ...mq(
      { until: 'm', }, {
        backgroundColor: rgba(theme.color('neutral'), 0.85),
        position: 'absolute',
        width: '100%',
        paddingBottom: '4rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        flexBasis: '0',
      },
    ),
    ...mq(
      { from: 'm', }, {
        marginStart: '3rem',
        marginBottom: '10rem',
        flexBasis: '45rem',
      }
    ),
  });
};
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
  display: 'flex',
  alignItems: 'center',
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
  justifyContent: 'flex-end',
  ...parseComponentProp(
    'flexDirection',
    [
      { until: 'm', value: 'column', },
    ],
    theme.mq,
    mediaQueryCallback,
  ),
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

const closeWrapperStyle = ({ theme, }) => ({
  backgroundColor: theme.color('neutral'),
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
    const { viewMode, lastItem, title, credit, } = this.props;
    const iconsAttrs = {
      color: [ 'neutral', '-10', ],
      miscStyles: {
        marginEnd: '6rem',
      },
    };

    return (
      <Fragment>
        <Wrapper
          viewMode={viewMode}
          lastItem={lastItem}
        >
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
          <Caption
            caption={title}
            credit={credit}
          />
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
                caption={title}
                credit={credit}
                color={[ 'neutral', '-10', ]}
                typeStyles={-1}
              />
              <Separator />
              <SharingIcons>
                <IconFacebookLogo
                  {...iconsAttrs}
                  size={3}
                />
                <IconWhatsapp
                  {...iconsAttrs}
                  size={3}
                />
                <IconMailAlert
                  {...iconsAttrs}
                  size={5}
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

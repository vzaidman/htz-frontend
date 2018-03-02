import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import { rgba, } from 'polished';

import Caption from '../Caption/Caption';
import FullScreenImage from './FullScreenImage';
import IconZoomIn from '../Icon/icons/IconZoomIn';
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
        float: 'end',
        marginBottom: '0.75rem',
        marginStart: '1.5rem',
        width: 'calc(100%/3)',
      },
    ],
  }),
});
const Wrapper = createComponent(wrapperStyle, 'figure');

const zoomWrapperStyle = ({ theme, }) => ({
  backgroundColor: rgba(theme.color('neutral', '+1'), 0.5),
  borderRadius: '50%',
  cursor: 'zoom-in',
  end: '1rem',
  height: '5rem',
  padding: '1rem',
  position: 'absolute',
  top: '1rem',
  width: '5rem',
  zIndex: '1',
  ':hover': {
    backgroundColor: theme.color('neutral', '+1'),
  },
});
const ZoomWrapper = createComponent(zoomWrapperStyle, 'span', [ 'onClick', ]);

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

/**
 * The ArticleImage component takes the Image/Picture component, strips it
 * from it's wrapper and wraps it with a specific new one, according to the
 * image's Meta (which is unique per article), and adds a [`full-screen`](./#fullscreenimage-1) option as
 * a default.
 */
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
          <FullScreenImage
            imageElement={
              <ImageElement {...this.props} isFullScreen />
            }
            closeCallBack={this.toggleFullScreen}
            title={title}
            credit={credit}
          />
        }
      </Fragment>
    );
  }
}

ArticleImage.propTypes = articleImagePropTypes;
ArticleImage.defaultProps = articleImageDefaultProps;

export default ArticleImage;

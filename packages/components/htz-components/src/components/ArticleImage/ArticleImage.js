import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

import Image from '../Image/Image';
import Picture from '../Image/Picture';
import IconZoomIn from '../Icon/icons/IconZoomIn';
import IconClose from '../Icon/icons/IconClose';

const propTypes = {
  imageType: PropTypes.string.isRequired,
  imgArray: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  isFullScreen: PropTypes.bool,
};

const defaultProps = {
  isFullScreen: false,
};

const wrapperStyle = ({ isFullScreen, }) => ({
  ...(isFullScreen ? {
    position: 'fixed',
    top: '0',
    start: '0',
    width: '100%',
    zIndex: '6',
    // backgroundColor: theme.color('neutral', '+1'),
    backgroundColor: 'rgba(22, 22, 22, 0.5)',
  } : {
    position: 'relative',
  }),
});
const Wrapper = createComponent(wrapperStyle);

const iconWrapperStyle = ({ theme, isFullScreen, }) => ({
  position: 'absolute',
  top: '1rem',
  ...(isFullScreen ? { start: '1rem', } : { end: '1rem', }),
  zIndex: '1',
  // backgroundColor: theme.color('neutral', '+1'),
  backgroundColor: 'rgba(22, 22, 22, 0.5)',
  padding: '1rem',
  width: '5rem',
  height: '5rem',
  borderRadius: '50%',
  ':hover': {
    backgroundColor: theme.color('neutral', '+1'),
  },
});
const IconWrapper = createComponent(iconWrapperStyle, 'span', [ 'onClick', ]);

class ArticleImage extends React.Component {
  state = {
    goFullScreen: false,
  };

  toggleFullScreen = () => {
    console.log(this.props.isFullScreen);
    console.log(this.state.goFullScreen);
    this.setState({
      goFullScreen: !this.props.isFullScreen,
    });
  };

  render() {
    const { imageType, imgArray, isFullScreen, } = this.props;
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

    const Icon = isFullScreen ? IconClose : IconZoomIn;

    return (
      <Fragment>
        <Wrapper isFullScreen={isFullScreen}>
          <IconWrapper onClick={this.toggleFullScreen} isFullScreen={isFullScreen}>
            <Icon
              color={[ 'neutral', '-10', ]}
              size={2.5}
              miscStyles={{
                display: 'block',
                margin: '0 auto',
                transform: 'translateY(12.5%)',
              }}
            />
          </IconWrapper>
          {imageType === 'image' ?
            <Image
              data={this.props}
              imgOptions={imgOptions}
            /> :
            <Picture
              defaultImg={{
                data: this.props,
                sourceOptions,
              }}
              sources={[
                {
                  until: 'm',
                  data: {
                    ...this.props,
                    imgArray: [ imgArray[1], ],
                  },
                  sourceOptions,
                },
                {
                  from: 'm',
                  data: {
                    ...this.props,
                    imgArray: [ imgArray[0], ],
                  },
                  sourceOptions,
                },
              ]}
            />
          }
        </Wrapper>
        {this.state.goFullScreen &&
          <ArticleImage {...this.props} isFullScreen />
        }
      </Fragment>
    );
  }
}

ArticleImage.propTypes = propTypes;
ArticleImage.defaultProps = defaultProps;

export default ArticleImage;

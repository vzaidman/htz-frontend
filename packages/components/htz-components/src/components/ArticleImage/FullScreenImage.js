import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, withTheme, } from 'react-fela';
import { createMqFunc, } from '@haaretz/htz-css-tools';
import { rgba, } from 'polished';

import Caption from '../Caption/Caption';
import IconClose from '../Icon/icons/IconClose';
import IconMailAlert from '../Icon/icons/IconMailAlert';
import IconWhatsapp from '../Icon/icons/IconWhatsapp';
import IconFacebookLogo from '../Icon/icons/IconFacebookLogo';

const propTypes = {
  /**
   * An Image/Picture component you want to display, **without** it's wrapper.
   */
  imageElement: PropTypes.node.isRequired,
  /**
   * A method that should be executed for exiting full-screen mode.
   */
  closeCallBack: PropTypes.func.isRequired,
  /**
   * Image's title.
   */
  title: PropTypes.string,
  /**
   * Image's credit.
   */
  credit: PropTypes.string,
};

const defaultProps = {
  title: null,
  credit: null,
};

const imageWrapperStyle = () => {
  const mq = createMqFunc();
  return ({
    ...mq(
      { until: 'm', misc: '(orientation: landscape)', }, {
        height: '100%',
        position: 'relative',
      }
    ),
    ...mq(
      { from: 'm', }, {
        height: '100%',
        position: 'relative',
      }
    ),
  }
  );
};
const ImageWrapper = createComponent(imageWrapperStyle);

const imageCaptionStyle = ({ theme, imageWidth, }) => {
  const mq = createMqFunc();
  return ({
    marginEnd: '2rem',
    textAlign: 'start',
    alignSelf: 'flex-end',
    ...mq(
      { until: 'm', }, {
        backgroundColor: rgba(theme.color('neutral'), 0.85),
        bottom: '0',
        flexBasis: '0',
        paddingBottom: '4rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        position: 'absolute',
        start: '50%',
        transform: 'translateX(50%)',
        width: `${imageWidth}px`,
      },
    ),
    ...mq(
      { from: 'm', }, {
        flexBasis: '45rem',
        marginBottom: '10rem',
        marginStart: '3rem',
      }
    ),
  });
};
const ImageCaption = createComponent(imageCaptionStyle);

const separatorStyle = ({ theme, }) => ({
  backgroundColor: theme.color('neutral', '-4'),
  height: '1px',
  marginBottom: '3rem',
  marginTop: '3rem',
  width: '100%',
});
const Separator = createComponent(separatorStyle);

const iconsStyle = () => ({
  alignItems: 'center',
  display: 'flex',
});
const SharingIcons = createComponent(iconsStyle);

const fullContainerStyle = ({ theme, }) => {
  const mq = createMqFunc();
  return ({
    alignItems: 'center',
    backgroundColor: theme.color('neutral'),
    display: 'flex',
    height: '100%',
    position: 'fixed',
    start: '0',
    top: '0',
    width: '100%',
    zIndex: '6',
    ...mq(
      { until: 'm', }, {
        flexDirection: 'column',
        justifyContent: 'center',
      }
    ),
    ...mq(
      { from: 'm', }, {
        justifyContent: 'flex-end',
      }
    ),
  });
};
const FullScreenContainer = createComponent(fullContainerStyle, 'figure');

const closeWrapperStyle = ({ theme, }) => ({
  backgroundColor: theme.color('neutral'),
  borderRadius: '50%',
  cursor: 'zoom-out',
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

// eslint-disable-next-line react/prop-types
const CloseWrapperUnstyled = ({ theme, ...props }) => (
  <button {...props} aria-label={theme.zoomoutText}>
    <IconClose
      color={[ 'neutral', '-10', ]}
      size={2.5}
      miscStyles={{
        display: 'block',
        margin: '0 auto',
      }}
    />
  </button>
);

const CloseWrapper = createComponent(
  closeWrapperStyle,
  withTheme(CloseWrapperUnstyled),
  props => Object.keys(props)
);

/**
 * This component receives an Image/Picture component **WITHOUT** it's wrapper
 * and displays it in a full-screen, with it's caption & credit, and some sharing buttons.
 */
class FullScreenImage extends React.Component {
  state = {
    imageWidth: null,
  };

  componentDidMount() {
    this.setState({ // eslint-disable-line react/no-did-mount-set-state
      imageWidth: this.image.offsetWidth,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.imageWidth !== nextState.imageWidth;
  }

  render() {
    const { imageElement, closeCallBack, title, credit, } = this.props;

    const iconsAttrs = {
      color: [ 'neutral', '-10', ],
      miscStyles: {
        marginEnd: '6rem',
      },
    };

    return (
      <FullScreenContainer>
        <CloseWrapper onClick={closeCallBack} />
        <ImageWrapper
          innerRef={image => this.image = image} // eslint-disable-line no-return-assign
        >
          {imageElement}
        </ImageWrapper>
        <ImageCaption imageWidth={this.state.imageWidth}>
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
    );
  }
}

FullScreenImage.propTypes = propTypes;
FullScreenImage.defaultProps = defaultProps;

export default FullScreenImage;

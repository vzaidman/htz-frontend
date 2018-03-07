import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { createMqFunc, } from '@haaretz/htz-css-tools';
import { rgba, } from 'polished';

import Caption from '../../Caption/Caption';
import IconMailAlert from '../../Icon/icons/IconMailAlert';
import IconWhatsapp from '../../Icon/icons/IconWhatsapp';
import IconFacebookLogo from '../../Icon/icons/IconFacebookLogo';

const propTypes = {
  /**
   * Media's credit (if available).
   */
  credit: PropTypes.string,
  /**
   * The width that the caption should have (in Pixels, **Mobile only**).
   */
  mediaWidth: PropTypes.number.isRequired,
  /**
   * Media's title (if available).
   */
  title: PropTypes.string,
};

const defaultProps = {
  title: null,
  credit: null,
};

const captionStyle = ({ theme, mediaWidth, }) => {
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
        width: `${mediaWidth}px`,
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
const CaptionWrapper = createComponent(captionStyle);

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


const FullScreenCaption = ({ mediaWidth, title, credit, }) => {
  const iconsAttrs = {
    color: [ 'neutral', '-10', ],
    miscStyles: {
      marginEnd: '6rem',
    },
  };

  return (
    <CaptionWrapper mediaWidth={mediaWidth}>
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
    </CaptionWrapper>
  );
};

FullScreenCaption.propTypes = propTypes;
FullScreenCaption.defaultProps = defaultProps;

export default FullScreenCaption;

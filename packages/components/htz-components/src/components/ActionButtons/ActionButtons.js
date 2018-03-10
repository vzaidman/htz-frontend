import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { createComponent, } from 'react-fela';

import { border, parseStyleProps, } from '@haaretz/htz-css-tools';

import { stylesPropType, } from '../../propTypes/stylesPropType';
import Button from '../Button/Button'; // eslint-disable-line import/no-named-as-default
import ButtonGroup from '../Button/ButtonGroup'; // eslint-disable-line import/no-named-as-default

const buttonPropType = PropTypes.oneOfType([
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    buttonText: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, ]),
    buttonStyles: stylesPropType, // eslint-disable-line react/no-unused-prop-types
    iconStyles: stylesPropType, // eslint-disable-line react/no-unused-prop-types
  }),
  PropTypes.string.isRequired,
]);

/* eslint-disable no-trailing-spaces */
const propTypes = {
  /**
   * In case you want a custom border, here you may define a specific
   * style for the border by giving a [`Border object`](https://haaretz.github.io/htz-frontend/docs/htz-css-tools/#border).
   */
  borderStyles: PropTypes.shape({
    width: PropTypes.string,
    lines: PropTypes.number,
    style: PropTypes.string,
    color: PropTypes.string,
  }),
  /**
   * Each button can be a string (e.g. 'facebook') or an object with additional attributes
(e.g. {
  name: 'facebookLogo',
  buttonText: 78,
  iconStyles: {
    color: '#3b5998',
  },
  buttonStyles: {
    backgroundColor: 'pink',
  },
}).
   * the objects 'iconStyles' and 'buttonStyles' will override the global styles
   * ('globalIconsStyles' and 'globalButtonsStyles') **only** for the button they're assigned to.
   * This buttons props may contain a single button (String or Object), an array of buttons
   * (String, Object or both), or an Object with two key: `start` and `end` which may contain a
   * a single button or an array of buttons each, and display the 'start' button/s at the start
   * of the row/column, and the 'end' button/s at the end.
   */
  buttons: PropTypes.oneOfType([
    buttonPropType,
    PropTypes.arrayOf(buttonPropType),
    PropTypes.shape({
      start: PropTypes.oneOfType([
        buttonPropType,
        PropTypes.arrayOf(buttonPropType),
      ]),
      end: PropTypes.oneOfType([
        buttonPropType,
        PropTypes.arrayOf(buttonPropType),
      ]),
    }),
  ]).isRequired,
  /**
   * A style prop that will affect all the buttons in this component.
   */
  globalButtonsStyles: stylesPropType, // eslint-disable-line react/no-unused-prop-types
  /**
   * A style prop that will affect all the icons inside the buttons in this component.
   */
  globalIconsStyles: stylesPropType, // eslint-disable-line react/no-unused-prop-types
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType, // eslint-disable-line react/no-unused-prop-types
  /**
   * The size of the buttons Icons (according to the [`Icon`](./#icon) component)
   */
  size: PropTypes.number,
  /**
   * Should the icon's bar be vertical or horizontal (default).
   */
  vertical: PropTypes.bool,
};
/* eslint-enable no-trailing-spaces */

const defaultProps = {
  borderStyles: null,
  globalButtonsStyles: null,
  globalIconsStyles: null,
  miscStyles: null,
  vertical: false,
  size: 2,
};

const wrapperStyle = ({ vertical, miscStyles, theme, }) => ({
  display: 'flex',
  flexDirection: vertical ? 'column' : 'row',
  justifyContent: 'space-between',
  ...(vertical && {
    flexDirection: 'column',
    height: '100%',
  }),
  ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
});
const ActionWrapper = createComponent(wrapperStyle);

const buttonStyle = ({ borderStyles, miscStyles, theme, }) => ({
  ...(borderStyles && border(borderStyles)),
  ...miscStyles,
});
const ActionButton = createComponent(buttonStyle, Button);

const buttonTextStyle = () => ({
  marginEnd: '1rem',
});
const ButtonText = createComponent(buttonTextStyle, 'span');

const ActionButtons = ({
  borderStyles,
  buttons,
  globalButtonsStyles,
  globalIconsStyles,
  miscStyles,
  size,
  vertical,
}) => {
  const getIcon = (iconName, iconsStyles) => {
    const icons = new Map([
      [ 'comments', dynamic(import('../Icon/icons/IconComment.js')), ],
      [ 'facebook', dynamic(import('../Icon/icons/IconFacebook.js')), ],
      [ 'facebooklogo', dynamic(import('../Icon/icons/IconFacebookLogo.js')), ],
      [ 'googleplus', dynamic(import('../Icon/icons/IconGPlus.js')), ],
      [ 'mail', dynamic(import('../Icon/icons/IconMail.js')), ],
      [ 'mailalert', dynamic(import('../Icon/icons/IconMailAlert.js')), ],
      [ 'print', dynamic(import('../Icon/icons/IconPrint.js')), ],
      [ 'twitter', dynamic(import('../Icon/icons/IconTwitter.js')), ],
      [ 'whatsapp', dynamic(import('../Icon/icons/IconWhatsapp.js')), ],
      [ 'zen', dynamic(import('../Icon/icons/IconZen.js')), ],
    ]);
    const Icon = icons.get(iconName.toLowerCase());
    return (
      <Icon
        size={size}
        miscStyles={{
          ...(globalIconsStyles && globalIconsStyles),
          ...(iconsStyles && iconsStyles),
        }}
      />
    );
  };

  const getButton = button => {
    const { buttonStyles, buttonText, iconStyles, name, } = button;
    return (
      <ActionButton
        borderStyles={borderStyles}
        boxModel={{ hp: 3, vp: 1, }}
        miscStyles={{
          ...(globalButtonsStyles && globalButtonsStyles),
          ...(buttonStyles && buttonStyles),
        }}
      >
        {buttonText && <ButtonText>{buttonText}</ButtonText>}
        {getIcon(name || button, iconStyles)}
      </ActionButton>
    );
  };

  const getBatch = (buttonsObj, end) =>
    (buttonsObj instanceof Array ? (
      <ButtonGroup
        isColumn={vertical}
        miscStyles={{
          alignSelf: 'flex-start',
        }}
      >
        {buttonsObj.map(button => getButton(button))}
      </ButtonGroup>
    ) : (
      getButton(buttonsObj)
    ));

  return (
    <ActionWrapper vertical={vertical} miscStyles={miscStyles}>
      {!buttons.start ? (
        getBatch(buttons)
      ) : (
        <Fragment>
          {getBatch(buttons.start)}
          {getBatch(buttons.end)}
        </Fragment>
      )}
    </ActionWrapper>
  );
};

ActionButtons.propTypes = propTypes;
ActionButtons.defaultProps = defaultProps;

export default ActionButtons;

import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

import { parseStyleProps, } from '@haaretz/htz-css-tools';

import getAction from './actionList';
import { stylesPropType, } from '../../propTypes/stylesPropType';
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
  boxModel: PropTypes.shape({
    hp: PropTypes.number,
    vp: PropTypes.number,
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
   * The name of the element this buttons affect.
   */
  elementName: PropTypes.string,
  /**
   * The path to the element this buttons affect.
   */
  elementUrl: PropTypes.string,
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
  isFlat: PropTypes.bool,
  isRound: PropTypes.bool,
  /**
   * The size of the buttons Icons (according to the [`Icon`](./#icon) component)
   */
  size: PropTypes.number,
  /**
   * Should the icon's bar be vertical or horizontal (default).
   */
  vertical: PropTypes.bool,
};

const defaultProps = {
  elementName: null,
  elementUrl: null,
  boxModel: { hp: 3, vp: 0.5, },
  globalButtonsStyles: null,
  globalIconsStyles: null,
  isFlat: false,
  isRound: false,
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
  extend: [
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});
const ActionWrapper = createComponent(wrapperStyle);

const ActionButtons = ({
  boxModel,
  buttons,
  elementName,
  elementUrl,
  globalButtonsStyles,
  globalIconsStyles,
  isFlat,
  isRound,
  miscStyles,
  size,
  vertical,
}) => {
  const getButton = (button, index) => {
    const { buttonStyles, iconStyles, name, } = button;
    const ActionButton = getAction(name || button);
    return (
      <ActionButton
        key={index}
        fontSize={-2}
        boxModel={boxModel}
        isFlat={isFlat}
        isRound={isRound}
        buttonStyles={{
          ...(globalButtonsStyles && globalButtonsStyles),
          ...(buttonStyles && buttonStyles),
        }}
        size={size}
        iconStyles={{
          ...(globalIconsStyles && globalIconsStyles),
          ...(iconStyles && iconStyles),
        }}
        elementName={elementName}
        elementUrl={elementUrl}
      />
    );
  };

  const getBatch = (buttonsObj, end) =>
    (buttonsObj instanceof Array ? (
      <ButtonGroup isColumn={vertical}>
        {buttonsObj.map((button, index) => getButton(button, index))}
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

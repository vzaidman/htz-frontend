import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import PhoneSvg from '../../../PhoneSvg/PhoneSvg';

const propTypes = {
  subscription: PropTypes.string.isRequired,
  size: PropTypes.number,
};

const defaultProps = {
  size: 8,
};

const phonesContStyle = ({ size, theme, }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const StyledPhonesCont = createComponent(phonesContStyle);

const isEven = number => number % 2 === 0;
const toOdd = number => (isEven(number) ? number + 1 : number);

const plusStyle = ({ size, theme, }) => {
  const plusSize = toOdd(Math.round(size * 2));
  const lineWidth = toOdd(Math.round(plusSize / 5));

  return {
    marginInlineStart: '0.5rem',
    marginInlineEnd: '0.5rem',
    width: `${plusSize}px`,
    height: `${plusSize}px`,
    position: 'relative',
    ':before': {
      position: 'absolute',
      content: '""',
      height: `${lineWidth}px`,
      width: `${plusSize}px`,
      backgroundColor: theme.color('bodyText', 'base'),
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)',
    },
    ':after': {
      position: 'absolute',
      content: '""',
      height: `${plusSize}px`,
      width: `${lineWidth}px`,
      backgroundColor: theme.color('bodyText', 'base'),
      left: '50%',
      transform: 'translate(-50%,-50%)',
      top: '50%',
    },
  };
};
const StyledPlus = createComponent(plusStyle);

function Phones({ subscription, size, }) {
  return (
    <div aria-hidden="true">
      {subscription === 'BOTH' ? (
        <StyledPhonesCont>
          <PhoneSvg size={size} />
          <StyledPlus size={size} />
          <PhoneSvg brand="TM" size={size} />
        </StyledPhonesCont>
      ) : (
        <PhoneSvg brand={subscription} size={size} />
      )}
    </div>
  );
}

Phones.propTypes = propTypes;

Phones.defaultProps = defaultProps;

export default Phones;

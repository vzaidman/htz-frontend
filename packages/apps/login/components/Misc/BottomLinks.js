import React, { Fragment, } from 'react';
import { createComponent, FelaTheme, } from 'react-fela';
import PropTypes from 'prop-types';

const BottomLinks = props => {

  const { spacing, } = props;

  const bottomLinksStyle = () => ({
    margin: '35px 0 30px 0',
    textAlign: 'center',
    '> a': {
      display: 'inline-block',
      margin: `${spacing}rem auto`,
      fontSize: '14px',
      color: '#0b7eb5',
      textAlign: 'center',
      textDecoration: 'underline',
    },
    '> span': {
      margin: `${spacing}rem auto`,
      fontSize: '14px',
      color: '#0b7eb5',
      textAlign: 'center',
      cursor: 'default',
    },
  });
  const BottomLinksWrapper = createComponent(bottomLinksStyle);
  
  return (
    <BottomLinksWrapper>
      {props.children}
    </BottomLinksWrapper>
  )
};

BottomLinks.propTypes = {
  spacing: PropTypes.number,
}

BottomLinks.defaultProps = {
  spacing: 0,
}

export default BottomLinks;

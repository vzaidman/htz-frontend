import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

const captionWrapper = () => ({
  backgroundColor: '#2c2c2c',
  color: '#fff',
  padding: '0.375rem',
  fontWeight: '700',
  fontSize: '1.75rem',
  lineHeight: '1.5em',
  display: 'block',
  width: 'auto',
  boxSizing: 'border-box',
});

const CaptionWrapper = createComponent(captionWrapper, 'figcaption');

const credit = () => ({
  color: '#b2b2b2',
  float: 'left',
  fontWeight: '400',
  marginRight: '0.375rem',
  ':before': {
    content: '"קרדיט: "',
  },
});

const Credit = createComponent(credit, 'span', props => Object.keys(props));

const Caption = props => (
  <CaptionWrapper
    inputTemplate={props.inputTemplate}
    embedType={props.embedType}
  >
    {props.caption}
    <Credit>{props.credit}</Credit>
  </CaptionWrapper>
);

Caption.propTypes = {
  inputTemplate: PropTypes.string.isRequired,
  caption: PropTypes.string,
  credit: PropTypes.string,
  embedType: PropTypes.string.isRequired,
};

Caption.defaultProps = {
  caption: '',
  credit: '',
};

export default Caption;

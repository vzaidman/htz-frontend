import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';

const setColor = (prop, value, getColor) => {
  const colorArgs = Array.isArray(value) ? value : [ value, ];
  return {
    [prop]: getColor(...colorArgs),
  };
};

const captionWrapper = ({ theme, direction, background, color, }) => ({
  padding: '0.375rem',
  fontWeight: '700',
  fontSize: '1.75rem',
  lineHeight: '1.5em',
  display: 'block',
  width: 'auto',
  direction,
  ':after': {
    content: '""',
    clear: 'both',
    display: 'table',
  },
  extend: [
    parseComponentProp('backgroundColor', background, theme.mq, setColor, theme.color),
    parseComponentProp('color', color, theme.mq, setColor, theme.color),
  ],
});

const CaptionWrapper = createComponent(captionWrapper, 'div', props => Object.keys(props));

const credit = ({ prefix, direction, }) => ({
  opacity: '0.8',
  float: direction === 'rtl' ? 'left' : 'right',
  fontWeight: '400',
  marginRight: '0.375rem',
  ':before': {
    content: `'${prefix}: '`,
  },
});

const Credit = createComponent(credit, 'span', props => Object.keys(props));

/**
 * A Caption for Images, Embeds, Videos, etc.
 * @param {Object} props
 */
const Caption = props => {
  if (!props.caption && !props.credit) {
    return null;
  }
  return (
    <CaptionWrapper {...props}>
      {props.caption}
      {props.credit ? (
        <Credit prefix={props.creditprefix} direction={props.direction}>{props.credit}</Credit>
      ) : ''}
    </CaptionWrapper>
  );
};

Caption.propTypes = {
  /**
   * Input for the caption.
   */
  caption: PropTypes.string,
  /**
   * Input for the credit.
   */
  credit: PropTypes.string,
  /**
   * The credits prefix.
   */
  creditprefix: PropTypes.string,
  /**
   * The direction of the whole element.
   */
  direction: PropTypes.string,
  /**
   * The color of the background.
   */
  background: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * The color of the inner text.
   */
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
};

Caption.defaultProps = {
  caption: '',
  credit: '',
  creditprefix: 'קרדיט',
  direction: 'rtl',
  background: [ 'neutral', '-1', ],
  color: [ 'neutral', '-10', ],
};

export default Caption;

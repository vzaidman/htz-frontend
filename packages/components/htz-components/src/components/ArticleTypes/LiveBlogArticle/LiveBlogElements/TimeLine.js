import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

import { borderStart, } from '@haaretz/htz-css-tools';

// import { stylesPropType, } from '../../../../propTypes/stylesPropType';
import Time from '../../../Time/Time';
// import Grid from '../../../Grid/Grid';
// import GridItem from '../../../Grid/GridItem';

const propTypes = {
  timeLineItems: PropTypes.arrayOf(
    PropTypes.shape({
      keyEvent: PropTypes.string,
      pubDate: PropTypes.instanceOf(Date).isRequired,
      contentId: PropTypes.string,
    })
  ).isRequired,
  //   miscStyles: stylesPropType,
};

// const defaultProps = {
//   miscStyles: null,
// };

const itemStyle = ({ theme, isFirstItem, isLastItem, }) => ({
  paddingInlineStart: '2rem',
  paddingBottom: '7rem',
  color: theme.color('neutral', '-2'),
  extend: [
    borderStart({
      width: '1px',
      style: 'solid',
      color: '#ccc',
    }),
    isFirstItem
      ? {
        ':before': {
          height: '0.5em',
          top: '0',
          borderBottom: '1px solid #ccc',
        },
      }
      : {},
    isLastItem
      ? {
        paddingBottom: '0',
        ':before': {
          height: 'calc(100% - 0.5em)',
          top: '0.5em',
          borderTop: '1px solid #bbb',
        },
      }
      : {},
    isFirstItem || isLastItem
      ? {
        position: 'relative',
        ':before': {
          backgroundColor: '#fff',
          position: 'absolute',
          content: '""',
          width: '1rem',
          right: '-0.5em',
          transform: 'translate(-50%,0)',
        },
      }
      : {},
    theme.type(-2),
  ],
});

const TimeHeadlineStyle = ({ theme, isFirstItem, isLastItem, }) => ({
  position: 'relative',
  ':before': {
    position: 'absolute',
    content: '""',
    width: '1rem',
    height: '1rem',
    backgroundColor: theme.color('primary', '-6'),
    border: '1px solid #ccc',
    // border('1px', 1, 'solid', theme.color('primary', '-6')),
    top: '50%',
    right: '-1.5em',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
  },
  extend: [
    isFirstItem || isLastItem
      ? {
        position: 'relative',
        ':before': {
          content: '',
        },
      }
      : {},
  ],
});
function TimeLine({ timeLineItems, }) {
  return (
    <React.Fragment>
      <ul style={{ padding: '2rem', marginTop: '15rem', }}>
        {timeLineItems.map((item, i) => (
          <FelaComponent
            isFirstItem={i === 0}
            isLastItem={i === timeLineItems.length - 1}
            rule={itemStyle}
            render={({ className, }) => (
              <li className={className}>
                <FelaComponent
                  isFirstItem={i === 0}
                  isLastItem={i === timeLineItems.length - 1}
                  rule={TimeHeadlineStyle}
                  render={({ className, }) => (
                    <h2 className={className}>
                      <Time time={item.pubDate} format="HH:mm" />
                    </h2>
                  )}
                />
                <a href={`#${item.contentId}`}>{item.keyEvent}</a>
              </li>
            )}
          />
        ))}
      </ul>
    </React.Fragment>
  );
}

TimeLine.propTypes = propTypes;
// TimeLine.defaultProps = defaultProps;

export default TimeLine;

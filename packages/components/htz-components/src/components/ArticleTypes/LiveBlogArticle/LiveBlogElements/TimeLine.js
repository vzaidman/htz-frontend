import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

import { borderStart, parseStyleProps, } from '@haaretz/htz-css-tools';

import { stylesPropType, } from '../../../../propTypes/stylesPropType';
import Time from '../../../Time/Time';
// import Grid from '../../../Grid/Grid';
// import GridItem from '../../../Grid/GridItem';

const propTypes = {
  keyEvents: PropTypes.arrayOf(
    PropTypes.shape({
      keyEvent: PropTypes.string,
      pubDate: PropTypes.instanceOf(Date).isRequired,
      contentId: PropTypes.string,
    })
  ).isRequired,
  showTimeLineText: PropTypes.bool,
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

const defaultProps = {
  showTimeLineText: false,
  miscStyles: null,
};

const wrapperStyle = ({ miscStyles, theme, }) => ({
  display: 'block',
  width: '100%',
  extend: [ ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []), ],
});

const itemStyle = ({ theme, isFirstItem, isLastItem, }) => ({
  paddingInlineStart: '2rem',
  paddingBottom: '7rem',
  color: theme.color('primary', '+1'),
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

    theme.mq(
      { from: 's', until: 'l', },
      {
        display: 'flex',
        alignItems: 'baseline',
        paddingBottom: '3rem',
        // color: theme.color('primary', '+1'),
      }
    ),
    // theme.mq({until: 'm'}, theme.type(0)),
    theme.mq({ from: 'm', }, theme.type(-2)),
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
    theme.mq({ from: 's', until: 'l', }, { marginInlineEnd: '2rem', }),
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
function TimeLine({ keyEvents, miscStyles, showTimeLineText, }) {
  console.warn('keyEvents', keyEvents);
  console.warn('typeof keyEvents', typeof keyEvents);
  if (!keyEvents) return <></>;
  return (
    <React.Fragment>
      <FelaComponent
        rule={wrapperStyle}
        miscStyles={miscStyles}
        render={({ className, theme, }) => (
          <div className={className}>
            {/* <FelaComponent
              style={theme => ({
                ...(showTimeLineText ? { display: 'flex', } : { display: 'none', }),
                color: theme.color('tertiary'),
                fontWeight: 'bold',
                ...theme.type(1),
              })}
              render={({ className, }) => (
                <div className={className}>
                  {theme.liveBlogI18n.timeLineText}
                </div>
              )}
            /> */}
            <FelaComponent
              style={theme => ({
                // padding: '2rem',
                paddingBlockEnd: '5rem',
                paddingBlockStart: '5rem',
                marginTop: '2rem',
                paddingInlineStart: '2rem',
                paddingInlineEnd: '2rem',
                // backgroundColor: theme.color('primary', '-5'),
                ...theme.mq({ from: 'l', }, { marginTop: '15rem', padding: '2rem', }),
              })}
              render={({ className, }) => (
                <ul className={className}>
                  {keyEvents.map((item, i) => (
                    <FelaComponent
                      isFirstItem={i === 0}
                      isLastItem={i === keyEvents.length - 1}
                      rule={itemStyle}
                      render={({ className, }) => (
                        <li className={className}>
                          <FelaComponent
                            isFirstItem={i === 0}
                            isLastItem={i === keyEvents.length - 1}
                            rule={TimeHeadlineStyle}
                            render={({ className, }) => (
                              <h2 className={className}>
                                <Time time={item.pubDate} format="HH:mm" />
                              </h2>
                            )}
                          />
                          <FelaComponent
                            style={theme => ({
                              ...theme.mq(
                                { from: 's', until: 'm', },
                                { display: 'inline', marginInlineStart: '3rem', }
                              ),
                            })}
                            render={({ className, }) => (
                              <a className={className} href={`#${item.cardId}`}>
                                {item.keyEvent}
                              </a>
                            )}
                          />
                        </li>
                      )}
                    />
                  ))}
                </ul>
              )}
            />
          </div>
        )}
      />
    </React.Fragment>
  );
}

TimeLine.propTypes = propTypes;
TimeLine.defaultProps = defaultProps;

export default TimeLine;

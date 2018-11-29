import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

import { borderStart, parseStyleProps, } from '@haaretz/htz-css-tools';

import { stylesPropType, } from '../../../../propTypes/stylesPropType';
import Time from '../../../Time/Time';

const propTypes = {
  keyEvents: PropTypes.arrayOf(
    PropTypes.shape({
      keyEvent: PropTypes.string,
      pubDate: PropTypes.number,
      cardId: PropTypes.string,
    })
  ).isRequired,
  /**
   * A special property holding miscellaneous CSS values that
   * trumps all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

const defaultProps = {
  miscStyles: null,
};


// //////////////////////////////////////////////////////////////////////
//                           Timeline Style                            //
// //////////////////////////////////////////////////////////////////////

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
          backgroundColor: theme.color('primary', '-6'),
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
          backgroundColor: theme.color('primary', '-6'),
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
          position: 'absolute',
          content: '""',
          width: '1rem',
          right: '-0.6em',
          ...theme.mq({ until: 's', }, { right: '-0.4em', }),
          ...theme.mq({ from: 's', until: 'l', }, { right: '-0.4em', }),
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
        ...theme.type(-1),
      }
    ),
    theme.mq({ from: 'l', }, theme.type(-2)),
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
    top: '50%',
    right: '-1.6em',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
  },
  extend: [
    theme.mq({ until: 's', }, { ':before': { right: '-1.2em', }, }),
    theme.mq({ from: 's', until: 'l', }, { marginInlineEnd: '2rem', ':before': { right: '-1.3em', }, }),
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

// //////////////////////////////////////////////////////////////////////
//                            Main Component                           //
// //////////////////////////////////////////////////////////////////////

function TimeLine({ keyEvents, miscStyles, }) {
  if (!keyEvents) return <></>;
  return (
    <React.Fragment>
      <FelaComponent
        rule={wrapperStyle}
        miscStyles={miscStyles}
        render={({ className, theme, }) => (
          <div className={className}>
            <FelaComponent
              style={theme => ({
                paddingBlockEnd: '5rem',
                paddingBlockStart: '5rem',
                paddingInlineStart: '2rem',
                paddingInlineEnd: '2rem',
                ...theme.mq({ from: 'l', }, { marginTop: '15rem', paddingInlineEnd: '0rem', }),
              })}
              render={({ className, }) => (
                <ul className={className}>
                  {keyEvents.map((item, i) => (
                    <FelaComponent
                      isFirstItem={i === 0}
                      isLastItem={i === keyEvents.length - 1}
                      rule={itemStyle}
                      render={({ className, }) => (
                        <li key={`cardId-${item.cardId}`} className={className}>
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

import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

import { border, borderTop, borderBottom, parseStyleProps, getRemFromPx, } from '@haaretz/htz-css-tools';
import { stylesPropType, } from '../../../../propTypes/stylesPropType';
// import Time from '../../../Time/Time';
// import ActionButtons from '../../../ActionButtons/ActionButtons';
import RadioButton from '../../../RadioButton/RadioButton';
// import Button from '../../../Button/Button';
// import Grid from '../../../Grid/Grid';
// import GridItem from '../../../Grid/GridItem';

import TimeLine from './TimeLine';
import LiveBlogItem from './LiveBlogItem';
// import ArticleBody from '../../../ArticleBody/ArticleBody';


const wrapperStyle = ({ miscStyles, theme, }) => ({
  display: 'block',
  width: '100%',

  extend: [
    theme.mq(
      { from: 's', until: 'l', },
      {
        paddingInlineStart: '4rem',
        paddingInlineEnd: '4rem',
        paddingBottom: '4rem',
      }
    ),
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

const itemWrapperStyle = ({ theme, }) => ({
  display: 'block',
  width: '100%',

  extend: [
    theme.mq(
      { from: 's', until: 'l', },
      {
        paddingInlineStart: '4rem',
        paddingInlineEnd: '4rem',
        paddingBottom: '4rem',
      }
    ),
  ],
});

// eslint-disable-next-line react/prop-types
// const Fade = ({ isHighlighted, children, }) => (
//   <FelaComponent
//     style={theme => ({
//       display: 'block',
//       height: 0,
//       ':after': {
//         display: 'block',
//         content: '""',
//         width: '100%',
//         height: '14rem',
//         position: 'relative',
//         top: '-14rem',
//         background: `linear-gradient(transparent, ${theme.color(
//           'comments',
//           isHighlighted ? 'highlightedCommentBg' : 'bg'
//         )})`,
//       },
//     })}
//     render="span"
//   >
//     {children}
//   </FelaComponent>
// );

// const itemContainerStyle = ({ theme, }) => ({
//   //   width: '100%',
//   // extend: [
//   //   border('2px', 1, 'solid', 'gray'),
//   // ],
// });

// function SortUpdates({ value, changeState, }) {
//   return (
//     <Fragment>
//         <FelaComponent
//             style={ theme => ({ backgroundColor:  theme.color('primary', '-6'), width: '100%', display: 'flex', justifyContent: 'space-between', })}
//             render={({ className, theme, }) => (
//               <div className={className}>
//                 <FelaComponent
//                   style={{}}
//                   render={({ className, })=> (
//                     <span>{theme.liveBlogI18n.updatesTitle}</span>
//                   )}
//                 />
//                 <FelaComponent
//                   style={{ display: 'flex', }}
//                   render={({ className, })=> (

//                   )}
//                 />
//               <div>
//             )}
//         />
//     </Fragment>
//   );
// }

class LiveBlogContainer extends React.Component {
  static propTypes = {
    liveblogItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    canonicalUrl: PropTypes.string.isRequired,
    timeLineItems: PropTypes.arrayOf(
      PropTypes.shape({
        keyEvent: PropTypes.string,
        pubDate: PropTypes.instanceOf(Date).isRequired,
        contentId: PropTypes.string,
      })
    ),
    showTimeLineText: PropTypes.bool,
    /**
     * A special property holding miscellaneous CSS values that
     * trumps all default values. Processed by
     * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
     */
    miscStyles: stylesPropType,
  };
  static defaultProps = {
    showTimeLineText: false,
    timeLineItems: null,
    miscStyles: null,
  };

  state = {
    value: 'descending',
  };

  static getDerivedStateFromProps(props, state) {
    if (state.value === 'descending') {
      return { items: props.liveblogItems, };
    }
    return { items: props.liveblogItems.slice().reverse(), };
  }

  render() {
    const { items, } = this.state;
    const { canonicalUrl, timeLineItems, showTimeLineText, miscStyles, bps, typeConf, } = this.props;
    console.warn('items: ', typeof items, items);
    return (
      <Fragment>
        {/* Wrapper */}
        <FelaComponent
          rule={wrapperStyle}
          miscStyles={miscStyles}
          render={({ className, theme, }) => (
            <div className={className}>
              <TimeLine
                showTimeLineText={showTimeLineText}
                timeLineItems={timeLineItems}
                miscStyles={{
                  ...theme.mq({ from: 'l', }, { display: 'none', }),
                  ...theme.mq(
                    { from: 's', until: 'l', },
                    {
                      marginInlineStart: '6rem',
                      paddingTop: '3rem',
                    }
                  ),
                }}
              />
              {/* UpdateComponent */}
              <FelaComponent
                style={theme => ({
                  // backgroundColor: theme.color('primary', '-6'),
                  backgroundColor: 'white',
                  // width: '100%',
                  display: 'block',
                  paddingBottom: '4rem',
                  paddingTop: '4rem',
                  ...theme.mq(
                    { until: 's', },
                    { paddingInlineStart: '2rem', paddingInlineEnd: '2rem', }
                  ),
                  ...theme.mq(
                    { from: 's', until: 'l', },
                    {
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginInlineStart: '4rem',
                      marginInlineEnd: '4rem',
                      paddingInlineStart: '4rem',
                      paddingInlineEnd: '4rem',
                      alignItems: 'center',
                      ...borderTop({
                        width: '13px',
                        lines: 6,
                        style: 'solid',
                        color: theme.color('neutral', '-6'),
                      }),
                    }
                  ),
                  ...theme.mq(
                    { from: 'l', },
                    {
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingInlineStart: '4rem',
                      paddingInlineEnd: '4rem',
                      alignItems: 'center',
                      ...borderTop({ width: '13px', lines: 6, style: 'solid', color: theme.color('primary', '-6'), }),
                    }
                  ),
                })}
                render={({ className, theme, }) => (
                  <div className={className}>
                    <FelaComponent
                      style={theme => ({
                        color: theme.color('tertiary'),
                        fontWeight: 'bold',
                        ...theme.mq({ until: 's', }, { marginBottom: '3rem', }),
                        ...theme.type(3),
                      })}
                      render={({ className, }) => (
                        <div className={className}>{theme.liveBlogI18n.updatesTitle}</div>
                      )}
                    />
                    <FelaComponent
                      style={{ display: 'flex', paddinTop: '1rem', justifyContent: 'center', }}
                      render={({ className, }) => (
                        <div className={className}>
                          <RadioButton
                            label={theme.liveBlogI18n.lastToFirstLabel}
                            value="descending"
                            onChange={evt => this.setState({ value: evt.target.value, })}
                            checked={this.state.value === 'descending'}
                            miscStyles={{ marginInlineEnd: '5rem', ...theme.type(-1), }}
                          />
                          <RadioButton
                            label={theme.liveBlogI18n.firstToLastLabel}
                            value="ascending"
                            onChange={evt => this.setState({ value: evt.target.value, })}
                            checked={this.state.value === 'ascending '}
                            miscStyles={{ ...theme.type(-1), }}
                          />
                        </div>
                      )}
                    />
                  </div>
                )}
              />
              {/* UpdateComponent End */}

              <FelaComponent
                rule={itemWrapperStyle}
                render={({ className, theme, }) => (
                  <div className={className} >
                    {items.map((item, i) => (
                      <LiveBlogItem item={item} theme={theme} bps={bps} typeConf={typeConf} canonicalUrl={canonicalUrl} />
                    ))}
                  </div>
                )}
              />
            </div>
          )}
        />
      </Fragment>
    );
  }
}

export default LiveBlogContainer;

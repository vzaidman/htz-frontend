/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

import {
  border,
  borderTop,
  borderBottom,
  parseStyleProps,
  getRemFromPx,
} from '@haaretz/htz-css-tools';
import ActionButtons from '../../../ActionButtons/ActionButtons';
// import RadioButton from '../../../RadioButton/RadioButton';
import Button from '../../../Button/Button';
import Time from '../../../Time/Time';
// import Button from '../../../Button/Button';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import ArticleBody from '../../../ArticleBody/ArticleBody';

// const wrapperStyle = ({ miscStyles, theme, }) => ({
//   display: 'block',
//   width: '100%',

//   extend: [
//     theme.mq(
//       { from: 's', until: 'l', },
//       {
//         paddingInlineStart: '4rem',
//         paddingInlineEnd: '4rem',
//         paddingBottom: '4rem',
//       }
//     ),
//     ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
//   ],
// });
const Fade = ({ children, }) => (
  <FelaComponent
    style={theme => ({
      display: 'block',
      height: '15rem',
      position: 'absolute',
      width: '100%',
      bottom: '8rem',
      margin: 'auto',
      backgroundImage: 'linear-gradient(0deg,#fff,#fff 30%,hsla(0,0%,100%,.8) 70%,hsla(0,0%,100%,0))',
      // backgroundImage: `linear-gradient(transparent, ${theme.color(
      //   'comments',
      //   isHighlighted ? 'highlightedCommentBg' : 'bg'
      // )})`,
      // ':after': {
      //   display: 'block',
      //   content: '""',
      //   height: '14rem',
      //   position: 'relative',
      //   top: '-14rem',
      // },
    })}
    render="span"
  >
    {children}
  </FelaComponent>
);


class LiveBlogItem extends React.Component {
  static propTypes = {
    liveblogItems: PropTypes(PropTypes.shape({})).isRequired,
    // miscStyles: stylesPropType,
  };
  static defaultProps = {
    // showTimeLineText: false,
    // timeLineItems: null,
    // miscStyles: null,
  };

  state = {
    //     // value: 'descending',
    fadeText: false,
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const intViewportWidth = window.innerWidth;
      if (intViewportWidth < this.props.bps.widths.s) {
        console.warn(intViewportWidth);
        const height = this.mainContainerEl.clientHeight;
        console.warn('height : ', height);
        const remHeight = getRemFromPx(this.props.bps, this.props.typeConf, height);
        console.warn('remHeight: ', remHeight);
        if (remHeight > 60) {
          // eslint-disable-next-line react/no-did-mount-set-state
          this.setState({ fadeText: true, });
        }
      }
    }
  }

  render() {
    const { canonicalUrl, item, theme, } = this.props;

    return (
      <React.Fragment>
        {/* <FelaComponent
          rule={wrapperStyle}
          render={({ className, theme, }) => (
            <div className={className}>
              {items.map((item, i) => ( */}
        <Grid
          tagName="article"
          attrs={{ itemid: `${canonicalUrl}#${item.contentId}`, }}
          id={item.contentId}
          miscStyles={{
            marginBottom: '2rem',
            marginTop: '2rem',
            backgroundColor: 'white',
            marginInlineEnd: 'auto',
            marginInlineStart: 'auto',
            border: [ '1px', 0, 'solid', theme.color('neutral', '-4'), ],
            // ...(this.state.fadeText ? { overflow: 'hidden', height: '60rem', backgroundImage: 'linear-gradient(0deg,#fff,#fff 30%,hsla(0,0%,100%,.8) 70%,hsla(0,0%,100%,0))'} : {}),
            ...theme.mq({ until: 'm', }, { paddingInlineEnd: '2rem', paddingInlineStart: '2rem', }, ),
          }}
        >
          {/* Time and share bar */}
          <GridItem
            width={[ { until: 's', value: 1 / 1, }, { from: 's', value: 1 / 5, }, ]}
            miscStyles={{
              paddingTop: '3rem',
              ...theme.mq({ until: 's', }, { display: 'inline-flex', alignItems: 'baseline', }),
            }}
          >
            <FelaComponent
              style={theme => ({
                // ...theme.type(0),
                fontWeight: 'bold',
                ...theme.mq(
                  { until: 's', },
                  {
                    marginInlineEnd: '1rem',
                    color: theme.color('tertiary'),
                    ...theme.type(-2),
                  }
                ),
                // paddingTop: '3rem',
              })}
              render={({ className, }) => (
                <div className={className}>
                  <Time time={item.pubDate} format="HH:mm" />
                </div>
              )}
            />
            <FelaComponent
              style={theme => ({
                ...theme.type(-3),
                ...theme.mq({ until: 's', }, { marginInlineEnd: '1rem', ...theme.type(-2), }),
              })}
              render={({ className, }) => (
                <div className={className}>
                  <Time time={item.pubDate} format="DD.MM.YYYY" />
                </div>
              )}
            />
            <ActionButtons
              miscStyles={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginTop: '5rem',
                ...theme.mq({ until: 's', }, { display: 'none', }),
              }}
              size={3}
              buttons={[
                {
                  name: 'facebookLogo',
                  buttonText: 78,
                  iconStyles: {
                    color: theme.color('primary'),
                  },
                },
                {
                  name: 'whatsapp',
                  iconStyles: {
                    color: theme.color('primary'),
                  },
                },
                {
                  name: 'mail',
                  iconStyles: {
                    color: theme.color('primary'),
                  },
                },
              ]}
              vertical
            />
          </GridItem>
          <GridItem
            // width={3 / 4}
            // fade={this.state.fadeText}
            width={[ { until: 's', value: 1 / 1, }, { from: 's', value: 4 / 5, }, ]}
            miscStyles={{
              paddingTop: '3rem',
              paddingBottom: '4rem',
              paddingInlineEnd: '3rem',
              ...(this.state.fadeText ? {
                overflow: 'hidden',
                maxHeight: '65rem',
              } : {}),
              // margin: '0',
              // wordBreak: 'break-word',
              maxWidth: '70rem',
              // width: '100%',
              ...theme.mq({ until: 's', }, { width: '100%', paddingInlineStart: '2rem', paddingInlineEnd: '2rem', }),
              ...theme.mq({ from: 'l', until: 'xl', }, { maxWidth: '64rem', }),
            }}
            attrs={{ ref: mainContainerEl => (this.mainContainerEl = mainContainerEl), }}
          >
            <a href={`#${item.contentId}`}>
              <h1>{item.title}</h1>
            </a>
            
            <ArticleBody body={item.body} showSurvey={false} />
            {this.state.fadeText ? ( <Fade /> ) : null}
         </GridItem>

          {/* Mobile Action Buttons */}
          <FelaComponent
            style={theme => ({
              ...theme.mq({ from: 's', }, { display: 'none', }),
              ...theme.mq(
                { until: 's', },
                {

                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  margin: 'auto',
                  ...borderTop('2px', 1, 'solid', theme.color('neutral', '-6')),
                }
              ),
            })}
            render={({ className, }) => (
              <span className={className}>
                <ActionButtons
                  miscStyles={{
                    paddingBottom: '1.5rem',
                  }}
                  size={3}
                  buttons={[
                    {
                      name: 'facebookLogo',
                      buttonText: 78,
                      iconStyles: {
                        color: theme.color('primary'),
                      },
                    },
                    {
                      name: 'whatsapp',
                      iconStyles: {
                        color: theme.color('primary'),
                      },
                    },
                    {
                      name: 'mail',
                      iconStyles: {
                        color: theme.color('primary'),
                      },
                    },
                  ]}
                />
                {this.state.fadeText ? (
                  <Button variant="primary" miscStyles={{ marginBottom: '1rem', }} isFlat onClick={() => this.setState({ fadeText: false, })}>
                    {/* todo: get this from htz-theme */}
                    להרחבה
                  </Button>
                ) : null}
              </span>
            )}
          />
          {/* Mobile action buttons end */}
        </Grid>
        {/* ))}
            </div>
          )}
        /> */}
      </React.Fragment>
    );
  }
}

export default LiveBlogItem;

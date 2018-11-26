/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, FelaTheme, } from 'react-fela';

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
// eslint-disable-next-line react/prop-types
const Fade = ({ children, }) => (
  <FelaComponent
    style={theme => ({
      display: 'block',
      height: '14rem',
      position: 'absolute',
      width: '100%',
      bottom: '8rem',
      margin: 'auto',
      backgroundImage:
        'linear-gradient(0deg,#fff,#fff 0%,hsla(0,0%,100%,.8) 25%,hsla(0,0%,100%,0))',
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
    item: PropTypes.shape({
      cardId: PropTypes.string,
      title: PropTypes.string,
      titleMobile: PropTypes.string,
      contentName: PropTypes.string,
      contentId: PropTypes.string,
      inputTemplate: PropTypes.string,
      pubDate: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, ]),
    }).isRequired,
    canonicalUrl: PropTypes.string.isRequired,
    /** the bps object from the theme */
    bps: PropTypes.shape({ widths: PropTypes.object, }).isRequired,
    /** the typeConf object from the theme */
    typeConf: PropTypes.shape({
      default: PropTypes.object,
      xl: PropTypes.object,
    }).isRequired,
    // miscStyles: stylesPropType,
  };

  state = {
    fadeText: false,
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const intViewportWidth = window.innerWidth;
      if (intViewportWidth < this.props.bps.widths.s) {
        const height = this.mainContainerEl.clientHeight;
        const remHeight = getRemFromPx(this.props.bps, this.props.typeConf, height);
        if (remHeight > 60) {
          // eslint-disable-next-line react/no-did-mount-set-state
          this.setState({ fadeText: true, });
        }
      }
    }
  }

  render() {
    const { canonicalUrl, item, } = this.props;
    return (
      <React.Fragment>
        {/* <FelaComponent
          rule={wrapperStyle}
          render={({ className, theme, }) => (
            <div className={className}>
              {items.map((item, i) => ( */}
        <FelaTheme
          render={theme => (
            <Grid
              tagName="article"
              attrs={{ itemid: `${canonicalUrl}#${item.cardId}`, }}
              id={item.cardId}
              miscStyles={{
                marginBottom: '2rem',
                marginTop: '2rem',
                backgroundColor: 'white',
                marginInlineEnd: 'auto',
                marginInlineStart: 'auto',
                // ':after': {
                //   height: '0rem',
                //   position: 'absolute',
                //   width: '100%',
                //   bottom: '0',
                //   right: '0',
                //   content: '""',
                // },
                border: [ '0px', 0, 'solid', theme.color('neutral', '-4'), ],
                // ...(this.state.fadeText ? { overflow: 'hidden', height: '60rem', backgroundImage: 'linear-gradient(0deg,#fff,#fff 30%,hsla(0,0%,100%,.8) 70%,hsla(0,0%,100%,0))'} : {}),
                // ...theme.mq(
                //   { until: 'm', },
                //   { paddingInlineEnd: '2rem', paddingInlineStart: '2rem', }
                // ),
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
                        ...theme.type(-1),
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
                    ...theme.type(-2.5),
                    ...theme.mq({ until: 's', }, { marginInlineEnd: '1rem', ...theme.type(-1), }),
                  })}
                  render={({ className, }) => (
                    <div className={className}>
                      <Time time={item.pubDate} format="DD.MM.YYYY" />
                    </div>
                  )}
                />
                <ActionButtons
                  elementName={item.title}
                  elementUrl={`${canonicalUrl}#${item.cardId}`}
                  buttons={[ 'facebooklogo', 'whatsapp', 'mail', ]}
                  size={[ { until: 'l', value: 4, }, { from: 'm', value: 3, }, ]}
                  isFlat
                  vertical
                  globalButtonsStyles={{
                    paddingInlineEnd: '1rem',
                    paddingInlineStart: '1rem',
                  }}
                  miscStyles={{
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginTop: '5rem',
                    marginBottom: '3rem',
                    ...theme.mq({ until: 's', }, { display: 'none', }),
                  }}
                />
                {/* <ActionButtons
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
            /> */}
              </GridItem>
              <GridItem
                // width={3 / 4}
                // fade={this.state.fadeText}
                width={[ { until: 's', value: 1 / 1, }, { from: 's', value: 4 / 5, }, ]}
                miscStyles={{
                  paddingTop: '3rem',
                  paddingInlineEnd: '3rem',
                  paddingBottom: '1rem',
                  ...(this.state.fadeText
                    ? {
                        overflow: 'hidden',
                        maxHeight: '65rem',
                      }
                    : {}),
                  // margin: '0',
                  // wordBreak: 'break-word',
                  maxWidth: '70rem',
                  // width: '100%',
                  ...theme.mq(
                    { until: 's', },
                    {
                      width: '100%',
                      paddingInlineStart: '2rem',
                      paddingInlineEnd: '2rem',
                      paddingTop: '1rem',
                    }
                  ),
                  ...theme.mq({ from: 'l', until: 'xl', }, { maxWidth: '64rem', }),
                }}
                // eslint-disable-next-line no-return-assign
                attrs={{ ref: mainContainerEl => (this.mainContainerEl = mainContainerEl), }}
              >
                <a href={`#${item.cardId}`}>
                  <h1 style={{ fontSize: '3rem', marginBottom: '2rem', }}>{item.title}</h1>
                </a>

                <ArticleBody body={item.body} />
                {this.state.fadeText ? <Fade /> : null}
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
                      elementName={item.title}
                      elementUrl={`${canonicalUrl}#${item.cardId}`}
                      buttons={[ 'facebooklogo', 'whatsapp', 'mail', ]}
                      size={3.5}
                      isFlat
                      // globalButtonsStyles={{
                      // paddingInlineEnd: '1rem',
                      // paddingInlineStart: '1rem',
                      // paddingBottom: '1.5rem',
                      // }}
                      miscStyles={{
                        paddingBottom: '1.5rem',
                      }}
                    />
                    {/* <ActionButtons
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
                /> */}
                    {this.state.fadeText ? (
                      <Button
                        variant="primary"
                        miscStyles={{ marginBottom: '1rem', }}
                        isFlat
                        onClick={() => this.setState({ fadeText: false, })}
                      >
                        {/* todo: get this from htz-theme */}
                        להרחבה
                      </Button>
                    ) : null}
                  </span>
                )}
              />
              {/* Mobile action buttons end */}
            </Grid>
          )}
        />
      </React.Fragment>
    );
  }
}

export default LiveBlogItem;

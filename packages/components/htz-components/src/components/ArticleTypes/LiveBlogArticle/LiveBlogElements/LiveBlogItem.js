/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, FelaTheme, } from 'react-fela';

import { borderTop, getRemFromPx, } from '@haaretz/htz-css-tools';
import H from '../../../AutoLevels/H';
import ActionButtons from '../../../ActionButtons/ActionButtons';
import Button from '../../../Button/Button';
import Time from '../../../Time/Time';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import ArticleBody from '../../../ArticleBody/ArticleBody';

// eslint-disable-next-line react/prop-types
const Fade = ({ children, fadeText, }) => (
  <FelaComponent
    style={theme => ({
      display: fadeText ? 'block' : 'none',
      height: '14rem',
      position: 'absolute',
      width: '100%',
      bottom: '8rem',
      margin: 'auto',
      backgroundImage:
        'linear-gradient(0deg,#fff,#fff 0%,hsla(0,0%,100%,.8) 25%,hsla(0,0%,100%,0))',
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
      /**
       * The elements composing the article’s body.
       */
      body: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.object, ])).isRequired,
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
  };

  state = {
    fadeText: -1,
    itemExpanded: false,
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.updateDimensions();
      window.addEventListener('resize', this.updateDimensions);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.updateDimensions);
    }
  }

  updateDimensions = () => {
    const intViewportWidth = window.innerWidth;
    if (intViewportWidth < this.props.bps.widths.s) {
      const height = this.mainContainerEl.clientHeight;
      const remHeight = getRemFromPx(this.props.bps, this.props.typeConf, height);
      if (remHeight > 60 || this.isEmbedInclude) {
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({ fadeText: true, });
      }
    }
    else {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ fadeText: false, });
    }
  };

  render() {
    // Check when item includes embed element.
    if (this.isEmbedInclude === undefined) {
      this.isEmbedInclude = this.props.item.body.filter(v => v.kind === 'embed').length > 0;
    }
    const { canonicalUrl, item, } = this.props;

    return (
      <React.Fragment>
        <FelaTheme
          render={theme => (
            <React.Fragment>
              <Grid
                tagName="article"
                attrs={{ itemid: `${canonicalUrl}#${item.cardId}`, }}
                id={item.cardId}
                gutter={2}
                miscStyles={{
                  marginBottom: '2rem',
                  marginTop: '2rem',
                  backgroundColor: 'white',
                  marginInlineEnd: 'auto',
                  marginInlineStart: 'auto',
                  border: [ '0px', 0, 'solid', theme.color('neutral', '-4'), ],
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
                      ...theme.type(1),
                      fontWeight: 'bold',
                      ...theme.mq(
                        { until: 's', },
                        {
                          marginInlineEnd: '1rem',
                          color: theme.color('tertiary'),
                          ...theme.type(-1),
                        }
                      ),
                    })}
                    render={({ className, }) => (
                      <div className={className}>
                        <Time time={item.pubDate} format="HH:mm" />
                      </div>
                    )}
                  />
                  <FelaComponent
                    style={theme => ({
                      ...theme.type(-2),
                      ...theme.mq({ until: 's', }, { marginInlineEnd: '1rem', ...theme.type(-1), }),
                    })}
                    render={({ className, }) => (
                      <div className={className}>
                        <Time time={item.pubDate} format="DD.MM.YYYY" />
                      </div>
                    )}
                  />
                  {/* M/L/XL Action Buttons */}
                  <ActionButtons
                    shouldMainNavBarDisplay={false}
                    elementName={item.title}
                    elementUrl={`${canonicalUrl}#${item.cardId}`}
                    tabIndex={0}
                    buttons={[ 'facebook', 'whatsapp', 'mail', ]}
                    size={[ { until: 'l', value: 4, }, { from: 'l', value: 3, }, ]}
                    isFlat
                    vertical
                    globalButtonsStyles={{
                      paddingInlineEnd: '1rem',
                      paddingInlineStart: '1rem',
                      paddingTop: '1rem',
                      paddingBottom: '1rem',
                    }}
                    miscStyles={{
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      marginTop: '5rem',
                      marginBottom: '4rem',
                      ...theme.mq({ until: 's', }, { display: 'none', }),
                    }}
                  />
                </GridItem>
                {/* Item title and Body */}
                <GridItem
                  width={[ { until: 's', value: 1 / 1, }, { from: 's', value: 4 / 5, }, ]}
                  miscStyles={{
                    paddingTop: '3rem',
                    paddingInlineEnd: '3rem',
                    paddingBottom: '1rem',
                    maxWidth: '70rem',
                    ...theme.mq(
                      { until: 's', },
                      {
                        height: !this.isEmbedInclude || this.state.itemExpanded ? 'auto' : '65rem',
                        ...(this.state.fadeText || this.state.fadeText === -1
                          ? {
                            overflow: 'hidden',
                            maxHeight: '65rem',
                          }
                          : {}),
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
                  <FelaComponent
                    style={{ marginBottom: '2rem', extend: [ theme.type(2), ], }}
                    render={({ className, }) => (
                      <H className={className}>
                        <a href={`#${item.cardId}`}>{item.title}</a>
                      </H>
                    )}
                  />

                  <ArticleBody body={item.body} />
                  {this.state.fadeText === true ? <Fade fadeText={this.state.fadeText} /> : null}
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
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        marginInlineStart: '2rem',
                        marginInlineEnd: '2rem',
                        ...borderTop('2px', 1, 'solid', theme.color('neutral', '-6')),
                      }
                    ),
                  })}
                  render={({ className, }) => (
                    <span className={className}>
                      <ActionButtons
                        shouldMainNavBarDisplay={false}
                        elementName={item.title}
                        elementUrl={`${canonicalUrl}#${item.cardId}`}
                        tabIndex={0}
                        buttons={[ 'facebook', 'whatsapp', 'mail', ]}
                        size={3.5}
                        isFlat
                        miscStyles={{
                          paddingBottom: '1.5rem',
                        }}
                      />
                      {this.state.fadeText !== true && !this.state.itemExpanded ? null : !this.state
                        .itemExpanded ? (
                          <Button
                            variant="inverseOpaque"
                            miscStyles={{
                              marginBottom: '1rem',
                              ':focus': {
                                color: theme.color('neutral', '-2'),
                              },
                            }}
                            boxModel={{ hp: 2, vp: 1, }}
                            onClick={() => this.setState({ fadeText: false, itemExpanded: true, })}
                          >
                            {theme.liveBlogI18n.expand}
                          </Button>
                        ) : (
                          <Button
                            variant="inverseOpaque"
                            miscStyles={{ marginBottom: '1rem', }}
                            boxModel={{ hp: 2, vp: 1, }}
                            onClick={() => this.setState({ fadeText: true, itemExpanded: false, })}
                          >
                            {theme.liveBlogI18n.close}
                          </Button>
                        )}
                    </span>
                  )}
                />
                {/* Mobile action buttons end */}
              </Grid>
            </React.Fragment>
          )}
        />
      </React.Fragment>
    );
  }
}

export default LiveBlogItem;

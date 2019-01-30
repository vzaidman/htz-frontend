import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, FelaTheme, } from 'react-fela';
import gql from 'graphql-tag';
import { borderBottom, } from '@haaretz/htz-css-tools';
import Query from '../ApolloBoundary/Query';
import MastheadSearch from './MastheadSearch/MastheadSearch';
import MastheadUserTools from './MastheadUserTools';

// eslint-disable-next-line import/no-named-as-default
import LayoutRow from '../PageLayout/LayoutRow';
import LayoutContainer from '../PageLayout/LayoutContainer';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import MobileNavigation from '../MobileNavigationMenu/MobileNavigationMain';
import WrappedScroll from '../Scroll/Scroll';
import UserDispenser from '../User/UserDispenser';
import MadorimNavigation from './MadorimNavigation';
import LogoAndDate from './LogoAndDate';

const hostQuery = gql`
  query Hostname($path: String!) {
    hostname @client
  }
`;

class Masthead extends Component {
  static propTypes = {
    /**
     * the background color passed to the LayoutRow component.
     */
    rowBgc: PropTypes.string,
    /** should the masthead borderbottom be full width */
    mastheadFullWidthBorder: PropTypes.bool,
    /** should display navigation items from header slot (madorim- הארץ שלי, בעולם and so...) */
    includeMadorimNavigation: PropTypes.bool,
    /**
     * Navigation Menu's content Id.
     */
    contentId: PropTypes.string.isRequired,
    /**
     * A string of the host: `tm` for `themarker.com`, `htz` for `haaretz.co.il` and `hdz` for `haaretz.com`.
     */
    hostname: PropTypes.string.isRequired,
    //  used by getDerived
    // eslint-disable-next-line react/no-unused-prop-types
    velocity: PropTypes.number,
    y: PropTypes.number,
    Logo: PropTypes.node.isRequired,
  };

  static defaultProps = {
    rowBgc: null,
    mastheadFullWidthBorder: false,
    includeMadorimNavigation: false,
    velocity: 0,
    y: 0,
  };

  state = { searchIsOpen: false, shouldDisplay: true, };

  static getDerivedStateFromProps(props, state) {
    const { velocity, y, } = props;

    if (y < 200) return { shouldDisplay: true, };
    if (velocity < 0) return { shouldDisplay: false, };
    if (velocity > 0) return { shouldDisplay: true, };
    return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.y > 0 && this.state.searchIsOpen) {
      this.toggleSearchState();
    }
  }

  toggleSearchState = () => {
    this.setState(prevState => ({
      searchIsOpen: !prevState.searchIsOpen,
    }));
  };

  render() {
    const {
      contentId,
      hostname,
      y,
      Logo,
      rowBgc,
      mastheadFullWidthBorder,
      includeMadorimNavigation,
    } = this.props;
    const { shouldDisplay, searchIsOpen, } = this.state;
    const host = hostname.match(/^(?:.*?\.)?(.*)/i)[1];

    return (
      <FelaTheme
        render={theme => {
          const borderBottomMasthead = borderBottom(
            '1px',
            0,
            'solid',
            theme.color('mastheadBorder', 'borderColor')
          );
          return (
            <Fragment>
              <LayoutRow
                bgc={rowBgc}
                miscStyles={{
                  ...(mastheadFullWidthBorder
                    ? {
                      borderBottom: [
                        '1px',
                        0,
                        'solid',
                        theme.color('mastheadBorder', 'borderColor'),
                      ],
                    }
                    : {}),
                  transitionProperty: 'transform',
                  ...theme.getDelay('transition', -1),
                  ...theme.getDuration('transition', -1),
                  ...theme.getTimingFunction('transition', 'linear'),
                  top: [ { until: 's', value: 0, }, { until: 'm', misc: 'landscape', value: 0, }, ],
                  position: [
                    { until: 's', value: 'sticky', },
                    { until: 'm', misc: 'landscape', value: 'sticky', },
                  ],
                  transform: [
                    { until: 's', value: `translateY(${shouldDisplay ? '0' : '-100'}%)`, },
                    {
                      until: 'm',
                      misc: 'landscape',
                      value: `translateY(${shouldDisplay ? '0' : '-100'}%)`,
                    },
                  ],
                  zIndex: theme.getZIndex('modal', 1),
                }}
              >
                <LayoutContainer
                  {...(mastheadFullWidthBorder
                    ? {
                      miscStyles: {
                        // need to override all mq
                        maxWidth: [
                          { from: 's', until: 'm', value: '100%', },
                          { from: 'm', until: 'l', value: '100%', },
                          { from: 'l', until: 'xl', value: '100%', },
                          { from: 'xl', value: '100%', },
                        ],
                        ...borderBottomMasthead,
                      },
                    }
                    : { miscStyles: { ...borderBottomMasthead, }, })}
                >
                  <FelaComponent
                    style={() => {
                      const mobileStyles = {
                        paddingTop: '2rem',
                      };
                      return {
                        alignItems: 'stretch',
                        backgroundColor: theme.color('neutral', '-10'),
                        display: 'flex',
                        position: 'relative',
                        extend: [
                          theme.mq({ until: 's', }, mobileStyles),
                          theme.mq({ until: 'm', misc: 'landscape', }, mobileStyles),
                        ],
                      };
                    }}
                    render="header"
                  >
                    <UserDispenser
                      render={({ user, }) => (
                        <NavigationMenu contentId={contentId} userType={user.type} />
                      )}
                    />
                    <MastheadSearch searchIsOpen={searchIsOpen} onClick={this.toggleSearchState} />
                    {searchIsOpen ? null : (
                      <LogoAndDate
                        logoType="htz-homepage"
                        datetimeMiscStyles={{ display: [ { until: 'l', value: 'none', }, ], }}
                        logoMiscStyles={{ fill: 'red', }}
                      />
                    )}
                    {searchIsOpen ? null : <MastheadUserTools y={y} />}
                  </FelaComponent>
                  {includeMadorimNavigation && <MadorimNavigation contentId={contentId} />}
                </LayoutContainer>
              </LayoutRow>
              <FelaComponent
                style={{
                  backgroundColor: 'transparent',
                  transform: `translate(50%, ${shouldDisplay ? '0' : '110'}%)`,
                  transitionProperty: 'transform',
                  position: 'fixed',
                  start: '50%',
                  bottom: '0',
                  width: '100%',
                  zIndex: theme.getZIndex('modal', 1),
                  display: 'none',
                  extend: [
                    theme.getDelay('transition', -1),
                    theme.getDuration('transition', -1),
                    theme.getTimingFunction('transition', 'linear'),
                    theme.mq({ until: 's', }, { display: 'initial', }),
                    theme.mq({ until: 'm', misc: 'landscape', }, { display: 'initial', }),
                  ],
                }}
              >
                <MobileNavigation contentId={contentId} shouldDisplay={shouldDisplay} />
              </FelaComponent>
            </Fragment>
          );
        }}
      />
    );
  }
}

export default function WrappedMasthead(props) {
  return (
    <Query query={hostQuery}>
      {({ loading, error, data, }) => {
        if (loading) return null;
        if (error) return null;
        return (
          <WrappedScroll
            render={({ velocity, y, }) => (
              <Masthead hostname={data.hostname} velocity={velocity} y={y} {...props} />
            )}
          />
        );
      }}
    </Query>
  );
}

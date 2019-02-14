// @flow
import * as React from 'react';
import { FelaTheme, } from 'react-fela';
import MastheadWrapper from './MastheadWrapper';
import LayoutContainer from '../PageLayout/LayoutContainer';
import LayoutRow from '../PageLayout/LayoutRow';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import HeaderSearch from './MastheadSearch/MastheadSearch';
import MastheadUserTools from './MastheadUserTools';
import MadorimNavigation from './MadorimNavigation';

type HomePageMastheadProps = {
  contentId: string,
  logo: React.ElementType,
  isScrolled: boolean,
  shouldDisplay: boolean,
};

const mastheadWrapperMiscStyles = ({ theme, isScrolled, shouldDisplay, }) => ({
  transitionProperty: 'all',
  // ...theme.getDelay('transition', -1),
  ...theme.getDuration('transition', -1),
  ...theme.getTimingFunction('transition', 'linear'),
  willChange: 'transform',
  padding: [
    { until: 's', value: '2rem  0 1rem 0', },
    { from: 's', value: '2rem 0 0 0', },
  ],
  transform: [
    { until: 's', value: shouldDisplay ? 'translateY(0)' : 'translateY(-115%)', },
  ],
  backgroundColor: [
    {
      until: 's',
      value:
        isScrolled && shouldDisplay
          ? theme.color('white')
          : theme.color('transparent'),
    },
  ],
  backgroundImage: [
    {
      until: 's',
      value: isScrolled
        ? null
        : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.8) 15%, rgba(0, 0, 0, 0))',
    },
  ],
  borderBottom: [
    { from: 's', value: [ '1px', 1, 'solid', theme.color('primary'), ], },
  ],
});

export default class HomePageMasthead extends React.PureComponent<HomePageMastheadProps> {
  render() {
    const { contentId, logo, isScrolled, shouldDisplay, } = this.props;

    return (
      <FelaTheme
        render={theme => (
          <LayoutRow
            miscStyles={{
              position: [ { until: 's', value: 'fixed', }, { from: 's', value: 'relative', }, ],
              top: [ { until: 's', value: 0, }, ],
              left: [ { until: 's', value: 0, }, ],
              width: [ { until: 's', value: '100%', }, ],
              zIndex: theme.getZIndex('masthead'),
            }}
            namedBgc={[
              { until: 's', value: 'transparent', },
              { from: 's', value: 'bg', },
            ]}
          >
            <LayoutContainer
              namedBgc={[
                { until: 's', value: 'transparent', },
                { from: 's', value: [ 'layout', 'containerBg', ], },
              ]}
            >
              <React.Fragment>
                <MastheadWrapper
                  miscStyles={mastheadWrapperMiscStyles({
                    theme,
                    isScrolled,
                    shouldDisplay,
                  })}
                  logo={logo}
                  datetimeMiscStyles={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                  }}
                  logoSize={[ { until: 'l', value: 4, }, { from: 'l', value: 5, }, ]}
                  logoMiscStyles={{
                    marginBottom: [ { from: 's', until: 'l', value: '.5rem', }, ],
                    transitionProperty: 'fill, color,  height, width',
                    ...theme.getDelay('transition', -1),
                    ...theme.getDuration('transition', -1),
                    ...theme.getTimingFunction('transition', 'linear'),
                    willChange: 'transform',
                    color: [
                      {
                        until: 's',
                        value: isScrolled ? [ 'bodytext', 'base', ] : 'white',
                      },
                    ],
                    fill: [
                      { until: 'l', value: 'transparent', },
                      { from: 'l', value: [ 'primary', 'base', ], },
                    ],
                  }}
                  panelsResponsiveHiding={[
                    { until: 's', value: 'all', },
                    { from: 's', until: 'l', value: 'bottom', },
                  ]}
                  renderStartPanel={(toggleOther, toggleMe) => (
                    <React.Fragment>
                      <NavigationMenu contentId={contentId} />
                      <HeaderSearch onClick={toggleOther} />
                    </React.Fragment>
                  )}
                  renderEndPanel={(toggleOther, toggleMe) => (
                    <React.Fragment>
                      <MastheadUserTools />
                    </React.Fragment>
                  )}
                  renderBottomPanel={() => (
                    <MadorimNavigation contentId={contentId} />
                  )}
                />
              </React.Fragment>
            </LayoutContainer>
          </LayoutRow>
        )}
      />
    );
  }
}

import * as React from 'react';
import { FelaTheme, } from 'react-fela';
import MastheadWrapper from './MastheadWrapper';
import LayoutContainer from '../PageLayout/LayoutContainer';
import LayoutRow from '../PageLayout/LayoutRow';
import IconHaaretzHomepageMasthead from '../Icon/icons/IconHaaretzHomepageMasthead';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import HeaderSearch from './MastheadSearch/MastheadSearch';
import MastheadUserTools from './MastheadUserTools';

type HomePageMastheadProps = {};

const mastheadWrapperMiscStyles = ({ theme, }) => ({
  padding: [ { until: 's', value: '2rem  0', }, { from: 's', value: '2rem 0 0 0', }, ],
  background: [
    {
      until: 's',
      value: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))',
    },
  ],
  borderBottom: [ { from: 's', value: [ '1px', 1, 'solid', theme.color('primary', '-6'), ], }, ],
});

export default class HomePageMasthead extends React.Component<HomePageMastheadProps> {
  render() {
    const { contentId, } = this.props;

    return (
      <LayoutRow>
        <LayoutContainer>
          <FelaTheme
            render={theme => (
              <MastheadWrapper
                miscStyles={mastheadWrapperMiscStyles({ theme, })}
                logoComponent={IconHaaretzHomepageMasthead}
                logoSize={[ { until: 'l', value: 4, }, { from: 'l', value: 6, }, ]}
                logoMiscStyles={{
                  color: [ { until: 's', value: 'white', }, ],
                  fill: [
                    { until: 's', value: 'transparent', },
                    { until: 'l', value: 'transparent', },
                    { from: 'l', value: [ 'primary', 'base', ], },
                  ],
                }}
                showStartPanel={[ { until: 's', value: false, }, ]}
                showEndPanel={[ { until: 's', value: false, }, ]}
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
              />
            )}
          />
        </LayoutContainer>
      </LayoutRow>
    );
  }
}

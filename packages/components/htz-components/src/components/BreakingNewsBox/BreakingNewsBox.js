// @flow
import * as React from 'react';
import { FelaTheme, FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';

import Query from '../ApolloBoundary/Query';
import Grid from '../Grid/Grid';
import Button from '../Button/Button';
import GridItem from '../Grid/GridItem';
import StripController from './StripController';
import BreakingNewsItem from './BreakingNewsItem';

const GET_BREAKING_NEWS_DATA = gql`
  query breakingNewsBox($cid: String!) {
    breakingNewsBox(cid: $cid) {
      contentId
      items {
        title
        url
        creationDateTime
        contentId
      }
    }
  }
`;

type Props = {
  /** Items duration display time */
  speed: number,
  /** Are items iterate automatically */
  loop: boolean,
  /** The duration of item fade in/out animation */
  itemsTransitionDuration: number,
};

type State = {
  visibleIndex: number,
};

export default class BreakingNewsBox extends React.Component<Props, State> {
  static defaultProps = {
    speed: 7,
    loop: true,
    itemsTransitionDuration: 0,
  };

  state = {
    visibleIndex: 0,
  };

  setVisible(visibleIndex: number) {
    this.setState({ visibleIndex, });
  }

  render() {
    const { loop, speed, itemsTransitionDuration, } = this.props;
    return (
      <FelaTheme
        render={theme => (
          <Grid
            gutter={0}
            miscStyles={{
              borderBottom: [ '1px', 0, 'solid', theme.color('neutral', -6), ],
            }}
          >
            <GridItem miscStyles={{ flexGrow: 0, }}>
              <Button
                href={theme.breakingNewsStrip.url}
                variant="primaryOpaque"
                fontSize={[
                  { until: 'l', value: 0, },
                  { from: 'l', value: -1, },
                ]}
              >
                {theme.breakingNewsStrip.title}
              </Button>
            </GridItem>
            <Query
              query={GET_BREAKING_NEWS_DATA}
              variables={{ cid: 'Haaretz.Element.BreakingNewsBoxElement', }}
            >
              {({ data, loading, error, }) => {
                if (
                  loading
                  || error
                  || !(data && data.breakingNewsBox && data.breakingNewsBox.items)
                ) {
                  return null;
                }

                const { items, } = data.breakingNewsBox;

                return (
                  <React.Fragment>
                    <GridItem
                      gutter={0}
                      miscStyles={{ flexGrow: 1, paddingInlineStart: '2rem', }}
                    >
                      <FelaComponent
                        render="ul"
                        style={{
                          alignItems: 'center',
                          display: 'flex',
                          height: '100%',
                          position: 'relative',
                        }}
                      >
                        {items.map((item, index) => {
                          const isVisible = index === this.state.visibleIndex;
                          return (
                            <BreakingNewsItem
                              key={item.contentId}
                              {...item}
                              isVisible={isVisible}
                              animationDuration={itemsTransitionDuration}
                            />
                          );
                        })}
                      </FelaComponent>
                    </GridItem>
                    <GridItem gutter={0} miscStyles={{ flexGrow: 0, }}>
                      <StripController
                        onChange={controllerData => this.setVisible(controllerData.index)
                        }
                        speed={speed}
                        size={items.length}
                        loop={loop}
                      />
                    </GridItem>
                  </React.Fragment>
                );
              }}
            </Query>
          </Grid>
        )}
      />
    );
  }
}

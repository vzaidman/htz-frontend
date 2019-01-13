// @flow
import * as React from 'react';
import { FelaTheme, FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';

import Query from '../ApolloBoundary/Query';
import Grid from '../Grid/Grid';
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

  setVisible(
    visibleIndex: number) {
    this.setState({ visibleIndex, });
  }

  render() {
    const { loop, speed, itemsTransitionDuration, } = this.props;
    return (
      <Query
        query={GET_BREAKING_NEWS_DATA}
        variables={{ cid: 'Haaretz.Element.BreakingNewsBoxElement', }}
      >
        {({ data, loading, error, }) => {
          if (loading || error || !(data && data.breakingNewsBox)) {
            return null;
          }
          
          const { items, } = data.breakingNewsBox;
          return (
            <FelaTheme
              render={theme => (
                <Grid
                  miscStyles={{
                    borderBottom: [ '1px', 0, 'solid', theme.color('neutral', -6), ],
                    marginTop: '2rem',
                  }}
                >
                  <GridItem miscStyles={{ flexGrow: 0, }}>
                    <FelaComponent
                      style={{
                        backgroundColor: theme.color('primary'),
                        color: theme.color('white'),
                        width: '16rem',
                        height: '6rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: 700,
                        type: -1,
                      }}
                    >
                      {theme.breakingNewsStrip.title}
                    </FelaComponent>
                  </GridItem>
                  <GridItem miscStyles={{ flexGrow: 1, }}>
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
                  <GridItem miscStyles={{ flexGrow: 0, }}>
                    <StripController
                      onChange={controllerData => this.setVisible(controllerData.index)}
                      speed={speed}
                      size={items.length}
                      loop={loop}
                    />
                  </GridItem>
                </Grid>
              )}
            />
          );
        }}
      </Query>
    );
  }
}

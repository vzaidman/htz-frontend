/* global window */
import React from 'react';
import { FelaComponent, } from 'react-fela';
import gql from 'graphql-tag';
import Query from '../ApolloBoundary/Query';

import style from './style';
import Button from '../Button/Button';

const GET_USER_AGENT = gql`
  query USER_AGENT {
    userAgent {
      deviceType
    }
  }
`;
// eslint-disable-next-line react/prop-types
export default class Survey extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/prop-types
    const properties = props.properties;
    // eslint-disable-next-line react/prop-types
    if (!properties) return null;
    // // eslint-disable-next-line react/prop-types
    if (!properties.xls) return null;
    // // eslint-disable-next-line react/prop-types
    if (!properties.xls.surveys) return null;

    this.xls = properties.xls;
    this.partiesValues = {};
    let unsortedItems;
    this.colors = [ [ 'primary', ], [ 'quaternary', '+2', ], [ 'primary', '-3', ], [ 'black', ], ];

    const { comment, mobileMode, tabletMode, desktopMode, legend, ...data } = this.xls.surveys
      ? this.xls.surveys[0]
      : this.xls.survey;
    this.comment = comment;
    if (this.xls.surveys) {
      unsortedItems = Object.keys(data);
      // eslint-disable-next-line array-callback-return
      unsortedItems.map(v => {
        this.partiesValues[v] = [];
      });

      // eslint-disable-next-line array-callback-return
      this.xls.surveys.map(item => {
        unsortedItems.map(v => this.partiesValues[v].push(parseInt(item[v], 10)));
      });
      unsortedItems.sort();
      const items = unsortedItems.sort(
        (a, b) => this.partiesValues[b][0]
          + this.partiesValues[b][1]
          - (this.partiesValues[a][0] + this.partiesValues[a][1])
      );

      this.state = {
        items,
      };
    }
  }

  getDeviceMode(deviceType) {
    const { mobileMode, tabletMode, desktopMode, } = this.xls.surveys[0];
    switch (deviceType) {
      case 'mobile':
        return mobileMode || 'horizental';
      case 'tablet':
        return tabletMode || 'horizental';

      case 'desktop':
        return desktopMode || 'horizental';

      default:
        return 'horizental';
    }
  }

  render() {
    return (
      <Query query={GET_USER_AGENT}>
        {({ data, error, loading, }) => {
          if (loading) return null;
          if (error) return null;
          let mode = 'horizental';
          mode = this.getDeviceMode(data.userAgent.deviceType);
          return (
            <FelaComponent mode={mode} rule={style.wrapper}>
              <FelaComponent style={style.legendsWrapper}>
                {this.xls.surveys.map((v, i) => (
                  <FelaComponent style={style.legend} key={this.colors[i]}>
                    <FelaComponent color={this.colors[i]} rule={style.legendcolor} render="span" />
                    <FelaComponent style={style.legendLabel} render="span">
                      {v.legend}
                    </FelaComponent>
                  </FelaComponent>
                ))}
              </FelaComponent>
              <FelaComponent mode={mode} rule={style.surveyWrapper}>
                {this.state.items.map(item => (
                  <FelaComponent
                    itemsAmount={this.state.items.length}
                    mode={mode}
                    key={item}
                    rule={style.chartWrapper}
                  >
                    <FelaComponent mode={mode} rule={style.labalWrapper} render="label">
                      <FelaComponent mode={mode} rule={style.labal} render="label">
                        {item}
                      </FelaComponent>
                    </FelaComponent>
                    <FelaComponent mode={mode} rule={style.barsWrapper}>
                      {this.partiesValues[item].map((v, i) => (
                        <FelaComponent
                          mode={mode}
                          key={item + this.colors[i]}
                          rule={style.barWrapper}
                        >
                          <FelaComponent
                            mode={mode}
                            barColor={this.colors[i]}
                            value={v}
                            load
                            rule={style.bar}
                          />
                          <FelaComponent mode={mode} rule={style.barValue}>
                            {v}
                          </FelaComponent>
                        </FelaComponent>
                      ))}
                    </FelaComponent>
                  </FelaComponent>
                ))}
              </FelaComponent>
              <FelaComponent mode={mode} rule={style.buttonWrapper}>
                <Button
                  href="https://www.haaretz.co.il/EXT-INTERACTIVE-1.6826451"
                  style={style.button}
                >
                  לכל הסקרים
                </Button>
              </FelaComponent>

              <FelaComponent style={style.comment}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.comment.replace('*', '<br>*'),
                  }}
                />
              </FelaComponent>
            </FelaComponent>
          );
        }}
      </Query>
    );
  }
}

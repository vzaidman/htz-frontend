/* global window */
import React from 'react';
import { FelaComponent, } from 'react-fela';
import style from './style';
import Button from '../Button/Button';

// eslint-disable-next-line react/prop-types
export default class Survey extends React.Component {
  state = {
    load: true, // Move to false to enable animation
  };

  componentDidMount() {
    // setTimeout(() => this.setState({ load: true, }));
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const properties = this.props.properties;
    // eslint-disable-next-line react/prop-types
    if (!properties) return null;
    // // eslint-disable-next-line react/prop-types
    if (!properties.xls) return null;
    // // eslint-disable-next-line react/prop-types
    if (!properties.xls.surveys) return null;

    const xls = properties.xls;
    const partiesValues = {};
    let parties;
    const colors = [ [ 'primary', ], [ 'quaternary', '+2', ], [ 'primary', '-3', ], [ 'black', ], ];

    const { comment, legend, ...data } = xls.surveys ? xls.surveys[0] : xls.survey;
    let mode;
    if (xls.surveys) {
      mode = xls.surveys[0].mode || 'horizental';
      parties = Object.keys(data);
      // eslint-disable-next-line array-callback-return
      parties.map(v => {
        partiesValues[v] = [];
      });

      // eslint-disable-next-line array-callback-return
      xls.surveys.map(item => {
        parties.map(v => partiesValues[v].push(parseInt(item[v], 10)));
      });
    }

    // window.parties = parties;
    // window.partiesValues = partiesValues;
    parties.sort(
      (a, b) => partiesValues[b][0] + partiesValues[b][1] - (partiesValues[a][0] + partiesValues[a][1])
    );
    return (
      <FelaComponent mode={mode} rule={style.wrapper}>
        <FelaComponent style={style.legendsWrapper}>
          {xls.surveys.map((v, i) => (
            <FelaComponent style={style.legend}>
              <FelaComponent color={colors[i]} rule={style.legendcolor} render="span" />
              <FelaComponent style={style.legendLabel} render="span">
                {v.legend}
              </FelaComponent>
            </FelaComponent>
          ))}
        </FelaComponent>
        <FelaComponent mode={mode} rule={style.surveyWrapper}>
          {parties.map(partie => (
            <FelaComponent itemsAmount={parties.length} mode={mode} rule={style.chartWrapper}>
              <FelaComponent mode={mode} rule={style.labalWrapper} render="label">
                <FelaComponent mode={mode} rule={style.labal} render="label">
                  {partie}
                </FelaComponent>
              </FelaComponent>
              <FelaComponent mode={mode} rule={style.barsWrapper}>
                {partiesValues[partie].map((v, i) => (
                  <FelaComponent mode={mode} rule={style.barWrapper}>
                    <FelaComponent
                      mode={mode}
                      barColor={colors[i]}
                      value={v}
                      load={this.state.load}
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
          <Button href="https://www.haaretz.co.il/EXT-INTERACTIVE-1.6826451" style={style.button}>
            לכל הסקרים
          </Button>
        </FelaComponent>

        <FelaComponent style={style.comment}>
          <div
            dangerouslySetInnerHTML={{
              __html: comment.replace('*', '<br>*'),
            }}
          />
        </FelaComponent>
      </FelaComponent>
    );
  }
}
